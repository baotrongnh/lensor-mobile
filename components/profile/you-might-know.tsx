import React from 'react'
import { View, StyleSheet, Pressable, FlatList } from 'react-native'
import { Image } from 'expo-image'
import { ThemedText } from '../themed-text'
import { Colors } from '@/constants/theme'
import { User } from '@/constants/users-data'
import { useColorScheme } from '@/hooks/use-color-scheme'

interface YouMightKnowProps {
     users: User[]
     onUserPress?: (userId: string) => void
}

export default function YouMightKnow({ users, onUserPress }: YouMightKnowProps) {
     const colorScheme = useColorScheme()
     const colors = Colors[colorScheme ?? 'light']

     const renderUser = ({ item }: { item: User }) => (
          <Pressable
               style={({ pressed }) => [
                    styles.userCard,
                    {
                         backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#f5f5f5',
                         borderColor: colorScheme === 'dark' ? '#2a2a2a' : '#e5e7eb',
                         opacity: pressed ? 0.7 : 1,
                    },
               ]}
               onPress={() => onUserPress?.(item.id)}
          >
               <Image source={item.avatar} style={styles.avatar} contentFit="cover" transition={300} />
               <View style={styles.userInfo}>
                    <ThemedText style={styles.userName} numberOfLines={1}>
                         {item.name}
                    </ThemedText>
                    <ThemedText style={[styles.userEmail, { color: colors.textSecondary }]} numberOfLines={1}>
                         {item.email}
                    </ThemedText>
               </View>
          </Pressable>
     )

     const renderSeparator = () => <View style={styles.separator} />

     return (
          <View style={styles.container}>
               <ThemedText style={styles.sectionTitle}>You might know</ThemedText>
               <FlatList
                    data={users}
                    renderItem={renderUser}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.listContent}
                    ItemSeparatorComponent={renderSeparator}
               />
          </View>
     )
}

const styles = StyleSheet.create({
     container: {
          paddingVertical: 20,
     },
     sectionTitle: {
          fontSize: 18,
          fontWeight: '700',
          marginBottom: 12,
          paddingHorizontal: 16,
     },
     listContent: {
          paddingHorizontal: 16,
     },
     separator: {
          width: 12,
     },
     userCard: {
          width: 160,
          padding: 16,
          borderRadius: 12,
          borderWidth: 1,
     },
     avatar: {
          width: 64,
          height: 64,
          borderRadius: 32,
          marginBottom: 12,
          alignSelf: 'center',
     },
     userInfo: {
          alignItems: 'center',
     },
     userName: {
          fontSize: 14,
          fontWeight: '600',
          marginBottom: 4,
          textAlign: 'center',
     },
     userEmail: {
          fontSize: 12,
          textAlign: 'center',
     },
})
