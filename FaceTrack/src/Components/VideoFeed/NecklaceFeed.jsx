import React, { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";

const FaceTracking = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [status, setStatus] = useState("Starting...");
  const [fps, setFps] = useState(0);
  const [assetURL] = useState("https://res.cloudinary.com/dtauaal8p/image/upload/v1731731833/5AM/png-transparent-gold-colored-chunky-necklace-jewellery-gold-necklace-pendant-gold-necklace-queen-gemstone-leave-the-material-ring-thumbnail_ffc20x.png"); // Replace with your necklace image path
  const necklaceImageRef = useRef(null);

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
      if (!necklaceImageRef.current) return;
      const necklaceImage = necklaceImageRef.current;
    
      // Calculate the midpoint between the left and right jaw points
      const midPoint = {
        x: (leftJaw.x + rightJaw.x) / 2,
        y: (leftJaw.y + rightJaw.y) / 2,
      };
    
      // Determine size and position for the necklace
      let width = Math.abs(leftJaw.x - rightJaw.x); // Width of the necklace
      let height = width / 2; // Aspect ratio for the necklace (adjustable)
    
      // Scale width and height by 1.5x
      width *= 1.5;
      height *= 1.5;
    
      const neckY = chin.y + 30; // Offset from chin for positioning the necklace
    
      // Draw the necklace image at the calculated position
      ctx.drawImage(
        necklaceImage,
        canvasRef.current.width - midPoint.x - width / 2, // Mirrored x-coordinate for left-right symmetry
        neckY,
        width,
        height
      );
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
            const chinIndex = 152;
            const leftJawIndex = 234;
            const rightJawIndex = 454;

            const chin = face.keypoints[chinIndex];
            const leftJaw = face.keypoints[leftJawIndex];
            const rightJaw = face.keypoints[rightJawIndex];

            if (chin && leftJaw && rightJaw) {
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
            transform: "scaleX(-1)",
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
      <img
        ref={necklaceImageRef}
        src={assetURL}
        alt="Necklace"
        style={{ display: "none" }} // Hide the image element (used for drawing)
      />
    </div>
  );
};

export default FaceTracking;
