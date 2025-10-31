import React, { useState } from 'react'
import { StyleSheet, ScrollView, View, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ProfileHeader from '@/components/profile/profile-header'
import ProfileTabs from '@/components/profile/profile-tabs'
import AboutMe from '@/components/profile/about-me'
import YouMightKnow from '@/components/profile/you-might-know'
import PostItem from '@/components/forum/post-item'
import SettingsModal from '@/components/settings-modal'
import { Colors } from '@/constants/theme'
import { SUGGESTED_USERS } from '@/constants/users-data'
import { MOCK_POSTS, Post } from '@/constants/mock-data'
import { ThemedText } from '@/components/themed-text'
import { useColorScheme } from '@/hooks/use-color-scheme'

export default function ProfileScreen() {
     const colorScheme = useColorScheme()
     const colors = Colors[colorScheme ?? 'light']
     const [activeTab, setActiveTab] = useState<'your' | 'saved' | 'loved'>('your')
     const [showSettings, setShowSettings] = useState(false)

     // Mock user posts (first 3 posts from mock data)
     const userPosts = MOCK_POSTS.slice(0, 3)
     const savedPosts: Post[] = []
     const lovedPosts = MOCK_POSTS.slice(1, 2)

     const handleEditProfile = () => {
          console.log('Edit profile')
     }

     const handleSettingsPress = () => {
          setShowSettings(true)
     }

     const handleUserPress = (userId: string) => {
          console.log('User pressed:', userId)
     }

     const handleLike = (postId: string) => {
          console.log('Liked post:', postId)
     }

     const handleComment = (postId: string) => {
          console.log('Comment on post:', postId)
     }

     const handleShare = (postId: string) => {
          console.log('Share post:', postId)
     }

     const getCurrentPosts = () => {
          switch (activeTab) {
               case 'your':
                    return userPosts
               case 'saved':
                    return savedPosts
               case 'loved':
                    return lovedPosts
               default:
                    return []
          }
     }

     const currentPosts = getCurrentPosts()

     const renderPost = ({ item }: { item: Post }) => (
          <PostItem post={item} onLike={handleLike} onComment={handleComment} onShare={handleShare} />
     )

     const renderEmptyState = () => (
          <View style={styles.emptyContainer}>
               <ThemedText style={[styles.emptyText, { color: colors.textSecondary }]}>
                    {activeTab === 'your' && 'No posts yet'}
                    {activeTab === 'saved' && 'No saved posts'}
                    {activeTab === 'loved' && 'No loved posts'}
               </ThemedText>
          </View>
     )

     return (
          <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
               <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Profile Header */}
                    <ProfileHeader
                         avatar="https://i.pravatar.cc/150?img=68"
                         name="Bảo Trọng Nguyễn Huỳnh"
                         email="nhbaotrong@gmail.com"
                         followers={124}
                         following={89}
                         posts={42}
                         onEditProfile={handleEditProfile}
                         onSettingsPress={handleSettingsPress}
                    />

                    <AboutMe gender="Male" birthday="May 29th, 2004" />

                    {/* Tabs */}
                    <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

                    {/* Posts List */}
                    <View style={styles.postsContainer}>
                         {currentPosts.length > 0 ? (
                              <FlatList
                                   data={currentPosts}
                                   renderItem={renderPost}
                                   keyExtractor={(item) => item.id}
                                   scrollEnabled={false}
                                   contentContainerStyle={styles.postsList}
                              />
                         ) : (
                              renderEmptyState()
                         )}
                    </View>

                    {/* About Me */}

                    {/* You Might Know */}
                    <YouMightKnow users={SUGGESTED_USERS} onUserPress={handleUserPress} />
               </ScrollView>

               {/* Settings Modal */}
               <SettingsModal visible={showSettings} onClose={() => setShowSettings(false)} />
          </SafeAreaView>
     )
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
     },
     postsContainer: {
          minHeight: 200,
     },
     postsList: {
          paddingTop: 12,
     },
     emptyContainer: {
          padding: 40,
          justifyContent: 'center',
          alignItems: 'center',
     },
     emptyText: {
          fontSize: 15,
     },
     loginPrompt: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 32,
     },
     loginTitle: {
          fontSize: 28,
          fontWeight: '700',
          marginBottom: 12,
          textAlign: 'center',
     },
     loginSubtitle: {
          fontSize: 16,
          textAlign: 'center',
          marginBottom: 32,
          lineHeight: 24,
     },
     loginButton: {
          paddingHorizontal: 32,
          paddingVertical: 16,
          borderRadius: 12,
          minWidth: 200,
          alignItems: 'center',
     },
     loginButtonText: {
          color: '#fff',
          fontSize: 16,
          fontWeight: '700',
     },
})