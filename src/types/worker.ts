// 工人相关类型定义
import { Location } from './common';

export interface Worker {
  id: string;
  phone: string;
  nickname?: string;
  avatar?: string;
  realName: string;
  idCard: string;
  skills: string[];
  experience: number; // 工作年限
  rating: number;
  reviewCount: number;
  location?: Location;
  workRadius: number; // 工作半径（公里）
  isVerified: boolean;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WorkerProfile extends Worker {
  email?: string;
  birthday?: string;
  gender?: 'male' | 'female';
  description?: string;
  certifications: WorkerCertification[];
  workHistory: WorkHistory[];
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface WorkerCertification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  certificateUrl: string;
}

export interface WorkHistory {
  id: string;
  projectName: string;
  description: string;
  startDate: string;
  endDate: string;
  clientRating?: number;
  clientReview?: string;
}

export interface UpdateWorkerProfileData {
  nickname?: string;
  avatar?: string;
  realName?: string;
  email?: string;
  birthday?: string;
  gender?: 'male' | 'female';
  skills?: string[];
  experience?: number;
  workRadius?: number;
  description?: string;
  isAvailable?: boolean;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
}