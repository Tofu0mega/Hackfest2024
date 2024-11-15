import React from 'react';
import { ZapparCanvas, ZapparCamera, FaceTracker } from '@zappar/zappar-react-three-fiber';
import { Sphere } from '@react-three/drei';

const EyeHighlighter = () => {
  return (
    <ZapparCanvas>
      {/* Camera for the AR environment */}
      <ZapparCamera />
      {/* Face Tracker component */}
      <FaceTracker>
        {/* Children of FaceTracker will move relative to the tracked face */}
        {/* Highlight left eye (adjust position based on actual requirements) */}
        <Sphere args={[0.02, 16, 16]} position={[0.03, 0.08, 0]} material-color="red" />
        {/* Highlight right eye (adjust position based on actual requirements) */}
        <Sphere args={[0.02, 16, 16]} position={[-0.03, 0.08, 0]} material-color="blue" />
      </FaceTracker>
    </ZapparCanvas>
  );
};

export default EyeHighlighter;
