// components/ProgressTracker.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '../constants/Colors';

export default function ProgressTracker({ progress = 0 }: { progress?: number }) {
  return (
    <View style={styles.container}>
      <View style={[styles.fill, { width: `${Math.min(100, Math.max(0, progress*100))}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { height: 6, backgroundColor: '#333', borderRadius: 3, overflow: 'hidden' },
  fill: { height: '100%', backgroundColor: Colors.accent },
});
