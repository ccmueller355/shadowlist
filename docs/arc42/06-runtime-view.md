# 6. Runtime View

## App Startup Sequence

```
1. App.tsx mounts
2. useStore.hydrate() called in useEffect
3. AsyncStorage.loadAllData() → Promise.all([loadLists, loadItems, loadSettings])
4. Zustand set({ lists, items, settings, hydrated: true })
5. AppNavigator renders
6. HomeScreen mounts, reads hydrated from store
7. If lists.length === 0 after hydration:
   a. addList('Weekly Groceries')
   b. setTimeout → addDemoData()
8. HomeScreen renders list overview
```

## Add Item Flow

```
User types in AddItemBar → presses Enter
    │
    ▼
handleAddItem(description)
    │
    ├── description already in active items?
    │   └── YES → Toast "already in list" → RETURN
    │
    ├── description in bought items?
    │   └── YES → moveToShop(item.id) → Toast "re-added" → RETURN
    │
    └── New item
        └── addItem({ listId, description })
            ├── compute maxOrder from active items
            ├── create ShoppingItem with defaults
            ├── set({ items: [...items, newItem] })
            ├── saveItems(updated)  // fire-and-forget
            └── Toast "added"
```

## Theme Change Flow

```
User selects theme in SettingsModal
    │
    ▼
setTheme('decker')
    ├── settings = { ...settings, theme: 'decker' }
    ├── set({ settings })
    ├── saveSettings(settings)
    └── All components using useAppTheme() re-render with new theme
```

## Drag Reorder Flow

```
User drags item in DraggableFlatList → releases
    │
    ▼
handleDragEnd({ data })
    ├── reorderItems(listId, data.map(i => i.id))
    ├── items.map → if listId matches, assign order = index
    ├── set({ items })
    └── saveItems(items)
```
