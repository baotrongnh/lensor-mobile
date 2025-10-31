import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { ThemedText } from '@/components/themed-text'
import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'

interface OrderSummaryProps {
     subtotal: number
     shipping: number
     itemCount: number
}

export default function OrderSummary({ subtotal, shipping, itemCount }: OrderSummaryProps) {
     const colorScheme = useColorScheme()
     const colors = Colors[colorScheme ?? 'light']
     const [promoCode, setPromoCode] = useState('')
     const total = subtotal + shipping

     const handleApplyPromo = () => {
          console.log('Applying promo code:', promoCode)
          // TODO: Implement promo code logic
     }

     return (
          <View style={styles.container}>
               {/* Promo Code */}
               <View style={[styles.card, { backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#f9f9f9' }]}>
                    <View style={styles.cardHeader}>
                         <Ionicons name="pricetag-outline" size={20} color={colors.text} />
                         <ThemedText style={styles.cardTitle}>Promo Code</ThemedText>
                    </View>

                    <View style={styles.promoRow}>
                         <TextInput
                              style={[
                                   styles.promoInput,
                                   {
                                        backgroundColor: colors.background,
                                        color: colors.text,
                                        borderColor: colorScheme === 'dark' ? '#2a2a2a' : '#e5e7eb',
                                   },
                              ]}
                              placeholder="Enter promo code"
                              placeholderTextColor={colors.textSecondary}
                              value={promoCode}
                              onChangeText={setPromoCode}
                         />
                         <Pressable
                              style={[styles.applyButton, { backgroundColor: colors.tint }]}
                              onPress={handleApplyPromo}
                         >
                              <ThemedText style={styles.applyButtonText}>Apply</ThemedText>
                         </Pressable>
                    </View>

                    <ThemedText style={[styles.hint, { color: colors.textSecondary }]}>
                         Try: BOTANICAL10, SPRING15 or FIRST20
                    </ThemedText>
               </View>

               {/* Order Summary */}
               <View style={[styles.card, { backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#f9f9f9' }]}>
                    <ThemedText style={styles.cardTitle}>Order Summary</ThemedText>

                    <View style={styles.summaryRow}>
                         <ThemedText style={[styles.summaryLabel, { color: colors.textSecondary }]}>
                              Subtotal ({itemCount} items)
                         </ThemedText>
                         <ThemedText style={styles.summaryValue}>${subtotal.toFixed(2)}</ThemedText>
                    </View>

                    <View style={styles.summaryRow}>
                         <ThemedText style={[styles.summaryLabel, { color: colors.textSecondary }]}>Shipping</ThemedText>
                         <ThemedText style={styles.summaryValue}>${shipping.toFixed(2)}</ThemedText>
                    </View>

                    <View style={[styles.divider, { backgroundColor: colorScheme === 'dark' ? '#2a2a2a' : '#e5e7eb' }]} />

                    <View style={styles.totalRow}>
                         <ThemedText style={styles.totalLabel}>Total</ThemedText>
                         <ThemedText style={styles.totalValue}>${total.toFixed(2)}</ThemedText>
                    </View>

                    <Pressable style={[styles.checkoutButton, { backgroundColor: colors.tint }]}>
                         <Ionicons name="card-outline" size={20} color="#fff" />
                         <ThemedText style={styles.checkoutButtonText}>Proceed to Checkout</ThemedText>
                    </Pressable>
               </View>

               {/* Benefits */}
               <View style={[styles.card, { backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#f9f9f9' }]}>
                    <View style={styles.benefitRow}>
                         <Ionicons name="car-outline" size={20} color={colors.textSecondary} />
                         <View style={styles.benefitText}>
                              <ThemedText style={styles.benefitTitle}>Free Shipping</ThemedText>
                              <ThemedText style={[styles.benefitSubtitle, { color: colors.textSecondary }]}>
                                   On orders over $200
                              </ThemedText>
                         </View>
                    </View>

                    <View style={styles.benefitRow}>
                         <Ionicons name="cube-outline" size={20} color={colors.textSecondary} />
                         <View style={styles.benefitText}>
                              <ThemedText style={styles.benefitTitle}>Secure Packaging</ThemedText>
                              <ThemedText style={[styles.benefitSubtitle, { color: colors.textSecondary }]}>
                                   Art safely packed & insured
                              </ThemedText>
                         </View>
                    </View>
               </View>
          </View>
     )
}

const styles = StyleSheet.create({
     container: {
          gap: 16,
     },
     card: {
          padding: 16,
          borderRadius: 12,
          gap: 12,
     },
     cardHeader: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
     },
     cardTitle: {
          fontSize: 16,
          fontWeight: '600',
     },
     promoRow: {
          flexDirection: 'row',
          gap: 8,
     },
     promoInput: {
          flex: 1,
          paddingHorizontal: 12,
          paddingVertical: 10,
          borderRadius: 8,
          borderWidth: 1,
          fontSize: 14,
     },
     applyButton: {
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
     },
     applyButtonText: {
          color: '#fff',
          fontSize: 14,
          fontWeight: '600',
     },
     hint: {
          fontSize: 11,
     },
     summaryRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
     },
     summaryLabel: {
          fontSize: 14,
     },
     summaryValue: {
          fontSize: 14,
          fontWeight: '600',
     },
     divider: {
          height: 1,
          marginVertical: 4,
     },
     totalRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 4,
     },
     totalLabel: {
          fontSize: 18,
          fontWeight: '600',
     },
     totalValue: {
          fontSize: 20,
          fontWeight: '700',
     },
     checkoutButton: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          paddingVertical: 16,
          borderRadius: 12,
          marginTop: 8,
     },
     checkoutButtonText: {
          color: '#fff',
          fontSize: 16,
          fontWeight: '700',
     },
     benefitRow: {
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: 12,
     },
     benefitText: {
          flex: 1,
     },
     benefitTitle: {
          fontSize: 14,
          fontWeight: '600',
          marginBottom: 2,
     },
     benefitSubtitle: {
          fontSize: 12,
     },
})
