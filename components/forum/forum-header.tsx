import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { ThemedText } from '../themed-text'

interface ForumHeaderProps {
     onCreatePress?: () => void
}

export default function ForumHeader({ onCreatePress }: ForumHeaderProps) {
     const colorScheme = useColorScheme()
     const colors = Colors[colorScheme ?? 'light']

     return (
          <View style={[styles.container, { backgroundColor: colors.background, borderBottomColor: colors.icon + '20' }]}>
               <ThemedText style={styles.logo}>Lensor</ThemedText>
               <View style={styles.actions}>
                    <Pressable style={styles.iconBtn} onPress={onCreatePress}>
                         <Ionicons name="add-circle-outline" size={28} color={colors.text} />
                    </Pressable>
                    <Pressable style={styles.iconBtn}>
                         <Ionicons name="chatbubble-ellipses-outline" size={26} color={colors.text} />
                    </Pressable>
               </View>
          </View>
     )
}

const styles = StyleSheet.create({
     container: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderBottomWidth: 0.5,
     },
     logo: {
          fontSize: 26,
          fontWeight: '700',
          letterSpacing: -0.5,
     },
     actions: {
          flexDirection: 'row',
          gap: 16,
     },
     iconBtn: {
          padding: 2,
     },
})
