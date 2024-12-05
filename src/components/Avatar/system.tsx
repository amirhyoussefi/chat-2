import { FC } from 'react';

interface SystemAvatarProps {
  role?: 'DALL-E' | 'Midjourney' | 'Replicate';
}

const SystemAvatar: FC<
  SystemAvatarProps & React.ImgHTMLAttributes<HTMLImageElement>
> = ({ role, ...props }) => {
  let src = '/chat-ai-line-32.png';
  if (role === 'Midjourney') {
    src = '/midjourney.webp';
  } else if (role === 'Replicate') {
    src = '/replicate.svg';
  }
  return <img width={24} height={24} {...props} src={src} />;
};

export default SystemAvatar;
