import React from 'react'
import { Modal, StyleSheet, Pressable, View, Dimensions } from 'react-native'
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/theme'
import { ThemedText } from '../themed-text'
import { useColorScheme } from '@/hooks/use-color-scheme'

interface ImageViewerProps {
  visible: boolean
  imageUrl: string
  onClose: () => void
  username?: string
  caption?: string
}

const { width, height } = Dimensions.get('window')

export default function ImageViewer({ visible, imageUrl, onClose, username, caption }: ImageViewerProps) {
  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme ?? 'light']

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Close Button */}
        <Pressable style={styles.closeBtn} onPress={onClose}>
          <Ionicons name="close" size={32} color="#fff" />
        </Pressable>

        {/* Image */}
        <Pressable style={styles.imageContainer} onPress={onClose}>
          <Image
            source={imageUrl}
            style={styles.image}
            contentFit="contain"
            transition={300}
          />
        </Pressable>

        {/* Caption (Optional) */}
        {caption && (
          <View style={[styles.captionContainer, { backgroundColor: colors.background + 'E6' }]}>
            <ThemedText style={styles.username}>{username}</ThemedText>
            <ThemedText style={styles.caption}> {caption}</ThemedText>
          </View>
        )}
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtn: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    padding: 8,
  },
  imageContainer: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width,
    height: height * 0.8,
  },
  captionContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  username: {
    fontSize: 14,
    fontWeight: '600',
  },
  caption: {
    fontSize: 14,
  },
})
