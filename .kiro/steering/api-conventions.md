---
inclusion: fileMatch
fileMatchPattern: ['src/services/api/*', 'src/store/api/*']
---

# API 开发约定

## RTK Query 架构规范

### API 切片组织
- 使用 `baseApi.ts` 作为基础 API 配置
- 按业务模块创建独立的 API 切片：`authApi.ts`、`userApi.ts`、`workerApi.ts`、`orderApi.ts`
- 所有 API 切片必须继承自 `baseApi`

### 端点定义规范
```typescript
// 正确的端点定义示例
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});
```

### 缓存标签管理
- 使用语义化的标签名称：`User`、`Worker`、`Order`、`Auth`
- 查询操作提供标签，变更操作使标签失效
- 列表查询使用 `{ type: 'Order', id: 'LIST' }` 格式

## HTTP 客户端配置

### Axios 实例配置
- 使用统一的 `httpClient.ts` 配置 Axios 实例
- 包含请求/响应拦截器处理认证和错误
- 设置合理的超时时间（10秒）

### 请求拦截器
```typescript
// 自动添加认证头
request.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## 统一响应格式

### 标准响应结构
```typescript
interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T | null;
  success: boolean;
}
```

### 成功响应示例
```json
{
  "code": 200,
  "message": "操作成功",
  "data": { "id": 1, "name": "用户名" },
  "success": true
}
```

### 错误响应示例
```json
{
  "code": 400,
  "message": "参数验证失败",
  "data": {
    "errors": {
      "phone": ["手机号格式不正确"],
      "password": ["密码长度至少6位"]
    }
  },
  "success": false
}
```

## 错误处理规范

### 统一错误处理器
- 在 `errorHandler.ts` 中实现统一错误处理逻辑
- 根据状态码提供用户友好的错误提示
- 401 错误自动跳转到登录页面
- 网络错误提供重试机制

### 错误类型定义
```typescript
interface ApiError {
  code: number;
  message: string;
  details?: Record<string, string[]>;
}
```

## 类型安全规范

### 请求/响应类型定义
- 所有 API 端点必须定义明确的 TypeScript 类型
- 请求参数类型以 `Request` 结尾
- 响应数据类型以 `Response` 结尾
- 类型定义放在对应的 `types/` 目录下

### 示例类型定义
```typescript
// 登录相关类型
export interface LoginRequest {
  phone: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
}
```

## 业务 API 约定

### 认证相关 API
- `POST /auth/login` - 用户登录
- `POST /auth/register` - 用户注册
- `POST /auth/refresh` - 刷新令牌
- `POST /auth/logout` - 用户登出

### 用户相关 API
- `GET /users/profile` - 获取用户信息
- `PUT /users/profile` - 更新用户信息
- `POST /users/avatar` - 上传头像

### 装修工相关 API
- `GET /workers/nearby` - 获取附近装修工
- `GET /workers/:id` - 获取装修工详情
- `PUT /workers/profile` - 更新装修工信息

### 订单相关 API
- `GET /orders` - 获取订单列表
- `POST /orders` - 创建订单
- `PUT /orders/:id/status` - 更新订单状态
- `GET /orders/nearby` - 获取附近订单（装修工端）

## 开发最佳实践

### 查询参数处理
- 使用 `URLSearchParams` 构建查询字符串
- 分页参数：`page`、`limit`
- 排序参数：`sortBy`、`sortOrder`
- 筛选参数：`category`、`minPrice`、`maxPrice`

### 文件上传处理
- 使用 `FormData` 上传文件
- 支持多文件上传
- 实现上传进度回调
- 文件类型和大小验证

### 缓存策略
- 用户信息缓存 5 分钟
- 订单列表缓存 1 分钟
- 静态数据（分类等）缓存 1 小时
- 使用 `keepUnusedDataFor` 控制缓存时间

### 乐观更新
- 对于用户交互频繁的操作（点赞、收藏）使用乐观更新
- 失败时自动回滚到之前状态
- 提供用户反馈机制

