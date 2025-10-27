import { Image } from 'expo-image'
import React, { useState } from 'react'
import { StyleSheet, View, Pressable } from 'react-native'
import { ThemedText } from '../themed-text'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/theme'
import ImageViewer from './image-viewer'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { PostType } from '@/type/post'
import { BASE_URL } from '@/constants'

interface PostItemProps {
     post: PostType
     onLike?: (postId: string) => void
     onComment?: (postId: string) => void
     onShare?: (postId: string) => void
}

export default function PostItem({ post, onLike, onComment, onShare }: PostItemProps) {
     const colorScheme = useColorScheme()
     const colors = Colors[colorScheme ?? 'light']
     const [showImageViewer, setShowImageViewer] = useState(false)
     const [showFullCaption, setShowFullCaption] = useState(false)

     const MAX_CAPTION_LENGTH = 100

     const formatNumber = (num: number) => {
          if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
          if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
          return num?.toString()
     }

     const shouldTruncate = post?.content && post.content.length > MAX_CAPTION_LENGTH
     const displayCaption = shouldTruncate && !showFullCaption
          ? post.content?.slice(0, MAX_CAPTION_LENGTH)
          : post?.content

     return (
          <View style={styles.postContainer}>
               {/* Header */}
               <View style={styles.header}>
                    <View style={styles.userInfo}>
                         <Image
                              source={post?.user.avatarUrl}
                              style={styles.avatar}
                              transition={300}
                              contentFit='cover'
                         />
                         <View>
                              <ThemedText style={styles.username}>{post?.user.name}</ThemedText>
                              <ThemedText style={[styles.timeAgo, { color: colors.textSecondary }]}>
                                   {post.createdAt}
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
                         source={`${BASE_URL}${post?.imageUrl}`}
                         style={styles.postImg}
                         transition={500}
                         contentFit='cover'
                    />
               </Pressable>

               {/* Actions */}
               <View style={styles.actions}>
                    <View style={styles.leftActions}>
                         <Pressable style={styles.actionBtn}>
                              <Ionicons
                                   name={true ? "heart" : "heart-outline"}
                                   size={28}
                                   color={true ? "#FF3B30" : colors.text}
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
                         {formatNumber(post?.voteCount)} likes
                    </ThemedText>
                    {post?.content && (
                         <View style={styles.captionContainer}>
                              <ThemedText style={styles.caption}>
                                   <ThemedText style={styles.username}>{post?.user.name} </ThemedText>
                                   {displayCaption}
                                   {shouldTruncate && !showFullCaption && '... '}
                              </ThemedText>
                              {shouldTruncate && (
                                   <Pressable onPress={() => setShowFullCaption(!showFullCaption)}>
                                        <ThemedText style={[styles.showMore, { color: colors.textSecondary }]}>
                                             {showFullCaption ? 'Show less' : 'Show more'}
                                        </ThemedText>
                                   </Pressable>
                              )}
                         </View>
                    )}
                    {post?.commentCount > 0 && (
                         <Pressable onPress={() => onComment?.(post.id)}>
                              <ThemedText style={[styles.viewComments, { color: colors.textSecondary }]}>
                                   View all {post?.commentCount} comments
                              </ThemedText>
                         </Pressable>
                    )}
               </View>

               {/* Image Viewer Modal */}
               <ImageViewer
                    visible={showImageViewer}
                    imageUrl={`${BASE_URL}${post?.imageUrl}`}
                    onClose={() => setShowImageViewer(false)}
                    username={post?.user.name}
                    caption={post?.content}
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
     captionContainer: {
          gap: 2,
     },
     caption: {
          fontSize: 14,
          lineHeight: 18,
     },
     showMore: {
          fontSize: 14,
          marginTop: 2,
     },
     viewComments: {
          fontSize: 14,
          marginTop: 4,
     },
})