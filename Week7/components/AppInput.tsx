import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import {
  KeyboardTypeOptions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

import { Colors } from '@/constants/colors';

type Props = TextInputProps & {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  keyboardType?: KeyboardTypeOptions;
  error?: string;
};

export function AppInput({ label, icon, error, secureTextEntry, style, ...props }: Props) {
  const [hidden, setHidden] = useState(Boolean(secureTextEntry));
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.field, error && styles.fieldError]}>
        {icon ? <Ionicons name={icon} size={20} color={Colors.muted} /> : null}
        <TextInput
          {...props}
          secureTextEntry={secureTextEntry ? hidden : false}
          placeholderTextColor="#9CA3AF"
          style={[styles.input, style]}
        />
        {secureTextEntry ? (
          <Pressable onPress={() => setHidden((value) => !value)} hitSlop={10}>
            <Ionicons name={hidden ? 'eye-outline' : 'eye-off-outline'} size={21} color={Colors.muted} />
          </Pressable>
        ) : null}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: 7 },
  label: { color: Colors.text, fontSize: 14, fontWeight: '600' },
  field: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 14,
    paddingHorizontal: 14,
  },
  fieldError: { borderColor: Colors.danger },
  input: { flex: 1, color: Colors.text, fontSize: 16, paddingVertical: 12 },
  error: { color: Colors.danger, fontSize: 12 },
});
