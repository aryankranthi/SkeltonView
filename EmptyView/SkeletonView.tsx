import React, { useEffect } from 'react';
import {
  StyleSheet, Animated, Easing, StyleProp, ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@shopify/restyle';
import Box from '../../Box';
import { Theme } from '../../../../theme';

export interface Props {
  highlightColor?: string,
  backgroundColor?: string,
  speed?: number,
  height?: number,
  width?: number,
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>
}

const Skeleton = (props: Props) => {
  const theme = useTheme<Theme>();
  const {
    highlightColor = theme.colors.skeltonHighlightColor,
    backgroundColor = theme.colors.skeltonBackgroundColor,
    speed = 1000,
    height = 8,
    width = 100,
    children,
    style,
  } = props;
  const animatedValue = new Animated.Value(0);

  const AnimatedLG = Animated.createAnimatedComponent(LinearGradient);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: speed,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  });

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  return (
    <Box style={[style, {
      backgroundColor,
      borderColor: highlightColor,
      height,
      width,
      overflow: 'hidden',
    }]}
    >
      <AnimatedLG
        colors={[backgroundColor, highlightColor, highlightColor, backgroundColor]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          ...StyleSheet.absoluteFillObject,
          transform: [{ translateX }],
        }}
      />
      {children}
    </Box>
  );
};

export default Skeleton;
