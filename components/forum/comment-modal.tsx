import React, { useState } from 'react'
import {
     View,
     Text,
     StyleSheet,
     Modal,
     TouchableOpacity,
     TextInput,
     FlatList,
     KeyboardAvoidingView,
     Platform,
} from 'react-native'
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'

interface Comment {
     id: string
     user: {
          username: string
          avatar: string
     }
     text: string
     timeAgo: string
     likes: number
}

interface CommentModalProps {
     visible: boolean
     onClose: () => void
     postId: string
}

// Mock comments
const MOCK_COMMENTS: Comment[] = [
     {
          id: '1',
          user: { username: 'john_doe', avatar: 'https://i.pravatar.cc/150?img=12' },
          text: 'Amazing shot! 🔥',
          timeAgo: '2h',
          likes: 12,
     },
     {
          id: '2',
          user: { username: 'jane_smith', avatar: 'https://i.pravatar.cc/150?img=5' },
          text: 'Love the colors in this photo',
          timeAgo: '5h',
          likes: 8,
     },
]

export default function CommentModal({ visible, onClose, postId }: CommentModalProps) {
     const colorScheme = useColorScheme()
     const colors = Colors[colorScheme ?? 'light']

     const [comment, setComment] = useState('')
     const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS)

     const handleSend = () => {
          if (!comment.trim()) return

          const newComment: Comment = {
               id: Date.now().toString(),
               user: {
                    username: 'You',
                    avatar: 'https://i.pravatar.cc/150?img=1',
               },
               text: comment,
               timeAgo: 'now',
               likes: 0,
          }

          setComments([newComment, ...comments])
          setComment('')
     }

     const renderComment = ({ item }: { item: Comment }) => (
          <View style={styles.commentItem}>
               <Image source={item.user.avatar} style={styles.avatar} contentFit="cover" />
               <View style={styles.commentContent}>
                    <View style={styles.commentBubble}>
                         <Text style={[styles.username, { color: colors.text }]}>
                              {item.user.username}
                         </Text>
                         <Text style={[styles.commentText, { color: colors.text }]}>{item.text}</Text>
                    </View>
                    <View style={styles.commentMeta}>
                         <Text style={[styles.timeAgo, { color: colors.textSecondary }]}>
                              {item.timeAgo}
                         </Text>
                         <Text style={[styles.likes, { color: colors.textSecondary }]}>
                              {item.likes} likes
                         </Text>
                         <TouchableOpacity>
                              <Text style={[styles.reply, { color: colors.textSecondary }]}>Reply</Text>
                         </TouchableOpacity>
                    </View>
               </View>
          </View>
     )

     return (
          <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
               <KeyboardAvoidingView
                    style={[styles.container, { backgroundColor: colors.background }]}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
               >
                    {/* Header */}
                    <View style={[styles.header, { borderBottomColor: colors.border }]}>
                         <View style={styles.headerLeft}>
                              <TouchableOpacity onPress={onClose}>
                                   <Ionicons name="chevron-back" size={28} color={colors.text} />
                              </TouchableOpacity>
                              <Text style={[styles.title, { color: colors.text }]}>Comments</Text>
                         </View>
                         <TouchableOpacity>
                              <Ionicons name="paper-plane-outline" size={24} color={colors.text} />
                         </TouchableOpacity>
                    </View>

                    {/* Comments List */}
                    <FlatList
                         data={comments}
                         renderItem={renderComment}
                         keyExtractor={(item) => item.id}
                         contentContainerStyle={styles.list}
                         showsVerticalScrollIndicator={false}
                    />

                    {/* Input */}
                    <View style={[styles.inputContainer, { borderTopColor: colors.border }]}>
                         <Image
                              source="https://i.pravatar.cc/150?img=1"
                              style={styles.inputAvatar}
                              contentFit="cover"
                         />
                         <TextInput
                              style={[styles.input, { color: colors.text }]}
                              placeholder="Add a comment..."
                              placeholderTextColor={colors.tabIconDefault}
                              value={comment}
                              onChangeText={setComment}
                              multiline
                         />
                         <TouchableOpacity onPress={handleSend} disabled={!comment.trim()}>
                              <Text
                                   style={[
                                        styles.sendBtn,
                                        { color: comment.trim() ? colors.tint : colors.tabIconDefault },
                                   ]}
                              >
                                   Send
                              </Text>
                         </TouchableOpacity>
                    </View>
               </KeyboardAvoidingView>
          </Modal>
     )
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
          paddingTop: 50,
     },
     header: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 16,
          borderBottomWidth: 1,
     },
     headerLeft: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
     },
     title: {
          fontSize: 18,
          fontWeight: '600',
     },
     list: {
          padding: 16,
     },
     commentItem: {
          flexDirection: 'row',
          marginBottom: 20,
          gap: 12,
     },
     avatar: {
          width: 36,
          height: 36,
          borderRadius: 18,
     },
     commentContent: {
          flex: 1,
     },
     commentBubble: {
          gap: 2,
     },
     username: {
          fontSize: 14,
          fontWeight: '600',
     },
     commentText: {
          fontSize: 14,
          lineHeight: 18,
     },
     commentMeta: {
          flexDirection: 'row',
          gap: 16,
          marginTop: 6,
     },
     timeAgo: {
          fontSize: 12,
     },
     likes: {
          fontSize: 12,
     },
     reply: {
          fontSize: 12,
          fontWeight: '600',
     },
     inputContainer: {
          flexDirection: 'row',
          alignItems: 'flex-end',
          padding: 12,
          gap: 12,
          borderTopWidth: 1,
     },
     inputAvatar: {
          width: 32,
          height: 32,
          borderRadius: 16,
     },
     input: {
          flex: 1,
          fontSize: 14,
          maxHeight: 100,
          paddingVertical: 8,
     },
     sendBtn: {
          fontSize: 16,
          fontWeight: '600',
          paddingVertical: 8,
     },
})
