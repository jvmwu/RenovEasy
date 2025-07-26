import React from 'react';

/**
 * 图标工具函数
 */

/**
 * 为图标组件设置颜色
 * @param icon - React图标组件或节点
 * @param color - 要设置的颜色
 * @returns 设置了颜色的图标组件
 */
export function renderIconWithColor(icon: React.ReactNode, color: string): React.ReactNode {
  if (!icon) return null;
  
  // 如果是React元素，尝试传递color属性
  if (React.isValidElement(icon)) {
    return React.cloneElement(icon as React.ReactElement<any>, {
      // 保留原有的props
      ...((icon as React.ReactElement<any>).props || {}),
      // color属性优先级更高，会覆盖原有的color
      color,
    });
  }
  
  // 如果不是React元素，直接返回
  return icon;
}

/**
 * 为图标组件设置多个属性
 * @param icon - React图标组件或节点
 * @param props - 要设置的属性对象
 * @returns 设置了属性的图标组件
 */
export function renderIconWithProps(
  icon: React.ReactNode, 
  props: Record<string, any>
): React.ReactNode {
  if (!icon) return null;
  
  // 如果是React元素，传递属性
  if (React.isValidElement(icon)) {
    return React.cloneElement(icon as React.ReactElement<any>, {
      // 保留原有的props
      ...((icon as React.ReactElement<any>).props || {}),
      // 新属性优先级更高
      ...props,
    });
  }
  
  // 如果不是React元素，直接返回
  return icon;
}

/**
 * 为图标组件设置尺寸
 * @param icon - React图标组件或节点
 * @param size - 图标尺寸
 * @returns 设置了尺寸的图标组件
 */
export function renderIconWithSize(icon: React.ReactNode, size: number): React.ReactNode {
  return renderIconWithProps(icon, { size, width: size, height: size });
}

/**
 * 为图标组件同时设置颜色和尺寸
 * @param icon - React图标组件或节点
 * @param color - 要设置的颜色
 * @param size - 图标尺寸
 * @returns 设置了颜色和尺寸的图标组件
 */
export function renderIconWithColorAndSize(
  icon: React.ReactNode, 
  color: string, 
  size: number
): React.ReactNode {
  return renderIconWithProps(icon, { 
    color, 
    size, 
    width: size, 
    height: size 
  });
}

/**
 * 检查是否为有效的React图标元素
 * @param icon - 要检查的图标
 * @returns 是否为有效的React元素
 */
export function isValidIconElement(icon: React.ReactNode): boolean {
  return React.isValidElement(icon);
}

/**
 * 获取图标的原始属性
 * @param icon - React图标组件
 * @returns 图标的原始属性对象
 */
export function getIconProps(icon: React.ReactNode): Record<string, any> {
  if (React.isValidElement(icon)) {
    return (icon as React.ReactElement<any>).props || {};
  }
  return {};
}