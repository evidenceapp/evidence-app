import { RefObject } from 'react';

export interface INavLink {
  name: string;
  href: string;
}

export interface IHeroSection {
  name: string;
  slogan: string;
  buttonText: string;
  backgroundImage?: string;
  backgroundColor?: string;
}

export interface IUser {
  id: string;
  username: string;
  role: string;
  instagramUsername?: string;
  instagramProfilePictureUrl?: string;
  instagramAccountType?: string;
}

export interface IPost {
  id: string;
  content: string;
  createdAt: string;
}

export interface IPostSection extends IPost {
  author: {
    username: string;
    instagramProfilePictureUrl: string;
    instagramUsername: string;
  };
}

export interface IUserPostsProps {
  userId: string;
}

export interface ILoginForm {
  username: string;
  password: string;
}

export interface IFormData {
  name: string;
  email: string;
  phone: string;
  consultationDate: Date | null;
  painArea: string;
  description: string;
}

export interface ITeamCardProps {
  name: string;
  description: string;
  instagram: string;
  image: string;
}

export interface ICard {
  title: string;
  description: string;
  image: string;
  isLast: boolean;
  lastItemRef: RefObject<HTMLDivElement | null>;
}
