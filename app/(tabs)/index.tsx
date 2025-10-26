import React, { useState } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import PostItem from '@/components/forum/post-item'
import ForumHeader from '@/components/forum/forum-header'
import CreatePostModal from '@/components/forum/create-post-modal'
import { MOCK_POSTS, Post } from '@/constants/mock-data'
import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'

export default function ForumScreen() {
  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme ?? 'light']
  const [posts] = useState<Post[]>(MOCK_POSTS)
  const [modalVisible, setModalVisible] = useState(false)

  const handleLike = (postId: string) => {
    console.log('Liked post:', postId)
  }

  const handleComment = (postId: string) => {
    console.log('Comment on post:', postId)
  }

  const handleShare = (postId: string) => {
    console.log('Share post:', postId)
  }

  const handlePostCreated = () => {
    console.log('Post created')
    // TODO: Refresh posts
  }

  const renderPost = ({ item }: { item: Post }) => (
    <PostItem
      post={item}
      onLike={handleLike}
      onComment={handleComment}
      onShare={handleShare}
    />
  )

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ForumHeader onCreatePress={() => setModalVisible(true)} />
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />

      <CreatePostModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onPostCreated={handlePostCreated}
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