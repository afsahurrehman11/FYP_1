// app/screens/HomeScreen.tsx
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProgressTracker from '../../components/ProgressTracker';
import QuranReader from '../../components/QuranReader';
import VoiceRecorder from '../../components/VoiceRecorder';
import Colors from '../../constants/Colors';
import SurahParaSelector from '../../components/SurahParaSelector';   // 👈 new import

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [isRecording, setIsRecording] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);  // 👈 new state
  const [selectedPara, setSelectedPara] = useState<number | null>(null);    // 👈 new state
  const navigation = useNavigation();

  const toggleRecording = () => setIsRecording(v => !v);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu" size={24} color={Colors.white} />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.surahName}>Al-Fatihah</Text>
          <Text style={styles.pageInfo}>Page 1 | Juz 1</Text>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="gift" size={22} color="#FFA726" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="bookmark" size={22} color={Colors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('Settings')}
          >
            <Ionicons name="settings" size={22} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 👇 New Surah/Para Selector */}
      <View style={{ marginVertical: 10, paddingHorizontal: 20 }}>
        <SurahParaSelector
          onSurahSelect={(id) => setSelectedSurah(id)}
          onParaSelect={(id) => setSelectedPara(id)}
        />
        {(selectedSurah || selectedPara) && (
          <Text style={{ color: Colors.white, marginTop: 8, textAlign: 'center' }}>
            {selectedSurah ? `Selected Surah: ${selectedSurah}` : ''}
            {selectedPara ? ` | Selected Para: ${selectedPara}` : ''}
          </Text>
        )}
      </View>

      <View style={styles.surahHeader}>
        <View style={styles.decorativeBorder}>
          <Text style={styles.surahTitle}>سُورَةُ الفَاتِحَة</Text>
        </View>
      </View>

      <ScrollView style={styles.versesContainer} showsVerticalScrollIndicator={false}>
        <QuranReader onMistakesChanged={(m) => setMistakes(m)} />
      </ScrollView>

      <View style={styles.bottomContainer}>
        <View style={styles.mistakesContainer}>
          <TouchableOpacity style={styles.mistakeButton}>
            <Text style={styles.mistakeText}>Mistakes</Text>
            <View style={styles.mistakeBadge}>
              <Text style={styles.mistakeCount}>{mistakes}</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.controlButtons}>
            <TouchableOpacity style={styles.controlButton}>
              <Ionicons name="book-outline" size={20} color={Colors.muted} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlButton}>
              <Ionicons name="pencil-outline" size={20} color={Colors.muted} />
            </TouchableOpacity>
          </View>
        </View>

        <VoiceRecorder isRecording={isRecording} onToggle={toggleRecording} style={styles.voice} />

        <View style={styles.progressBox}>
          <ProgressTracker progress={0.3} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 10, backgroundColor: Colors.card,
  },
  menuButton: { padding: 5 },
  headerCenter: { flex: 1, marginLeft: 15 },
  surahName: { color: Colors.white, fontSize: 16, fontWeight: '600' },
  pageInfo: { color: Colors.muted, fontSize: 12, marginTop: 2 },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  iconButton: { padding: 5, marginLeft: 12 },

  surahHeader: { alignItems: 'center', paddingVertical: 15 },
  decorativeBorder: { borderWidth: 2, borderColor: '#444', borderRadius: 10, paddingHorizontal: 30, paddingVertical: 10, backgroundColor: Colors.surface },
  surahTitle: { color: Colors.white, fontSize: 24, fontWeight: 'bold', textAlign: 'center' },

  versesContainer: { flex: 1, paddingHorizontal: 20 },

  bottomContainer: { paddingHorizontal: 20, paddingBottom: 20 },
  mistakesContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  mistakeButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface, paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20 },
  mistakeText: { color: Colors.white, marginRight: 8 },
  mistakeBadge: { backgroundColor: Colors.danger, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2 },
  mistakeCount: { color: Colors.white, fontSize: 12, fontWeight: 'bold' },

  controlButtons: { flexDirection: 'row' },
  controlButton: { padding: 10, marginLeft: 10 },

  voice: { position: 'absolute', bottom: 80, right: 20 },

  progressBox: { marginTop: 8 },
});
