import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { User, Settings, Bell, HelpCircle, LogOut, ChevronRight, Award, BookOpen, Clock } from 'lucide-react-native';
import { blink } from '@/blink/client';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await blink.auth.me();
      setUser(userData);
    } catch (error) {
      console.log('Error loading user');
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Выход',
      'Вы уверены, что хотите выйти?',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Выйти',
          style: 'destructive',
          onPress: async () => {
            await blink.auth.logout();
            router.replace('/(auth)/login');
          }
        }
      ]
    );
  };

  const menuItems = [
    { 
      icon: Settings, 
      title: 'Настройки', 
      subtitle: 'Управление аккаунтом',
      color: '#6366F1' 
    },
    { 
      icon: Bell, 
      title: 'Уведомления', 
      subtitle: 'Настройки оповещений',
      color: '#8B5CF6' 
    },
    { 
      icon: HelpCircle, 
      title: 'Помощь и поддержка', 
      subtitle: 'FAQ и контакты',
      color: '#EC4899' 
    },
  ];

  const stats = [
    { icon: BookOpen, label: 'Курсов', value: '12', color: '#6366F1' },
    { icon: Clock, label: 'Часов', value: '48', color: '#8B5CF6' },
    { icon: Award, label: 'Наград', value: '8', color: '#EC4899' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Профиль</Text>
      </View>

      {/* User Info Card */}
      <View style={styles.userCard}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <User size={40} color="#FFFFFF" />
          </View>
        </View>
        <Text style={styles.userName}>{user?.email?.split('@')[0] || 'Студент'}</Text>
        <Text style={styles.userEmail}>{user?.email || 'student@eljunior.com'}</Text>
        
        {/* Stats */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <View key={index} style={styles.statItem}>
                <View style={[styles.statIcon, { backgroundColor: `${stat.color}15` }]}>
                  <IconComponent size={20} color={stat.color} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <View style={[styles.menuIcon, { backgroundColor: `${item.color}15` }]}>
                <IconComponent size={24} color={item.color} />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <ChevronRight size={20} color="#94A3B8" />
            </TouchableOpacity>
          );
        })}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <View style={[styles.menuIcon, { backgroundColor: '#EF444415' }]}>
            <LogOut size={24} color="#EF4444" />
          </View>
          <View style={styles.menuContent}>
            <Text style={[styles.menuTitle, { color: '#EF4444' }]}>Выйти</Text>
            <Text style={styles.menuSubtitle}>Выход из аккаунта</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* App Info */}
      <View style={styles.appInfo}>
        <Text style={styles.appInfoText}>ElJunior v1.0.0</Text>
        <Text style={styles.appInfoText}>© 2024 ElJunior. Все права защищены.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  userCard: {
    backgroundColor: '#F8FAFC',
    marginHorizontal: 20,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#6366F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  statItem: {
    alignItems: 'center',
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  menuContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  menuIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 13,
    color: '#64748B',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingBottom: 40,
  },
  appInfoText: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 4,
  },
});
