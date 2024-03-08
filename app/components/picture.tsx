import Image from 'next/image';
import React from 'react';

interface PictureProps {
  src: string;
  alt: string;
}

const Picture: React.FC<PictureProps> = ({ src, alt }) => {
  return (
    <div className="flex-shrink-0">
      <Image src={src} alt={alt} width={100} height={100} objectFit="cover" className="rounded-lg" />
    </div>
  );
};

export default Picture;