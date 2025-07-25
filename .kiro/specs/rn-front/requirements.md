# Requirements Document

## Introduction

本文档定义了基于React Native架构开发家庭装修接单App前端的功能需求。该应用是一个双端服务平台，连接需要装修服务的用户和专业装修工人，基于地理位置提供服务匹配。应用需要严格遵循iOS Human Interface Guidelines设计规范，使用现代化的前端技术栈，并与现有UI原型保持一致。

## Requirements

### Requirement 1: 项目架构与技术栈

**User Story:** 作为开发团队，我们需要建立一个可扩展、可维护的React Native项目架构，以便高效开发和后续维护。

#### Acceptance Criteria

1. WHEN 项目初始化时 THEN 系统 SHALL 使用React Native 0.73+版本创建项目
2. WHEN 配置状态管理时 THEN 系统 SHALL 集成Redux Toolkit用于全局状态管理
3. WHEN 配置导航时 THEN 系统 SHALL 使用React Navigation 6+实现页面路由
4. WHEN 配置样式时 THEN 系统 SHALL 集成NativeWind (Tailwind CSS for React Native)
5. WHEN 配置图标时 THEN 系统 SHALL 集成react-native-vector-icons (FontAwesome)
6. WHEN 配置地图时 THEN 系统 SHALL 集成react-native-maps并配置Google Maps
7. WHEN 配置动画时 THEN 系统 SHALL 使用react-native-reanimated 3+实现流畅动画
8. WHEN 配置网络请求时 THEN 系统 SHALL 使用React Query进行API状态管理
9. WHEN 配置本地存储时 THEN 系统 SHALL 使用AsyncStorage进行数据持久化

### Requirement 2: 认证系统实现

**User Story:** 作为用户，我需要通过多种方式安全地登录和注册账户，以便使用应用的各项功能。

#### Acceptance Criteria

1. WHEN 用户打开应用时 THEN 系统 SHALL 显示认证入口页面，包含应用Logo、品牌信息和登录选项
2. WHEN 用户选择手机号登录时 THEN 系统 SHALL 跳转到手机号输入页面，支持国家代码选择
3. WHEN 用户输入手机号时 THEN 系统 SHALL 实时验证手机号格式并显示验证状态
4. WHEN 手机号验证通过时 THEN 系统 SHALL 发送短信验证码并跳转到验证页面
5. WHEN 用户输入验证码时 THEN 系统 SHALL 支持6位数字输入，自动焦点切换和粘贴功能
6. WHEN 验证码正确时 THEN 系统 SHALL 检查用户是否为新用户，新用户跳转到用户类型选择页面
7. WHEN 新用户选择用户类型时 THEN 系统 SHALL 提供"普通用户"和"装修工"两种选项
8. WHEN 用户完成认证时 THEN 系统 SHALL 保存用户信息到本地存储并跳转到相应主页面
9. WHEN 用户选择社交登录时 THEN 系统 SHALL 显示"功能即将上线"提示（预留接口）

### Requirement 3: 用户端核心功能

**User Story:** 作为普通用户，我需要在地图上选择位置并发布装修需求，以便找到合适的装修工人。

#### Acceptance Criteria

1. WHEN 用户进入首页时 THEN 系统 SHALL 显示Google Maps地图，默认定位到用户当前位置
2. WHEN 地图加载失败时 THEN 系统 SHALL 显示备用模式，允许用户手动输入地址
3. WHEN 用户点击地图时 THEN 系统 SHALL 在该位置放置标记并显示"发布装修需求"按钮
4. WHEN 用户搜索地址时 THEN 系统 SHALL 使用Google Places API提供地址自动补全
5. WHEN 用户点击发布按钮时 THEN 系统 SHALL 打开底部抽屉式订单创建表单
6. WHEN 用户填写装修需求时 THEN 系统 SHALL 提供装修类型选择（厨房、卫生间、客厅、卧室、书房、全屋）
7. WHEN 用户设置预算时 THEN 系统 SHALL 提供滑块选择预算范围（1-5万、5-10万、10-20万、20万+）
8. WHEN 用户上传照片时 THEN 系统 SHALL 支持最多9张现场照片上传，支持相机拍摄和相册选择
9. WHEN 用户提交订单时 THEN 系统 SHALL 验证必填信息并显示提交状态，成功后重置表单

### Requirement 4: 用户端附近页面

**User Story:** 作为普通用户，我需要浏览附近的装修工信息，以便选择合适的服务提供者。

#### Acceptance Criteria

1. WHEN 用户进入附近页面时 THEN 系统 SHALL 显示附近装修工列表，包含头像、姓名、评分、距离信息
2. WHEN 用户查看装修工详情时 THEN 系统 SHALL 显示模态框，包含详细信息、作品展示、客户评价
3. WHEN 用户筛选装修工时 THEN 系统 SHALL 提供按距离、评分、价格范围筛选功能
4. WHEN 用户收藏装修工时 THEN 系统 SHALL 保存收藏状态并在个人中心显示
5. WHEN 用户联系装修工时 THEN 系统 SHALL 提供电话拨打和消息发送功能
6. WHEN 列表为空时 THEN 系统 SHALL 显示空状态页面，提示用户扩大搜索范围

### Requirement 5: 用户端个人中心

**User Story:** 作为普通用户，我需要管理我的订单、收藏和账户设置，以便跟踪服务进度和个人信息。

#### Acceptance Criteria

1. WHEN 用户进入个人中心时 THEN 系统 SHALL 显示用户头像、姓名、手机号等基本信息
2. WHEN 用户查看订单时 THEN 系统 SHALL 提供标签页切换（全部、待接单、进行中、已完成）
3. WHEN 用户点击订单时 THEN 系统 SHALL 显示订单详情，包含装修工信息、进度状态、联系方式
4. WHEN 用户管理收藏时 THEN 系统 SHALL 显示收藏的装修工列表，支持取消收藏
5. WHEN 用户修改个人信息时 THEN 系统 SHALL 提供头像上传、姓名修改、地址管理功能
6. WHEN 用户退出登录时 THEN 系统 SHALL 清除本地存储的用户信息并返回登录页面

### Requirement 6: 装修工端地图首页

**User Story:** 作为装修工，我需要在地图上查看附近的装修订单，以便选择合适的工作机会。

#### Acceptance Criteria

1. WHEN 装修工进入首页时 THEN 系统 SHALL 显示地图，标记附近的装修订单位置
2. WHEN 地图显示订单时 THEN 系统 SHALL 使用不同颜色标记区分可接单和已接单状态
3. WHEN 装修工点击订单标记时 THEN 系统 SHALL 显示底部卡片，包含订单详情和客户信息
4. WHEN 装修工筛选订单时 THEN 系统 SHALL 提供距离、预算、装修类型筛选功能
5. WHEN 装修工接单时 THEN 系统 SHALL 显示确认对话框，成功后更新订单状态
6. WHEN 装修工查看统计时 THEN 系统 SHALL 显示今日可接订单数、收入、完成订单数
7. WHEN 装修工导航到订单时 THEN 系统 SHALL 调用系统地图应用进行导航

### Requirement 7: 装修工端订单管理

**User Story:** 作为装修工，我需要管理我的订单状态和进度，以便高效完成工作并与客户沟通。

#### Acceptance Criteria

1. WHEN 装修工进入订单页面时 THEN 系统 SHALL 显示标签页（待确认、进行中、已完成、全部）
2. WHEN 装修工查看订单详情时 THEN 系统 SHALL 显示客户信息、装修要求、现场照片、联系方式
3. WHEN 装修工更新订单进度时 THEN 系统 SHALL 提供进度选择（已接单、施工中、待验收、已完成）
4. WHEN 装修工上传施工照片时 THEN 系统 SHALL 支持多张照片上传，记录施工进度
5. WHEN 装修工联系客户时 THEN 系统 SHALL 提供电话拨打和消息发送功能
6. WHEN 订单完成时 THEN 系统 SHALL 更新订单状态并计算收入统计

### Requirement 8: 装修工端个人中心

**User Story:** 作为装修工，我需要展示我的资质和作品，管理个人信息，以便获得更多客户信任。

#### Acceptance Criteria

1. WHEN 装修工进入个人中心时 THEN 系统 SHALL 显示个人资质卡片，包含认证状态、技能标签、评分
2. WHEN 装修工查看收入统计时 THEN 系统 SHALL 显示图表，包含日收入、月收入、年收入趋势
3. WHEN 装修工管理作品集时 THEN 系统 SHALL 支持上传作品照片、添加描述、分类管理
4. WHEN 装修工查看评价时 THEN 系统 SHALL 显示客户评价列表，包含评分、评价内容、时间
5. WHEN 装修工修改个人信息时 THEN 系统 SHALL 提供头像、姓名、技能、服务范围编辑功能
6. WHEN 装修工设置接单偏好时 THEN 系统 SHALL 提供距离范围、预算范围、装修类型偏好设置

### Requirement 9: 地图集成与定位服务

**User Story:** 作为用户，我需要准确的地图和定位服务，以便精确选择服务位置和查看附近信息。

#### Acceptance Criteria

1. WHEN 应用请求定位权限时 THEN 系统 SHALL 显示权限说明并引导用户授权
2. WHEN 获取用户位置时 THEN 系统 SHALL 使用GPS和网络定位，优先使用高精度定位
3. WHEN 地图加载时 THEN 系统 SHALL 显示加载状态，超时后提供备用方案
4. WHEN 用户搜索地址时 THEN 系统 SHALL 使用Google Places API提供实时搜索建议
5. WHEN 地图操作时 THEN 系统 SHALL 支持缩放、拖拽、标记点击等交互
6. WHEN 网络异常时 THEN 系统 SHALL 缓存地图数据，提供离线基础功能

### Requirement 10: 动画与交互体验

**User Story:** 作为用户，我需要流畅的动画和交互反馈，以便获得良好的使用体验。

#### Acceptance Criteria

1. WHEN 页面切换时 THEN 系统 SHALL 使用原生转场动画，持续时间300ms
2. WHEN 模态框显示时 THEN 系统 SHALL 使用从底部滑入动画，持续时间400ms
3. WHEN 按钮点击时 THEN 系统 SHALL 提供缩放反馈动画，持续时间100ms
4. WHEN 列表滚动时 THEN 系统 SHALL 使用弹性滚动效果和惯性滚动
5. WHEN 加载数据时 THEN 系统 SHALL 显示骨架屏或加载指示器
6. WHEN 操作成功时 THEN 系统 SHALL 显示成功动画反馈（绿色对勾）
7. WHEN 操作失败时 THEN 系统 SHALL 显示错误提示动画（红色警告）

### Requirement 11: 数据管理与API集成

**User Story:** 作为开发者，我需要高效的数据管理和API集成方案，以便处理应用的各种数据需求。

#### Acceptance Criteria

1. WHEN 应用启动时 THEN 系统 SHALL 初始化Redux Store和React Query客户端
2. WHEN 发起API请求时 THEN 系统 SHALL 使用统一的请求拦截器处理认证和错误
3. WHEN 网络请求失败时 THEN 系统 SHALL 实现自动重试机制，最多重试3次
4. WHEN 数据需要缓存时 THEN 系统 SHALL 使用React Query缓存策略，设置合理的过期时间
5. WHEN 用户离线时 THEN 系统 SHALL 显示离线状态，提供基础的离线功能
6. WHEN 数据更新时 THEN 系统 SHALL 使用乐观更新策略，提升用户体验
7. WHEN 敏感数据存储时 THEN 系统 SHALL 使用加密存储，保护用户隐私

### Requirement 12: 性能优化与错误处理

**User Story:** 作为用户，我需要应用具有良好的性能和稳定性，以便流畅使用各项功能。

#### Acceptance Criteria

1. WHEN 应用启动时 THEN 系统 SHALL 在3秒内完成初始化并显示主界面
2. WHEN 图片加载时 THEN 系统 SHALL 使用懒加载和图片压缩，优化内存使用
3. WHEN 列表渲染时 THEN 系统 SHALL 使用FlatList虚拟化，支持大量数据展示
4. WHEN 发生错误时 THEN 系统 SHALL 使用Error Boundary捕获错误，显示友好提示
5. WHEN 内存不足时 THEN 系统 SHALL 自动清理缓存，释放内存资源
6. WHEN 网络超时时 THEN 系统 SHALL 显示超时提示，提供重试选项
7. WHEN 应用崩溃时 THEN 系统 SHALL 记录错误日志，下次启动时恢复状态