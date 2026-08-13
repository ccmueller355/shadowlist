const fs = require('fs');
const content = fs.readFileSync('src/components/EditModal.tsx', 'utf-8');

// Replace order: Description -> Amount -> Food Type -> Icon Picker -> Category

const newContent = content.replace(
/            \{\/\* Icon Picker \*\/\}[\s\S]*?<\/ScrollView>/,
`            {/* Food Type */}
            <Text style={[styles.label, { color: cyberpunkTheme.colors.primary }]}>{tr('edit.foodType.label')}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryRow}>
              {FOOD_TYPES.map((ft) => (
                <TouchableOpacity
                  key={ft.id}
                  style={[styles.categoryChip, { borderColor: foodType === ft.id ? cyberpunkTheme.colors.primary : cyberpunkTheme.colors.border, backgroundColor: foodType === ft.id ? cyberpunkTheme.colors.checkedBg : cyberpunkTheme.colors.background }]}
                  onPress={() => setFoodType(ft.id)}
                  accessibilityLabel={tr(ft.labelKey as any)}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: foodType === ft.id }}
                >
                  <MaterialCommunityIcons
                    name={ft.icon as any}
                    size={16}
                    color={cyberpunkTheme.colors.primary}
                  />
                  <Text
                    style={[styles.categoryText, { color: foodType === ft.id ? cyberpunkTheme.colors.primary : cyberpunkTheme.colors.textSecondary }, foodType === ft.id && styles.categoryTextSelected]}
                  >
                    {tr(ft.labelKey as any)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Icon Picker */}
            <Text style={[styles.label, { color: cyberpunkTheme.colors.primary }]}>{tr('edit.icon')}</Text>
            <IconPickerGrid
              selected={icon}
              onSelect={(newIcon) => {
                setIcon(newIcon);
                if (ICON_FOOD_TYPE_MAP[newIcon]) {
                  setFoodType(ICON_FOOD_TYPE_MAP[newIcon] as FoodType);
                }
              }}
              activeFoodType={foodType}
              activeCategory={category}
            />

            {/* Category */}
            <Text style={[styles.label, { color: cyberpunkTheme.colors.primary }]}>{tr('edit.category')}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryRow}>
              <TouchableOpacity
                style={[styles.categoryChip, { borderColor: category === null ? cyberpunkTheme.colors.primary : cyberpunkTheme.colors.border, backgroundColor: category === null ? cyberpunkTheme.colors.checkedBg : cyberpunkTheme.colors.background }]}
                onPress={() => setCategory(null)}
              >
                <Text style={[styles.categoryText, { color: category === null ? cyberpunkTheme.colors.primary : cyberpunkTheme.colors.textSecondary }, category === null && styles.categoryTextSelected]}>
                  {tr('edit.categoryNone')}
                </Text>
              </TouchableOpacity>
              {CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[styles.categoryChip, { borderColor: category === cat ? cyberpunkTheme.colors.primary : cyberpunkTheme.colors.border, backgroundColor: category === cat ? cyberpunkTheme.colors.checkedBg : cyberpunkTheme.colors.background }]}
                  onPress={() => setCategory(cat)}
                >
                  <Text
                    style={[styles.categoryText, { color: category === cat ? cyberpunkTheme.colors.primary : cyberpunkTheme.colors.textSecondary }, category === cat && styles.categoryTextSelected]}
                  >
                    {tr(('category.' + cat.replace(/[ &]/g, '')) as any)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>`
);

fs.writeFileSync('src/components/EditModal.tsx', newContent);
