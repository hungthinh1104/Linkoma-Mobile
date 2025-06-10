"use client"

import { useState, useRef, useEffect } from "react"
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { Text } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

const { width } = Dimensions.get("window")

const ChatScreen = () => {
  const navigation = useNavigation()
  const flatListRef = useRef(null)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "system",
      text: "You've connected with Agent Sarah. She's online and ready to help! Estimated response time: 2 mins.",
      timestamp: "10:01 AM",
    },
    {
      id: 2,
      type: "user",
      text: "Hi Sarah, I have a question about my maintenance request from last week.",
      timestamp: "10:02 AM",
      status: "read",
    },
    {
      id: 3,
      type: "agent",
      text: "Hello! I can definitely help with that. Could you please provide the request ID or a brief description of the issue?",
      timestamp: "10:03 AM",
      sender: {
        name: "Sarah",
        avatar: "👩‍💼",
      },
    },
    {
      id: 4,
      type: "user",
      text: "Yes, it was for a leaky faucet in apartment 4B. Here is a photo.",
      timestamp: "10:05 AM",
      status: "read",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
    },
    {
      id: 5,
      type: "agent",
      text: "Thank you. I see the request. It's currently assigned to our plumbing team. Would you like me to check the latest status for you?",
      timestamp: "10:07 AM",
      sender: {
        name: "Sarah",
        avatar: "👩‍💼",
      },
    },
    {
      id: 6,
      type: "user",
      text: "Yes, please! Also, can I share a document with more details about the repair?",
      timestamp: "10:08 AM",
      status: "read",
    },
    {
      id: 7,
      type: "agent",
      text: "You can use the paperclip icon to attach files. I've also attached a guide on common repair timelines for your reference.",
      timestamp: "10:09 AM",
      sender: {
        name: "Sarah",
        avatar: "👩‍💼",
      },
    },
    {
      id: 8,
      type: "user",
      text: "",
      timestamp: "10:11 AM",
      status: "read",
      document: {
        name: "Additional_Repair_Notes.docx",
        size: "350 KB",
      },
    },
    {
      id: 9,
      type: "agent",
      text: "Got it. I've added your notes to the request. You should receive a notification when the team provides an update. Here's a quick voice summary:",
      timestamp: "10:13 AM",
      sender: {
        name: "Sarah",
        avatar: "👩‍💼",
      },
      audio: {
        duration: "0:25",
      },
    },
  ])

  const [agentInfo] = useState({
    name: "Agent Sarah",
    status: "Online",
    avatar: "👩‍💼",
  })

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: "user",
        text: message,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        status: "sent",
      }
      setMessages([...messages, newMessage])
      setMessage("")

      // Simulate agent response
      setTimeout(() => {
        const agentResponse = {
          id: messages.length + 2,
          type: "agent",
          text: "Thanks for your message! I'm looking into this for you.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          sender: {
            name: "Sarah",
            avatar: "👩‍💼",
          },
        }
        setMessages((prev) => [...prev, agentResponse])
      }, 1500)
    }
  }

  const handleAttachment = () => {
    Alert.alert("Attach File", "Choose attachment type", [
      { text: "Photo", onPress: () => Alert.alert("Photo", "Camera/Gallery would open") },
      { text: "Document", onPress: () => Alert.alert("Document", "File picker would open") },
      { text: "Cancel", style: "cancel" },
    ])
  }

  const handleVoiceMessage = () => {
    Alert.alert("Voice Message", "Voice recording would start")
  }

  const renderMessage = ({ item }) => {
    if (item.type === "system") {
      return (
        <View style={styles.systemMessage}>
          <Text style={styles.systemMessageText}>{item.text}</Text>
        </View>
      )
    }

    const isUser = item.type === "user"

    return (
      <View style={[styles.messageContainer, isUser ? styles.userMessageContainer : styles.agentMessageContainer]}>
        {!isUser && (
          <View style={styles.agentAvatar}>
            <Text style={styles.avatarText}>{item.sender?.avatar}</Text>
          </View>
        )}

        <View style={[styles.messageBubble, isUser ? styles.userBubble : styles.agentBubble]}>
          {!isUser && <Text style={styles.senderName}>{item.sender?.name}</Text>}

          {item.text && (
            <Text style={[styles.messageText, isUser ? styles.userMessageText : styles.agentMessageText]}>
              {item.text}
            </Text>
          )}

          {item.image && (
            <View style={styles.imageContainer}>
              <View style={styles.imagePlaceholder}>
                <MaterialCommunityIcons name="image" size={40} color="#64748B" />
                <Text style={styles.imageText}>Faucet Photo</Text>
              </View>
            </View>
          )}

          {item.document && (
            <View style={styles.documentContainer}>
              <View style={styles.documentIcon}>
                <MaterialCommunityIcons name="file-document" size={20} color="#3B82F6" />
              </View>
              <View style={styles.documentInfo}>
                <Text style={styles.documentName}>{item.document.name}</Text>
                <Text style={styles.documentSize}>{item.document.size}</Text>
              </View>
              <TouchableOpacity style={styles.downloadButton}>
                <MaterialCommunityIcons name="download" size={16} color="#3B82F6" />
              </TouchableOpacity>
            </View>
          )}

          {item.audio && (
            <View style={styles.audioContainer}>
              <TouchableOpacity style={styles.playButton}>
                <MaterialCommunityIcons name="play" size={16} color="#FFFFFF" />
              </TouchableOpacity>
              <View style={styles.audioWaveform}>
                <View style={styles.waveBar} />
                <View style={[styles.waveBar, styles.waveBarTall]} />
                <View style={styles.waveBar} />
                <View style={[styles.waveBar, styles.waveBarTall]} />
                <View style={styles.waveBar} />
              </View>
              <Text style={styles.audioDuration}>{item.audio.duration}</Text>
            </View>
          )}

          <View style={styles.messageFooter}>
            <Text style={[styles.timestamp, isUser ? styles.userTimestamp : styles.agentTimestamp]}>
              {item.timestamp}
            </Text>
            {isUser && item.status && (
              <MaterialCommunityIcons name={item.status === "read" ? "check-all" : "check"} size={14} color="#3B82F6" />
            )}
          </View>
        </View>
      </View>
    )
  }

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true })
  }, [messages])

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#1E293B" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.agentName}>
            {agentInfo.name} ({agentInfo.status})
          </Text>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.callButton}>
            <MaterialCommunityIcons name="phone" size={24} color="#1E293B" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileButton}>
            <View style={styles.headerAvatar}>
              <Text style={styles.headerAvatarText}>{agentInfo.avatar}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id.toString()}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.quickActionButton}>
          <MaterialCommunityIcons name="clock-check-outline" size={16} color="#3B82F6" />
          <Text style={styles.quickActionText}>Check Status</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickActionButton}>
          <MaterialCommunityIcons name="calendar-plus" size={16} color="#3B82F6" />
          <Text style={styles.quickActionText}>Book Appointment</Text>
        </TouchableOpacity>
      </View>

      {/* Message Input */}
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.attachButton} onPress={handleAttachment}>
          <MaterialCommunityIcons name="paperclip" size={24} color="#64748B" />
        </TouchableOpacity>

        <TextInput
          style={styles.textInput}
          placeholder="Type your message..."
          value={message}
          onChangeText={setMessage}
          multiline
          maxLength={500}
        />

        <TouchableOpacity style={styles.voiceButton} onPress={handleVoiceMessage}>
          <MaterialCommunityIcons name="microphone" size={24} color="#64748B" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.sendButton, message.trim() && styles.sendButtonActive]}
          onPress={sendMessage}
          disabled={!message.trim()}
        >
          <MaterialCommunityIcons name="send" size={20} color={message.trim() ? "#FFFFFF" : "#94A3B8"} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: StatusBar.currentHeight + 12,
    paddingBottom: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  backButton: {
    padding: 4,
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  agentName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  callButton: {
    padding: 4,
  },
  profileButton: {
    padding: 4,
  },
  headerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E0E7FF",
    justifyContent: "center",
    alignItems: "center",
  },
  headerAvatarText: {
    fontSize: 16,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingVertical: 16,
  },
  systemMessage: {
    backgroundColor: "#F1F5F9",
    marginHorizontal: 20,
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  systemMessageText: {
    fontSize: 13,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 18,
  },
  messageContainer: {
    flexDirection: "row",
    marginVertical: 4,
    paddingHorizontal: 16,
  },
  userMessageContainer: {
    justifyContent: "flex-end",
  },
  agentMessageContainer: {
    justifyContent: "flex-start",
  },
  agentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E0E7FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    alignSelf: "flex-end",
  },
  avatarText: {
    fontSize: 16,
  },
  messageBubble: {
    maxWidth: width * 0.75,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    marginVertical: 2,
  },
  userBubble: {
    backgroundColor: "#3B82F6",
    borderBottomRightRadius: 6,
  },
  agentBubble: {
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 6,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  senderName: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
    marginBottom: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  userMessageText: {
    color: "#FFFFFF",
  },
  agentMessageText: {
    color: "#1E293B",
  },
  imageContainer: {
    marginTop: 8,
    borderRadius: 12,
    overflow: "hidden",
  },
  imagePlaceholder: {
    width: 200,
    height: 120,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  imageText: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 4,
  },
  documentContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    padding: 12,
    borderRadius: 12,
    marginTop: 8,
    gap: 12,
  },
  documentIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#DBEAFE",
    justifyContent: "center",
    alignItems: "center",
  },
  documentInfo: {
    flex: 1,
  },
  documentName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1E293B",
  },
  documentSize: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },
  downloadButton: {
    padding: 4,
  },
  audioContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    padding: 12,
    borderRadius: 12,
    marginTop: 8,
    gap: 12,
  },
  playButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
  },
  audioWaveform: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    flex: 1,
  },
  waveBar: {
    width: 3,
    height: 12,
    backgroundColor: "#94A3B8",
    borderRadius: 2,
  },
  waveBarTall: {
    height: 20,
  },
  audioDuration: {
    fontSize: 12,
    color: "#64748B",
  },
  messageFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 4,
    gap: 4,
  },
  timestamp: {
    fontSize: 11,
  },
  userTimestamp: {
    color: "rgba(255, 255, 255, 0.8)",
  },
  agentTimestamp: {
    color: "#94A3B8",
  },
  quickActions: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    gap: 12,
  },
  quickActionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    gap: 8,
  },
  quickActionText: {
    fontSize: 14,
    color: "#3B82F6",
    fontWeight: "500",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    gap: 12,
  },
  attachButton: {
    padding: 8,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    maxHeight: 100,
    backgroundColor: "#F8FAFC",
  },
  voiceButton: {
    padding: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonActive: {
    backgroundColor: "#3B82F6",
  },
})

export default ChatScreen
