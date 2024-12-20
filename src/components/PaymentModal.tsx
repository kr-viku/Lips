import React from 'react';
import { Modal, Button, Typography } from 'antd';
import { LipColor } from '../types';
import styled from 'styled-components';

const { Text, Title } = Typography;

const ColorPreview = styled.div<{ color: string }>`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin: 1rem auto;
  border: 3px solid #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

interface PaymentModalProps {
  visible: boolean;
  selectedColor: LipColor | null;
  onCancel: () => void;
  onConfirm: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  visible,
  selectedColor,
  onCancel,
  onConfirm,
}) => {
  if (!selectedColor) return null;

  return (
    <Modal
      title="Complete Your Purchase"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="purchase" type="primary" onClick={onConfirm}>
          Purchase (${selectedColor.price.toFixed(2)})
        </Button>,
      ]}
    >
      <div style={{ textAlign: 'center' }}>
        <ColorPreview color={selectedColor.hexCode} />
        <Title level={4}>{selectedColor.name}</Title>
        <Text>{selectedColor.description}</Text>
      </div>
    </Modal>
  );
};