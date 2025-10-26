import React, { useState } from 'react'
import {
     Modal,
     View,
     StyleSheet,
     Pressable,
     Switch,
     ScrollView,
} from 'react-native'
import { ThemedText } from './themed-text'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/theme'
import { useTheme, ThemeMode } from '@/contexts/theme-context'
import { useColorScheme } from '@/hooks/use-color-scheme'

interface SettingsModalProps {
     visible: boolean
     onClose: () => void
}

export default function SettingsModal({ visible, onClose }: SettingsModalProps) {
     const colorScheme = useColorScheme()
     const colors = Colors[colorScheme ?? 'light']
     const { themeMode, setThemeMode } = useTheme()
     const [notificationsEnabled, setNotificationsEnabled] = useState(true)

     const themeOptions: { value: ThemeMode; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
          { value: 'light', label: 'Light Mode', icon: 'sunny' },
          { value: 'dark', label: 'Dark Mode', icon: 'moon' },
          { value: 'system', label: 'System Default', icon: 'phone-portrait-outline' },
     ]

     const handleThemeChange = (theme: ThemeMode) => {
          setThemeMode(theme)
          console.log('Theme changed to:', theme)
     }

     return (
          <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
               <View style={styles.overlay}>
                    <View style={[styles.container, { backgroundColor: colors.background }]}>
                         {/* Header */}
                         <View style={styles.header}>
                              <ThemedText style={styles.title}>Settings</ThemedText>
                              <Pressable onPress={onClose} style={styles.closeButton}>
                                   <Ionicons name="close" size={28} color={colors.text} />
                              </Pressable>
                         </View>

                         <ScrollView showsVerticalScrollIndicator={false}>
                              {/* Theme Section */}
                              <View style={styles.section}>
                                   <ThemedText style={styles.sectionTitle}>Appearance</ThemedText>

                                   {themeOptions.map((option) => (
                                        <Pressable
                                             key={option.value}
                                             style={[
                                                  styles.option,
                                                  {
                                                       backgroundColor:
                                                            themeMode === option.value
                                                                 ? colors.tint + '20'
                                                                 : colorScheme === 'dark'
                                                                      ? '#1a1a1a'
                                                                      : '#f5f5f5',
                                                       borderColor:
                                                            themeMode === option.value
                                                                 ? colors.tint
                                                                 : colorScheme === 'dark'
                                                                      ? '#2a2a2a'
                                                                      : '#e5e7eb',
                                                  },
                                             ]}
                                             onPress={() => handleThemeChange(option.value)}
                                        >
                                             <View style={styles.optionLeft}>
                                                  <View
                                                       style={[
                                                            styles.iconContainer,
                                                            { backgroundColor: colors.tint + '20' },
                                                       ]}
                                                  >
                                                       <Ionicons
                                                            name={option.icon}
                                                            size={22}
                                                            color={themeMode === option.value ? colors.tint : colors.text}
                                                       />
                                                  </View>
                                                  <ThemedText style={styles.optionLabel}>{option.label}</ThemedText>
                                             </View>
                                             {themeMode === option.value && (
                                                  <Ionicons name="checkmark-circle" size={24} color={colors.tint} />
                                             )}
                                        </Pressable>
                                   ))}
                              </View>

                              {/* Notifications Section */}
                              <View style={styles.section}>
                                   <ThemedText style={styles.sectionTitle}>Notifications</ThemedText>

                                   <View
                                        style={[
                                             styles.option,
                                             {
                                                  backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#f5f5f5',
                                                  borderColor: colorScheme === 'dark' ? '#2a2a2a' : '#e5e7eb',
                                             },
                                        ]}
                                   >
                                        <View style={styles.optionLeft}>
                                             <View
                                                  style={[
                                                       styles.iconContainer,
                                                       { backgroundColor: colors.tint + '20' },
                                                  ]}
                                             >
                                                  <Ionicons name="notifications-outline" size={22} color={colors.text} />
                                             </View>
                                             <ThemedText style={styles.optionLabel}>Push Notifications</ThemedText>
                                        </View>
                                        <Switch
                                             value={notificationsEnabled}
                                             onValueChange={setNotificationsEnabled}
                                             trackColor={{ false: '#767577', true: colors.tint }}
                                             thumbColor={'#fff'}
                                        />
                                   </View>
                              </View>

                              {/* About Section */}
                              <View style={styles.section}>
                                   <ThemedText style={styles.sectionTitle}>About</ThemedText>

                                   <Pressable
                                        style={[
                                             styles.option,
                                             {
                                                  backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#f5f5f5',
                                                  borderColor: colorScheme === 'dark' ? '#2a2a2a' : '#e5e7eb',
                                             },
                                        ]}
                                   >
                                        <View style={styles.optionLeft}>
                                             <View
                                                  style={[
                                                       styles.iconContainer,
                                                       { backgroundColor: colors.tint + '20' },
                                                  ]}
                                             >
                                                  <Ionicons name="information-circle-outline" size={22} color={colors.text} />
                                             </View>
                                             <ThemedText style={styles.optionLabel}>App Version</ThemedText>
                                        </View>
                                        <ThemedText style={[styles.versionText, { color: colors.textSecondary }]}>
                                             1.0.0
                                        </ThemedText>
                                   </Pressable>
                              </View>
                         </ScrollView>
                    </View>
               </View>
          </Modal>
     )
}

const styles = StyleSheet.create({
     overlay: {
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'flex-end',
     },
     container: {
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          paddingTop: 20,
          paddingBottom: 40,
          maxHeight: '80%',
     },
     header: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          marginBottom: 24,
     },
     title: {
          fontSize: 24,
          fontWeight: '700',
     },
     closeButton: {
          padding: 4,
     },
     section: {
          marginBottom: 32,
          paddingHorizontal: 20,
     },
     sectionTitle: {
          fontSize: 18,
          fontWeight: '700',
          marginBottom: 12,
     },
     option: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 16,
          borderRadius: 12,
          marginBottom: 12,
          borderWidth: 2,
     },
     optionLeft: {
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
     },
     iconContainer: {
          width: 40,
          height: 40,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 12,
     },
     optionLabel: {
          fontSize: 16,
          fontWeight: '500',
     },
     versionText: {
          fontSize: 14,
     },
})
