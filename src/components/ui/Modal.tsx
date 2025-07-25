import React from 'react';
import {
  Modal as RNModal,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ViewStyle,
  ModalProps as RNModalProps,
} from 'react-native';
import { colors, spacing, borderRadius, shadows } from '@/styles';

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
  const getOverlayStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      flex: 1,
      backgroundColor: colors.background.overlay,
    };

    const positionStyles: Record<typeof position, ViewStyle> = {
      center: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing[4],
      },
      bottom: {
        justifyContent: 'flex-end',
      },
      top: {
        justifyContent: 'flex-start',
        paddingTop: spacing[12],
      },
    };

    return {
      ...baseStyle,
      ...positionStyles[position],
    };
  };

  const getModalStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      backgroundColor: colors.background.modal,
      ...shadows.xl,
    };

    const sizeStyles: Record<typeof size, ViewStyle> = {
      sm: {
        maxWidth: 320,
        width: '80%',
      },
      md: {
        maxWidth: 400,
        width: '90%',
      },
      lg: {
        maxWidth: 600,
        width: '95%',
      },
      full: {
        width: '100%',
        height: '100%',
      },
    };

    const positionStyles: Record<typeof position, ViewStyle> = {
      center: {
        borderRadius: borderRadius['2xl'],
        maxHeight: '80%',
      },
      bottom: {
        borderTopLeftRadius: borderRadius['2xl'],
        borderTopRightRadius: borderRadius['2xl'],
        width: '100%',
        maxHeight: '90%',
      },
      top: {
        borderBottomLeftRadius: borderRadius['2xl'],
        borderBottomRightRadius: borderRadius['2xl'],
        width: '100%',
        maxHeight: '80%',
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...positionStyles[position],
    };
  };

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
        <View style={getOverlayStyle()}>
          <TouchableWithoutFeedback>
            <View style={[getModalStyle(), containerStyle]}>
              {showCloseButton && (
                <TouchableOpacity
                  onPress={onClose}
                  style={{
                    position: 'absolute',
                    top: spacing[3],
                    right: spacing[3],
                    zIndex: 1,
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: colors.neutral[100],
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {/* 这里可以放置关闭图标 */}
                  <View
                    style={{
                      width: 16,
                      height: 2,
                      backgroundColor: colors.neutral[600],
                      transform: [{ rotate: '45deg' }],
                      position: 'absolute',
                    }}
                  />
                  <View
                    style={{
                      width: 16,
                      height: 2,
                      backgroundColor: colors.neutral[600],
                      transform: [{ rotate: '-45deg' }],
                      position: 'absolute',
                    }}
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