# 技术栈

## 核心框架
- **React Native 0.80.1** - 跨平台移动开发框架
- **React 19.1.0** - UI 库
- **TypeScript 5.0.4** - 类型安全的 JavaScript

## 状态管理与数据
- **Redux Toolkit 2.8.2** - 全局状态管理
- **React Query (TanStack) 5.83.0** - 服务端状态管理和缓存
- **Axios 1.11.0** - HTTP 客户端

## 导航与 UI
- **React Navigation 7.x** - 导航库（堆栈和标签导航）
- **NativeWind 4.1.23** - React Native 的 Tailwind CSS
- **React Native Vector Icons 10.3.0** - 图标库
- **React Native Reanimated 3.19.0** - 动画库

## 原生功能
- **React Native Maps 1.24.10** - 地图集成
- **React Native Image Picker 8.2.1** - 相机和相册访问
- **AsyncStorage 2.2.0** - 本地数据持久化
- **React Native Safe Area Context 5.4.0** - 安全区域处理

## 开发工具
- **ESLint** - 代码检查
- **Prettier** - 代码格式化
- **Jest** - 测试框架
- **Metro** - JavaScript 打包工具
- **Babel** - JavaScript 转译器

## 构建系统与命令

### 开发命令
```bash
# 启动 Metro 打包服务
npm start

# 运行 iOS 版本
npm run ios

# 运行 Android 版本
npm run android

# 运行测试
npm test

# 代码检查
npm run lint
```

### iOS 环境配置
```bash
# 安装 Ruby 依赖
bundle install

# 安装 iOS 依赖
cd ios && bundle exec pod install
```

### 平台要求
- **Node.js** >= 18
- **iOS**: Xcode 14+, macOS, CocoaPods
- **Android**: Android Studio, JDK 11+, Android SDK API 33+

## 路径别名配置
项目使用 TypeScript 路径映射，以 `@/` 为前缀：
- `@/components` → `./src/components`
- `@/screens` → `./src/screens`
- `@/navigation` → `./src/navigation`
- `@/store` → `./src/store`
- `@/services` → `./src/services`
- `@/hooks` → `./src/hooks`
- `@/utils` → `./src/utils`
- `@/types` → `./src/types`
- `@/constants` → `./src/constants`
- `@/assets` → `./src/assets`
- `@/styles` → `./src/styles`

## 重要配置注意事项

### NativeWind 配置
⚠️ **关键**: 必须在 `App.tsx` 中导入 `./global.css`，否则所有样式都不会生效
```tsx
import './global.css'; // 必须添加这行
```

### 原生依赖管理
- 添加包含原生代码的新依赖后，必须运行 `pod install`
- 修改原生配置后，需要重新构建项目
- 遇到闪退问题时，首先检查原生依赖是否正确链接

### 常见问题解决
- **Metro 缓存问题**: `npm start --reset-cache`
- **Node modules 问题**: `rm -rf node_modules && npm install`
- **iOS Pod 问题**: `cd ios && pod install --repo-update`
- **Android Gradle 问题**: `cd android && ./gradlew clean`

## 设计系统配置
- **主色调**: #007AFF (iOS 蓝)
- **成功色**: #34C759 (绿色)
- **警告色**: #FF3B30 (红色)
- **中性色**: #8E8E93 (灰色)
- **字体**: SF Pro Display/Text, -apple-system
- **设备适配**: iPhone 16 Pro (393×852 points)