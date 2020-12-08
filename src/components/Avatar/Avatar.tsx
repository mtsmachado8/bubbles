import Image from 'next/image';
import React from 'react';
import styles from './_avatar.module.css';

type Props = {
  size: number,
  src: string,
  alt: string,
  props?: ImageProps
};

const Avatar: React.FC<Props> = ({ src, size, alt, ...props }: Props) => {
  return (
    <div
      className={styles.avatar}
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        {...props}
      />
    </div>
  )
}

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