// components/QuranReader.tsx
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';

const verses = [
  'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
  'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
  'الرَّحْمَٰنِ الرَّحِيمِ',
  'مَالِكِ يَوْمِ الدِّينِ',
  'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
  'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
];

export default function QuranReader({ onMistakesChanged }: { onMistakesChanged?: (n:number)=>void }) {
  return (
    <View>
      {verses.map((v, i) => (
        <TouchableOpacity key={i} style={styles.verseContainer}>
          <View style={styles.verseNumber}><Text style={styles.numText}>{i+1}</Text></View>
          <Text style={styles.arabicText}>{v}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  verseContainer: { flexDirection: 'row', alignItems: 'flex-start', marginVertical: 15 },
  verseNumber: { width: 30, height: 30, borderRadius: 15, borderWidth: 1, borderColor: '#444', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  numText: { color: Colors.muted, fontSize: 12 },
  arabicText: { color: Colors.white, fontSize: 26, lineHeight: 40, textAlign: 'right', flex: 1 },
});
