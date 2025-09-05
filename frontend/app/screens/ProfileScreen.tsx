// app/screens/ProfileScreen.tsx
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';

export default function ProfileScreen() {
  const navigation = useNavigation();

  const stats = [
    { label: 'Verses Read', value: '1,247', icon: 'book' },
    { label: 'Time Spent', value: '24h 30m', icon: 'time' },
    { label: 'Accuracy', value: '94%', icon: 'checkmark-circle' },
    { label: 'Streak', value: '7 days', icon: 'flame' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Auth' as never)}>
            <Ionicons name="log-out" size={24} color={Colors.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}><Text style={styles.avatarText}>A</Text></View>
          <Text style={styles.userName}>Anonymous User</Text>
          <Text style={styles.userEmail}>user@example.com</Text>

          <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('Auth' as never)}>
            <Text style={styles.editButtonText}>Sign In / Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Your Progress</Text>
          <View style={styles.statsGrid}>
            {stats.map((s, i) => (
              <View key={i} style={styles.statCard}>
                <Ionicons name={s.icon as any} size={24} color={Colors.accent} />
                <Text style={styles.statValue}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.activityContainer}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityCard}>
            <View style={styles.activityItem}>
              <View style={styles.activityDot} />
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>Completed Al-Baqarah verse 1-5</Text>
                <Text style={styles.activityTime}>2 hours ago</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <View style={styles.activityDot} />
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>Practiced Al-Fatihah</Text>
                <Text style={styles.activityTime}>Yesterday</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15, backgroundColor: Colors.card },
  headerTitle: { color: Colors.white, fontSize: 20, fontWeight: 'bold' },
  profileCard: { alignItems: 'center', padding: 20, backgroundColor: Colors.card, marginHorizontal: 20, marginTop: 20, borderRadius: 15 },
  avatarContainer: { width: 80, height: 80, borderRadius: 40, backgroundColor: Colors.accent, justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  avatarText: { fontSize: 36, color: Colors.white, fontWeight: 'bold' },
  userName: { fontSize: 18, color: Colors.white, fontWeight: '600', marginBottom: 5 },
  userEmail: { fontSize: 14, color: Colors.muted, marginBottom: 15 },
  editButton: { backgroundColor: Colors.accent, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20 },
  editButtonText: { color: Colors.white, fontWeight: '600' },

  statsContainer: { padding: 20 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  statCard: { width: '48%', backgroundColor: Colors.card, padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 15 },
  statValue: { fontSize: 20, color: Colors.white, fontWeight: 'bold', marginVertical: 5 },
  statLabel: { fontSize: 12, color: Colors.muted },

  activityContainer: { padding: 20 },
  activityCard: { backgroundColor: Colors.card, padding: 15, borderRadius: 10 },
  activityItem: { flexDirection: 'row', marginBottom: 15 },
  activityDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.accent, marginTop: 5, marginRight: 10 },
  activityContent: { flex: 1 },
  activityText: { color: Colors.white, fontSize: 14, marginBottom: 3 },
  activityTime: { color: Colors.muted, fontSize: 12 },
});
