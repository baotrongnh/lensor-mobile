import React, { useState } from 'react'
import { StyleSheet, ScrollView, View, Pressable, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams, router } from 'expo-router'
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons'
import { ThemedText } from '@/components/themed-text'
import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { MARKETPLACE_PRODUCTS } from '@/constants/marketplace-data'

const { width } = Dimensions.get('window')

export default function ProductDetailScreen() {
     const { id } = useLocalSearchParams()
     const colorScheme = useColorScheme()
     const colors = Colors[colorScheme ?? 'light']
     const [selectedImageIndex, setSelectedImageIndex] = useState(0)

     const product = MARKETPLACE_PRODUCTS.find((p) => p.id === Number(id))

     if (!product) {
          return (
               <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
                    <ThemedText>Product not found</ThemedText>
               </SafeAreaView>
          )
     }

     const images = product.images || [product.image]

     return (
          <View style={[styles.container, { backgroundColor: colors.background }]}>
               {/* Header */}
               <View style={[styles.header, { borderBottomColor: colorScheme === 'dark' ? '#2a2a2a' : '#e5e7eb' }]}>
                    <ThemedText style={styles.headerTitle} numberOfLines={1}>
                         {product.title}
                    </ThemedText>
                    <Pressable style={styles.shareButton}>
                         <Ionicons name="share-social-outline" size={24} color={colors.text} />
                    </Pressable>
               </View>

               <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Main Image */}
                    <View style={styles.imageContainer}>
                         <Image source={{ uri: images[selectedImageIndex] }} style={styles.mainImage} contentFit="cover" />
                    </View>

                    {/* Thumbnail Gallery */}
                    {images.length > 1 && (
                         <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.thumbnailContainer}>
                              {images.map((img, index) => (
                                   <Pressable
                                        key={index}
                                        onPress={() => setSelectedImageIndex(index)}
                                        style={[
                                             styles.thumbnail,
                                             {
                                                  borderColor: selectedImageIndex === index ? colors.tint : 'transparent',
                                             },
                                        ]}
                                   >
                                        <Image source={{ uri: img }} style={styles.thumbnailImage} contentFit="cover" />
                                   </Pressable>
                              ))}
                         </ScrollView>
                    )}

                    {/* Product Info */}
                    <View style={styles.content}>
                         {/* Title and Author */}
                         <View style={styles.titleSection}>
                              <ThemedText style={styles.title}>{product.title}</ThemedText>
                              <View style={styles.authorRow}>
                                   <Image source={{ uri: product.author.avatar }} style={styles.authorAvatar} />
                                   <View style={{ flex: 1 }}>
                                        <ThemedText style={styles.authorName}>{product.author.name}</ThemedText>
                                        <ThemedText style={[styles.category, { color: colors.textSecondary }]}>
                                             {product.category}
                                        </ThemedText>
                                   </View>
                              </View>
                         </View>

                         {/* Stats Row */}
                         <View style={[styles.statsRow, { backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#f9f9f9' }]}>
                              <View style={styles.statItem}>
                                   <Ionicons name="star" size={20} color="#FFD700" />
                                   <ThemedText style={styles.statText}>
                                        {product.rating} ({product.reviewCount || 0})
                                   </ThemedText>
                              </View>
                              <View style={styles.statDivider} />
                              <View style={styles.statItem}>
                                   <Ionicons name="download-outline" size={20} color={colors.tint} />
                                   <ThemedText style={styles.statText}>{product.downloads || 0} sales</ThemedText>
                              </View>
                         </View>

                         {/* Description */}
                         <View style={styles.section}>
                              <ThemedText style={styles.sectionTitle}>Description</ThemedText>
                              <ThemedText style={[styles.description, { color: colors.textSecondary }]}>{product.description}</ThemedText>
                         </View>

                         {/* Features */}
                         {product.features && (
                              <View style={styles.section}>
                                   <ThemedText style={styles.sectionTitle}>Features</ThemedText>
                                   {product.features.map((feature, index) => (
                                        <View key={index} style={styles.featureRow}>
                                             <Ionicons name="checkmark-circle" size={20} color={colors.tint} />
                                             <ThemedText style={[styles.featureText, { color: colors.textSecondary }]}>{feature}</ThemedText>
                                        </View>
                                   ))}
                              </View>
                         )}

                         {/* Compatibility */}
                         {product.compatibility && (
                              <View style={styles.section}>
                                   <ThemedText style={styles.sectionTitle}>Compatibility</ThemedText>
                                   <View style={styles.chipContainer}>
                                        {product.compatibility.map((item, index) => (
                                             <View
                                                  key={index}
                                                  style={[styles.chip, { backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#f5f5f5' }]}
                                             >
                                                  <ThemedText style={styles.chipText}>{item}</ThemedText>
                                             </View>
                                        ))}
                                   </View>
                              </View>
                         )}

                         {/* File Info */}
                         <View style={[styles.fileInfo, { backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#f9f9f9' }]}>
                              {product.fileFormat && (
                                   <View style={styles.fileInfoRow}>
                                        <ThemedText style={[styles.fileInfoLabel, { color: colors.textSecondary }]}>Format:</ThemedText>
                                        <ThemedText style={styles.fileInfoValue}>{product.fileFormat}</ThemedText>
                                   </View>
                              )}
                              {product.fileSize && (
                                   <View style={styles.fileInfoRow}>
                                        <ThemedText style={[styles.fileInfoLabel, { color: colors.textSecondary }]}>File Size:</ThemedText>
                                        <ThemedText style={styles.fileInfoValue}>{product.fileSize}</ThemedText>
                                   </View>
                              )}
                         </View>

                         <View style={{ height: 100 }} />
                    </View>
               </ScrollView>

               {/* Bottom Bar */}
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
