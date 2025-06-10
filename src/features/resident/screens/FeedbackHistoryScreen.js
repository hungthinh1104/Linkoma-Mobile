import React, { useState } from 'react';
import { View, FlatList, StyleSheet, StatusBar, TouchableOpacity, Image } from 'react-native';
import { Card, Text, Avatar, Chip, Badge, Searchbar, IconButton, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Enhanced feedback data with more details
const feedbackList = [
  {
    id: '1',
    title: 'Broken elevator',
    content: 'The elevator in block A has stopped working since yesterday morning. I had to use the stairs to reach my apartment on the 7th floor.',
    date: '2025-06-08T14:32:00',
    status: 'In Progress',
    category: 'Maintenance',
    priority: 'High',
    hasAttachment: true,
    hasReplies: true,
    replyCount: 2,
    lastReply: '2025-06-09T09:15:00',
  },
  {
    id: '2',
    title: 'Water leak',
    content: 'Leakage from the ceiling in my bathroom. The water is dripping constantly and has created a puddle on the floor.',
    date: '2025-06-05T08:45:00',
    status: 'Resolved',
    category: 'Plumbing',
    priority: 'Urgent',
    hasAttachment: true,
    hasReplies: true,
    replyCount: 3,
    lastReply: '2025-06-07T16:20:00',
  },
  {
    id: '3',
    title: 'Noisy neighbors',
    content: 'The residents in unit 503 have been playing loud music after 11 PM for the past week. It\'s disturbing my sleep.',
    date: '2025-06-03T22:10:00',
    status: 'Under Review',
    category: 'Complaint',
    priority: 'Medium',
    hasAttachment: false,
    hasReplies: false,
    replyCount: 0,
  },
  {
    id: '4',
    title: 'Gym equipment suggestion',
    content: 'I would like to suggest adding a rowing machine to the gym. Many residents have expressed interest in this equipment.',
    date: '2025-05-28T16:05:00',
    status: 'Pending',
    category: 'Suggestion',
    priority: 'Low',
    hasAttachment: false,
    hasReplies: true,
    replyCount: 1,
    lastReply: '2025-05-30T11:45:00',
  },
];

const FeedbackHistoryScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  
  const filters = ['All', 'Pending', 'In Progress', 'Resolved'];

  // Format date to a more readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today, ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Yesterday, ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  // Get status color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Resolved':
        return '#10B981';
      case 'In Progress':
        return '#3B82F6';
      case 'Under Review':
        return '#F59E0B';
      case 'Pending':
      default:
        return '#6B7280';
    }
  };

  // Get priority color based on priority
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Urgent':
        return '#DC2626';
      case 'High':
        return '#EA580C';
      case 'Medium':
        return '#F59E0B';
      case 'Low':
      default:
        return '#6B7280';
    }
  };

  // Get category icon based on category
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Maintenance':
        return 'tools';
      case 'Plumbing':
        return 'water';
      case 'Complaint':
        return 'alert-circle-outline';
      case 'Suggestion':
        return 'lightbulb-outline';
      default:
        return 'message-text-outline';
    }
  };

  // Filter feedback items based on search query and active filter
  const filteredFeedback = feedbackList.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || item.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  // Render empty state when no feedback items match the filters
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Image 
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/6598/6598519.png' }} 
        style={styles.emptyImage} 
      />
      <Text style={styles.emptyTitle}>No feedback found</Text>
      <Text style={styles.emptyText}>
        {searchQuery ? 
          `No results matching "${searchQuery}"` : 
          "You haven't submitted any feedback yet"}
      </Text>
      <TouchableOpacity style={styles.emptyButton}>
        <Text style={styles.emptyButtonText}>Submit New Feedback</Text>
      </TouchableOpacity>
    </View>
  );

  // Header for FlatList
  const renderListHeader = () => (
    <View>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerTitleContainer}>
            <MaterialCommunityIcons name="history" size={24} color="#2563EB" />
            <Text style={styles.headerTitle}>Feedback History</Text>
          </View>
          <IconButton icon="bell-outline" size={24} color="#1F2937" />
        </View>
        {/* Search Bar */}
        <Searchbar
          placeholder="Search feedback"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          inputStyle={styles.searchInput}
          iconColor="#6B7280"
        />
        {/* Filters */}
        <View style={styles.filtersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersScroll}>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterChip,
                  activeFilter === filter && styles.activeFilterChip
                ]}
                onPress={() => setActiveFilter(filter)}
              >
                <Text style={[
                  styles.filterText,
                  activeFilter === filter && styles.activeFilterText
                ]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <FlatList
        data={filteredFeedback}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={renderListHeader}
        ListEmptyComponent={renderEmptyState}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.9}>
            <Card style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.categoryContainer}>
                  <View style={[styles.categoryIcon, { backgroundColor: `${getStatusColor(item.status)}20` }]}>
                    <MaterialCommunityIcons 
                      name={getCategoryIcon(item.category)} 
                      size={18} 
                      color={getStatusColor(item.status)} 
                    />
                  </View>
                  <View>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardDate}>{formatDate(item.date)}</Text>
                  </View>
                </View>
                <Chip 
                  style={[styles.statusChip, { backgroundColor: `${getStatusColor(item.status)}15` }]}
                  textStyle={{ color: getStatusColor(item.status), fontSize: 12, fontWeight: '600' }}
                >
                  {item.status}
                </Chip>
              </View>
              
              <Divider style={styles.divider} />
              
              <Card.Content style={styles.cardContent}>
                <Text style={styles.contentText} numberOfLines={2}>
                  {item.content}
                </Text>
                
                <View style={styles.cardFooter}>
                  <View style={styles.metaContainer}>
                    <View style={styles.priorityContainer}>
                      <View style={[styles.priorityDot, { backgroundColor: getPriorityColor(item.priority) }]} />
                      <Text style={styles.priorityText}>{item.priority}</Text>
                    </View>
                    
                    <View style={styles.categoryBadge}>
                      <Text style={styles.categoryText}>{item.category}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.actionsContainer}>
                    {item.hasAttachment && (
                      <MaterialCommunityIcons name="paperclip" size={16} color="#6B7280" style={styles.actionIcon} />
                    )}
                    
                    {item.hasReplies && (
                      <View style={styles.replyContainer}>
                        <MaterialCommunityIcons name="reply" size={16} color="#2563EB" />
                        <Text style={styles.replyCount}>{item.replyCount}</Text>
                      </View>
                    )}
                    
                    <MaterialCommunityIcons name="chevron-right" size={20} color="#6B7280" />
                  </View>
                </View>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
      
      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <MaterialCommunityIcons name="plus" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

// Add ScrollView import at the top
import { ScrollView } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: StatusBar.currentHeight || 0,
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 12,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  searchBar: {
    elevation: 0,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    height: 46,
    marginBottom: 12,
  },
  searchInput: {
    fontSize: 14,
  },
  filtersContainer: {
    marginBottom: 8,
  },
  filtersScroll: {
    paddingRight: 16,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
    marginRight: 8,
  },
  activeFilterChip: {
    backgroundColor: '#EFF6FF',
  },
  filterText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#2563EB',
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
  },
  card: {
    marginBottom: 16,
    borderRadius: 16,
    elevation: 2,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  categoryIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 2,
  },
  cardDate: {
    fontSize: 12,
    color: '#64748B',
  },
  statusChip: {
    height: 28,
    borderRadius: 14,
  },
  divider: {
    backgroundColor: '#F1F5F9',
    height: 1,
  },
  cardContent: {
    paddingVertical: 12,
  },
  contentText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  priorityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  priorityText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  categoryBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  categoryText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionIcon: {
    marginRight: 4,
  },
  replyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  replyCount: {
    fontSize: 12,
    color: '#2563EB',
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    marginTop: 40,
  },
  emptyImage: {
    width: 120,
    height: 120,
    marginBottom: 16,
    opacity: 0.7,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  emptyButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default FeedbackHistoryScreen;