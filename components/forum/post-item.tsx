import { Image } from 'expo-image'
import React, { useState } from 'react'
import { StyleSheet, View, Pressable } from 'react-native'
import { ThemedText } from '../themed-text'
import { Ionicons } from '@expo/vector-icons'
import { Post } from '@/constants/mock-data'
import { Colors } from '@/constants/theme'
import ImageViewer from './image-viewer'
import { useColorScheme } from '@/hooks/use-color-scheme'

interface PostItemProps {
     post: Post
     onLike?: (postId: string) => void
     onComment?: (postId: string) => void
     onShare?: (postId: string) => void
}

export default function PostItem({ post, onLike, onComment, onShare }: PostItemProps) {
     const colorScheme = useColorScheme()
     const colors = Colors[colorScheme ?? 'light']
     const [isLiked, setIsLiked] = useState(post.isLiked)
     const [likesCount, setLikesCount] = useState(post.likes)
     const [showImageViewer, setShowImageViewer] = useState(false)

     const handleLike = () => {
          setIsLiked(!isLiked)
          setLikesCount(isLiked ? likesCount - 1 : likesCount + 1)
          onLike?.(post.id)
     }

     const formatNumber = (num: number) => {
          if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
          if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
          return num.toString()
     }

     return (
          <View style={styles.postContainer}>
               {/* Header */}
               <View style={styles.header}>
                    <View style={styles.userInfo}>
                         <Image
                              source={post.user.avatar}
                              style={styles.avatar}
                              transition={300}
                              contentFit='cover'
                         />
                         <View>
                              <ThemedText style={styles.username}>{post.user.username}</ThemedText>
                              <ThemedText style={[styles.timeAgo, { color: colors.textSecondary }]}>
                                   {post.timeAgo}
                              </ThemedText>
                         </View>
                    </View>
                    <Pressable>
                         <Ionicons name="ellipsis-horizontal" size={24} color={colors.text} />
                    </Pressable>
               </View>

               {/* Image */}
               <Pressable onPress={() => setShowImageViewer(true)}>
                    <Image
                         source={post.image}
                         style={styles.postImg}
                         transition={500}
                         contentFit='cover'
                    />
               </Pressable>

               {/* Actions */}
               <View style={styles.actions}>
                    <View style={styles.leftActions}>
                         <Pressable onPress={handleLike} style={styles.actionBtn}>
                              <Ionicons
                                   name={isLiked ? "heart" : "heart-outline"}
                                   size={28}
                                   color={isLiked ? "#FF3B30" : colors.text}
                              />
                         </Pressable>
                         <Pressable onPress={() => onComment?.(post.id)} style={styles.actionBtn}>
                              <Ionicons name="chatbubble-outline" size={26} color={colors.text} />
                         </Pressable>
                         <Pressable onPress={() => onShare?.(post.id)} style={styles.actionBtn}>
                              <Ionicons name="paper-plane-outline" size={26} color={colors.text} />
                         </Pressable>
                    </View>
                    <Pressable>
                         <Ionicons name="bookmark-outline" size={26} color={colors.text} />
                    </Pressable>
               </View>

               {/* Likes & Caption */}
               <View style={styles.content}>
                    <ThemedText style={styles.likes}>
                         {formatNumber(likesCount)} likes
                    </ThemedText>
                    <View style={styles.captionRow}>
                         <ThemedText style={styles.username}>{post.user.username}</ThemedText>
                         <ThemedText style={styles.caption}> {post.caption}</ThemedText>
                    </View>
                    {post.comments > 0 && (
                         <Pressable onPress={() => onComment?.(post.id)}>
                              <ThemedText style={[styles.viewComments, { color: colors.textSecondary }]}>
                                   View all {post.comments} comments
                              </ThemedText>
                         </Pressable>
                    )}
               </View>

               {/* Image Viewer Modal */}
               <ImageViewer
                    visible={showImageViewer}
                    imageUrl={post.image}
                    onClose={() => setShowImageViewer(false)}
                    username={post.user.username}
                    caption={post.caption}
               />
          </View>
     )
}

const styles = StyleSheet.create({
     postContainer: {
          marginBottom: 20,
     },
     header: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 12,
          paddingVertical: 10,
     },
     userInfo: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
     },
     avatar: {
          width: 36,
          height: 36,
          borderRadius: 18,
     },
     username: {
          fontSize: 14,
          fontWeight: '600',
     },
     timeAgo: {
          fontSize: 12,
     },
     postImg: {
          width: '100%',
          height: 400,
     },
     actions: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 12,
          paddingVertical: 8,
     },
     leftActions: {
          flexDirection: 'row',
          gap: 16,
     },
     actionBtn: {
          padding: 2,
     },
     content: {
          paddingHorizontal: 12,
          gap: 4,
     },
     likes: {
          fontSize: 14,
          fontWeight: '600',
     },
     captionRow: {
          flexDirection: 'row',
          flexWrap: 'wrap',
     },
     caption: {
          fontSize: 14,
     },
     viewComments: {
          fontSize: 14,
          marginTop: 4,
     },
})