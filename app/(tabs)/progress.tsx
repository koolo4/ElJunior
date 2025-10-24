import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Trophy, Target, Clock, TrendingUp, Award, Star, Flame } from 'lucide-react-native';

export default function ProgressScreen() {
  const achievements = [
    { id: '1', title: 'Первый урок', icon: Star, color: '#F59E0B', unlocked: true },
    { id: '2', title: 'Неделя подряд', icon: Flame, color: '#EF4444', unlocked: true },
    { id: '3', title: '10 курсов', icon: Trophy, color: '#6366F1', unlocked: false },
    { id: '4', title: 'Отличник', icon: Award, color: '#8B5CF6', unlocked: false },
  ];

  const coursesInProgress = [
    { id: '1', title: 'Python для начинающих', progress: 65, lessons: '13/20' },
    { id: '2', title: 'React Native разработка', progress: 45, lessons: '9/20' },
    { id: '3', title: 'UI/UX Дизайн', progress: 80, lessons: '16/20' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Мой прогресс</Text>
      </View>

      {/* Stats Overview */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: '#6366F115' }]}>
            <Trophy size={28} color="#6366F1" />
          </View>
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>Завершено курсов</Text>
        </View>

        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: '#8B5CF615' }]}>
            <Clock size={28} color="#8B5CF6" />
          </View>
          <Text style={styles.statValue}>48ч</Text>
          <Text style={styles.statLabel}>Времени обучения</Text>
        </View>

        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: '#EC489915' }]}>
            <Target size={28} color="#EC4899" />
          </View>
          <Text style={styles.statValue}>7</Text>
          <Text style={styles.statLabel}>Дней подряд</Text>
        </View>

        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: '#F59E0B15' }]}>
            <TrendingUp size={28} color="#F59E0B" />
          </View>
          <Text style={styles.statValue}>85%</Text>
          <Text style={styles.statLabel}>Средний балл</Text>
        </View>
      </View>

      {/* Weekly Progress */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Недельная активность</Text>
        <View style={styles.weeklyChart}>
          {['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'].map((day, index) => {
            const heights = [60, 80, 40, 90, 70, 100, 85];
            return (
              <View key={day} style={styles.chartColumn}>
                <View style={styles.chartBarContainer}>
                  <View 
                    style={[
                      styles.chartBar, 
                      { height: `${heights[index]}%` }
                    ]} 
                  />
                </View>
                <Text style={styles.chartLabel}>{day}</Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Achievements */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Достижения</Text>
        <View style={styles.achievementsGrid}>
          {achievements.map((achievement) => {
            const IconComponent = achievement.icon;
            return (
              <View 
                key={achievement.id} 
                style={[
                  styles.achievementCard,
                  !achievement.unlocked && styles.achievementLocked
                ]}
              >
                <View 
                  style={[
                    styles.achievementIcon,
                    { backgroundColor: `${achievement.color}${achievement.unlocked ? '20' : '10'}` }
                  ]}
                >
                  <IconComponent 
                    size={32} 
                    color={achievement.unlocked ? achievement.color : '#CBD5E1'} 
                  />
                </View>
                <Text 
                  style={[
                    styles.achievementTitle,
                    !achievement.unlocked && styles.achievementTitleLocked
                  ]}
                >
                  {achievement.title}
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Courses in Progress */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>В процессе изучения</Text>
        {coursesInProgress.map((course) => (
          <TouchableOpacity key={course.id} style={styles.progressCard}>
            <View style={styles.progressContent}>
              <Text style={styles.progressTitle}>{course.title}</Text>
              <Text style={styles.progressLessons}>Уроки: {course.lessons}</Text>
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBarBg}>
                  <View 
                    style={[styles.progressBarFill, { width: `${course.progress}%` }]} 
                  />
                </View>
                <Text style={styles.progressPercent}>{course.progress}%</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  statIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
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
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 16,
  },
  weeklyChart: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 20,
    gap: 12,
  },
  chartColumn: {
    flex: 1,
    alignItems: 'center',
  },
  chartBarContainer: {
    height: 120,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  chartBar: {
    width: '100%',
    backgroundColor: '#6366F1',
    borderRadius: 4,
  },
  chartLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  achievementCard: {
    width: '48%',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  achievementLocked: {
    opacity: 0.5,
  },
  achievementIcon: {
    width: 72,
    height: 72,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
    textAlign: 'center',
  },
  achievementTitleLocked: {
    color: '#94A3B8',
  },
  progressCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  progressContent: {
    gap: 8,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
  },
  progressLessons: {
    fontSize: 14,
    color: '#64748B',
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBarBg: {
    flex: 1,
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#6366F1',
    borderRadius: 4,
  },
  progressPercent: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366F1',
    width: 45,
  },
});
