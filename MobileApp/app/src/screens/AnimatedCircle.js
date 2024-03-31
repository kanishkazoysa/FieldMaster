import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

const AnimatedCircle = ({ coordinate, radius, color }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    startAnimation();

    return () => {
      stopAnimation();
    };
  }, []);

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.elastic(1),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.5,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopAnimation = () => {
    scaleAnim.stopAnimation();
    pulseAnim.stopAnimation();
  };

  return (
    <Animated.View
      style={{
        position: 'absolute',
        transform: [
          { scale: scaleAnim },
          { translateX: -radius },
          { translateY: -radius },
        ],
        opacity: pulseAnim,
        backgroundColor: color,
        borderRadius: radius,
        width: radius * 2,
        height: radius * 2,
      }}
    />
  );
};

export default AnimatedCircle;