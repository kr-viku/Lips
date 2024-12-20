import React, { useState } from 'react';
import { Layout, Typography, Steps, message } from 'antd';
import { Camera, Palette, CreditCard } from 'lucide-react';
import styled from 'styled-components';
import { ImageCapture } from './components/ImageCapture';
import { ColorAnalysis } from './components/ColorAnalysis';
import { ImagePreview } from './components/ImagePreview';
import { PaymentModal } from './components/PaymentModal';
import { LipColor } from './types';
import { detectDominantLipColor } from './utils/colorDetection';
import { transformLipColor } from './utils/colorTransformation';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const StyledContent = styled(Layout.Content)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const StepContainer = styled.div`
  margin-top: 2rem;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const { Title } = Typography;

const App = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [image, setImage] = useState<string | null>(null);
  const [detectedColor, setDetectedColor] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<LipColor | null>(null);
  const [transformedImage, setTransformedImage] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageCapture = async (imageData: string) => {
    setIsProcessing(true);
    setImage(imageData);
    
    try {
      const color = await detectDominantLipColor(imageData);
      setDetectedColor(color);
      setCurrentStep(1);
    } catch (error) {
      message.error('Error detecting lip color. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleColorSelect = async (color: LipColor) => {
    setIsProcessing(true);
    setSelectedColor(color);
    
    try {
      if (image) {
        const transformed = await transformLipColor(image, color.hexCode);
        setTransformedImage(transformed);
      }
    } catch (error) {
      message.error('Error transforming image. Please try again.');
    } finally {
      setIsProcessing(false);
      setShowPaymentModal(true);
    }
  };

  const handlePaymentSuccess = () => {
    message.success('Payment successful! Your transformed image is ready.');
    setShowPaymentModal(false);
    setCurrentStep(2);
  };

  return (
    <AppContainer>
      <StyledContent>
        <Title level={2} style={{ textAlign: 'center' }}>
          Lip Color Analyzer & Transformer
        </Title>

        <Steps
          current={currentStep}
          items={[
            {
              title: 'Capture',
              icon: <Camera size={20} />,
            },
            {
              title: 'Analyze',
              icon: <Palette size={20} />,
            },
            {
              title: 'Transform',
              icon: <CreditCard size={20} />,
            },
          ]}
        />

        <StepContainer>
          {currentStep === 0 && (
            <ImageCapture 
              onImageCapture={handleImageCapture}
              isProcessing={isProcessing}
            />
          )}

          {image && (
            <>
              <ImagePreview
                originalImage={image}
                transformedImage={transformedImage}
              />

              {detectedColor && currentStep >= 1 && (
                <ColorAnalysis
                  originalColor={detectedColor}
                  suggestedColors={[]} // You'll need to implement color suggestions
                  onColorSelect={handleColorSelect}
                  isProcessing={isProcessing}
                />
              )}
            </>
          )}

          <PaymentModal
            visible={showPaymentModal}
            selectedColor={selectedColor}
            onCancel={() => setShowPaymentModal(false)}
            onConfirm={handlePaymentSuccess}
          />
        </StepContainer>
      </StyledContent>
    </AppContainer>
  );
};

export default App;