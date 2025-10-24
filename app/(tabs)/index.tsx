import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { Search, Play, Clock, Star, BookOpen, TrendingUp } from 'lucide-react-native';
import { blink } from '@/blink/client';
import { router } from 'expo-router';

interface Course {
  id: string;
  title: string;
  category: string;
  duration: string;
  rating: number;
  enrolled: number;
  thumbnail: string;
  instructor: string;
}

export default function HomeScreen() {
  const [user, setUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);

  useEffect(() => {
    loadUser();
    loadCourses();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await blink.auth.me();
      setUser(userData);
    } catch (error) {
      console.log('Not authenticated');
    }
  };

  const loadCourses = async () => {
    // Mock data for demo
    setFeaturedCourses([
      {
        id: '1',
        title: 'Основы программирования на Python',
        category: 'Программирование',
        duration: '8 недель',
        rating: 4.8,
        enrolled: 1234,
        thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400',
        instructor: 'Иван Петров'
      },
      {
        id: '2',
        title: 'Веб-разработка: HTML, CSS, JavaScript',
        category: 'Веб-разработка',
        duration: '10 недель',
        rating: 4.9,
        enrolled: 2156,
        thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400',
        instructor: 'Анна Смирнова'
      },
      {
        id: '3',
        title: 'Математика для программистов',
        category: 'Математика',
        duration: '6 недель',
        rating: 4.7,
        enrolled: 892,
        thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400',
        instructor: 'Дмитрий Козлов'
      }
    ]);
  };

  const stats = [
    { icon: BookOpen, label: 'Курсов', value: '150+', color: '#6366F1' },
    { icon: Clock, label: 'Часов контента', value: '500+', color: '#8B5CF6' },
    { icon: TrendingUp, label: 'Студентов', value: '10k+', color: '#EC4899' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Привет! 👋</Text>
          <Text style={styles.userName}>{user?.email || 'Студент'}</Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Search size={20} color="#94A3B8" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Поиск курсов..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <View key={index} style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: `${stat.color}15` }]}>
                <IconComponent size={24} color={stat.color} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          );
        })}
      </View>

      {/* Featured Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Популярные курсы</Text>
        
        {featuredCourses.map((course) => (
          <TouchableOpacity 
            key={course.id} 
            style={styles.courseCard}
            onPress={() => router.push('/(tabs)/courses')}
          >
            <Image 
              source={{ uri: course.thumbnail }} 
              style={styles.courseThumbnail}
            />
            <View style={styles.courseContent}>
              <Text style={styles.courseCategory}>{course.category}</Text>
              <Text style={styles.courseTitle} numberOfLines={2}>
                {course.title}
              </Text>
              <Text style={styles.courseInstructor}>{course.instructor}</Text>
              
              <View style={styles.courseFooter}>
                <View style={styles.courseInfo}>
                  <Star size={16} color="#F59E0B" fill="#F59E0B" />
                  <Text style={styles.courseRating}>{course.rating}</Text>
                </View>
                <View style={styles.courseInfo}>
                  <Clock size={16} color="#64748B" />
                  <Text style={styles.courseDuration}>{course.duration}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Continue Learning */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Продолжить обучение</Text>
        <TouchableOpacity style={styles.continueCard}>
          <View style={styles.continueContent}>
            <Text style={styles.continueTitle}>React Native для начинающих</Text>
            <Text style={styles.continueProgress}>Пройдено: 65%</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '65%' }]} />
            </View>
          </View>
          <View style={styles.playButton}>
            <Play size={24} color="#FFFFFF" fill="#FFFFFF" />
          </View>
        </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 14,
    color: '#64748B',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0F172A',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    marginHorizontal: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 24,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#0F172A',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 32,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  courseCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  courseThumbnail: {
    width: 120,
    height: 140,
  },
  courseContent: {
    flex: 1,
    padding: 12,
  },
  courseCategory: {
    fontSize: 12,
    color: '#6366F1',
    fontWeight: '600',
    marginBottom: 4,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 4,
  },
  courseInstructor: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
  },
  courseFooter: {
    flexDirection: 'row',
    gap: 12,
  },
  courseInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  courseRating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  courseDuration: {
    fontSize: 14,
    color: '#64748B',
  },
  continueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6366F1',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 16,
  },
  continueContent: {
    flex: 1,
  },
  continueTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  continueProgress: {
    fontSize: 14,
    color: '#E0E7FF',
    marginBottom: 12,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#4F46E5',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
  },
  playButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#8B5CF6',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
});
