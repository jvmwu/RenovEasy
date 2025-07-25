# 设计文档

## 概述

身份认证系统设计遵循现有应用的 iOS Human Interface Guidelines 设计规范，针对 iPhone 16 Pro 进行优化。设计包含登录、注册、用户类型选择、密码重置等完整流程，与现有 UI 保持一致的视觉风格和交互模式。

## 架构

### 认证流程架构

```
启动应用 → 检查会话 → 已登录？
                    ↓ 否
                认证入口页面
                    ↓
            手机号登录/注册页面
                    ↓
        已注册？→ 是 → 登录选择（短信/密码）
            ↓ 否
        短信验证 → 用户类型选择 → 资料设置 → 主页面
```

### 页面层级结构

```
UI/auth/
├── auth-entry.html          # 认证入口页面
├── phone-auth.html          # 手机号认证页面
├── sms-verification.html    # 短信验证页面
├── user-type-selection.html # 用户类型选择页面
├── profile-setup.html       # 资料设置页面（待开发）
└── password-reset.html      # 密码重置页面（待开发）
```

## 组件和界面

### 1. 认证入口页面 (auth-entry.html)

#### 设计要素

- **背景**: 使用渐变背景，体现装修主题
- **Logo**: 应用 Logo 居中显示
- **标语**: "连接装修需求，成就美好家居"
- **按钮布局**: 垂直排列的认证选项

#### 组件结构

```html
<div class="auth-container">
  <div class="logo-section">
    <img src="logo.png" class="app-logo" />
    <h1 class="app-title">装修易</h1>
    <p class="app-subtitle">连接装修需求，成就美好家居</p>
  </div>

  <div class="auth-options">
    <button class="button-primary phone-auth-btn">
      <i class="fas fa-mobile-alt"></i> 手机号登录/注册
    </button>

    <div class="social-auth">
      <button class="social-btn apple-btn">
        <i class="fab fa-apple"></i> 使用Apple登录
      </button>
      <button class="social-btn google-btn">
        <i class="fab fa-google"></i> 使用Google登录
      </button>
      <button class="social-btn facebook-btn">
        <i class="fab fa-facebook"></i> 使用Facebook登录
      </button>
    </div>
  </div>
</div>
```

### 2. 手机号认证页面 (phone-auth.html)

#### 设计要素

- **导航栏**: 返回按钮 + 标题
- **输入区域**: 手机号输入框，带国家代码选择
- **验证按钮**: 获取验证码按钮
- **辅助选项**: 社交登录快捷入口

#### 组件结构

```html
<div class="nav-bar">
  <button class="nav-back-btn">
    <i class="fas fa-chevron-left"></i>
  </button>
  <h1 class="nav-title">手机号验证</h1>
</div>

<div class="phone-auth-content">
  <div class="instruction-text">
    <h2>输入手机号</h2>
    <p>我们将发送验证码到您的手机</p>
  </div>

  <div class="phone-input-section">
    <div class="country-selector">
      <span class="country-code">+86</span>
      <i class="fas fa-chevron-down"></i>
    </div>
    <input type="tel" class="phone-input" placeholder="请输入手机号" />
  </div>

  <button class="button-primary send-code-btn">获取验证码</button>

  <div class="alternative-auth">
    <p class="divider-text">或使用以下方式</p>
    <div class="social-buttons-row">
      <button class="social-btn-small apple-btn">
        <i class="fab fa-apple"></i>
      </button>
      <button class="social-btn-small google-btn">
        <i class="fab fa-google"></i>
      </button>
      <button class="social-btn-small facebook-btn">
        <i class="fab fa-facebook"></i>
      </button>
    </div>
  </div>
</div>
```

### 3. 短信验证页面 (sms-verification.html)

#### 设计要素

- **验证码输入**: 6 位数字输入框
- **倒计时**: 重新发送倒计时
- **状态反馈**: 验证成功/失败状态

#### 组件结构

```html
<div class="verification-content">
  <div class="instruction-section">
    <i class="fas fa-sms verification-icon"></i>
    <h2>输入验证码</h2>
    <p>验证码已发送至 <span class="phone-number">138****1234</span></p>
  </div>

  <div class="code-input-section">
    <div class="code-inputs">
      <input type="text" class="code-digit" maxlength="1" />
      <input type="text" class="code-digit" maxlength="1" />
      <input type="text" class="code-digit" maxlength="1" />
      <input type="text" class="code-digit" maxlength="1" />
      <input type="text" class="code-digit" maxlength="1" />
      <input type="text" class="code-digit" maxlength="1" />
    </div>
  </div>

  <div class="resend-section">
    <p class="resend-text">
      没收到验证码？
      <button class="resend-btn" disabled>
        <span class="countdown">60s</span>后重新发送
      </button>
    </p>
  </div>

  <button class="button-primary verify-btn">验证</button>
</div>
```

### 4. 用户类型选择页面 (user-type-selection.html)

#### 设计要素

- **选择卡片**: 两个选择选项的卡片设计
- **图标说明**: 清晰的图标和说明文字
- **确认按钮**: 选择后的确认按钮

#### 组件结构

```html
<div class="user-type-content">
  <div class="instruction-section">
    <h2>选择账户类型</h2>
    <p>请选择最符合您需求的账户类型</p>
  </div>

  <div class="type-selection">
    <div class="type-card customer-card" data-type="customer">
      <div class="type-icon">
        <i class="fas fa-home"></i>
      </div>
      <h3 class="type-title">普通用户</h3>
      <p class="type-description">我需要装修服务</p>
      <div class="type-features">
        <span class="feature-item">发布装修需求</span>
        <span class="feature-item">查找装修工</span>
        <span class="feature-item">管理订单</span>
      </div>
    </div>

    <div class="type-card worker-card" data-type="worker">
      <div class="type-icon">
        <i class="fas fa-tools"></i>
      </div>
      <h3 class="type-title">装修工</h3>
      <p class="type-description">我提供装修服务</p>
      <div class="type-features">
        <span class="feature-item">接收订单</span>
        <span class="feature-item">展示作品</span>
        <span class="feature-item">收入统计</span>
      </div>
      <div class="verification-notice">
        <i class="fas fa-shield-alt"></i>
        <span>需要专业认证</span>
      </div>
    </div>
  </div>

  <button class="button-primary continue-btn" disabled>继续</button>
</div>
```

### 5. 密码设置/登录选择页面

#### 设计要素

- **登录选项**: 短信验证码登录 / 密码登录
- **密码设置**: 新用户密码设置界面
- **安全提示**: 密码强度提示

## 数据模型

### 用户认证模型

```javascript
{
  userId: "string",
  phone: "string",
  countryCode: "string", // 默认 "+86"
  userType: "customer" | "worker",
  authMethods: {
    password: "boolean",
    sms: "boolean",
    apple: "boolean",
    google: "boolean",
    facebook: "boolean"
  },
  profile: {
    name: "string",
    avatar: "string",
    isVerified: "boolean",
    verificationDocuments: ["string"] // 装修工认证文件
  },
  session: {
    token: "string",
    expiresAt: "timestamp",
    refreshToken: "string"
  },
  createdAt: "timestamp",
  lastLoginAt: "timestamp"
}
```

### 验证码模型

```javascript
{
  phone: "string",
  code: "string",
  type: "register" | "login" | "reset",
  expiresAt: "timestamp",
  attempts: "number",
  isUsed: "boolean"
}
```

## 错误处理

### 错误类型和处理

1. **网络错误**: 显示重试按钮和网络状态提示
2. **验证码错误**: 显示错误次数和重新发送选项
3. **手机号格式错误**: 实时验证和格式提示
4. **社交登录失败**: 提供备用登录方式
5. **会话过期**: 自动跳转到登录页面

### 错误信息设计

```javascript
const errorMessages = {
  INVALID_PHONE: '请输入正确的手机号码',
  SMS_SEND_FAILED: '验证码发送失败，请重试',
  INVALID_CODE: '验证码错误，请重新输入',
  CODE_EXPIRED: '验证码已过期，请重新获取',
  NETWORK_ERROR: '网络连接失败，请检查网络设置',
  SOCIAL_AUTH_FAILED: '第三方登录失败，请尝试其他方式',
  PASSWORD_TOO_WEAK: '密码强度不够，请包含字母和数字',
};
```

## 测试策略

### 功能测试

1. **注册流程测试**

   - 手机号格式验证
   - 短信验证码发送和验证
   - 用户类型选择
   - 资料设置完整性

2. **登录流程测试**

   - 短信验证码登录
   - 密码登录
   - 社交账号登录
   - 记住登录状态

3. **错误处理测试**
   - 网络异常处理
   - 验证码错误处理
   - 登录失败处理

### 用户体验测试

1. **界面响应性**: 按钮点击反馈、加载状态
2. **动画流畅性**: 页面切换动画、状态变化动画
3. **无障碍性**: VoiceOver 支持、动态字体支持
4. **设备适配**: iPhone 16 Pro 安全区域适配

### 安全测试

1. **数据传输加密**: HTTPS 通信
2. **敏感信息保护**: 密码加密存储
3. **会话管理**: Token 安全性和过期处理
4. **防暴力破解**: 验证码尝试次数限制

## 性能优化

### 加载优化

1. **懒加载**: 社交登录 SDK 按需加载
2. **缓存策略**: 用户信息本地缓存
3. **预加载**: 下一步页面预加载

### 网络优化

1. **请求合并**: 批量验证请求
2. **超时处理**: 合理的请求超时时间
3. **重试机制**: 智能重试策略

## 技术实现要点

### 前端技术栈

- **HTML5 + CSS3**: 基础页面结构
- **Tailwind CSS**: 样式框架，与现有设计系统一致
- **FontAwesome**: 图标库
- **JavaScript ES6+**: 交互逻辑

### 关键技术点

1. **响应式设计**: iPhone 16 Pro 适配
2. **动画效果**: CSS3 动画和过渡
3. **表单验证**: 实时验证和错误提示
4. **状态管理**: 认证状态的本地存储
5. **安全性**: 敏感数据的安全处理

### 与现有系统集成

1. **设计系统**: 使用现有的 design-system.css
2. **路由管理**: 与现有页面导航集成
3. **数据接口**: 与后端 API 的统一接口设计
4. **状态同步**: 认证状态与应用状态的同步
