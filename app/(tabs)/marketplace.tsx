import React, { useState } from 'react'
import { StyleSheet, FlatList, View, TextInput, Pressable, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { ThemedText } from '@/components/themed-text'
import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import ProductCard from '@/components/marketplace/product-card'
import { Ionicons } from '@expo/vector-icons'
import { useMarketplace } from '@/lib/hooks/useMarketplaceHooks'
import { MarketplaceItem } from '@/type/marketplace'

export default function MarketplaceScreen() {
  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme ?? 'light']
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'lightroom' | 'photoshop'>('all')

  const { data, isLoading } = useMarketplace()
  const products: MarketplaceItem[] = data?.data || []

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.author.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = selectedFilter === 'all' || product.software === selectedFilter
    return matchesSearch && matchesFilter
  })

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={colors.tint} />
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <View style={styles.titleRow}>
              <View style={styles.titleContainer}>
                <ThemedText style={styles.title}>Your </ThemedText>
                <ThemedText style={[styles.title, { color: colors.tint }]}>Marketplace </ThemedText>
                <ThemedText style={styles.title}>for Creativity</ThemedText>
              </View>
              <Pressable style={styles.cartButton} onPress={() => router.push('/cart' as any)}>
                <Ionicons name="cart-outline" size={24} color={colors.text} />
                {/* TODO: Add badge for cart item count */}
              </Pressable>
            </View>
            <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>
              Buy and showcase stunning presets
            </ThemedText>

            <View style={[styles.searchBar, { backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#f5f5f5' }]}>
              <Ionicons name="search" size={20} color={colors.icon} />
              <TextInput
                style={[styles.searchInput, { color: colors.text }]}
                placeholder="Search..."
                placeholderTextColor={colors.textSecondary}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery.length > 0 && (
                <Pressable onPress={() => setSearchQuery('')}>
                  <Ionicons name="close-circle" size={20} color={colors.icon} />
                </Pressable>
              )}
            </View>

            <View style={styles.filters}>
              {(['all', 'lightroom', 'photoshop'] as const).map((filter) => (
                <Pressable
                  key={filter}
                  style={[
                    styles.chip,
                    {
                      backgroundColor:
                        selectedFilter === filter ? colors.tint : colorScheme === 'dark' ? '#1a1a1a' : '#f5f5f5',
                    },
                  ]}
                  onPress={() => setSelectedFilter(filter)}
                >
                  <ThemedText style={[styles.chipText, { color: selectedFilter === filter ? '#fff' : colors.text }]}>
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </ThemedText>
                </Pressable>
              ))}
            </View>

            <ThemedText style={[styles.results, { color: colors.textSecondary }]}>
              {filteredProducts.length} results
            </ThemedText>
          </View>
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
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
  list: {
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  cartButton: {
    padding: 8,
    marginTop: -4,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 0,
  },
  filters: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  results: {
    fontSize: 14,
  },
})