// app/screens/SettingsScreen.tsx
import Slider from '@react-native-community/slider';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';

export default function SettingsScreen() {
  const [arabicFontSize, setArabicFontSize] = useState(26);
  const [translationEnabled, setTranslationEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [autoScroll, setAutoScroll] = useState(false);
  const [recitationSpeed, setRecitationSpeed] = useState(1.0);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [dailyReminder, setDailyReminder] = useState(true);

  const renderSettingItem = (label: string, right: React.ReactNode) => (
    <View style={styles.settingItem}>
      <Text style={styles.settingLabel}>{label}</Text>
      {right}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}><Text style={styles.headerTitle}>Settings</Text></View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Display</Text>
          {renderSettingItem('Arabic Font Size', (
            <View style={{ width: 180 }}>
              <Text style={styles.sliderValue}>{Math.round(arabicFontSize)}</Text>
              <Slider minimumValue={18} maximumValue={36} value={arabicFontSize} onValueChange={setArabicFontSize} />
            </View>
          ))}
          {renderSettingItem('Show Translation', <Switch value={translationEnabled} onValueChange={setTranslationEnabled} />)}
          {renderSettingItem('Dark Mode', <Switch value={darkMode} onValueChange={setDarkMode} />)}
          {renderSettingItem('Auto Scroll', <Switch value={autoScroll} onValueChange={setAutoScroll} />)}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Audio</Text>
          {renderSettingItem('Recitation Speed', (
            <View style={{ width: 180 }}>
              <Text style={styles.sliderValue}>{recitationSpeed.toFixed(1)}x</Text>
              <Slider minimumValue={0.5} maximumValue={2.0} value={recitationSpeed} onValueChange={setRecitationSpeed} step={0.1} />
            </View>
          ))}
          {renderSettingItem('Reciter', (
            <TouchableOpacity style={styles.selectValue}>
              <Text style={styles.selectText}>Mishary Rashid</Text>
              <Ionicons name="chevron-forward" size={18} color={Colors.muted} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          {renderSettingItem('Enable Notifications', <Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} />)}
          {renderSettingItem('Daily Reminder', <Switch value={dailyReminder} onValueChange={setDailyReminder} />)}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <TouchableOpacity style={styles.settingItem}><Text style={styles.settingLabel}>Backup Progress</Text><Ionicons name="cloud-upload" size={18} color={Colors.accent} /></TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}><Text style={styles.settingLabel}>Restore Progress</Text><Ionicons name="cloud-download" size={18} color={Colors.accent} /></TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}><Text style={styles.settingLabel}>Privacy Policy</Text><Ionicons name="shield-checkmark" size={18} color={Colors.accent} /></TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.settingItem}><Text style={styles.settingLabel}>Version</Text><Text style={styles.infoValue}>1.0.0</Text></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: 20, paddingVertical: 14, backgroundColor: Colors.card },
  headerTitle: { color: Colors.white, fontSize: 18, fontWeight: 'bold' },
  section: { padding: 16, marginTop: 8 },
  sectionTitle: { color: Colors.white, fontSize: 16, fontWeight: '600', marginBottom: 12 },
  settingItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, backgroundColor: Colors.surface, borderRadius: 8, paddingHorizontal: 12, marginBottom: 8 },
  settingLabel: { color: Colors.white, fontSize: 14 },
  sliderValue: { color: Colors.muted, textAlign: 'right', marginBottom: 6 },
  selectValue: { flexDirection: 'row', alignItems: 'center' },
  selectText: { color: Colors.muted, marginRight: 6 },
  infoValue: { color: Colors.muted }
});
