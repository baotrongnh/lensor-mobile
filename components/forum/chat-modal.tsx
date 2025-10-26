import React, { useState } from 'react'
import {
     View,
     Text,
     StyleSheet,
     Modal,
     TouchableOpacity,
     TextInput,
     FlatList,
} from 'react-native'
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'

interface Chat {
     id: string
     user: {
          username: string
          avatar: string
          isOnline: boolean
     }
     lastMessage: string
     timeAgo: string
     unread: number
}

interface ChatModalProps {
     visible: boolean
     onClose: () => void
}

const MOCK_CHATS: Chat[] = [
     {
          id: '1',
          user: {
               username: 'john_doe',
               avatar: 'https://i.pravatar.cc/150?img=12',
               isOnline: true,
          },
          lastMessage: 'Hey! Check out my new preset',
          timeAgo: '5m',
          unread: 2,
     },
     {
          id: '2',
          user: {
               username: 'jane_smith',
               avatar: 'https://i.pravatar.cc/150?img=5',
               isOnline: true,
          },
          lastMessage: 'Thanks for the feedback!',
          timeAgo: '1h',
          unread: 0,
     },
     {
          id: '3',
          user: {
               username: 'mike_photo',
               avatar: 'https://i.pravatar.cc/150?img=8',
               isOnline: false,
          },
          lastMessage: 'Can you share the settings?',
          timeAgo: '3h',
          unread: 1,
     },
]

export default function ChatModal({ visible, onClose }: ChatModalProps) {
     const colorScheme = useColorScheme()
     const colors = Colors[colorScheme ?? 'light']
     const [searchQuery, setSearchQuery] = useState('')

     const renderChat = ({ item }: { item: Chat }) => (
          <TouchableOpacity style={styles.chatItem}>
               <View style={styles.avatarContainer}>
                    <Image source={item.user.avatar} style={styles.avatar} contentFit="cover" />
                    {item.user.isOnline && <View style={styles.onlineDot} />}
               </View>
               <View style={styles.chatContent}>
                    <View style={styles.chatHeader}>
                         <Text style={[styles.username, { color: colors.text }]}>
                              {item.user.username}
                         </Text>
                         <Text style={[styles.timeAgo, { color: colors.textSecondary }]}>
                              {item.timeAgo}
                         </Text>
                    </View>
                    <View style={styles.chatFooter}>
                         <Text
                              style={[
                                   styles.lastMessage,
                                   { color: item.unread > 0 ? colors.text : colors.textSecondary },
                              ]}
                              numberOfLines={1}
                         >
                              {item.lastMessage}
                         </Text>
                         {item.unread > 0 && (
                              <View style={[styles.unreadBadge, { backgroundColor: colors.tint }]}>
                                   <Text style={styles.unreadText}>{item.unread}</Text>
                              </View>
                         )}
                    </View>
               </View>
          </TouchableOpacity>
     )

     return (
          <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
               <View style={[styles.container, { backgroundColor: colors.background }]}>
                    {/* Header */}
                    <View style={[styles.header, { borderBottomColor: colors.border }]}>
                         <View style={styles.headerLeft}>
                              <TouchableOpacity onPress={onClose}>
                                   <Ionicons name="chevron-back" size={28} color={colors.text} />
                              </TouchableOpacity>
                              <Text style={[styles.title, { color: colors.text }]}>Messages</Text>
                         </View>
                         <TouchableOpacity>
                              <Ionicons name="create-outline" size={26} color={colors.text} />
                         </TouchableOpacity>
                    </View>

                    {/* Search */}
                    <View style={styles.searchContainer}>
                         <View style={[styles.searchBox, { backgroundColor: colors.border + '30' }]}>
                              <Ionicons name="search" size={20} color={colors.textSecondary} />
                              <TextInput
                                   style={[styles.searchInput, { color: colors.text }]}
                                   placeholder="Search..."
                                   placeholderTextColor={colors.textSecondary}
                                   value={searchQuery}
                                   onChangeText={setSearchQuery}
                              />
                         </View>
                    </View>

                    {/* Chat List */}
                    <FlatList
                         data={MOCK_CHATS}
                         renderItem={renderChat}
                         keyExtractor={(item) => item.id}
                         showsVerticalScrollIndicator={false}
                    />
               </View>
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
     searchContainer: {
          padding: 16,
     },
     searchBox: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderRadius: 8,
     },
     searchInput: {
          flex: 1,
          fontSize: 15,
     },
     chatItem: {
          flexDirection: 'row',
          padding: 16,
          gap: 12,
     },
     avatarContainer: {
          position: 'relative',
     },
     avatar: {
          width: 56,
          height: 56,
          borderRadius: 28,
     },
     onlineDot: {
          position: 'absolute',
          bottom: 2,
          right: 2,
          width: 14,
          height: 14,
          borderRadius: 7,
          backgroundColor: '#4CAF50',
          borderWidth: 2,
          borderColor: '#fff',
     },
     chatContent: {
          flex: 1,
          gap: 4,
     },
     chatHeader: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
     },
     username: {
          fontSize: 15,
          fontWeight: '600',
     },
     timeAgo: {
          fontSize: 12,
     },
     chatFooter: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
     },
     lastMessage: {
          fontSize: 14,
          flex: 1,
     },
     unreadBadge: {
          minWidth: 20,
          height: 20,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 6,
     },
     unreadText: {
          color: '#fff',
          fontSize: 11,
          fontWeight: '600',
     },
})
