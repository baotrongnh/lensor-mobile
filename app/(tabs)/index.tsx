import ChatModal from '@/components/forum/chat-modal'
import CommentModal from '@/components/forum/comment-modal'
import CreatePostModal from '@/components/forum/create-post-modal'
import ForumHeader from '@/components/forum/forum-header'
import NotificationModal from '@/components/forum/notification-modal'
import PostItem from '@/components/forum/post-item'
import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { usePosts } from '@/lib/hooks/usePostHooks'
import React, { useState } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ForumScreen() {
  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme ?? 'light']
  const [createModalVisible, setCreateModalVisible] = useState(false)
  const [commentModalVisible, setCommentModalVisible] = useState(false)
  const [notificationModalVisible, setNotificationModalVisible] = useState(false)
  const [chatModalVisible, setChatModalVisible] = useState(false)
  const [selectedPostId, setSelectedPostId] = useState<string>('')

  const { data: posts } = usePosts()

  const handleLike = (postId: string) => {
    console.log('Liked post:', postId)
  }

  const handleComment = (postId: string) => {
    setSelectedPostId(postId)
    setCommentModalVisible(true)
  }

  const handleShare = (postId: string) => {
    console.log('Share post:', postId)
  }

  const handlePostCreated = () => {
    console.log('Post created')
    // TODO: Refresh posts
  }

  const renderPost = ({ item }: { item: any }) => (
    <PostItem
      post={item}
      onLike={handleLike}
      onComment={handleComment}
      onShare={handleShare}
    />
  )

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ForumHeader
        onCreatePress={() => setCreateModalVisible(true)}
        onNotificationPress={() => setNotificationModalVisible(true)}
        onChatPress={() => setChatModalVisible(true)}
      />

      <FlatList
        data={posts?.data}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />

      <CreatePostModal
        visible={createModalVisible}
        onClose={() => setCreateModalVisible(false)}
        onPostCreated={handlePostCreated}
      />

      <CommentModal
        visible={commentModalVisible}
        onClose={() => setCommentModalVisible(false)}
        postId={selectedPostId}
      />

      <NotificationModal
        visible={notificationModalVisible}
        onClose={() => setNotificationModalVisible(false)}
      />

      <ChatModal
        visible={chatModalVisible}
        onClose={() => setChatModalVisible(false)}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingTop: 8,
  },
})