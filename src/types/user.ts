// 用户相关类型定义
import { Location } from './common';

export interface User {
  id: string;
  phone: string;
  nickname?: string;
  avatar?: string;
  realName?: string;
  idCard?: string;
  address?: string;
  location?: Location;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile extends User {
  email?: string;
  birthday?: string;
  gender?: 'male' | 'female';
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface UpdateUserProfileData {
  nickname?: string;
  avatar?: string;
  realName?: string;
  email?: string;
  birthday?: string;
  gender?: 'male' | 'female';
  address?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
}
