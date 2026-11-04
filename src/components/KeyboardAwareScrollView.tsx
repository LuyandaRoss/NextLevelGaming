import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ScrollViewProps,
  StyleSheet,
} from 'react-native';

type Props = ScrollViewProps & {
  children: React.ReactNode;
  keyboardVerticalOffset?: number;
};

export function KeyboardAwareScrollView({
  children,
  keyboardVerticalOffset = 0,
  style,
  contentContainerStyle,
  ...scrollViewProps
}: Props) {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <ScrollView
        {...scrollViewProps}
        style={[styles.scrollView, style]}
        contentContainerStyle={contentContainerStyle}
        keyboardShouldPersistTaps={scrollViewProps.keyboardShouldPersistTaps ?? 'handled'}
        keyboardDismissMode={scrollViewProps.keyboardDismissMode ?? (Platform.OS === 'ios' ? 'interactive' : 'on-drag')}
        automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: { flex: 1 },
});
