// 订单相关类型定义
import { User } from './user';
import { Worker } from './worker';
import { Location, FileUpload } from './common';

export type OrderStatus = 
  | 'pending'      // 待接单
  | 'accepted'     // 已接单
  | 'in_progress'  // 进行中
  | 'completed'    // 已完成
  | 'cancelled'    // 已取消
  | 'disputed';    // 有争议

export interface Order {
  id: string;
  userId: string;
  workerId?: string;
  title: string;
  description: string;
  category: string;
  skills: string[];
  location: Location;
  budget: {
    min: number;
    max: number;
  };
  urgency: 'low' | 'medium' | 'high';
  status: OrderStatus;
  images: string[];
  scheduledDate?: string;
  estimatedDuration?: number; // 预计工时（小时）
  actualDuration?: number;    // 实际工时（小时）
  finalPrice?: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderDetail extends Order {
  user: User;
  worker?: Worker;
  applications: WorkerApplication[];
  messages: OrderMessage[];
  timeline: OrderTimeline[];
  review?: OrderReview;
}

export interface WorkerApplication {
  id: string;
  workerId: string;
  worker: Worker;
  orderId: string;
  proposedPrice: number;
  estimatedDuration: number;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface OrderMessage {
  id: string;
  orderId: string;
  senderId: string;
  senderType: 'user' | 'worker';
  content: string;
  type: 'text' | 'image' | 'location';
  attachments?: string[];
  createdAt: string;
}

export interface OrderTimeline {
  id: string;
  orderId: string;
  action: string;
  description: string;
  performedBy: string;
  performedByType: 'user' | 'worker' | 'system';
  createdAt: string;
}

export interface OrderReview {
  id: string;
  orderId: string;
  reviewerId: string;
  reviewerType: 'user' | 'worker';
  targetId: string;
  targetType: 'user' | 'worker';
  rating: number;
  comment: string;
  createdAt: string;
}

export interface CreateOrderData {
  title: string;
  description: string;
  category: string;
  skills: string[];
  location: Location;
  budget: {
    min: number;
    max: number;
  };
  urgency: 'low' | 'medium' | 'high';
  images: FileUpload[];
  scheduledDate?: string;
  estimatedDuration?: number;
}