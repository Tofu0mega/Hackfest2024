import React, { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";

// Global variables for head-turn detection
let isTurningLeft = false;
let isTurningRight = false;

// Global functions to check head-turn state
function isLeft() {
  return isTurningLeft;
}

function isRight() {
  return isTurningRight;
}

const EarringsAR = ({ Asset }) => {
  const [AssetURL, setAssetURL] = useState(Asset);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [status, setStatus] = useState("Starting...");
  const [fps, setFps] = useState(0);

  useEffect(() => {
    let model = null;
    let animationId = null;
    let frameCount = 0;
    let lastTimestamp = 0;

    const initCamera = async () => {
      try {
        setStatus("Requesting camera access...");
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 960 },
            facingMode: "user",
            frameRate: { ideal: 30 },
          },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await new Promise((resolve) => {
            videoRef.current.onloadedmetadata = () => {
              resolve();
            };
          });
          videoRef.current.width = 1280;
          videoRef.current.height = 960;
          await videoRef.current.play();
          setStatus("Camera ready");
          return true;
        }
        return false;
      } catch (error) {
        console.error("Camera error:", error);
        setStatus(`Camera error: ${error.message}`);
        return false;
      }
    };

    const initModel = async () => {
      try {
        setStatus("Loading TensorFlow.js...");
        await tf.ready();
        await tf.setBackend("webgl");
        console.log("Using backend:", tf.getBackend());

        setStatus("Loading face detection model...");
        model = await faceLandmarksDetection.createDetector(
          faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
          {
            runtime: "tfjs",
            refineLandmarks: true,
            maxFaces: 1,
            scoreThreshold: 0.5,
          }
        );
        setStatus("Model loaded");
        return true;
      } catch (error) {
        console.error("Model loading error:", error);
        setStatus(`Model error: ${error.message}`);
        return false;
      }
    };

    const updateFPS = (timestamp) => {
      frameCount++;
      if (timestamp - lastTimestamp >= 1000) {
        setFps(Math.round((frameCount * 1000) / (timestamp - lastTimestamp)));
        frameCount = 0;
        lastTimestamp = timestamp;
      }
    };

    const detectFaces = async (timestamp) => {
      if (!model || !videoRef.current || !canvasRef.current) return;

      try {
        updateFPS(timestamp);

        const faces = await model.estimateFaces(videoRef.current, {
          flipHorizontal: false,
          staticImageMode: false,
        });

        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        ctx.save();
        ctx.scale(-1, 1);
        ctx.translate(-canvasRef.current.width, 0);
        ctx.drawImage(videoRef.current, 0, 0);
        ctx.restore();

        ctx.fillStyle = "white";
        ctx.font = "16px Arial";
        ctx.fillText(`FPS: ${fps}`, 10, 20);
        ctx.fillText(`Faces: ${faces.length}`, 10, 40);

        if (faces.length > 0) {
          faces.forEach((face) => {
            const leftEye = face.keypoints[33];
            const rightEye = face.keypoints[263];
            const nose = face.keypoints[1];

            if (leftEye && rightEye && nose) {
              const eyeMidX = (leftEye.x + rightEye.x) / 2;

              // Update global head-turn states
              isTurningLeft = nose.x > eyeMidX + 10; // Adjust offset as needed
              isTurningRight = nose.x < eyeMidX - 10; // Adjust offset as needed

              if (isTurningLeft) {
                ctx.fillText("Turning Left", 10, 60);
              } else if (isTurningRight) {
                ctx.fillText("Turning Right", 10, 60);
              } else {
                ctx.fillText("Facing Forward", 10, 60);
              }
            }

            const leftCheekIndex = 234; // Example index near left cheek
            const rightCheekIndex = 454; // Example index near right cheek

            const leftCheek = face.keypoints[leftCheekIndex];
            const rightCheek = face.keypoints[rightCheekIndex];
            let xOffset;
            let yOffset;
            if (leftCheek && rightCheek) {
              // Calculate estimated ear positions
              if (!isTurningLeft && !isTurningRight) {
                xOffset = 30; // Distance from cheekbone (adjust as necessary)
                yOffset = 60;
              } else if (isTurningLeft) {
                xOffset = 30; // Distance from cheekbone (adjust as necessary)
                yOffset = 70;
              } else {
                xOffset = 30;
                yOffset = 70;
              }

              let Ear;
              if (isTurningLeft) {
                Ear = {
                  x: leftCheek.x - xOffset,
                  y: leftCheek.y + yOffset,
                };
              } else {
                Ear = {
                  x: rightCheek.x + xOffset,
                  y: rightCheek.y + yOffset,
                };
              }

              // Draw the image at the ear location
              if (AssetURL) {
                const earImage = new Image();
                earImage.src = AssetURL; // Set the source to the asset URL

                earImage.onload = () => {
                  // Set the desired earring size (2x bigger than 20px, so 40px width)
                  const earringWidth = 40; // Width of the earring (now 2x bigger)
                  const earringHeight = (earImage.height / earImage.width) * earringWidth; // Maintain aspect ratio

                  // Draw the image at the calculated ear position with the new size
                  ctx.drawImage(earImage, canvasRef.current.width - Ear.x - earringWidth / 2, Ear.y - earringHeight / 2, earringWidth, earringHeight);
                };
              }
            }
          });

          setStatus(`Face detected! Tracking ${faces.length} face(s)`);
        } else {
          setStatus("No faces detected - try moving within the view");
        }

        animationId = requestAnimationFrame(detectFaces);
      } catch (error) {
        console.error("Detection error:", error);
        setStatus(`Detection error: ${error.message}`);
      }
    };

    const init = async () => {
      const cameraReady = await initCamera();
      if (!cameraReady) return;

      const modelReady = await initModel();
      if (!modelReady) return;

      detectFaces(0);
    };

    init();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="relative">
      <div
        style={{
          position: "relative",
          width: "1280px",
          height: "960px",
          backgroundColor: "black",
        }}
      >
        <video
          ref={videoRef}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: "scaleX(-1)", // Mirror the video
          }}
          playsInline
        />
        <canvas
          ref={canvasRef}
          width={1280}
          height={960}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  );
};

export default EarringsAR;
