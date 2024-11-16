import React, { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";

const FaceTracking = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [status, setStatus] = useState("Starting...");
  const [fps, setFps] = useState(0);
  const [AssetURL, setAssetURL] = useState(
    'https://w7.pngwing.com/pngs/498/616/png-transparent-gold-colored-chunky-necklace-jewellery-gold-necklace-pendant-gold-necklace-queen-gemstone-leave-the-material-ring-thumbnail.png'
  ); // Necklace Image URL

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

    const drawNecklace = (ctx, chin, leftJaw, rightJaw) => {
      // Calculate the midpoint of the jawline
      const midPoint = {
        x: (leftJaw.x + rightJaw.x) / 2,
        y: (leftJaw.y + rightJaw.y) / 2,
      };

      // Calculate the distance between the jaw points (width of the neck)
      const neckWidth = Math.abs(leftJaw.x - rightJaw.x);
      const scale = neckWidth / 200; // Scale based on neck width, adjust the denominator for better size

      // Adjust the vertical offset to position the necklace closer to the neck
      const neckY = chin.y + 60; // Lower value moves the necklace closer

      const image = new Image();
      image.src = AssetURL;

      // Wait for the image to load
      image.onload = () => {
        // Draw the necklace at the correct position, scaled and rotated
        ctx.save();
        
        // Translate the context to the midpoint of the jawline
        ctx.translate(midPoint.x, neckY);
        
        // Rotate the necklace based on the angle between the left and right jaw
        const angle = Math.atan2(rightJaw.y - leftJaw.y, rightJaw.x - leftJaw.x);
        ctx.rotate(angle); 

        // Apply scaling based on the neck width
        ctx.scale(scale, scale);

        // Draw the necklace, centered on the midpoint
        ctx.drawImage(image, -image.width / 2, -image.height / 2);

        // Restore the context to its original state
        ctx.restore();
      };
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
        ctx.scale(-1, 1); // Flip horizontally to mirror video
        ctx.translate(-canvasRef.current.width, 0);
        ctx.drawImage(videoRef.current, 0, 0);
        ctx.restore();

        ctx.fillStyle = "white";
        ctx.font = "16px Arial";
        ctx.fillText(`FPS: ${fps}`, 10, 20);
        ctx.fillText(`Faces: ${faces.length}`, 10, 40);

        if (faces.length > 0) {
          faces.forEach((face) => {
            const chinIndex = 152;
            const leftJawIndex = 234;
            const rightJawIndex = 454;

            const chin = face.keypoints[chinIndex];
            const leftJaw = face.keypoints[leftJawIndex];
            const rightJaw = face.keypoints[rightJawIndex];

            if (chin && leftJaw && rightJaw) {
              // Draw the necklace
              drawNecklace(ctx, chin, leftJaw, rightJaw);
            }

            setStatus(`Face detected! Tracking ${faces.length} face(s)`);
          });
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
  }, [AssetURL]);

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
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          color: "white",
          fontSize: "18px",
        }}
      >
        <p>{status}</p>
      </div>
    </div>
  );
};

export default FaceTracking;

