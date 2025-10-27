import React, { useState } from 'react'
import {
     View,
     Text,
     StyleSheet,
     Modal,
     TouchableOpacity,
     TextInput,
     Image,
     ScrollView,
     ActivityIndicator,
     Alert,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { postApi } from '@/lib/apis/postApi'

interface CreatePostModalProps {
     visible: boolean
     onClose: () => void
     onPostCreated: () => void
}

export default function CreatePostModal({ visible, onClose, onPostCreated }: CreatePostModalProps) {
     const colorScheme = useColorScheme()
     const colors = Colors[colorScheme ?? 'light']

     const [caption, setCaption] = useState('')
     const [image, setImage] = useState<string | null>(null)
     const [loading, setLoading] = useState(false)

     const pickImage = async () => {
          const result = await ImagePicker.launchImageLibraryAsync({
               mediaTypes: ['images'],
               allowsEditing: true,
               aspect: [1, 1],
               quality: 0.8,
          })

          if (!result.canceled) {
               setImage(result.assets[0].uri)
          }
     }

     const takePhoto = async () => {
          const result = await ImagePicker.launchCameraAsync({
               allowsEditing: true,
               aspect: [1, 1],
               quality: 0.8,
          })

          if (!result.canceled) {
               setImage(result.assets[0].uri)
          }
     }

     const handleSubmit = async () => {
          if (!caption && !image) {
               Alert.alert('Error', 'Please add caption or image')
               return
          }

          setLoading(true)

          try {
               const formData = new FormData()
               formData.append('title', 'Title test')
               formData.append('content', caption)

               if (image) {
                    const filename = image.split('/').pop() || 'photo.jpg'
                    const match = /\.(\w+)$/.exec(filename)
                    const type = match ? `image/${match[1]}` : 'image/jpeg'

                    formData.append('image', {
                         uri: image,
                         name: filename,
                         type,
                    } as any)
               }

               await postApi.create(formData)

               Alert.alert('Success', 'Post created!')
               setCaption('')
               setImage(null)
               onPostCreated()
               onClose()
          } catch {
               Alert.alert('Error', 'Failed to create post')
          } finally {
               setLoading(false)
          }
     }

     return (
          <Modal
               visible={visible}
               animationType="slide"
               presentationStyle="pageSheet"
               onRequestClose={onClose}
          >
               <View style={[styles.container, { backgroundColor: colors.background }]}>
                    {/* Header */}
                    <View style={[styles.header, { borderBottomColor: colors.border }]}>
                         <TouchableOpacity onPress={onClose}>
                              <Ionicons name="close" size={28} color={colors.text} />
                         </TouchableOpacity>
                         <Text style={[styles.title, { color: colors.text }]}>Create Post</Text>
                         <TouchableOpacity onPress={handleSubmit} disabled={loading || (!caption && !image)}>
                              {loading ? (
                                   <ActivityIndicator size="small" color={colors.tint} />
                              ) : (
                                   <Text style={[styles.postBtn, {
                                        color: (!caption && !image) ? colors.tabIconDefault : colors.tint
                                   }]}>
                                        Post
                                   </Text>
                              )}
                         </TouchableOpacity>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false}>
                         {/* Caption Input */}
                         <TextInput
                              style={[styles.input, { color: colors.text }]}
                              placeholder="What's on your mind?"
                              placeholderTextColor={colors.tabIconDefault}
                              multiline
                              value={caption}
                              onChangeText={setCaption}
                         />

                         {/* Image Preview */}
                         {image && (
                              <View style={styles.imageBox}>
                                   <Image source={{ uri: image }} style={styles.image} />
                                   <TouchableOpacity
                                        style={[styles.removeBtn, { backgroundColor: colors.background }]}
                                        onPress={() => setImage(null)}
                                   >
                                        <Ionicons name="close-circle" size={28} color={colors.text} />
                                   </TouchableOpacity>
                              </View>
                         )}

                         {/* Add Image Buttons */}
                         {!image && (
                              <View style={styles.actions}>
                                   <TouchableOpacity
                                        style={[styles.actionBtn, { borderColor: colors.border }]}
                                        onPress={pickImage}
                                   >
                                        <Ionicons name="images-outline" size={32} color={colors.tint} />
                                        <Text style={[styles.actionText, { color: colors.text }]}>Gallery</Text>
                                   </TouchableOpacity>
                                   <TouchableOpacity
                                        style={[styles.actionBtn, { borderColor: colors.border }]}
                                        onPress={takePhoto}
                                   >
                                        <Ionicons name="camera-outline" size={32} color={colors.tint} />
                                        <Text style={[styles.actionText, { color: colors.text }]}>Camera</Text>
                                   </TouchableOpacity>
                              </View>
                         )}
                    </ScrollView>
               </View>
          </Modal>
     )
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
     },
     header: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 16,
          borderBottomWidth: 1,
     },
     title: {
          fontSize: 18,
          fontWeight: '600',
     },
     postBtn: {
          fontSize: 16,
          fontWeight: '600',
     },
     input: {
          fontSize: 16,
          padding: 16,
          minHeight: 120,
          textAlignVertical: 'top',
     },
     imageBox: {
          margin: 16,
          borderRadius: 12,
     },
     image: {
          width: '100%',
          aspectRatio: 1,
          borderRadius: 12,
     },
     removeBtn: {
          position: 'absolute',
          top: 8,
          right: 8,
          borderRadius: 14,
     },
     actions: {
          flexDirection: 'row',
          padding: 16,
          gap: 16,
     },
     actionBtn: {
          flex: 1,
          padding: 24,
          borderRadius: 12,
          borderWidth: 2,
          borderStyle: 'dashed',
          alignItems: 'center',
     },
     actionText: {
          marginTop: 8,
          fontSize: 14,
          fontWeight: '500',
     },
})
