# RenovEasy 开发构建部署指南

## 项目概述
RenovEasy 是一个基于 React Native 0.80.1 的移动应用项目，支持 iOS 和 Android 平台。

## 环境要求

### 通用要求
- Node.js >= 18
- npm 或 yarn
- Git

### iOS 开发要求
- macOS 系统
- Xcode 14+ (推荐最新版本)
- iOS Simulator
- CocoaPods
- Ruby (用于 CocoaPods)

### Android 开发要求
- Android Studio
- Android SDK (API Level 33+)
- Android Emulator 或真机
- Java Development Kit (JDK) 11+

## 初始化项目

### 1. 克隆项目并安装依赖
```bash
git clone <your-repo-url>
cd RenovEasy
npm install
```

### 2. iOS 初始化
```bash
# 安装 Ruby 依赖管理器
bundle install

# 安装 iOS 依赖
cd ios
bundle exec pod install
cd ..
```

### 3. Android 初始化
确保 Android Studio 已安装并配置好 Android SDK。

## 开发环境启动

### 启动 Metro 服务器
在项目根目录下运行：
```bash
npm start
# 或者
yarn start
```

Metro 是 React Native 的 JavaScript 打包工具，必须保持运行状态。

## iOS 开发

### 方式一：命令行启动
```bash
npm run ios
# 或者
yarn ios
```

### 方式二：Xcode 启动
1. 打开 `ios/RenovEasy.xcworkspace` (注意是 .xcworkspace 不是 .xcodeproj)
2. 选择目标设备或模拟器
3. 点击运行按钮 (⌘+R)

### iOS 模拟器操作
- **重新加载**: 按 `R` 键
- **开发者菜单**: `⌘+D`
- **调试器**: `⌘+D` → Debug
- **性能监控**: `⌘+D` → Perf Monitor

## Android 开发

### 方式一：命令行启动
```bash
npm run android
# 或者
yarn android
```

### 方式二：Android Studio 启动
1. 打开 Android Studio
2. 选择 "Open an existing Android Studio project"
3. 选择项目中的 `android` 文件夹
4. 等待 Gradle 同步完成
5. 点击运行按钮

### Android 模拟器操作
- **重新加载**: 按 `R` 键两次，或 `Ctrl+M` (Windows/Linux) / `⌘+M` (macOS) 打开开发者菜单选择 Reload
- **开发者菜单**: `Ctrl+M` (Windows/Linux) / `⌘+M` (macOS)
- **调试器**: 开发者菜单 → Debug
- **性能监控**: 开发者菜单 → Perf Monitor

## 实时开发和热重载

### Fast Refresh (推荐)
React Native 默认启用 Fast Refresh，当你保存文件时会自动更新：

1. 修改 `App.tsx` 或其他组件文件
2. 保存文件 (`⌘+S` 或 `Ctrl+S`)
3. 应用会自动更新，无需手动刷新

### 手动重载
如果需要完全重置应用状态：
- **iOS**: 在模拟器中按 `R`
- **Android**: 按 `R` 两次或通过开发者菜单选择 Reload

### 开发者菜单功能
- **Reload**: 重新加载应用
- **Debug**: 打开 Chrome 调试器
- **Element Inspector**: 检查 UI 元素
- **Performance Monitor**: 性能监控
- **Hot Reloading**: 热重载开关 (已被 Fast Refresh 替代)

## 调试技巧

### 1. Chrome 调试器
1. 打开开发者菜单
2. 选择 "Debug"
3. 在 Chrome 中打开 `http://localhost:8081/debugger-ui/`
4. 打开开发者工具进行调试

### 2. React DevTools
```bash
npm install -g react-devtools
react-devtools
```

### 3. 日志查看
- **iOS**: Xcode → Window → Devices and Simulators → 选择设备 → Open Console
- **Android**: `adb logcat` 或 Android Studio 的 Logcat

## 常见问题解决

### iOS 问题
1. **Pod install 失败**:
   ```bash
   cd ios
   bundle exec pod install --repo-update
   ```

2. **模拟器启动失败**:
   ```bash
   npx react-native run-ios --simulator="iPhone 14"
   ```

3. **清理构建缓存**:
   ```bash
   cd ios
   xcodebuild clean
   ```

### Android 问题
1. **Gradle 同步失败**:
   ```bash
   cd android
   ./gradlew clean
   ```

2. **端口占用**:
   ```bash
   npx react-native start --reset-cache
   ```

3. **ADB 连接问题**:
   ```bash
   adb kill-server
   adb start-server
   ```

### 通用问题
1. **Metro 缓存问题**:
   ```bash
   npx react-native start --reset-cache
   ```

2. **Node modules 问题**:
   ```bash
   rm -rf node_modules
   npm install
   ```

## 构建发布版本

### iOS 发布构建
1. 在 Xcode 中选择 "Any iOS Device"
2. Product → Archive
3. 按照 App Store Connect 流程上传

### Android 发布构建
```bash
cd android
./gradlew assembleRelease
```

生成的 APK 位于: `android/app/build/outputs/apk/release/`

## 开发工作流建议

1. **启动开发环境**:
   ```bash
   npm start
   # 新终端窗口
   npm run ios  # 或 npm run android
   ```

2. **修改代码**: 编辑 `App.tsx` 或其他组件文件

3. **保存并查看**: 保存文件后应用会自动更新

4. **调试**: 使用开发者菜单中的调试工具

5. **测试**: 在不同设备和模拟器上测试

## 项目结构
```
RenovEasy/
├── App.tsx              # 主应用组件
├── android/             # Android 原生代码
├── ios/                 # iOS 原生代码
├── UI/                  # UI 设计文件
├── __tests__/           # 测试文件
├── package.json         # 项目依赖配置
└── README.md           # 项目说明
```

## 下一步
- 根据 UI 文件夹中的设计实现具体页面
- 添加导航库 (如 React Navigation)
- 集成状态管理 (如 Redux 或 Context API)
- 添加网络请求功能
- 实现用户认证
- 添加推送通知等功能