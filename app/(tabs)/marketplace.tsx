import React, { useState } from 'react'
import { StyleSheet, FlatList, View, TextInput, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedText } from '@/components/themed-text'
import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { MARKETPLACE_PRODUCTS } from '@/constants/marketplace-data'
import ProductCard from '@/components/marketplace/product-card'
import { Ionicons } from '@expo/vector-icons'

export default function MarketplaceScreen() {
  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme ?? 'light']
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'lightroom' | 'photoshop'>('all')

  const filteredProducts = MARKETPLACE_PRODUCTS.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.author.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = selectedFilter === 'all' || product.software === selectedFilter
    return matchesSearch && matchesFilter
  })

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <ThemedText style={styles.title}>Your </ThemedText>
              <ThemedText style={[styles.title, { color: colors.tint }]}>Marketplace </ThemedText>
              <ThemedText style={styles.title}>for Creativity</ThemedText>
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
  list: {
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
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