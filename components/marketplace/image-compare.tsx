import React, { useState } from 'react'
import { View, Text, StyleSheet, Dimensions, PanResponder } from 'react-native'
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons'

interface ImageCompareProps {
     beforeImage: string
     afterImage: string
     width?: number
     height?: number
}

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://14.169.52.232:3005'

export default function ImageCompare({
     beforeImage,
     afterImage,
     width = SCREEN_WIDTH - 32,
     height = 400
}: ImageCompareProps) {
     const [sliderPosition, setSliderPosition] = useState(width / 2)
     const [isDragging, setIsDragging] = useState(false)

     const panResponder = PanResponder.create({
          onStartShouldSetPanResponder: () => true,
          onMoveShouldSetPanResponder: () => true,
          onPanResponderGrant: () => {
               setIsDragging(true)
          },
          onPanResponderMove: (_, gesture) => {
               const newX = gesture.moveX
               if (newX >= 0 && newX <= width) {
                    setSliderPosition(newX)
               }
          },
          onPanResponderRelease: () => {
               setIsDragging(false)
          },
     })

     return (
          <View style={[styles.container, { width, height }]}>
               {/* After Image (Background) */}
               <Image source={{ uri: `${BASE_URL}${afterImage}` }} style={styles.image} contentFit="cover" />

               {/* Before Image (Masked) */}
               <View style={[styles.beforeContainer, { width: sliderPosition }]}>
                    <Image source={{ uri: `${BASE_URL}${beforeImage}` }} style={[styles.image, { width }]} contentFit="cover" />
               </View>

               {/* Slider */}
               <View
                    style={[styles.slider, { left: sliderPosition }]}
                    {...panResponder.panHandlers}
               >
                    <View style={styles.sliderLine} />
                    <View style={[styles.sliderHandle, isDragging && styles.sliderHandleActive]}>
                         <Ionicons name="chevron-back" size={18} color="#8c4aea" />
                         <Ionicons name="chevron-forward" size={18} color="#8c4aea" />
                    </View>
               </View>

               {/* Labels */}
               <View style={styles.labels}>
                    <View style={styles.labelBefore}>
                         <Ionicons name="image" size={14} color="#fff" />
                         <Text style={styles.labelText}>Before</Text>
                    </View>
                    <View style={styles.labelAfter}>
                         <Text style={styles.labelText}>After</Text>
                         <Ionicons name="sparkles" size={14} color="#fff" />
                    </View>
               </View>

               {/* Hint */}
               {!isDragging && (
                    <View style={styles.hint}>
                         <Ionicons name="arrow-forward" size={16} color="#fff" />
                         <Text style={styles.hintText}>Drag to compare</Text>
                         <Ionicons name="arrow-back" size={16} color="#fff" />
                    </View>
               )}
          </View>
     )
}


const styles = StyleSheet.create({
     container: {
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 12,
          backgroundColor: '#000',
     },
     image: {
          width: '100%',
          height: '100%',
     },
     beforeContainer: {
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          overflow: 'hidden',
     },
     slider: {
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: 50,
          marginLeft: -25,
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
     },
     sliderLine: {
          width: 2,
          height: '100%',
          backgroundColor: '#fff',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.5,
          shadowRadius: 4,
          elevation: 5,
     },
     sliderHandle: {
          position: 'absolute',
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: '#fff',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: -4,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 8,
          elevation: 8,
          borderWidth: 3,
          borderColor: '#8c4aea',
     },
     sliderHandleActive: {
          transform: [{ scale: 1.1 }],
          borderColor: '#a56ef5',
     },
     labels: {
          position: 'absolute',
          top: 16,
          left: 16,
          right: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
          pointerEvents: 'none',
     },
     labelBefore: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 20,
          backgroundColor: 'rgba(0,0,0,0.7)',
     },
     labelAfter: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 20,
          backgroundColor: 'rgba(140,74,234,0.8)',
     },
     labelText: {
          color: '#fff',
          fontSize: 12,
          fontWeight: '600',
     },
     hint: {
          position: 'absolute',
          bottom: 20,
          left: 0,
          right: 0,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          paddingHorizontal: 16,
          paddingVertical: 8,
          backgroundColor: 'rgba(0,0,0,0.7)',
          alignSelf: 'center',
          borderRadius: 20,
     },
     hintText: {
          color: '#fff',
          fontSize: 12,
          fontWeight: '500',
     },
})
