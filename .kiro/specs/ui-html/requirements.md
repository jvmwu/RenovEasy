# 家庭装修接单App需求文档

## 项目介绍

家庭装修接单App是一个双端移动应用，连接需要装修服务的用户和专业装修工人。用户可以在地图上标记位置并发布装修需求，装修工可以查看并接单提供服务。

## 需求

### 需求1 - 用户端装修首页功能

**用户故事:** 作为需要装修的用户，我希望能在地图上标记位置并发布装修需求，以便找到合适的装修工人。

#### 验收标准
1. WHEN 用户打开装修首页 THEN 系统 SHALL 显示地图界面并获取用户当前位置
2. WHEN 用户在地图上点击位置 THEN 系统 SHALL 允许用户标记该位置作为装修地址
3. WHEN 用户标记位置后 THEN 系统 SHALL 显示订单创建表单
4. WHEN 用户填写订单表单 THEN 系统 SHALL 要求选择装修类型（厨房、卫生间、客厅、卧室、全屋等）
5. WHEN 用户选择装修类型后 THEN 系统 SHALL 要求选择预算范围（1-5万、5-10万、10-20万、20万以上）
6. WHEN 用户选择预算后 THEN 系统 SHALL 提供详细描述输入框
7. WHEN 用户输入描述后 THEN 系统 SHALL 允许上传现场照片（最多9张）
8. WHEN 用户完成所有信息填写 THEN 系统 SHALL 提供提交订单按钮
9. WHEN 用户提交订单 THEN 系统 SHALL 保存订单并显示成功提示

### 需求2 - 用户端附近页面功能

**用户故事:** 作为用户，我希望能查看附近的装修工人信息，包括他们的过往作品和评分，以便选择合适的服务提供者。

#### 验收标准
1. WHEN 用户进入附近页面 THEN 系统 SHALL 显示附近装修工人列表
2. WHEN 系统显示装修工列表 THEN 系统 SHALL 包含每个装修工的头像、姓名、评分、距离信息
3. WHEN 用户点击装修工卡片 THEN 系统 SHALL 显示装修工详细信息页面
4. WHEN 显示装修工详情 THEN 系统 SHALL 展示过往装修样例照片
5. WHEN 显示装修工详情 THEN 系统 SHALL 展示用户评分和评价内容
6. WHEN 显示装修工详情 THEN 系统 SHALL 提供收藏按钮
7. WHEN 用户点击收藏 THEN 系统 SHALL 将装修工添加到收藏列表
8. WHEN 用户在详情页 THEN 系统 SHALL 提供直接联系或邀请接单功能

### 需求3 - 用户端个人中心功能

**用户故事:** 作为用户，我希望能管理我的订单、收藏和账户设置，以便跟踪装修进度和管理个人信息。

#### 验收标准
1. WHEN 用户进入我的页面 THEN 系统 SHALL 显示用户头像、姓名和基本信息
2. WHEN 用户查看订单 THEN 系统 SHALL 按状态分类显示（待接单、施工中、已完成）
3. WHEN 用户点击待接单订单 THEN 系统 SHALL 显示订单详情和取消订单选项
4. WHEN 用户点击施工中订单 THEN 系统 SHALL 显示施工进度和与装修工的沟通界面
5. WHEN 用户点击已完成订单 THEN 系统 SHALL 显示完工照片和评价选项
6. WHEN 用户查看收藏 THEN 系统 SHALL 显示已收藏的装修工列表
7. WHEN 用户进入账户设置 THEN 系统 SHALL 提供个人信息编辑、密码修改、通知设置等功能

### 需求4 - 装修工端地图首页功能

**用户故事:** 作为装修工人，我希望能在地图上实时查看附近的装修订单，并能按条件筛选和接单，以便高效地获取工作机会。

#### 验收标准
1. WHEN 装修工打开地图首页 THEN 系统 SHALL 显示附近地图和订单标记
2. WHEN 系统显示订单标记 THEN 未接单订单 SHALL 显示绿色家装图标
3. WHEN 系统显示订单标记 THEN 已接单订单 SHALL 显示红色家装图标
4. WHEN 装修工使用筛选功能 THEN 系统 SHALL 提供距离筛选（1km、3km、5km、10km）
5. WHEN 装修工使用筛选功能 THEN 系统 SHALL 提供预算筛选选项
6. WHEN 装修工点击订单图标 THEN 系统 SHALL 显示操作菜单（查看详情、立即接单、导航该位置）
7. WHEN 装修工选择查看详情 THEN 系统 SHALL 显示订单完整信息和用户联系方式
8. WHEN 装修工选择立即接单 THEN 系统 SHALL 确认接单并更新订单状态
9. WHEN 装修工选择导航 THEN 系统 SHALL 打开地图导航到订单位置

### 需求5 - 装修工端订单管理功能

**用户故事:** 作为装修工人，我希望能管理我已接的订单，跟踪施工进度并与客户沟通，以便提供优质的服务。

#### 验收标准
1. WHEN 装修工进入订单页面 THEN 系统 SHALL 显示已接订单列表
2. WHEN 系统显示订单列表 THEN 系统 SHALL 按状态分类（待开工、施工中、待验收、已完成）
3. WHEN 装修工点击订单 THEN 系统 SHALL 显示订单详细信息和操作选项
4. WHEN 装修工更新施工进度 THEN 系统 SHALL 允许上传施工照片和进度说明
5. WHEN 装修工更新进度 THEN 系统 SHALL 自动通知用户进度更新
6. WHEN 装修工与客户沟通 THEN 系统 SHALL 提供聊天功能
7. WHEN 装修工完成施工 THEN 系统 SHALL 允许标记订单为待验收状态
8. WHEN 用户确认验收 THEN 系统 SHALL 更新订单状态为已完成

### 需求6 - 装修工端个人中心功能

**用户故事:** 作为装修工人，我希望能展示我的专业资质、查看收入统计和管理个人信息，以便建立良好的职业形象。

#### 验收标准
1. WHEN 装修工进入我的页面 THEN 系统 SHALL 显示个人头像、姓名和认证状态
2. WHEN 系统显示个人资质 THEN 系统 SHALL 包含技能标签、工作年限、认证证书
3. WHEN 装修工查看收入统计 THEN 系统 SHALL 显示日/周/月收入图表
4. WHEN 装修工查看客户评价 THEN 系统 SHALL 显示评分统计和评价列表
5. WHEN 装修工管理装修案例 THEN 系统 SHALL 允许上传作品照片和描述
6. WHEN 装修工编辑案例 THEN 系统 SHALL 提供分类标签（厨房、卫生间等）
7. WHEN 装修工进入账户设置 THEN 系统 SHALL 提供个人信息编辑、收款设置、通知设置等功能

### 需求7 - 地图集成和定位功能

**用户故事:** 作为应用用户，我希望能准确地在地图上标记位置和查看附近信息，以便精确地发布需求或找到服务。

#### 验收标准
1. WHEN 应用启动 THEN 系统 SHALL 请求用户位置权限
2. WHEN 用户授权位置权限 THEN 系统 SHALL 获取并显示当前位置
3. WHEN 系统集成地图 THEN 系统 SHALL 使用Google Maps API
4. WHEN 用户在地图上操作 THEN 系统 SHALL 支持缩放、拖拽、标记功能
5. WHEN 系统显示位置信息 THEN 系统 SHALL 提供地址解析功能
6. WHEN 用户搜索地址 THEN 系统 SHALL 提供地址自动补全功能

### 需求8 - 移动端UI/UX设计

**用户故事:** 作为移动应用用户，我希望应用界面美观易用，符合iOS设计规范，以便获得良好的使用体验。

#### 验收标准
1. WHEN 设计应用界面 THEN 系统 SHALL 严格遵循iOS Human Interface Guidelines
2. WHEN 实现界面布局 THEN 系统 SHALL 适配iPhone 16 Pro屏幕规格
3. WHEN 设计视觉元素 THEN 系统 SHALL 使用统一的色彩搭配和排版规范
4. WHEN 集成图标 THEN 系统 SHALL 使用FontAwesome或其他开源UI组件
5. WHEN 使用图片资源 THEN 系统 SHALL 使用真实UI图片而非占位符
6. WHEN 实现交互效果 THEN 系统 SHALL 提供流畅的动画和反馈
7. WHEN 设计导航系统 THEN 系统 SHALL 确保用户能快速访问主要功能

### 需求9 - HTML原型开发

**用户故事:** 作为开发团队，我需要高保真的HTML原型来指导后续的React Native开发，以便准确实现设计意图。

#### 验收标准
1. WHEN 开发原型 THEN 系统 SHALL 使用HTML + Tailwind CSS 4.1.11版本
2. WHEN 组织代码结构 THEN 每个界面 SHALL 以独立HTML文件存储
3. WHEN 创建主入口 THEN index.html SHALL 通过iframe嵌入各界面文件
4. WHEN 展示原型 THEN index页面 SHALL 平铺展示所有页面避免链接跳转
5. WHEN 模拟真机效果 THEN 原型 SHALL 应用iPhone 16 Pro的圆角设计
6. WHEN 组织样式数据 THEN 独立页面样式 SHALL 以JSON数据形式组织
7. WHEN 命名文件 THEN 文件命名 SHALL 规范清晰便于维护
8. WHEN 存储文件 THEN 所有HTML页面 SHALL 放在UI目录下