import React from 'react';
import { Image } from 'react-native';

interface Props {
  base64: string;
  width: number;
  height: number;
}

const Base64Image: React.FC<Props> = ({ base64, width, height }) => {
  return (
    <Image
      style={{ width, height }}
      source={{ uri: `data:image/jpeg;base64,${base64}` }}
    />
  );
};

export default Base64Image;
