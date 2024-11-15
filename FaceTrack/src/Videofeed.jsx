import React, { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';

const FaceTracking = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [status, setStatus] = useState('Starting...');
  const [fps, setFps] = useState(0);

  useEffect(() => {
    let model = null;
    let animationId = null;
    let frameCount = 0;
    let lastTimestamp = 0;

    const initCamera = async () => {
      try {
        setStatus('Requesting camera access...');
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: 'user',
            frameRate: { ideal: 30 }
          },
          audio: false
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          
          await new Promise((resolve) => {
            videoRef.current.onloadedmetadata = () => {
              resolve();
            };
          });

          // Set video properties explicitly
          videoRef.current.width = 640;
          videoRef.current.height = 480;
          
          await videoRef.current.play();
          setStatus('Camera ready');
          return true;
        }
        return false;
      } catch (error) {
        console.error('Camera error:', error);
        setStatus(`Camera error: ${error.message}`);
        return false;
      }
    };

    const initModel = async () => {
      try {
        setStatus('Loading TensorFlow.js...');
        await tf.ready();
        // Enable WebGL backend
        await tf.setBackend('webgl');
        console.log('Using backend:', tf.getBackend());

        setStatus('Loading face detection model...');
        model = await faceLandmarksDetection.createDetector(
          faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
          {
            runtime: 'tfjs',
            refineLandmarks: false,
            maxFaces: 1,
            // Adjust model parameters for better detection
            scoreThreshold: 0.5,
            iouThreshold: 0.3
          }
        );
        setStatus('Model loaded');
        return true;
      } catch (error) {
        console.error('Model loading error:', error);
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

        // Create tensor from video element
        const faces = await model.estimateFaces(videoRef.current, {
          flipHorizontal: false,
          staticImageMode: false
        });

        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        // Mirror the video
        ctx.save();
        ctx.scale(-1, 1);
        ctx.translate(-canvasRef.current.width, 0);
        ctx.drawImage(videoRef.current, 0, 0);
        ctx.restore();

        // Draw debug info
        ctx.fillStyle = 'white';
        ctx.font = '16px Arial';
        ctx.fillText(`FPS: ${fps}`, 10, 20);
        ctx.fillText(`Faces: ${faces.length}`, 10, 40);

        // Guide rectangle
        ctx.strokeStyle = 'lime';
        ctx.lineWidth = 2;
        ctx.strokeRect(160, 120, 320, 240);

        if (faces.length > 0) {
          faces.forEach(face => {
            // Draw bounding box
            const box = face.box;
            ctx.strokeStyle = '#00ff00';
            ctx.lineWidth = 2;
            ctx.strokeRect(
              canvasRef.current.width - box.xMin - box.width,
              box.yMin,
              box.width,
              box.height
            );

            // Draw landmarks with larger, more visible points
            face.keypoints.forEach(point => {
              ctx.beginPath();
              ctx.arc(
                canvasRef.current.width - point.x,
                point.y,
                4,
                0,
                2 * Math.PI
              );
              ctx.fillStyle = '#ff0000';
              ctx.fill();
            });
          });

          setStatus(`Face detected! Tracking ${faces.length} face(s)`);
        } else {
          setStatus('No faces detected - try moving within the green rectangle');
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
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="relative">
      <div style={{ position: 'relative', width: '640px', height: '480px', backgroundColor: 'black' }}>
        <video
          ref={videoRef}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: 'scaleX(-1)' // Mirror the video
          }}
          playsInline
        />
        <canvas
          ref={canvasRef}
          width={640}
          height={480}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>
      <div className="mt-4 p-2 bg-gray-100 rounded">
        <p><strong>Status:</strong> {status}</p>
        <p><strong>FPS:</strong> {fps}</p>
        <p><strong>Tips:</strong></p>
        <ul className="list-disc ml-5">
          <li>Position your face within the green rectangle</li>
          <li>Ensure good lighting</li>
          <li>Keep your face relatively still at first</li>
          <li>Try to be about arm's length from the camera</li>
        </ul>
      </div>
    </div>
  );
};

export default FaceTracking;