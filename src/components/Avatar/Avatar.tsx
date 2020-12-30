import Image from 'next/image';
import React from 'react';

type Props = {
  size: number,
  src: string,
  alt: string,
  key: string,
  props?: ImageProps
};

const Avatar: React.FC<Props> = ({ src, size, alt, key, ...props }: Props) => {
  return (
    <div>
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        key={key}
        {...props}
      />
    </div>
  );
};

type ImageProps = Omit<JSX.IntrinsicElements['img'], 'src' | 'srcSet' | 'ref' | 'width' | 'height' | 'loading'> & {
  src: string;
  quality?: number | string;
  priority?: boolean;
  loading?: LoadingValue;
  unoptimized?: boolean;
} & ({
  width: number | string;
  height: number | string;
  unsized?: false;
} | {
  width?: number | string;
  height?: number | string;
  unsized: true;
});

declare const VALID_LOADING_VALUES: readonly ["lazy", "eager", undefined];
declare type LoadingValue = typeof VALID_LOADING_VALUES[number];

export default Avatar