# 项目结构

## 根目录
- `App.tsx` - 应用主入口文件
- `index.js` - React Native 应用注册
- `global.css` - 全局 Tailwind CSS 样式
- `src/` - 主要源代码目录

## 源码组织结构 (`src/`)

### 组件目录 (`src/components/`)
- `ui/` - 可复用 UI 组件 (Button, Card, Input, Modal, NavigationBar, TabBar)
- `common/` - 应用通用组件
- `forms/` - 表单专用组件
- `maps/` - 地图相关组件
- `index.ts` - 组件导出文件

### 页面目录 (`src/screens/`)
- `auth/` - 认证相关页面
  - `auth-entry` - 登录注册入口
  - `phone-auth` - 手机号验证
  - `sms-verification` - 短信验证
  - `user-type-selection` - 用户类型选择
- `user/` - 用户端页面
  - `home` - 装修首页（地图发单）
  - `nearby` - 附近装修工
  - `profile` - 个人中心
- `worker/` - 装修工端页面
  - `home` - 地图首页（接单）
  - `orders` - 订单管理
  - `profile` - 个人中心

### 导航目录 (`src/navigation/`)
- `RootNavigator.tsx` - 主导航容器
- `AuthNavigator.tsx` - 认证流程导航
- `UserTabNavigator.tsx` & `UserStackNavigator.tsx` - 用户端导航流程
- `WorkerTabNavigator.tsx` & `WorkerStackNavigator.tsx` - 装修工端导航流程
- `types.ts` - 导航类型定义
- `hooks.ts` - 导航钩子
- `navigationUtils.ts` - 导航工具函数

### 状态管理 (`src/store/`)
- `index.ts` - Store 配置
- `slices/` - Redux 切片 (auth, user, worker, order)
- `api/` - RTK Query API 定义 (baseApi, authApi, userApi, workerApi, orderApi)

### 服务目录 (`src/services/`)
- `api/` - HTTP 客户端和错误处理
- `storage/` - 本地存储工具
- `location/` - 位置服务

### 类型定义 (`src/types/`)
- `auth.ts` - 认证相关类型
- `user.ts` - 用户相关类型
- `worker.ts` - 装修工相关类型
- `order.ts` - 订单/服务类型
- `common.ts` - 通用类型

### 样式目录 (`src/styles/`)
- `colors.ts` - 颜色定义
- `typography.ts` - 字体和文本样式
- `spacing.ts` - 间距常量
- `index.ts` - 样式导出

### 常量目录 (`src/constants/`)
- `api.ts` - API 端点和配置
- `app.ts` - 应用级常量
- `categories.ts` - 服务分类
- `storage.ts` - 存储键名

### 资源目录 (`src/assets/`)
- `fonts/` - 自定义字体
- `icons/` - 图标资源
- `images/` - 图片资源

### 工具目录 (`src/utils/`)
- 辅助函数和工具

### 钩子目录 (`src/hooks/`)
- `redux.ts` - 类型化的 Redux 钩子
- 自定义 React 钩子

## 平台特定代码
- `android/` - Android 原生代码和配置
- `ios/` - iOS 原生代码和配置

## 文档目录 (`doc/`)
- `development-guide.md` - 开发设置和工作流程
- `ui/` - UI 设计稿和设计文件
  - 包含完整的 HTML 原型，严格按照 iOS 设计规范
  - 针对 iPhone 16 Pro 优化的高保真界面
  - 使用 Tailwind CSS 和 FontAwesome 图标
- `issues/` - 已知问题和解决方案
  - NativeWind 样式不生效问题
  - SafeAreaProvider 闪退问题
  - React Navigation 依赖问题

## 架构模式

### 双端界面设计
- 用户端和装修工端有独立的导航流程
- 共享组件支持基于角色的定制
- 角色特定的页面和功能

### 状态管理
- Redux Toolkit 用于全局状态
- React Query 用于服务端状态和缓存
- 本地存储用于数据持久化

### 组件组织
- UI 组件通用且可复用
- 页面组件功能特定
- 表现层和逻辑层清晰分离

### 导入约定
- 所有内部导入使用路径别名 (`@/`)
- 导入分组：外部库、内部模块、类型
- 通过 index 文件导出组件

## 设计系统集成
- 严格遵循 iOS Human Interface Guidelines
- 使用 iOS 原生色彩系统 (#007AFF, #34C759, #FF3B30)
- SF Pro 字体系列
- 支持 iPhone 16 Pro 的安全区域和圆角设计
- 44px 最小触摸目标尺寸

## 开发注意事项
- 添加原生依赖后必须运行 `pod install`
- NativeWind 需要在 App.tsx 中导入 global.css
- 使用 TypeScript 路径别名提高代码可读性
- 遵循组件导出规范，通过 index 文件统一导出