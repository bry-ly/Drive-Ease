"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface CarImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
}

export function CarImage({
  src,
  alt,
  fill = false,
  className = "",
  priority = false,
  width,
  height,
}: CarImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  // Check if image loads successfully
  useEffect(() => {
    if (!imgSrc || imgSrc === "/placeholder.svg") return;

    const img = new window.Image();
    img.onload = () => {
      setHasError(false);
    };
    img.onerror = () => {
      setHasError(true);
      setImgSrc("/placeholder.svg");
    };
    img.src = imgSrc;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imgSrc]);

  const finalSrc = hasError ? "/placeholder.svg" : imgSrc;
  const isPlaceholder = finalSrc === "/placeholder.svg";

  const imageProps = {
    src: finalSrc,
    alt,
    className,
    priority: isPlaceholder ? false : priority,
    unoptimized: isPlaceholder, // Don't optimize placeholder
  };

  if (fill) {
    return (
      <Image
        {...imageProps}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    );
  }

  return (
    <Image
      {...imageProps}
      width={width || 1200}
      height={height || 800}
    />
  );
}

