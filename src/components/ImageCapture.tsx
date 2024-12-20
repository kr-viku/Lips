import React, { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Button, Space, Spin } from 'antd';
import { Camera, Upload } from 'lucide-react';
import styled from 'styled-components';

// ... (previous styled components)

interface ImageCaptureProps {
  onImageCapture: (imageData: string) => void;
  isProcessing: boolean;
}

export const ImageCapture: React.FC<ImageCaptureProps> = ({ 
  onImageCapture,
  isProcessing 
}) => {
  // ... (previous state and handlers)

  return (
    <CaptureContainer>
      <Spin spinning={isProcessing} tip="Processing image...">
        {/* ... (rest of the component) */}
      </Spin>
    </CaptureContainer>
  );
};