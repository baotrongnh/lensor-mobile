import React from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons'
import { ThemedText } from '@/components/themed-text'
import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { CartItem as CartItemType } from '@/type/cart'

interface CartItemProps {
     item: CartItemType
     onQuantityChange: (id: string, quantity: number) => void
     onRemove: (id: string) => void
}

export default function CartItem({ item, onQuantityChange, onRemove }: CartItemProps) {
     const colorScheme = useColorScheme()
     const colors = Colors[colorScheme ?? 'light']

     const handleIncrease = () => {
          onQuantityChange(item.id, item.quantity + 1)
     }

     const handleDecrease = () => {
          if (item.quantity > 1) {
               onQuantityChange(item.id, item.quantity - 1)
          }
     }

     return (
          <View style={[styles.container, { borderBottomColor: colorScheme === 'dark' ? '#2a2a2a' : '#e5e7eb' }]}>
               <Image source={{ uri: item.image }} style={styles.image} contentFit="cover" />

               <View style={styles.info}>
                    <View style={styles.details}>
                         <ThemedText style={styles.title} numberOfLines={2}>
                              {item.title}
                         </ThemedText>
                         <ThemedText style={[styles.author, { color: colors.textSecondary }]}>
                              by {item.author}
                         </ThemedText>

                         <View style={styles.quantityRow}>
                              <View style={[styles.quantityControl, { borderColor: colorScheme === 'dark' ? '#2a2a2a' : '#e5e7eb' }]}>
                                   <Pressable
                                        style={styles.quantityButton}
                                        onPress={handleDecrease}
                                        disabled={item.quantity <= 1}
                                   >
                                        <Ionicons
                                             name="remove"
                                             size={18}
                                             color={item.quantity <= 1 ? colors.textSecondary : colors.text}
                                        />
                                   </Pressable>

                                   <ThemedText style={styles.quantity}>{item.quantity}</ThemedText>

                                   <Pressable style={styles.quantityButton} onPress={handleIncrease}>
                                        <Ionicons name="add" size={18} color={colors.text} />
                                   </Pressable>
                              </View>

                              <Pressable style={styles.removeButton} onPress={() => onRemove(item.id)}>
                                   <Ionicons name="trash-outline" size={16} color="#ef4444" />
                                   <ThemedText style={styles.removeText}>Remove</ThemedText>
                              </Pressable>
                         </View>
                    </View>

                    <View style={styles.priceContainer}>
                         <ThemedText style={styles.price}>${item.price.toFixed(2)}</ThemedText>
                         {item.originalPrice && (
                              <ThemedText style={styles.originalPrice}>${item.originalPrice.toFixed(2)}</ThemedText>
                         )}
                    </View>
               </View>
          </View>
     )
}

const styles = StyleSheet.create({
     container: {
          flexDirection: 'row',
          paddingVertical: 16,
          borderBottomWidth: 1,
          gap: 12,
     },
     image: {
          width: 96,
          height: 96,
          borderRadius: 12,
     },
     info: {
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
     },
     details: {
          flex: 1,
          justifyContent: 'space-between',
     },
     title: {
          fontSize: 16,
          fontWeight: '600',
          marginBottom: 4,
     },
     author: {
          fontSize: 13,
          marginBottom: 8,
     },
     quantityRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
     },
     quantityControl: {
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderRadius: 8,
          overflow: 'hidden',
     },
     quantityButton: {
          padding: 8,
          width: 32,
          alignItems: 'center',
          justifyContent: 'center',
     },
     quantity: {
          paddingHorizontal: 12,
          fontSize: 14,
          fontWeight: '600',
          minWidth: 40,
          textAlign: 'center',
     },
     removeButton: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
          paddingHorizontal: 8,
          paddingVertical: 6,
     },
     removeText: {
          color: '#ef4444',
          fontSize: 13,
          fontWeight: '500',
     },
     priceContainer: {
          alignItems: 'flex-end',
          justifyContent: 'space-between',
     },
     price: {
          fontSize: 18,
          fontWeight: '700',
     },
     originalPrice: {
          fontSize: 13,
          color: '#999',
          textDecorationLine: 'line-through',
     },
})
