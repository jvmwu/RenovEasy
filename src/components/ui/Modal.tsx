import React, { useMemo } from 'react';
import {
  View,
  ViewStyle,
  StyleSheet,
  Modal as RNModal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ModalProps as RNModalProps,
} from 'react-native';
import { colors, spacing, borderRadius, shadows, layoutStyles } from '@/styles';

export interface ModalProps extends Omit<RNModalProps, 'children'> {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'full';
  position?: 'center' | 'bottom' | 'top';
  closeOnBackdrop?: boolean;
  showCloseButton?: boolean;
  containerStyle?: ViewStyle;
}

export const Modal: React.FC<ModalProps> = ({
  isVisible,
  onClose,
  children,
  size = 'md',
  position = 'center',
  closeOnBackdrop = true,
  showCloseButton = false,
  containerStyle,
  ...props
}) => {

  // 使用 useMemo 缓存动态样式计算
  const overlayStyle = useMemo((): ViewStyle => {
    const positionStyleMap = {
      center: styles.positionCenter,
      bottom: styles.positionBottom,
      top: styles.positionTop,
    };

    return {
      ...styles.overlay,
      ...positionStyleMap[position],
    };
  }, [position]);

  const modalStyle = useMemo((): ViewStyle => {
    const sizeStyleMap = {
      sm: styles.sizeSmall,
      md: styles.sizeMedium,
      lg: styles.sizeLarge,
      full: styles.sizeFull,
    };

    const borderRadiusStyleMap = {
      center: styles.borderRadiusCenter,
      bottom: styles.borderRadiusBottom,
      top: styles.borderRadiusTop,
    };

    return {
      ...styles.container,
      ...sizeStyleMap[size],
      ...borderRadiusStyleMap[position],
    };
  }, [size, position]);

  const handleBackdropPress = () => {
    if (closeOnBackdrop) {
      onClose();
    }
  };

  return (
    <RNModal
      visible={isVisible}
      transparent
      animationType={position === 'bottom' ? 'slide' : 'fade'}
      onRequestClose={onClose}
      {...props}
    >
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <View style={overlayStyle}>
          <TouchableWithoutFeedback>
            <View style={[modalStyle, containerStyle]}>
              {showCloseButton && (
                <TouchableOpacity
                  onPress={onClose}
                  style={styles.closeButton}
                >
                  {/* 这里可以放置关闭图标 */}
                  <View
                    style={[
                      styles.closeIconLine,
                      styles.closeIconLine45
                    ]}
                  />
                  <View
                    style={[
                      styles.closeIconLine,
                      styles.closeIconLineNeg45
                    ]}
                  />
                </TouchableOpacity>
              )}
              {children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

// 静态样式定义
const styles = StyleSheet.create({
  // 遮罩层
  overlay: {
    flex: 1,
    backgroundColor: colors.background.overlay,
  },
  // 位置样式
  positionCenter: {
    ...layoutStyles.center,
    padding: spacing[4],
  },
  positionBottom: {
    justifyContent: 'flex-end',
  },
  positionTop: {
    justifyContent: 'flex-start',
    paddingTop: spacing[12],
  },
  // 模态框容器
  container: {
    backgroundColor: colors.background.modal,
    ...shadows.xl,
  },
  // 尺寸样式
  sizeSmall: {
    maxWidth: 320,
    width: '80%',
  },
  sizeMedium: {
    maxWidth: 400,
    width: '90%',
  },
  sizeLarge: {
    maxWidth: 600,
    width: '95%',
  },
  sizeFull: {
    width: '100%',
    height: '100%',
  },
  // 边框半径样式
  borderRadiusCenter: {
    borderRadius: borderRadius['2xl'],
    maxHeight: '80%',
  },
  borderRadiusBottom: {
    borderTopLeftRadius: borderRadius['2xl'],
    borderTopRightRadius: borderRadius['2xl'],
    width: '100%',
    maxHeight: '90%',
  },
  borderRadiusTop: {
    borderBottomLeftRadius: borderRadius['2xl'],
    borderBottomRightRadius: borderRadius['2xl'],
    width: '100%',
    maxHeight: '80%',
  },
  // 关闭按钮
  closeButton: {
    position: 'absolute',
    top: spacing[3],
    right: spacing[3],
    zIndex: 1,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.neutral[100],
    ...layoutStyles.center,
  },
  // 关闭图标线条
  closeIconLine: {
    width: 16,
    height: 2,
    backgroundColor: colors.neutral[600],
    position: 'absolute',
  },
  closeIconLine45: {
    transform: [{ rotate: '45deg' }],
  },
  closeIconLineNeg45: {
    transform: [{ rotate: '-45deg' }],
  },
});
