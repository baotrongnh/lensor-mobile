import React from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import { ThemedText } from '../themed-text'
import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'

type TabType = 'your' | 'saved' | 'loved'

interface ProfileTabsProps {
     activeTab: TabType
     onTabChange: (tab: TabType) => void
}

interface TabConfig {
     key: TabType
     label: string
}

const TABS: TabConfig[] = [
     { key: 'your', label: 'Your posts' },
     { key: 'saved', label: 'Saved posts' },
     { key: 'loved', label: 'Loved posts' },
]

export default function ProfileTabs({ activeTab, onTabChange }: ProfileTabsProps) {
     const colorScheme = useColorScheme()
     const colors = Colors[colorScheme ?? 'light']

     const renderTab = (tab: TabConfig) => {
          const isActive = activeTab === tab.key

          return (
               <Pressable
                    key={tab.key}
                    style={[
                         styles.tab,
                         isActive && [styles.activeTab, { borderBottomColor: colors.tint }],
                    ]}
                    onPress={() => onTabChange(tab.key)}
               >
                    <ThemedText
                         style={[
                              styles.tabText,
                              { color: isActive ? colors.tint : colors.textSecondary },
                              isActive && styles.activeTabText,
                         ]}
                    >
                         {tab.label}
                    </ThemedText>
               </Pressable>
          )
     }

     return (
          <View
               style={[
                    styles.container,
                    {
                         backgroundColor: colors.background,
                         borderBottomColor: colorScheme === 'dark' ? '#2a2a2a' : '#e5e7eb',
                    },
               ]}
          >
               {TABS.map(renderTab)}
          </View>
     )
}

const styles = StyleSheet.create({
     container: {
          flexDirection: 'row',
          paddingHorizontal: 12,
          borderBottomWidth: 1,
     },
     tab: {
          flex: 1,
          paddingVertical: 14,
          alignItems: 'center',
          borderBottomWidth: 2,
          borderBottomColor: 'transparent',
     },
     activeTab: {
          borderBottomWidth: 2,
     },
     tabText: {
          fontSize: 14,
     },
     activeTabText: {
          fontWeight: '600',
     },
})
