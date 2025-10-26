import React from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import { Image } from 'expo-image'
import { ThemedText } from '../themed-text'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'

interface ProfileHeaderProps {
     avatar: string
     name: string
     email: string
     followers: number
     following: number
     posts: number
     onEditProfile?: () => void
     onSettingsPress?: () => void
}

export default function ProfileHeader({
     avatar,
     name,
     email,
     followers,
     following,
     posts,
     onEditProfile,
     onSettingsPress,
}: ProfileHeaderProps) {
     const colorScheme = useColorScheme()
     const colors = Colors[colorScheme ?? 'light']

     return (
          <View style={[styles.container, { backgroundColor: colors.background }]}>
               {/* Header with Settings Button */}
               <View style={styles.topBar}>
                    <View style={{ flex: 1 }} />
                    <Pressable
                         style={({ pressed }) => [
                              styles.settingsButton,
                              {
                                   backgroundColor: colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#f5f5f5',
                                   opacity: pressed ? 0.7 : 1,
                              },
                         ]}
                         onPress={onSettingsPress}
                    >
                         <Ionicons name="settings-outline" size={22} color={colors.text} />
                    </Pressable>
               </View>

               {/* Avatar & Info */}
               <View style={styles.profileInfo}>
                    <Image source={avatar} style={styles.avatar} contentFit="cover" transition={300} />
                    <View style={styles.infoBlock}>
                         <ThemedText style={styles.name}>{name}</ThemedText>
                         <ThemedText style={[styles.email, { color: colors.textSecondary }]}>{email}</ThemedText>
                    </View>
               </View>

               {/* Stats */}
               <View style={styles.stats}>
                    <View style={styles.statItem}>
                         <ThemedText style={styles.statNumber}>{followers}</ThemedText>
                         <ThemedText style={[styles.statLabel, { color: colors.textSecondary }]}>
                              Followers
                         </ThemedText>
                    </View>
                    <View style={styles.statItem}>
                         <ThemedText style={styles.statNumber}>{following}</ThemedText>
                         <ThemedText style={[styles.statLabel, { color: colors.textSecondary }]}>
                              Following
                         </ThemedText>
                    </View>
                    <View style={styles.statItem}>
                         <ThemedText style={styles.statNumber}>{posts}</ThemedText>
                         <ThemedText style={[styles.statLabel, { color: colors.textSecondary }]}>Posts</ThemedText>
                    </View>
               </View>

               {/* Edit Profile Button */}
               <Pressable
                    style={({ pressed }) => [
                         styles.editButton,
                         {
                              backgroundColor: colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : colors.tint,
                              opacity: pressed ? 0.7 : 1,
                         },
                    ]}
                    onPress={onEditProfile}
               >
                    <ThemedText
                         style={[
                              styles.editButtonText,
                              { color: colorScheme === 'dark' ? colors.text : '#fff' },
                         ]}
                    >
                         Edit Profile
                    </ThemedText>
               </Pressable>
          </View>
     )
}

const styles = StyleSheet.create({
     container: {
          padding: 20,
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(255, 255, 255, 0.1)',
     },
     topBar: {
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginBottom: 16,
     },
     settingsButton: {
          width: 40,
          height: 40,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
     },
     profileInfo: {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 24,
     },
     avatar: {
          width: 80,
          height: 80,
          borderRadius: 40,
          marginRight: 16,
     },
     infoBlock: {
          flex: 1,
     },
     name: {
          fontSize: 24,
          fontWeight: '700',
          marginBottom: 4,
     },
     email: {
          fontSize: 14,
     },
     stats: {
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginBottom: 20,
          paddingVertical: 16,
     },
     statItem: {
          alignItems: 'center',
     },
     statNumber: {
          fontSize: 20,
          fontWeight: '700',
          marginBottom: 4,
     },
     statLabel: {
          fontSize: 13,
     },
     editButton: {
          paddingVertical: 12,
          paddingHorizontal: 24,
          borderRadius: 8,
          alignItems: 'center',
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.1)',
     },
     editButtonText: {
          fontSize: 15,
          fontWeight: '600',
     },
})
