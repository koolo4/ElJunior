import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { Search, Filter, Star, Clock, Users } from 'lucide-react-native';

interface Course {
  id: string;
  title: string;
  category: string;
  duration: string;
  rating: number;
  students: number;
  thumbnail: string;
  instructor: string;
  level: string;
  price: string;
}

export default function CoursesScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Все', 'Программирование', 'Дизайн', 'Математика', 'Языки', 'Бизнес'];

  const courses: Course[] = [
    {
      id: '1',
      title: 'Python для начинающих',
      category: 'Программирование',
      duration: '8 недель',
      rating: 4.8,
      students: 1234,
      thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400',
      instructor: 'Иван Петров',
      level: 'Начинающий',
      price: 'Бесплатно'
    },
    {
      id: '2',
      title: 'UI/UX Дизайн с нуля',
      category: 'Дизайн',
      duration: '6 недель',
      rating: 4.9,
      students: 856,
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
      instructor: 'Мария Иванова',
      level: 'Начинающий',
      price: '₸15,000'
    },
    {
      id: '3',
      title: 'JavaScript от основ до продвинутого',
      category: 'Программирование',
      duration: '12 недель',
      rating: 4.9,
      students: 2341,
      thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400',
      instructor: 'Алексей Смирнов',
      level: 'Средний',
      price: '₸25,000'
    },
    {
      id: '4',
      title: 'Высшая математика',
      category: 'Математика',
      duration: '10 недель',
      rating: 4.7,
      students: 567,
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400',
      instructor: 'Дмитрий Козлов',
      level: 'Продвинутый',
      price: '₸20,000'
    },
    {
      id: '5',
      title: 'Английский язык B2',
      category: 'Языки',
      duration: '16 недель',
      rating: 4.8,
      students: 1892,
      thumbnail: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400',
      instructor: 'Елена Соколова',
      level: 'Средний',
      price: '₸30,000'
    },
    {
      id: '6',
      title: 'Основы маркетинга',
      category: 'Бизнес',
      duration: '5 недель',
      rating: 4.6,
      students: 743,
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
      instructor: 'Анна Волкова',
      level: 'Начинающий',
      price: '₸18,000'
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'Все' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Все курсы</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={24} color="#6366F1" />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Search size={20} color="#94A3B8" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Найти курс..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Categories */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryChip,
              selectedCategory === category && styles.categoryChipActive
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Courses List */}
      <ScrollView 
        style={styles.coursesList}
        showsVerticalScrollIndicator={false}
      >
        {filteredCourses.map((course) => (
          <TouchableOpacity key={course.id} style={styles.courseCard}>
            <Image 
              source={{ uri: course.thumbnail }} 
              style={styles.courseThumbnail}
            />
            <View style={styles.courseOverlay}>
              <View style={styles.levelBadge}>
                <Text style={styles.levelText}>{course.level}</Text>
              </View>
              <View style={styles.priceBadge}>
                <Text style={styles.priceText}>{course.price}</Text>
              </View>
            </View>
            
            <View style={styles.courseContent}>
              <Text style={styles.courseCategory}>{course.category}</Text>
              <Text style={styles.courseTitle} numberOfLines={2}>
                {course.title}
              </Text>
              <Text style={styles.courseInstructor}>{course.instructor}</Text>
              
              <View style={styles.courseStats}>
                <View style={styles.statItem}>
                  <Star size={16} color="#F59E0B" fill="#F59E0B" />
                  <Text style={styles.statText}>{course.rating}</Text>
                </View>
                <View style={styles.statItem}>
                  <Users size={16} color="#64748B" />
                  <Text style={styles.statText}>{course.students.toLocaleString()}</Text>
                </View>
                <View style={styles.statItem}>
                  <Clock size={16} color="#64748B" />
                  <Text style={styles.statText}>{course.duration}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
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
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    marginHorizontal: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#0F172A',
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: '#6366F1',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  coursesList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  courseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  courseThumbnail: {
    width: '100%',
    height: 200,
  },
  courseOverlay: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  levelBadge: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  levelText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  priceBadge: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  priceText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  courseContent: {
    padding: 16,
  },
  courseCategory: {
    fontSize: 12,
    color: '#6366F1',
    fontWeight: '600',
    marginBottom: 4,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 4,
  },
  courseInstructor: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 12,
  },
  courseStats: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
});
