import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function SettingsScreen() {
  const [arabicFontSize, setArabicFontSize] = useState(26);
  const [translationEnabled, setTranslationEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [autoScroll, setAutoScroll] = useState(false);
  const [recitationSpeed, setRecitationSpeed] = useState(1.0);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [dailyReminder, setDailyReminder] = useState(true);

  const settingSections = [
    {
      title: 'Display Settings',
      items: [
        {
          label: 'Arabic Font Size',
          type: 'slider',
          value: arabicFontSize,
          onChange: setArabicFontSize,
          min: 18,
          max: 36,
        },
        {
          label: 'Show Translation',
          type: 'switch',
          value: translationEnabled,
          onChange: setTranslationEnabled,
        },
        {
          label: 'Dark Mode',
          type: 'switch',
          value: darkMode,
          onChange: setDarkMode,
        },
        {
          label: 'Auto Scroll',
          type: 'switch',
          value: autoScroll,
          onChange: setAutoScroll,
        },
      ],
    },
    {
      title: 'Audio Settings',
      items: [
        {
          label: 'Recitation Speed',
          type: 'slider',
          value: recitationSpeed,
          onChange: setRecitationSpeed,
          min: 0.5,
          max: 2.0,
          step: 0.1,
        },
        {
          label: 'Reciter',
          type: 'select',
          value: 'Mishary Rashid',
        },
      ],
    },
    {
      title: 'Notifications',
      items: [
        {
          label: 'Enable Notifications',
          type: 'switch',
          value: notificationsEnabled,
          onChange: setNotificationsEnabled,
        },
        {
          label: 'Daily Reminder',
          type: 'switch',
          value: dailyReminder,
          onChange: setDailyReminder,
        },
        {
          label: 'Reminder Time',
          type: 'select',
          value: '8:00 AM',
        },
      ],
    },
    {
      title: 'Account',
      items: [
        {
          label: 'Backup Progress',
          type: 'button',
          icon: 'cloud-upload',
        },
        {
          label: 'Restore Progress',
          type: 'button',
          icon: 'cloud-download',
        },
        {
          label: 'Privacy Policy',
          type: 'button',
          icon: 'shield-checkmark',
        },
        {
          label: 'Terms of Service',
          type: 'button',
          icon: 'document-text',
        },
      ],
    },
    {
      title: 'About',
      items: [
        {
          label: 'Version',
          type: 'info',
          value: '1.0.0',
        },
        {
          label: 'Rate Us',
          type: 'button',
          icon: 'star',
        },
        {
          label: 'Share App',
          type: 'button',
          icon: 'share-social',
        },
      ],
    },
  ];

  const renderSettingItem = (item: any, index: number) => {
    switch (item.type) {
      case 'switch':
        return (
          <View key={index} style={styles.settingItem}>
            <Text style={styles.settingLabel}>{item.label}</Text>
            <Switch
              value={item.value}
              onValueChange={item.onChange}
              trackColor={{ false: '#333', true: '#4CAF50' }}
              thumbColor={item.value ? '#fff' : '#888'}
            />
          </View>
        );
      
      case 'slider':
        return (
          <View key={index} style={styles.sliderItem}>
            <View style={styles.sliderHeader}>
              <Text style={styles.settingLabel}>{item.label}</Text>
              <Text style={styles.sliderValue}>
                {item.label.includes('Speed') ? `${item.value.toFixed(1)}x` : Math.round(item.value)}
              </Text>
            </View>
            <Slider
              style={styles.slider}
              minimumValue={item.min}
              maximumValue={item.max}
              value={item.value}
              onValueChange={item.onChange}
              step={item.step || 1}
              minimumTrackTintColor="#4CAF50"
              maximumTrackTintColor="#333"
              thumbTintColor="#4CAF50"
            />
          </View>
        );
      
      case 'select':
        return (
          <TouchableOpacity key={index} style={styles.settingItem}>
            <Text style={styles.settingLabel}>{item.label}</Text>
            <View style={styles.selectValue}>
              <Text style={styles.selectText}>{item.value}</Text>
              <Ionicons name="chevron-forward" size={20} color="#888" />
            </View>
          </TouchableOpacity>
        );
      
      case 'button':
        return (
          <TouchableOpacity key={index} style={styles.settingItem}>
            <View style={styles.buttonLeft}>
              {item.icon && <Ionicons name={item.icon} size={20} color="#4CAF50" style={styles.buttonIcon} />}
              <Text style={styles.settingLabel}>{item.label}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#888" />
          </TouchableOpacity>
        );
      
      case 'info':
        return (
          <View key={index} style={styles.settingItem}>
            <Text style={styles.settingLabel}>{item.label}</Text>
            <Text style={styles.infoValue}>{item.value}</Text>
          </View>
        );
      
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {settingSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map((item, itemIndex) => renderSettingItem(item, itemIndex))}
            </View>
          </View>
        ))}
        
        <TouchableOpacity style={styles.signOutButton}>
          <Ionicons name="log-out" size={20} color="#f44336" />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    padding: 16,
    backgroundColor: '#111',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#aaa',
    marginBottom: 8,
  },
  sectionContent: {
    backgroundColor: '#222',
    borderRadius: 8,
    paddingVertical: 4,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  settingLabel: {
    color: '#fff',
    fontSize: 16,
  },
  sliderItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  sliderValue: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  selectValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectText: {
    color: '#fff',
    marginRight: 6,
  },
  buttonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonIcon: {
    marginRight: 10,
  },
  infoValue: {
    color: '#888',
    fontSize: 15,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    margin: 20,
    borderRadius: 8,
    backgroundColor: '#2a2a2a',
  },
  signOutText: {
    color: '#f44336',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '600',
  },
});
