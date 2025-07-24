# 家庭装修接单App - 高保真原型文档

## 项目概述

本项目是一个基于地理位置的双端服务平台原型，连接需要装修服务的用户和专业装修工人。采用HTML5 + Tailwind CSS技术栈开发，严格遵循iOS Human Interface Guidelines设计规范，针对iPhone 16 Pro进行了专门优化。

## 技术栈

- **前端框架**: HTML5 + CSS3
- **样式框架**: Tailwind CSS 4.1.11
- **图标库**: FontAwesome 6.4.0
- **地图服务**: Google Maps JavaScript API
- **设备适配**: iPhone 16 Pro (393×852 points)
- **设计规范**: iOS Human Interface Guidelines

## 项目结构

```
UI/
├── index.html                 # 主入口页面，展示所有原型
├── styles/
│   ├── design-system.css     # 设计系统和通用样式
│   └── config.json          # 样式配置数据
├── user-home.html           # 用户端 - 装修首页
├── user-nearby.html         # 用户端 - 附近页面  
├── user-profile.html        # 用户端 - 个人中心
├── worker-home.html         # 装修工端 - 地图首页
├── worker-orders.html       # 装修工端 - 订单管理
├── worker-profile.html      # 装修工端 - 个人中心
└── README.md               # 项目文档
```

## 页面功能说明

### 用户端界面

#### 1. 装修首页 (user-home.html)
- **核心功能**: 地图选点发布装修需求
- **主要组件**:
  - Google Maps地图容器
  - 位置搜索和自动补全
  - 底部抽屉式订单表单
  - 装修类型选择器
  - 预算范围滑块
  - 照片上传组件
- **交互流程**: 地图选点 → 填写需求 → 上传照片 → 提交订单

#### 2. 附近页面 (user-nearby.html)
- **核心功能**: 浏览附近装修工信息
- **主要组件**:
  - 装修工列表卡片
  - 筛选功能面板
  - 装修工详情模态框
  - 作品展示轮播
  - 收藏和联系功能
- **交互流程**: 浏览列表 → 查看详情 → 收藏/联系

#### 3. 个人中心 (user-profile.html)
- **核心功能**: 订单管理和账户设置
- **主要组件**:
  - 用户信息展示
  - 订单状态标签页
  - 订单详情查看
  - 收藏装修工管理
  - 账户设置表单
- **交互流程**: 查看订单 → 管理收藏 → 设置账户

### 装修工端界面

#### 1. 地图首页 (worker-home.html)
- **核心功能**: 地图查看和接单
- **主要组件**:
  - 订单标记地图
  - 筛选条件面板
  - 订单详情卡片
  - 接单操作按钮
  - 统计数据展示
- **交互流程**: 查看订单 → 筛选条件 → 接单操作

#### 2. 订单管理 (worker-orders.html)
- **核心功能**: 订单状态管理和进度更新
- **主要组件**:
  - 订单状态标签页
  - 订单列表卡片
  - 进度更新模态框
  - 客户沟通界面
  - 施工照片上传
- **交互流程**: 管理订单 → 更新进度 → 完成验收

#### 3. 个人中心 (worker-profile.html)
- **核心功能**: 资质展示和收入统计
- **主要组件**:
  - 个人资质卡片
  - 收入统计图表
  - 作品集管理
  - 客户评价展示
  - 账户设置
- **交互流程**: 展示资质 → 管理作品 → 查看收入

## 设计系统

### 色彩规范
```css
--primary-color: #007AFF;    /* iOS蓝 - 主色调 */
--success-color: #34C759;    /* 绿色 - 成功状态 */
--warning-color: #FF3B30;    /* 红色 - 警告状态 */
--neutral-color: #8E8E93;    /* 灰色 - 次要信息 */
--background-color: #F2F2F7; /* 浅灰 - 背景色 */
--surface-color: #FFFFFF;    /* 白色 - 卡片背景 */
```

### 字体规范
- **字体族**: SF Pro Display/Text, -apple-system
- **标题**: 24-32px, 粗体
- **副标题**: 18-20px, 中等
- **正文**: 16px, 常规
- **说明**: 12-14px, 常规

### 间距规范
- **页面边距**: 16px
- **组件间距**: 12px
- **内容间距**: 8px
- **按钮高度**: 44px (符合iOS触摸标准)

### 圆角规范
- **设备圆角**: 39px (iPhone 16 Pro)
- **卡片圆角**: 12px
- **按钮圆角**: 8px
- **输入框圆角**: 8px

## 响应式设计

### iPhone 16 Pro适配
- **屏幕尺寸**: 393×852 points
- **安全区域**: 顶部44px，底部34px
- **标签栏高度**: 83px
- **导航栏高度**: 44px

### 关键适配点
1. **安全区域处理**: 所有内容避开刘海和底部指示器
2. **触摸区域**: 最小44×44px触摸目标
3. **圆角设计**: 39px设备圆角模拟真机效果
4. **状态栏**: 44px高度预留空间

## 交互设计

### 动画效果
- **页面转场**: 淡入淡出，300ms
- **模态框**: 从底部滑入，400ms
- **按钮反馈**: 缩放效果，100ms
- **加载状态**: 骨架屏和进度指示

### 微交互
- **悬停效果**: 卡片阴影变化
- **点击反馈**: 按钮缩放和颜色变化
- **状态切换**: 平滑过渡动画
- **成功反馈**: 绿色对勾动画

## 数据模型

### 用户模型
```javascript
{
  userId: "string",
  userType: "customer|worker",
  profile: {
    name: "string",
    avatar: "string",
    phone: "string",
    location: { lat: number, lng: number, address: "string" }
  },
  verification: { isVerified: boolean }
}
```

### 订单模型
```javascript
{
  orderId: "string",
  customerId: "string",
  workerId: "string|null",
  status: "pending|accepted|in_progress|completed",
  location: { lat: number, lng: number, address: "string" },
  details: {
    renovationType: "kitchen|bathroom|living_room|bedroom|full_house",
    budget: "1-5w|5-10w|10-20w|20w+",
    description: "string",
    photos: ["string"]
  }
}
```

## API集成说明

### Google Maps API
- **API密钥**: 需要配置有效的Google Maps API密钥
- **所需服务**: Maps JavaScript API, Places API
- **功能**: 地图显示、地址搜索、地理编码

### 模拟数据
当前所有数据都是模拟数据，包括：
- 用户信息
- 订单列表
- 装修工信息
- 评价数据
- 作品集数据

## 部署说明

### 本地运行
1. 确保所有文件在同一目录下
2. 配置Google Maps API密钥
3. 使用本地服务器运行（如Live Server）
4. 访问index.html查看完整原型

### 生产部署
1. 上传所有文件到Web服务器
2. 确保HTTPS协议（Google Maps要求）
3. 配置正确的API密钥和域名限制
4. 测试所有页面功能

## React Native迁移指南

### 组件映射
- **HTML元素** → **React Native组件**
- `<div>` → `<View>`
- `<span>`, `<p>` → `<Text>`
- `<input>` → `<TextInput>`
- `<button>` → `<TouchableOpacity>`
- `<img>` → `<Image>`

### 样式迁移
- **CSS样式** → **StyleSheet对象**
- **Flexbox布局**: 直接迁移
- **绝对定位**: 需要调整
- **媒体查询**: 使用Dimensions API

### 导航结构
```javascript
// 建议使用React Navigation
const UserStack = createBottomTabNavigator({
  Home: UserHomeScreen,
  Nearby: UserNearbyScreen,
  Profile: UserProfileScreen
});

const WorkerStack = createBottomTabNavigator({
  Map: WorkerHomeScreen,
  Orders: WorkerOrdersScreen,
  Profile: WorkerProfileScreen
});
```

### 地图集成
```javascript
// 使用react-native-maps
import MapView, { Marker } from 'react-native-maps';

<MapView
  style={styles.map}
  initialRegion={region}
  onPress={handleMapPress}
>
  {orders.map(order => (
    <Marker
      key={order.id}
      coordinate={order.location}
      onPress={() => showOrderDetail(order)}
    />
  ))}
</MapView>
```

### 状态管理建议
- **Redux Toolkit**: 全局状态管理
- **React Query**: 服务端状态管理
- **AsyncStorage**: 本地数据持久化

## 性能优化建议

### 图片优化
- 使用WebP格式
- 实现懒加载
- 添加占位符

### 代码优化
- 组件懒加载
- 虚拟滚动
- 防抖节流

### 网络优化
- API请求缓存
- 离线功能支持
- 错误重试机制

## 测试建议

### 功能测试
- [ ] 所有页面正常加载
- [ ] 地图功能正常
- [ ] 表单提交验证
- [ ] 模态框交互
- [ ] 标签页切换

### 兼容性测试
- [ ] Safari浏览器
- [ ] Chrome浏览器
- [ ] 移动端Safari
- [ ] 不同屏幕尺寸

### 用户体验测试
- [ ] 加载速度
- [ ] 动画流畅度
- [ ] 触摸响应
- [ ] 错误处理

## 后续开发建议

### 短期优化
1. 添加真实API接口
2. 实现用户认证系统
3. 添加推送通知
4. 优化地图性能

### 长期规划
1. 支付系统集成
2. 实时聊天功能
3. 评价系统完善
4. 数据分析面板

## 联系信息

如有技术问题或需要进一步说明，请联系开发团队。

---

**版本**: 1.0.0  
**最后更新**: 2024年1月  
**维护团队**: 前端开发组