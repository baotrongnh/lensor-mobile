import React, { useState } from 'react'
import { StyleSheet, ScrollView, View, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { ThemedText } from '@/components/themed-text'
import CartItem from '@/components/cart/cart-item'
import OrderSummary from '@/components/cart/order-summary'
import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { CartItem as CartItemType } from '@/type/cart'

export default function CartScreen() {
     const colorScheme = useColorScheme()
     const colors = Colors[colorScheme ?? 'light']

     const [cartItems, setCartItems] = useState<CartItemType[]>([
          {
               id: '1',
               image: 'https://i.pinimg.com/736x/ec/09/19/ec09199edeabd5175406361756f80c27.jpg',
               title: 'Monstera Deliciosa Study',
               author: 'Elena Botanical',
               price: 85.0,
               quantity: 1,
          },
          {
               id: '2',
               image: 'https://i.pinimg.com/736x/d0/8d/16/d08d168165ce14dcac8da86e93fa044a.jpg',
               title: 'Eucalyptus Branch',
               author: 'Elena Botanical',
               price: 75.0,
               originalPrice: 150.0,
               quantity: 2,
          },
          {
               id: '3',
               image: 'https://i.pinimg.com/736x/1c/6b/f0/1c6bf09253e1819425a2e58ebcf5988d.jpg',
               title: 'Fern Collection',
               author: 'Elena Botanical',
               price: 120.0,
               quantity: 1,
          },
          {
               id: '4',
               image: 'https://i.pinimg.com/1200x/1b/08/af/1b08af4eab12bd921dc3541ccf6a10b1.jpg',
               title: 'Desert Succulent',
               author: 'Elena Botanical',
               price: 60.0,
               quantity: 1,
          },
          {
               id: '5',
               image: 'https://i.pinimg.com/736x/0a/20/fc/0a20fcc7bfacc5a20151f9e791e6b0f8.jpg',
               title: 'Golden Barrel Cactus',
               author: 'Elena Botanical',
               price: 95.0,
               originalPrice: 120.0,
               quantity: 1,
          },
     ])

     const handleQuantityChange = (id: string, newQuantity: number) => {
          setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
     }

     const handleRemoveItem = (id: string) => {
          setCartItems((items) => items.filter((item) => item.id !== id))
     }

     const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
     const shipping = 15.0
     const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

     return (
          <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
               {/* Header */}
               <View style={[styles.header, { borderBottomColor: colorScheme === 'dark' ? '#2a2a2a' : '#e5e7eb' }]}>
                    <Pressable style={styles.backButton} onPress={() => router.back()}>
                         <Ionicons name="arrow-back" size={24} color={colors.text} />
                    </Pressable>
                    <ThemedText style={styles.headerTitle}>Shopping Cart</ThemedText>
                    <View style={{ width: 40 }} />
               </View>

               <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
               >
                    {/* Cart Items */}
                    <View style={[styles.section, { backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#fff' }]}>
                         <View style={styles.sectionHeader}>
                              <Ionicons name="cart-outline" size={20} color={colors.text} />
                              <ThemedText style={styles.sectionTitle}>
                                   Items ({cartItems.length})
                              </ThemedText>
                         </View>

                         {cartItems.length === 0 ? (
                              <View style={styles.emptyCart}>
                                   <Ionicons name="cart-outline" size={64} color={colors.textSecondary} />
                                   <ThemedText style={[styles.emptyText, { color: colors.textSecondary }]}>
                                        Your cart is empty
                                   </ThemedText>
                                   <Pressable
                                        style={[styles.shopButton, { backgroundColor: colors.tint }]}
                                        onPress={() => router.push('/(tabs)/marketplace')}
                                   >
                                        <ThemedText style={styles.shopButtonText}>Continue Shopping</ThemedText>
                                   </Pressable>
                              </View>
                         ) : (
                              <View>
                                   {cartItems.map((item) => (
                                        <CartItem
                                             key={item.id}
                                             item={item}
                                             onQuantityChange={handleQuantityChange}
                                             onRemove={handleRemoveItem}
                                        />
                                   ))}
                              </View>
                         )}
                    </View>

                    {/* Order Summary */}
                    {cartItems.length > 0 && (
                         <OrderSummary subtotal={subtotal} shipping={shipping} itemCount={itemCount} />
                    )}

                    <View style={{ height: 40 }} />
               </ScrollView>
          </SafeAreaView>
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
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderBottomWidth: 1,
     },
     backButton: {
          padding: 4,
          width: 40,
     },
     headerTitle: {
          fontSize: 18,
          fontWeight: '700',
     },
     scrollContent: {
          padding: 16,
          gap: 16,
     },
     section: {
          borderRadius: 12,
          padding: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 2,
     },
     sectionHeader: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          marginBottom: 16,
          paddingBottom: 12,
          borderBottomWidth: 1,
          borderBottomColor: '#e5e7eb',
     },
     sectionTitle: {
          fontSize: 16,
          fontWeight: '600',
     },
     emptyCart: {
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 48,
          gap: 16,
     },
     emptyText: {
          fontSize: 16,
     },
     shopButton: {
          paddingHorizontal: 24,
          paddingVertical: 12,
          borderRadius: 12,
          marginTop: 8,
     },
     shopButtonText: {
          color: '#fff',
          fontSize: 16,
          fontWeight: '600',
     },
})
