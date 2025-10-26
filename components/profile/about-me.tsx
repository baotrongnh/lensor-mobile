import React from 'react'
import { View, StyleSheet } from 'react-native'
import { ThemedText } from '../themed-text'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'

interface AboutMeProps {
     gender?: string
     birthday?: string
}

export default function AboutMe({ gender = 'Gay', birthday = 'May 25th, 2004' }: AboutMeProps) {
     const colorScheme = useColorScheme()
     const colors = Colors[colorScheme ?? 'light']

     const infoItems = [
          { icon: 'person-outline' as const, label: 'Gender', value: gender },
          { icon: 'calendar-outline' as const, label: 'Birthday', value: birthday },
     ]

     return (
          <View style={styles.container}>
               <ThemedText style={styles.sectionTitle}>About me</ThemedText>

               <View style={[styles.card, { backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#f5f5f5' }]}>
                    {infoItems.map((item, index) => (
                         <View key={item.label}>
                              <View style={styles.infoRow}>
                                   <View style={styles.iconContainer}>
                                        <Ionicons name={item.icon} size={20} color={colors.text} />
                                   </View>
                                   <View style={styles.infoContent}>
                                        <ThemedText style={[styles.infoLabel, { color: colors.textSecondary }]}>
                                             {item.label}
                                        </ThemedText>
                                        <ThemedText style={styles.infoValue}>{item.value}</ThemedText>
                                   </View>
                              </View>
                              {index < infoItems.length - 1 && (
                                   <View style={[styles.divider, { backgroundColor: colors.textSecondary + '20' }]} />
                              )}
                         </View>
                    ))}
               </View>
          </View>
     )
}

const styles = StyleSheet.create({
     container: {
          paddingHorizontal: 16,
          paddingVertical: 20,
     },
     sectionTitle: {
          fontSize: 18,
          fontWeight: '700',
          marginBottom: 12,
     },
     card: {
          borderRadius: 12,
          padding: 16,
     },
     infoRow: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 12,
     },
     iconContainer: {
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: 'rgba(10, 126, 164, 0.1)',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 12,
     },
     infoContent: {
          flex: 1,
     },
     infoLabel: {
          fontSize: 12,
          marginBottom: 2,
     },
     infoValue: {
          fontSize: 15,
          fontWeight: '600',
     },
     divider: {
          height: 1,
          marginLeft: 52,
     },
})
