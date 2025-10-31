import React, { useState } from 'react'
import {
     StyleSheet,
     View,
     TextInput,
     Pressable,
     KeyboardAvoidingView,
     Platform,
     ScrollView,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { ThemedText } from '@/components/themed-text'
import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'

type FormType = 'login' | 'register'

export default function LoginScreen() {
     const colorScheme = useColorScheme()
     const colors = Colors[colorScheme ?? 'light']

     const [formType, setFormType] = useState<FormType>('login')
     const [email, setEmail] = useState('')
     const [password, setPassword] = useState('')
     const [showPassword, setShowPassword] = useState(false)

     const handleSubmit = () => {
          // TODO: Implement authentication logic
          console.log('Login/Register:', { email, password, formType })
     }

     return (
          <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
               <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
                    <ScrollView
                         contentContainerStyle={styles.scrollContent}
                         showsVerticalScrollIndicator={false}
                         keyboardShouldPersistTaps="handled"
                    >
                         {/* Back Button */}
                         <Pressable style={styles.backButton} onPress={() => router.back()}>
                              <Ionicons name="arrow-back" size={24} color={colors.text} />
                         </Pressable>

                         {/* Header */}
                         <View style={styles.header}>
                              <ThemedText style={styles.title}>
                                   {formType === 'login' ? 'Welcome Back' : 'Create Account'}
                              </ThemedText>
                              <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>
                                   {formType === 'login'
                                        ? 'Sign in to continue'
                                        : 'Sign up to get started'}
                              </ThemedText>
                         </View>

                         {/* Form */}
                         <View style={styles.form}>
                              {/* Email */}
                              <View style={styles.inputGroup}>
                                   <ThemedText style={styles.label}>Email</ThemedText>
                                   <View
                                        style={[
                                             styles.inputContainer,
                                             {
                                                  backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#f5f5f5',
                                                  borderColor: colorScheme === 'dark' ? '#2a2a2a' : '#e5e7eb',
                                             },
                                        ]}
                                   >
                                        <Ionicons
                                             name="mail-outline"
                                             size={20}
                                             color={colors.textSecondary}
                                             style={styles.inputIcon}
                                        />
                                        <TextInput
                                             style={[styles.input, { color: colors.text }]}
                                             placeholder="your@email.com"
                                             placeholderTextColor={colors.textSecondary}
                                             value={email}
                                             onChangeText={setEmail}
                                             keyboardType="email-address"
                                             autoCapitalize="none"
                                             autoComplete="email"
                                        />
                                   </View>
                              </View>

                              {/* Password */}
                              <View style={styles.inputGroup}>
                                   <ThemedText style={styles.label}>Password</ThemedText>
                                   <View
                                        style={[
                                             styles.inputContainer,
                                             {
                                                  backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#f5f5f5',
                                                  borderColor: colorScheme === 'dark' ? '#2a2a2a' : '#e5e7eb',
                                             },
                                        ]}
                                   >
                                        <Ionicons
                                             name="lock-closed-outline"
                                             size={20}
                                             color={colors.textSecondary}
                                             style={styles.inputIcon}
                                        />
                                        <TextInput
                                             style={[styles.input, { color: colors.text }]}
                                             placeholder="••••••••"
                                             placeholderTextColor={colors.textSecondary}
                                             value={password}
                                             onChangeText={setPassword}
                                             secureTextEntry={!showPassword}
                                             autoCapitalize="none"
                                             autoComplete="password"
                                        />
                                        <Pressable onPress={() => setShowPassword(!showPassword)}>
                                             <Ionicons
                                                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                                                  size={20}
                                                  color={colors.textSecondary}
                                             />
                                        </Pressable>
                                   </View>
                              </View>

                              {/* Submit Button */}
                              <Pressable
                                   style={[styles.submitButton, { backgroundColor: colors.tint }]}
                                   onPress={handleSubmit}
                              >
                                   <ThemedText style={styles.submitButtonText}>
                                        {formType === 'login' ? 'Sign In' : 'Sign Up'}
                                   </ThemedText>
                              </Pressable>

                              {/* Toggle Form Type */}
                              <View style={styles.toggleContainer}>
                                   <ThemedText style={[styles.toggleText, { color: colors.textSecondary }]}>
                                        {formType === 'login' ? "Don't have an account?" : 'Already have an account?'}
                                   </ThemedText>
                                   <Pressable onPress={() => setFormType(formType === 'login' ? 'register' : 'login')}>
                                        <ThemedText style={[styles.toggleButton, { color: colors.tint }]}>
                                             {formType === 'login' ? 'Sign Up' : 'Sign In'}
                                        </ThemedText>
                                   </Pressable>
                              </View>

                              {/* Divider */}
                              <View style={styles.dividerContainer}>
                                   <View style={[styles.divider, { backgroundColor: colors.textSecondary + '30' }]} />
                                   <ThemedText style={[styles.dividerText, { color: colors.textSecondary }]}>
                                        Social login - Coming Soon
                                   </ThemedText>
                                   <View style={[styles.divider, { backgroundColor: colors.textSecondary + '30' }]} />
                              </View>

                              {/* Social Login Buttons - Disabled */}
                              <View style={styles.socialButtons}>
                                   <Pressable
                                        style={[
                                             styles.socialButton,
                                             {
                                                  backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#f5f5f5',
                                                  borderColor: colorScheme === 'dark' ? '#2a2a2a' : '#e5e7eb',
                                                  opacity: 0.5,
                                             },
                                        ]}
                                        disabled
                                   >
                                        <Ionicons name="logo-google" size={24} color="#DB4437" />
                                   </Pressable>

                                   <Pressable
                                        style={[
                                             styles.socialButton,
                                             {
                                                  backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#f5f5f5',
                                                  borderColor: colorScheme === 'dark' ? '#2a2a2a' : '#e5e7eb',
                                                  opacity: 0.5,
                                             },
                                        ]}
                                        disabled
                                   >
                                        <Ionicons name="logo-facebook" size={24} color="#4267B2" />
                                   </Pressable>

                                   <Pressable
                                        style={[
                                             styles.socialButton,
                                             {
                                                  backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#f5f5f5',
                                                  borderColor: colorScheme === 'dark' ? '#2a2a2a' : '#e5e7eb',
                                                  opacity: 0.5,
                                             },
                                        ]}
                                        disabled
                                   >
                                        <Ionicons name="logo-github" size={24} color={colorScheme === 'dark' ? '#fff' : '#000'} />
                                   </Pressable>
                              </View>

                              {/* Note */}
                              <View style={styles.noteContainer}>
                                   <Ionicons name="information-circle-outline" size={16} color={colors.textSecondary} />
                                   <ThemedText style={[styles.noteText, { color: colors.textSecondary }]}>
                                        Authentication will be configured later
                                   </ThemedText>
                              </View>
                         </View>
                    </ScrollView>
               </KeyboardAvoidingView>
          </SafeAreaView>
     )
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
     },
     keyboardView: {
          flex: 1,
     },
     scrollContent: {
          flexGrow: 1,
          padding: 24,
     },
     backButton: {
          width: 40,
          height: 40,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 20,
     },
     header: {
          marginBottom: 32,
     },
     title: {
          fontSize: 32,
          fontWeight: 'bold',
          marginBottom: 8,
     },
     subtitle: {
          fontSize: 16,
     },
     form: {
          gap: 20,
     },
     inputGroup: {
          gap: 8,
     },
     label: {
          fontSize: 14,
          fontWeight: '600',
     },
     inputContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 12,
          borderWidth: 2,
          paddingHorizontal: 16,
          height: 52,
     },
     inputIcon: {
          marginRight: 12,
     },
     input: {
          flex: 1,
          fontSize: 16,
     },
     submitButton: {
          height: 52,
          borderRadius: 12,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 8,
     },
     submitButtonText: {
          color: '#fff',
          fontSize: 16,
          fontWeight: '600',
     },
     toggleContainer: {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 4,
     },
     toggleText: {
          fontSize: 14,
     },
     toggleButton: {
          fontSize: 14,
          fontWeight: '600',
     },
     dividerContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 8,
     },
     divider: {
          flex: 1,
          height: 1,
     },
     dividerText: {
          fontSize: 12,
          paddingHorizontal: 12,
     },
     socialButtons: {
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 16,
     },
     socialButton: {
          width: 56,
          height: 56,
          borderRadius: 28,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 2,
     },
     noteContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          marginTop: 8,
     },
     noteText: {
          fontSize: 12,
     },
})
