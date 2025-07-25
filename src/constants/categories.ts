// 服务分类和技能相关常量

export const SERVICE_CATEGORIES = [
  {
    id: 'plumbing',
    name: '水电维修',
    icon: '🔧',
    skills: ['水管维修', '电路维修', '开关插座', '灯具安装', '马桶维修'],
  },
  {
    id: 'carpentry',
    name: '木工装修',
    icon: '🔨',
    skills: ['家具组装', '木工定制', '门窗安装', '地板铺设', '吊顶安装'],
  },
  {
    id: 'painting',
    name: '油漆粉刷',
    icon: '🎨',
    skills: ['墙面粉刷', '家具翻新', '防水涂料', '艺术墙绘', '外墙粉刷'],
  },
  {
    id: 'tiling',
    name: '瓷砖铺贴',
    icon: '🏠',
    skills: ['地砖铺贴', '墙砖铺贴', '美缝处理', '防水处理', '瓷砖修补'],
  },
  {
    id: 'appliance',
    name: '家电维修',
    icon: '📺',
    skills: ['空调维修', '洗衣机维修', '冰箱维修', '热水器维修', '电视维修'],
  },
  {
    id: 'cleaning',
    name: '清洁保洁',
    icon: '🧹',
    skills: ['深度清洁', '开荒保洁', '日常保洁', '地毯清洗', '玻璃清洁'],
  },
  {
    id: 'moving',
    name: '搬家服务',
    icon: '📦',
    skills: ['居民搬家', '办公室搬迁', '家具拆装', '物品包装', '钢琴搬运'],
  },
  {
    id: 'gardening',
    name: '园艺绿化',
    icon: '🌱',
    skills: ['花园设计', '植物养护', '草坪维护', '树木修剪', '景观改造'],
  },
] as const;

export const URGENCY_LEVELS = [
  {
    value: 'low',
    label: '不急',
    description: '1-3天内完成',
    color: '#22C55E',
  },
  {
    value: 'medium',
    label: '一般',
    description: '当天完成',
    color: '#F59E0B',
  },
  {
    value: 'high',
    label: '紧急',
    description: '立即处理',
    color: '#EF4444',
  },
] as const;

export const ORDER_STATUS_CONFIG = {
  pending: {
    label: '待接单',
    color: '#F59E0B',
    bgColor: '#FEF3C7',
  },
  accepted: {
    label: '已接单',
    color: '#3B82F6',
    bgColor: '#DBEAFE',
  },
  in_progress: {
    label: '进行中',
    color: '#8B5CF6',
    bgColor: '#EDE9FE',
  },
  completed: {
    label: '已完成',
    color: '#22C55E',
    bgColor: '#DCFCE7',
  },
  cancelled: {
    label: '已取消',
    color: '#6B7280',
    bgColor: '#F3F4F6',
  },
  disputed: {
    label: '有争议',
    color: '#EF4444',
    bgColor: '#FEE2E2',
  },
} as const;