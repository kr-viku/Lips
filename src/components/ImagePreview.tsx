import React from 'react';
import styled from 'styled-components';
import { Card } from 'antd';

const PreviewContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImageCard = styled(Card)`
  flex: 1;
  min-width: 300px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

interface ImagePreviewProps {
  originalImage: string;
  transformedImage?: string;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  originalImage,
  transformedImage,
}) => {
  return (
    <PreviewContainer>
      <ImageCard title="Original Image">
        <StyledImage src={originalImage} alt="Original" />
      </ImageCard>
      {transformedImage && (
        <ImageCard title="Preview with Selected Color">
          <StyledImage src={transformedImage} alt="Transformed" />
        </ImageCard>
      )}
    </PreviewContainer>
  );
};