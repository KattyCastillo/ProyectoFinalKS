import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';

interface ScreenWrapperProps {
  children: React.ReactNode;
  style?: ViewStyle;
  backgroundColor?: string;
  edges?: Edge[];
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  style,
  backgroundColor = '#FFFFFF',
  edges = ['top', 'right', 'left', 'bottom'],
}) => {
  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]} edges={edges}>
      <View style={[styles.content, style]}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});

export default ScreenWrapper;
