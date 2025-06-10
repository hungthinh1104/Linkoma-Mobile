import React, { useState, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  Image, 
  Alert, 
  ScrollView, 
  TouchableOpacity,
  StatusBar,
  Dimensions 
} from 'react-native';
import { 
  TextInput, 
  Button, 
  Text, 
  IconButton, 
  ActivityIndicator,
  Avatar,
  Switch,
  Chip
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';

const { width } = Dimensions.get('window');

const FeedbackScreen = () => {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const [recording, setRecording] = useState(null);
  const [sound, setSound] = useState(null);
  const [audioUri, setAudioUri] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Bug Report');
  const [selectedPriority, setSelectedPriority] = useState('Medium');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);

  const maxCharacters = 500;

  const categories = [
    { id: 'bug', label: 'Bug Report', icon: 'bug' },
    { id: 'feature', label: 'Feature Request', icon: 'lightbulb-outline' },
    { id: 'general', label: 'General', icon: 'message-outline' },
    { id: 'complaint', label: 'Complaint', icon: 'alert-circle-outline' }
  ];

  const priorities = [
    { id: 'Low', label: 'Low', color: '#64748B', bgColor: '#F1F5F9' },
    { id: 'Medium', label: 'Medium', color: '#2563EB', bgColor: '#EFF6FF' },
    { id: 'High', label: 'High', color: '#EA580C', bgColor: '#FFF7ED' },
    { id: 'Urgent', label: 'Urgent', color: '#DC2626', bgColor: '#FEF2F2' }
  ];

  const handleMessageChange = (text) => {
    if (text.length <= maxCharacters) {
      setMessage(text);
      setCharacterCount(text.length);
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
      });
      
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status !== 'granted') {
        Alert.alert('Permission required', 'Please grant microphone permission to record audio.');
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
    } catch (err) {
      Alert.alert('Recording error', err.message);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;
    
    try {
      setRecording(null);
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setAudioUri(uri);
    } catch (error) {
      Alert.alert('Error', 'Failed to stop recording');
    }
  };

  const playAudio = async () => {
    if (!audioUri) return;
    
    try {
      const { sound } = await Audio.Sound.createAsync({ uri: audioUri });
      setSound(sound);
      await sound.playAsync();
    } catch (error) {
      Alert.alert('Error', 'Failed to play audio');
    }
  };

  const saveDraft = () => {
    Alert.alert('Draft Saved', 'Your feedback has been saved as a draft.');
  };

  const submitFeedback = async () => {
    if (!message.trim()) {
      Alert.alert('Validation', 'Please enter your feedback message.');
      return;
    }

    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      Alert.alert(
        'Success', 
        'Thank you! Your feedback has been submitted successfully.',
        [
          {
            text: 'OK',
            onPress: () => {
              // Reset form
              setMessage('');
              setImage(null);
              setAudioUri(null);
              setCharacterCount(0);
              setSelectedCategory('Bug Report');
              setSelectedPriority('Medium');
              setIsAnonymous(false);
            }
          }
        ]
      );
    }, 2000);
  };

  const removeImage = () => {
    setImage(null);
  };

  const removeAudio = () => {
    setAudioUri(null);
    if (sound) {
      sound.unloadAsync();
      setSound(null);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Feedback Hub</Text>
          <View style={styles.headerRight}>
            <IconButton icon="bell-outline" size={24} />
            <Avatar.Image 
              size={32} 
              source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
            />
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Title */}
          <Text style={styles.title}>Submit New Feedback</Text>

          {/* Category Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Feedback Category</Text>
            <View style={styles.categoryContainer}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryChip,
                    selectedCategory === category.label && styles.selectedCategoryChip
                  ]}
                  onPress={() => setSelectedCategory(category.label)}
                >
                  <MaterialCommunityIcons 
                    name={category.icon} 
                    size={16} 
                    color={selectedCategory === category.label ? '#2563EB' : '#64748B'} 
                  />
                  <Text style={[
                    styles.categoryText,
                    selectedCategory === category.label && styles.selectedCategoryText
                  ]}>
                    {category.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Message Input */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Feedback</Text>
            <TextInput
              label=""
              placeholder="Describe your feedback, suggestions, or issue..."
              value={message}
              onChangeText={handleMessageChange}
              multiline
              numberOfLines={6}
              mode="outlined"
              style={styles.textInput}
              theme={{
                colors: {
                  primary: '#2563EB',
                  outline: '#E2E8F0',
                }
              }}
            />
            <Text style={styles.characterCounter}>
              {characterCount}/{maxCharacters} characters remaining
            </Text>
          </View>

          {/* Attachments */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Attachments</Text>
            <View style={styles.attachmentContainer}>
              <TouchableOpacity style={styles.attachmentButton} onPress={pickImage}>
                <MaterialCommunityIcons name="camera" size={24} color="#64748B" />
                <Text style={styles.attachmentText}>Add Photo</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.attachmentButton} 
                onPress={recording ? stopRecording : startRecording}
              >
                <MaterialCommunityIcons 
                  name={recording ? "stop" : "microphone"} 
                  size={24} 
                  color={recording ? "#DC2626" : "#64748B"} 
                />
                <Text style={styles.attachmentText}>
                  {recording ? 'Stop Recording' : 'Voice Memo'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Image Preview */}
            {image && (
              <View style={styles.previewContainer}>
                <Image source={{ uri: image }} style={styles.imagePreview} />
                <TouchableOpacity style={styles.removeButton} onPress={removeImage}>
                  <MaterialCommunityIcons name="close" size={16} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            )}

            {/* Audio Preview */}
            {audioUri && (
              <View style={styles.audioPreview}>
                <MaterialCommunityIcons name="music-note" size={20} color="#2563EB" />
                <Text style={styles.audioText}>Voice recording attached</Text>
                <TouchableOpacity onPress={playAudio}>
                  <MaterialCommunityIcons name="play" size={20} color="#2563EB" />
                </TouchableOpacity>
                <TouchableOpacity onPress={removeAudio}>
                  <MaterialCommunityIcons name="close" size={16} color="#DC2626" />
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Priority Level */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Priority Level</Text>
            <View style={styles.priorityContainer}>
              {priorities.map((priority) => (
                <TouchableOpacity
                  key={priority.id}
                  style={[
                    styles.priorityButton,
                    { backgroundColor: selectedPriority === priority.id ? priority.color : priority.bgColor },
                    selectedPriority === priority.id && styles.selectedPriority
                  ]}
                  onPress={() => setSelectedPriority(priority.id)}
                >
                  <Text style={[
                    styles.priorityText,
                    { color: selectedPriority === priority.id ? '#FFFFFF' : priority.color }
                  ]}>
                    {priority.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Anonymous Toggle */}
          <View style={styles.section}>
            <View style={styles.anonymousContainer}>
              <Text style={styles.sectionTitle}>Submit Anonymously</Text>
              <Switch
                value={isAnonymous}
                onValueChange={setIsAnonymous}
                color="#2563EB"
              />
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionContainer}>
            <Button
              mode="outlined"
              onPress={saveDraft}
              style={styles.draftButton}
              labelStyle={styles.draftButtonText}
            >
              Save Draft
            </Button>
            
            <Button
              mode="contained"
              onPress={submitFeedback}
              disabled={submitting}
              loading={submitting}
              style={styles.submitButton}
              labelStyle={styles.submitButtonText}
              buttonColor="#2563EB"
            >
              {submitting ? 'Submitting...' : 'Submit Feedback'}
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: StatusBar.currentHeight || 0,
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16, // Giảm padding nếu muốn
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 12, // Giảm từ 24 xuống 12
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 6,
  },
  selectedCategoryChip: {
    backgroundColor: '#EFF6FF',
    borderColor: '#2563EB',
  },
  categoryText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: '#2563EB',
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    minHeight: 120,
  },
  characterCounter: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'right',
    marginTop: 4,
  },
  attachmentContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  attachmentButton: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
    backgroundColor: '#F8FAFC',
  },
  attachmentText: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 8,
    fontWeight: '500',
  },
  previewContainer: {
    position: 'relative',
    marginTop: 12,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12,
    padding: 4,
  },
  audioPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    padding: 12,
    borderRadius: 12,
    marginTop: 12,
    gap: 8,
  },
  audioText: {
    flex: 1,
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '500',
  },
  priorityContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  selectedPriority: {
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  priorityText: {
    fontSize: 14,
    fontWeight: '600',
  },
  anonymousContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  draftButton: {
    flex: 1,
    borderRadius: 12,
    borderColor: '#E2E8F0',
  },
  draftButtonText: {
    color: '#64748B',
    fontWeight: '600',
  },
  submitButton: {
    flex: 1,
    borderRadius: 12,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default FeedbackScreen;