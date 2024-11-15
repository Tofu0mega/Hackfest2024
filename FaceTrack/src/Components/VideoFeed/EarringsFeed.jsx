import React, { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";

const FaceTracking = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [status, setStatus] = useState("Starting...");
  const [fps, setFps] = useState(0);
  const [AssetURL, setAssetURL] = useState(
    'https://res.cloudinary.com/dtauaal8p/image/upload/v1731693799/5AM/png-transparent-gold-love-earring-love-knot-stud-earrings-in-18k-gold-jewellery-pendant-diamond-colored-gold-metal-thumbnail_mhwevi.png'
  );

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
    
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
        // Draw normal video (on first canvas)
        ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    
        // Draw debug info
        ctx.fillStyle = 'white';
        ctx.font = '16px Arial';
        ctx.fillText(`FPS: ${fps}`, 10, 20);
        ctx.fillText(`Faces: ${faces.length}`, 10, 40);
    
        if (faces.length > 0) {
          faces.forEach(face => {
            // Define indices for ear keypoints
            const leftEarIndex = 234; // Left ear index from the MediaPipe face mesh model
            const rightEarIndex = 454; // Right ear index from the MediaPipe face mesh model

            // Extract keypoints for ears
            const leftEar = face.keypoints[leftEarIndex];
            const rightEar = face.keypoints[rightEarIndex];

            console.log("Left Ear Position: ", leftEar);  // Debugging ear positions
            console.log("Right Ear Position: ", rightEar);  // Debugging ear positions
    
            // Calculate earring dimensions based on detected ear positions
            const earringWidth = 500; // Adjust this as per desired earring size
            const earringHeight = 500; // Adjust this as per desired earring size

            // Ensure image URL is correctly loaded
            const image = new Image();
            image.src = AssetURL;
            image.onload = () => {
              console.log("Image loaded successfully!");  // Debugging image load

              // Check if the ear positions are valid before drawing
              if (leftEar && rightEar) {
                // Draw earring on the left ear
                ctx.save();
                ctx.translate(leftEar.x * canvasRef.current.width - earringWidth * canvasRef.current.width / 2, leftEar.y * canvasRef.current.height - earringHeight * canvasRef.current.height / 2);
                ctx.drawImage(image, 0, 0, earringWidth * canvasRef.current.width, earringHeight * canvasRef.current.height);
                ctx.restore();

                // Draw earring on the right ear
                ctx.save();
                ctx.translate(rightEar.x * canvasRef.current.width - earringWidth * canvasRef.current.width / 2, rightEar.y * canvasRef.current.height - earringHeight * canvasRef.current.height / 2);
                ctx.drawImage(image, 0, 0, earringWidth * canvasRef.current.width, earringHeight * canvasRef.current.height);
                ctx.restore();
              }
            };
            image.onerror = () => {
              console.error("Image failed to load"); // Error handling for image loading
            };

            setStatus(`Face detected! Tracking ${faces.length} face(s)`);
          });
        } else {
          setStatus('No faces detected - try moving within the frame');
        }
    
        animationId = requestAnimationFrame(detectFaces);
      } catch (error) {
        console.error('Detection error:', error);
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

export default FaceTracking;


