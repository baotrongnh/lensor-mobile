# Theme Management Setup

## Cách hoạt động hiện tại:

File `components/settings-modal.tsx` đã implement logic thay đổi theme:

```typescript
const handleThemeChange = (theme: ThemeOption) => {
  setSelectedTheme(theme);

  if (theme === "system") {
    Appearance.setColorScheme(null); // Follow system
  } else {
    Appearance.setColorScheme(theme); // Force light or dark
  }
};
```

## Chức năng:

✅ **Light Mode**: Bấm vào sẽ chuyển sang light theme ngay lập tức
✅ **Dark Mode**: Bấm vào sẽ chuyển sang dark theme ngay lập tức  
✅ **System Default**: Follow theo system setting (iOS/Android)

## Nâng cao (Optional): Persist theme với AsyncStorage

Nếu muốn save theme preference khi restart app, cài thêm:

```bash
npx expo install @react-native-async-storage/async-storage
```

Sau đó update `settings-modal.tsx`:

```typescript
import AsyncStorage from "@react-native-async-storage/async-storage";

const THEME_KEY = "@theme_preference";

// Load saved theme khi component mount
useEffect(() => {
  loadSavedTheme();
}, []);

const loadSavedTheme = async () => {
  try {
    const saved = await AsyncStorage.getItem(THEME_KEY);
    if (saved) setSelectedTheme(saved as ThemeOption);
  } catch (e) {
    console.error("Failed to load theme", e);
  }
};

const handleThemeChange = async (theme: ThemeOption) => {
  setSelectedTheme(theme);

  // Save to AsyncStorage
  try {
    await AsyncStorage.setItem(THEME_KEY, theme);
  } catch (e) {
    console.error("Failed to save theme", e);
  }

  // Apply theme
  if (theme === "system") {
    Appearance.setColorScheme(null);
  } else {
    Appearance.setColorScheme(theme);
  }
};
```

## Test:

1. Mở Settings modal
2. Chọn Light/Dark/System
3. Theme sẽ đổi ngay lập tức
4. Toàn bộ app (Header, Cards, Text) sẽ update theo theme mới
