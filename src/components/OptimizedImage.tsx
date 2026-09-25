import React, { forwardRef, type ComponentPropsWithoutRef } from 'react';
import manifest from '../content/image-manifest.json';

type ImageAsset = { src: string; srcSet: string; width: number; height: number };
const assets: Record<string, ImageAsset> = manifest;

export function getOptimizedImageProps(src?: string) {
  return src && assets[src] ? assets[src] : { src };
}

export default forwardRef<HTMLImageElement, ComponentPropsWithoutRef<'img'>>(function OptimizedImage(
  { src, loading = 'lazy', decoding = 'async', sizes = '100vw', ...props }, ref,
) {
  return <img ref={ref} {...getOptimizedImageProps(src)} loading={loading} decoding={decoding} sizes={sizes} {...props} />;
});