import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
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
import SurahParaSelector from '../../components/SurahParaSelector'; // 👉 new line added


const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentJuz, setCurrentJuz] = useState(1);
  const [currentHizb, setCurrentHizb] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [mistakes, setMistakes] = useState(0);

  const [selectedSurah, setSelectedSurah] = useState<number | null>(null); // 👉 new line added
  const [selectedPara, setSelectedPara] = useState<number | null>(null);   // 👉 new line added

  const router = useRouter();

  const verses = [
    { id: 1, arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', number: 1 },
    { id: 2, arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', number: 2 },
    { id: 3, arabic: 'الرَّحْمَٰنِ الرَّحِيمِ', number: 3 },
    { id: 4, arabic: 'مَالِكِ يَوْمِ الدِّينِ', number: 4 },
    { id: 5, arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ', number: 5 },
    { id: 6, arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ', number: 6 },
    { id: 7, arabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ', number: 7 },
  ];

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu" size={24} color="#fff" />
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <Text style={styles.surahName}>Al-Fatihah</Text>
          <Text style={styles.pageInfo}>Page {currentPage} | Juz {currentJuz} | Hizb {currentHizb}</Text>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="gift" size={22} color="#FFA726" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="bookmark" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => router.push('/settings')}
          >
            <Ionicons name="settings" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Surah & Para Selector */}
      <View style={{ marginVertical: 10 }}> 
        <SurahParaSelector 
          selectedSurah={selectedSurah}              // 👉 new line added
          setSelectedSurah={setSelectedSurah}        // 👉 new line added
          selectedPara={selectedPara}                // 👉 new line added
          setSelectedPara={setSelectedPara}          // 👉 new line added
        />
      </View>
      {/* Surah Header */}
      <View style={styles.surahHeader}>
        <View style={styles.decorativeBorder}>
          <Text style={styles.surahTitle}>سُورَةُ الفَاتِحَة</Text>
        </View>
      </View>

      {/* Verses */}
      <ScrollView style={styles.versesContainer} showsVerticalScrollIndicator={false}>
        {verses.map((verse) => (
          <TouchableOpacity key={verse.id} style={styles.verseContainer}>
            <View style={styles.verseNumber}>
              <Text style={styles.verseNumberText}>{verse.number}</Text>
            </View>
            <Text style={styles.arabicText}>{verse.arabic}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Controls */}
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
              <Ionicons name="book-outline" size={20} color="#888" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlButton}>
              <MaterialIcons name="edit" size={20} color="#888" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Recording Button */}
        <TouchableOpacity 
          style={[styles.recordButton, isRecording && styles.recordingActive]}
          onPress={toggleRecording}
        >
          <LinearGradient
            colors={isRecording ? ['#f44336', '#d32f2f'] : ['#4CAF50', '#45a049']}
            style={styles.recordButtonGradient}
          >
            <Ionicons 
              name={isRecording ? "stop" : "mic"} 
              size={32} 
              color="#fff" 
            />
          </LinearGradient>
        </TouchableOpacity>

        {/* Progress Bar */}
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '30%' }]} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#222',
  },
  menuButton: {
    padding: 5,
  },
  headerCenter: {
    flex: 1,
    marginLeft: 15,
  },
  surahName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  pageInfo: {
    color: '#888',
    fontSize: 12,
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 5,
    marginLeft: 15,
  },
  surahHeader: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  decorativeBorder: {
    borderWidth: 2,
    borderColor: '#444',
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: '#2a2a2a',
  },
  surahTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  versesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  verseContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 15,
  },
  verseNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#444',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  verseNumberText: {
    color: '#888',
    fontSize: 12,
  },
  arabicText: {
    flex: 1,
    color: '#fff',
    fontSize: 26,
    lineHeight: 40,
    textAlign: 'right',
    fontFamily: 'System',
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  mistakesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  mistakeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  mistakeText: {
    color: '#fff',
    marginRight: 8,
  },
  mistakeBadge: {
    backgroundColor: '#f44336',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  mistakeCount: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  controlButtons: {
    flexDirection: 'row',
  },
  controlButton: {
    padding: 10,
    marginLeft: 10,
  },
  recordButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    zIndex: 10,
  },
  recordingActive: {
    transform: [{ scale: 1.1 }],
  },
  recordButtonGradient: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
});