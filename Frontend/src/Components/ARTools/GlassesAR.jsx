import React, { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";

const GlassesAR = ({ Asset }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [status, setStatus] = useState("Starting...");
  const [fps, setFps] = useState(0);
  const [AssetURL, setAssetURL] = useState(Asset);

  useEffect(() => {
    console.log(Asset);
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

          // Set video properties explicitly
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
        // Enable WebGL backend
        await tf.setBackend("webgl");
        console.log("Using backend:", tf.getBackend());

        setStatus("Loading face detection model...");
        model = await faceLandmarksDetection.createDetector(
          faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
          {
            runtime: "tfjs",
            refineLandmarks: true,
            maxFaces: 1,
            // Adjust model parameters for better detection
            scoreThreshold: 0.5,
            iouThreshold: 0.3,
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
      if (!model || !videoRef.current || !canvasRef.current || !AssetURL) return;

      try {
        updateFPS(timestamp);

        // Create tensor from video element
        const faces = await model.estimateFaces(videoRef.current, {
          flipHorizontal: false,
          staticImageMode: false
        });

        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        // Mirror the video
        ctx.save();
        ctx.scale(-1, 1);
        ctx.translate(-canvasRef.current.width, 0);
        ctx.drawImage(videoRef.current, 0, 0);
        ctx.restore();

        // Draw debug info
        ctx.fillStyle = "white";
        ctx.font = "16px Arial";
        ctx.fillText(`FPS: ${fps}`, 10, 20);
        ctx.fillText(`Faces: ${faces.length}`, 10, 40);

        if (faces.length > 0) {
          faces.forEach((face) => {
            // Define indices for glasses rendering keypoints
            const leftEyeIndex = 33;
            const rightEyeIndex = 263;
            const noseBridgeIndex = 1;

            // Extract keypoints for glasses placement
            const leftEye = face.keypoints[leftEyeIndex];
            const rightEye = face.keypoints[rightEyeIndex];
            const noseBridge = face.keypoints[noseBridgeIndex];

            // Calculate the position and scaling for the glasses
            if (leftEye && rightEye && noseBridge) {
              // Calculate width based on distance between eyes
              const glassesWidth = Math.abs(rightEye.x - leftEye.x) * 2;

              // Adjust the aspect ratio of the glasses (maintaining a natural look)
              const glassesHeight = glassesWidth * 0.5; // Set this ratio based on your image's aspect ratio

              const centerX = (leftEye.x + rightEye.x) / 2;
              const centerY = (leftEye.y + rightEye.y) / 2;

              // Load and draw the PNG asset
              const image = new Image();
              image.src = AssetURL;
              image.onload = () => {
                ctx.save();
                ctx.translate(canvasRef.current.width - centerX, centerY);
                ctx.scale(-1, 1); // Optional: flip horizontally to match mirroring
                ctx.drawImage(
                  image,
                  -glassesWidth / 2,
                  -glassesHeight / 2,
                  glassesWidth,
                  glassesHeight
                );
                ctx.restore();
              };
            }

            setStatus(`Face detected! Tracking ${faces.length} face(s)`);
          });
        } else {
          setStatus("No faces detected - try moving within the green rectangle");
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

export default GlassesAR;
