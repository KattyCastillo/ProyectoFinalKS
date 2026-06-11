import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ViewStyle,
  Text,
} from 'react-native';

interface CustomInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'decimal-pad';
  style?: ViewStyle;
  label?: string;
  error?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  style,
  label,
  error,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        style={[
          styles.input,
          {
            borderColor: isFocused ? '#2E7D32' : '#CCCCCC',
            borderWidth: 1.5,
          },
          error ? { borderColor: '#D32F2F' } : {},
        ]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholderTextColor="#999999"
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 6,
  },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    fontSize: 16,
    color: '#333333',
    backgroundColor: '#FAFAFA',
  },
  errorText: {
    fontSize: 12,
    color: '#D32F2F',
    marginTop: 4,
  },
});

export default CustomInput;
