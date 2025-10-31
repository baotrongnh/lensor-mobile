import React from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons'
import { ThemedText } from '@/components/themed-text'
import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { MarketplaceItem } from '@/type/marketplace'
import { router } from 'expo-router'

const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://14.169.52.232:3005'

interface ProductCardProps {
     product: MarketplaceItem
}

export default function ProductCard({ product }: ProductCardProps) {
     const colorScheme = useColorScheme()
     const colors = Colors[colorScheme ?? 'light']

     const handlePress = () => {
          router.push(`/product/${product.id}` as any)
     }

     return (
          <Pressable
               style={[styles.card, { backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#f9f9f9' }]}
               onPress={handlePress}
          >
               <View style={styles.imageContainer}>
                    <Image
                         source={{ uri: `${BASE_URL}${product.thumbnail}` }}
                         style={styles.image}
                         contentFit="cover"
                         transition={300}
                    />
                    <View style={styles.gradientOverlay} />

                    <View style={[styles.priceBadge, { backgroundColor: colors.tint }]}>
                         <ThemedText style={styles.priceText}>${product.price}</ThemedText>
                    </View>

                    {product.rating && (
                         <View style={[styles.ratingBadge, { backgroundColor: 'rgba(0,0,0,0.7)' }]}>
                              <Ionicons name="star" size={14} color="#FFD700" />
                              <ThemedText style={styles.ratingText}>{product.rating}</ThemedText>
                         </View>
                    )}
               </View>

               <View style={styles.info}>
                    <ThemedText style={styles.title} numberOfLines={2}>
                         {product.title}
                    </ThemedText>
                    <ThemedText style={[styles.description, { color: colors.textSecondary }]} numberOfLines={2}>
                         {product.description}
                    </ThemedText>

                    <View style={styles.author}>
                         <Image source={{ uri: `${BASE_URL}${product.author.avatar}` }} style={styles.avatar} />
                         <ThemedText style={[styles.authorName, { color: colors.textSecondary }]} numberOfLines={1}>
                              {product.author.name}
                         </ThemedText>
                    </View>
               </View>
          </Pressable>
     )
}

const styles = StyleSheet.create({
     card: {
          borderRadius: 16,
          overflow: 'hidden',
          marginBottom: 16,
          elevation: 2,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
     },
     imageContainer: {
          width: '100%',
          height: 200,
          position: 'relative',
     },
     image: {
          width: '100%',
          height: '100%',
     },
     gradientOverlay: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50%',
          backgroundColor: 'rgba(0,0,0,0.3)',
     },
     priceBadge: {
          position: 'absolute',
          top: 12,
          right: 12,
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 8,
     },
     priceText: {
          color: '#fff',
          fontSize: 16,
          fontWeight: '700',
     },
     ratingBadge: {
          position: 'absolute',
          top: 12,
          left: 12,
          paddingHorizontal: 10,
          paddingVertical: 6,
          borderRadius: 8,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
     },
     ratingText: {
          color: '#fff',
          fontSize: 14,
          fontWeight: '600',
     },
     info: {
          padding: 12,
     },
     title: {
          fontSize: 16,
          fontWeight: '700',
          marginBottom: 4,
     },
     description: {
          fontSize: 13,
          lineHeight: 18,
          marginBottom: 8,
     },
     author: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          marginTop: 4,
     },
     avatar: {
          width: 24,
          height: 24,
          borderRadius: 12,
     },
     authorName: {
          fontSize: 13,
          flex: 1,
     },
})
