import React from 'react'
import {
     View,
     Text,
     StyleSheet,
     Modal,
     TouchableOpacity,
     FlatList,
} from 'react-native'
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'

interface Notification {
     id: string
     type: 'like' | 'comment' | 'follow' | 'mention'
     user: {
          username: string
          avatar: string
     }
     text: string
     timeAgo: string
     postImage?: string
     isRead: boolean
}

interface NotificationModalProps {
     visible: boolean
     onClose: () => void
}

const MOCK_NOTIFICATIONS: Notification[] = [
     {
          id: '1',
          type: 'like',
          user: { username: 'john_doe', avatar: 'https://i.pravatar.cc/150?img=12' },
          text: 'liked your post',
          timeAgo: '2m',
          postImage: 'https://picsum.photos/seed/notif1/400/400',
          isRead: false,
     },
     {
          id: '2',
          type: 'comment',
          user: { username: 'jane_smith', avatar: 'https://i.pravatar.cc/150?img=5' },
          text: 'commented: "Amazing shot!"',
          timeAgo: '1h',
          postImage: 'https://picsum.photos/seed/notif2/400/400',
          isRead: false,
     },
     {
          id: '3',
          type: 'follow',
          user: { username: 'mike_photo', avatar: 'https://i.pravatar.cc/150?img=8' },
          text: 'started following you',
          timeAgo: '3h',
          isRead: true,
     },
     {
          id: '4',
          type: 'mention',
          user: { username: 'sarah_lens', avatar: 'https://i.pravatar.cc/150?img=9' },
          text: 'mentioned you in a comment',
          timeAgo: '5h',
          postImage: 'https://picsum.photos/seed/notif3/400/400',
          isRead: true,
     },
]

export default function NotificationModal({ visible, onClose }: NotificationModalProps) {
     const colorScheme = useColorScheme()
     const colors = Colors[colorScheme ?? 'light']

     const getIcon = (type: Notification['type']) => {
          switch (type) {
               case 'like':
                    return <Ionicons name="heart" size={20} color="#FF3B30" />
               case 'comment':
                    return <Ionicons name="chatbubble" size={20} color={colors.tint} />
               case 'follow':
                    return <Ionicons name="person-add" size={20} color={colors.tint} />
               case 'mention':
                    return <Ionicons name="at" size={20} color={colors.tint} />
          }
     }

     const renderNotification = ({ item }: { item: Notification }) => (
          <TouchableOpacity
               style={[
                    styles.notifItem,
                    !item.isRead && { backgroundColor: colors.tint + '10' },
               ]}
          >
               <View style={styles.notifLeft}>
                    <View>
                         <Image source={item.user.avatar} style={styles.avatar} contentFit="cover" />
                         <View style={styles.iconBadge}>{getIcon(item.type)}</View>
                    </View>
                    <View style={styles.notifContent}>
                         <Text style={[styles.notifText, { color: colors.text }]}>
                              <Text style={styles.username}>{item.user.username}</Text> {item.text}
                         </Text>
                         <Text style={[styles.timeAgo, { color: colors.textSecondary }]}>
                              {item.timeAgo}
                         </Text>
                    </View>
               </View>
               {item.postImage && (
                    <Image source={item.postImage} style={styles.postThumb} contentFit="cover" />
               )}
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
                              <Text style={[styles.title, { color: colors.text }]}>Notifications</Text>
                         </View>
                         <TouchableOpacity>
                              <Text style={[styles.markRead, { color: colors.tint }]}>Mark all read</Text>
                         </TouchableOpacity>
                    </View>

                    {/* Tabs */}
                    <View style={[styles.tabs, { borderBottomColor: colors.border }]}>
                         <TouchableOpacity style={styles.tab}>
                              <Text style={[styles.tabText, styles.tabActive, { color: colors.text }]}>
                                   All
                              </Text>
                              <View style={[styles.tabIndicator, { backgroundColor: colors.tint }]} />
                         </TouchableOpacity>
                         <TouchableOpacity style={styles.tab}>
                              <Text style={[styles.tabText, { color: colors.textSecondary }]}>
                                   Following
                              </Text>
                         </TouchableOpacity>
                    </View>

                    {/* Notifications List */}
                    <FlatList
                         data={MOCK_NOTIFICATIONS}
                         renderItem={renderNotification}
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
     markRead: {
          fontSize: 14,
          fontWeight: '500',
     },
     tabs: {
          flexDirection: 'row',
          borderBottomWidth: 1,
          paddingHorizontal: 16,
     },
     tab: {
          paddingVertical: 12,
          marginRight: 32,
     },
     tabText: {
          fontSize: 15,
          fontWeight: '500',
     },
     tabActive: {
          fontWeight: '600',
     },
     tabIndicator: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
     },
     notifItem: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 16,
          gap: 12,
     },
     notifLeft: {
          flexDirection: 'row',
          flex: 1,
          gap: 12,
     },
     avatar: {
          width: 44,
          height: 44,
          borderRadius: 22,
     },
     iconBadge: {
          position: 'absolute',
          bottom: -2,
          right: -2,
          width: 24,
          height: 24,
          borderRadius: 12,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 2,
          borderColor: '#fff',
     },
     notifContent: {
          flex: 1,
          gap: 2,
     },
     notifText: {
          fontSize: 14,
          lineHeight: 18,
     },
     username: {
          fontWeight: '600',
     },
     timeAgo: {
          fontSize: 12,
     },
     postThumb: {
          width: 44,
          height: 44,
          borderRadius: 4,
     },
})
