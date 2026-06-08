import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  SafeAreaView,
} from 'react-native';

interface ScreenWrapperProps {
  children: React.ReactNode;
  style?: ViewStyle;
  backgroundColor?: string;
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  style,
  backgroundColor = '#FFFFFF',
}) => {
  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
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
