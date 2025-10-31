import React from 'react'
import { StyleSheet, ScrollView, View, Pressable, Dimensions, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams, router } from 'expo-router'
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons'
import { ThemedText } from '@/components/themed-text'
import ImageCompare from '@/components/marketplace/image-compare'
import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { useMarketplaceDetail } from '@/lib/hooks/useMarketplaceHooks'
import { ImagePair } from '@/type/marketplace'

const { width } = Dimensions.get('window')
const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://14.169.52.232:3005'

export default function ProductDetailScreen() {
     const { id } = useLocalSearchParams()
     const colorScheme = useColorScheme()
     const colors = Colors[colorScheme ?? 'light']

     console.log('🏠 ProductDetailScreen - Received ID:', id)
     const { data: product, isLoading, error } = useMarketplaceDetail(id as string)
     console.log('🏠 ProductDetailScreen - product:', product)
     console.log('🏠 ProductDetailScreen - isLoading:', isLoading)
     console.log('🏠 ProductDetailScreen - error:', error)

     if (isLoading) {
          return (
               <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
                    <View style={styles.loading}>
                         <ActivityIndicator size="large" color={colors.tint} />
                    </View>
               </SafeAreaView>
          )
     }

     if (!product) {
          return (
               <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
                    <ThemedText>Product not found</ThemedText>
                    <ThemedText style={{ marginTop: 10, fontSize: 12 }}>ID: {id}</ThemedText>
                    <ThemedText style={{ marginTop: 10, fontSize: 12 }}>Error: {JSON.stringify(error)}</ThemedText>
               </SafeAreaView>
          )
     }

     const imagePairs = product.imagePairs || []

     return (
          <View style={[styles.container, { backgroundColor: colors.background }]}>
               <View style={[styles.header, { borderBottomColor: colorScheme === 'dark' ? '#2a2a2a' : '#e5e7eb' }]}>
                    <Pressable style={styles.backButton} onPress={() => router.back()}>
                         <Ionicons name="arrow-back" size={24} color={colors.text} />
                    </Pressable>
                    <ThemedText style={styles.headerTitle} numberOfLines={1}>
                         {product.title}
                    </ThemedText>
                    <Pressable style={styles.shareButton}>
                         <Ionicons name="share-social-outline" size={24} color={colors.text} />
                    </Pressable>
               </View>

               <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.imageContainer}>
                         <Image source={{ uri: `${BASE_URL}${product.thumbnail}` }} style={styles.mainImage} contentFit="cover" />
                    </View>

                    <View style={styles.content}>
                         <View style={styles.titleSection}>
                              <ThemedText style={styles.title}>{product.title}</ThemedText>
                              <View style={styles.authorRow}>
                                   <Image source={{ uri: `${BASE_URL}${product.author.avatar}` }} style={styles.authorAvatar} />
                                   <View style={{ flex: 1 }}>
                                        <ThemedText style={styles.authorName}>{product.author.name}</ThemedText>
                                        {product.software && (
                                             <ThemedText style={[styles.category, { color: colors.textSecondary }]}>
                                                  {product.software}
                                             </ThemedText>
                                        )}
                                   </View>
                              </View>
                         </View>

                         {product.rating && (
                              <View style={[styles.statsRow, { backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#f9f9f9' }]}>
                                   <View style={styles.statItem}>
                                        <Ionicons name="star" size={20} color="#FFD700" />
                                        <ThemedText style={styles.statText}>{product.rating}</ThemedText>
                                   </View>
                              </View>
                         )}

                         <View style={styles.section}>
                              <ThemedText style={styles.sectionTitle}>Description</ThemedText>
                              <ThemedText style={[styles.description, { color: colors.textSecondary }]}>
                                   {product.description}
                              </ThemedText>
                         </View>

                         {imagePairs.length > 0 && (
                              <View style={styles.section}>
                                   <ThemedText style={styles.sectionTitle}>Before & After</ThemedText>
                                   {imagePairs.map((pair: ImagePair, index: number) => (
                                        <View key={index} style={{ marginBottom: 16 }}>
                                             <ImageCompare
                                                  beforeImage={pair.before}
                                                  afterImage={pair.after}
                                                  width={width - 32}
                                                  height={300}
                                             />
                                        </View>
                                   ))}
                              </View>
                         )}

                         {product.presetFile && (
                              <View style={[styles.fileInfo, { backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#f9f9f9' }]}>
                                   <View style={styles.fileInfoRow}>
                                        <ThemedText style={[styles.fileInfoLabel, { color: colors.textSecondary }]}>
                                             Format:
                                        </ThemedText>
                                        <ThemedText style={styles.fileInfoValue}>{product.presetFile.format}</ThemedText>
                                   </View>
                                   {product.presetFile.fileSize && (
                                        <View style={styles.fileInfoRow}>
                                             <ThemedText style={[styles.fileInfoLabel, { color: colors.textSecondary }]}>
                                                  File Size:
                                             </ThemedText>
                                             <ThemedText style={styles.fileInfoValue}>{product.presetFile.fileSize} MB</ThemedText>
                                        </View>
                                   )}
                              </View>
                         )}

                         <View style={{ height: 100 }} />
                    </View>
               </ScrollView>

               <View
                    style={[
                         styles.bottomBar,
                         { backgroundColor: colors.background, borderTopColor: colorScheme === 'dark' ? '#2a2a2a' : '#e5e7eb' },
                    ]}
               >
                    <View>
                         <ThemedText style={[styles.priceLabel, { color: colors.textSecondary }]}>Price</ThemedText>
                         <ThemedText style={[styles.price, { color: colors.tint }]}>${product.price}</ThemedText>
                    </View>
                    <Pressable style={[styles.buyButton, { backgroundColor: colors.tint }]}>
                         <Ionicons name="cart-outline" size={20} color="#fff" />
                         <ThemedText style={styles.buyButtonText}>Add to Cart</ThemedText>
                    </Pressable>
               </View>
          </View>
     )
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
     },
     loading: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
     },
     header: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderBottomWidth: 1,
          gap: 12,
     },
     backButton: {
          padding: 4,
     },
     headerTitle: {
          flex: 1,
          fontSize: 18,
          fontWeight: '600',
     },
     shareButton: {
          padding: 4,
     },
     imageContainer: {
          width: '100%',
          height: width,
          backgroundColor: '#000',
     },
     mainImage: {
          width: '100%',
          height: '100%',
     },
     thumbnailContainer: {
          paddingHorizontal: 16,
          paddingVertical: 12,
     },
     thumbnail: {
          width: 80,
          height: 80,
          borderRadius: 8,
          marginRight: 8,
          borderWidth: 3,
          overflow: 'hidden',
     },
     thumbnailImage: {
          width: '100%',
          height: '100%',
     },
     content: {
          padding: 16,
     },
     titleSection: {
          marginBottom: 16,
     },
     title: {
          fontSize: 24,
          fontWeight: '700',
          marginBottom: 12,
     },
     authorRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
     },
     authorAvatar: {
          width: 48,
          height: 48,
          borderRadius: 24,
     },
     authorName: {
          fontSize: 16,
          fontWeight: '600',
     },
     category: {
          fontSize: 14,
          marginTop: 2,
     },
     statsRow: {
          flexDirection: 'row',
          padding: 16,
          borderRadius: 12,
          marginBottom: 20,
     },
     statItem: {
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
     },
     statDivider: {
          width: 1,
          backgroundColor: '#e5e7eb',
     },
     statText: {
          fontSize: 14,
          fontWeight: '600',
     },
     section: {
          marginBottom: 24,
     },
     sectionTitle: {
          fontSize: 18,
          fontWeight: '700',
          marginBottom: 12,
     },
     description: {
          fontSize: 15,
          lineHeight: 22,
     },
     featureRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          marginBottom: 10,
     },
     featureText: {
          fontSize: 15,
          flex: 1,
     },
     chipContainer: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 8,
     },
     chip: {
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderRadius: 8,
     },
     chipText: {
          fontSize: 14,
          fontWeight: '500',
     },
     fileInfo: {
          padding: 16,
          borderRadius: 12,
          marginBottom: 20,
     },
     fileInfoRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 8,
     },
     fileInfoLabel: {
          fontSize: 14,
     },
     fileInfoValue: {
          fontSize: 14,
          fontWeight: '600',
     },
     bottomBar: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingVertical: 16,
          borderTopWidth: 1,
     },
     priceLabel: {
          fontSize: 12,
          marginBottom: 4,
     },
     price: {
          fontSize: 24,
          fontWeight: '700',
     },
     buyButton: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          paddingHorizontal: 24,
          paddingVertical: 14,
          borderRadius: 12,
     },
     buyButtonText: {
          color: '#fff',
          fontSize: 16,
          fontWeight: '700',
     },
})
