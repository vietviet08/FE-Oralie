import Image from "next/image";
import React from "react";

interface LogoProps {
  className?: string;
  imageUrl: string;
  altText?: string;
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = ({
  className,
  imageUrl,
  altText = "oralie",
  width = 100,
  height = 100,
}) => {
  return (
    <Image
      className={className}
      src={imageUrl}
      alt={altText}
      width={width}
      height={height}
    />
  );
};

export default Logo;
