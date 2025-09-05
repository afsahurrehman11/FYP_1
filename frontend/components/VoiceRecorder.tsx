// components/VoiceRecorder.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';

export default function VoiceRecorder({ isRecording, onToggle, style }: { isRecording?: boolean, onToggle: ()=>void, style?: any }) {
  return (
    <View style={[{ position: 'absolute', bottom: 80, right: 20 }, style]}>
      <TouchableOpacity style={[styles.button, isRecording && styles.recording]} onPress={onToggle}>
        <Ionicons name={isRecording ? 'stop' : 'mic'} size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 70, height: 70, borderRadius: 35, backgroundColor: Colors.accent, justifyContent: 'center', alignItems: 'center', elevation: 6,
  },
  recording: {
    backgroundColor: Colors.danger,
  },
});
