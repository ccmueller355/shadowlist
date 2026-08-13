const fs = require('fs');

const content = fs.readFileSync('src/components/IconPickerGrid.tsx', 'utf-8');

const newContent = content.replace(/    let ftMatch = false;[\s\S]*?return false;\n  \};/,
`    let ftMatch = false;
    if (activeFoodType && mappedType === activeFoodType) {
      ftMatch = true;
    }

    if (activeCategory) {
      const mapping = CATEGORY_TO_ICONS[activeCategory];
      if (mapping === 'ALL_FOOD') {
        if (activeFoodType === 'non_food') {
          return !isFoodIcon;
        } else {
          return !ftMatch;
        }
      } else if (mapping === 'ALL_NON_FOOD') {
        return !isNonFoodIcon;
      } else {
        // Specific category (Array)
        return !catMatch;
      }
    } else {
      if (activeFoodType === 'non_food') {
        return !isNonFoodIcon;
      } else if (activeFoodType) {
        return !ftMatch;
      }
    }

    return false;
  };`);

fs.writeFileSync('src/components/IconPickerGrid.tsx', newContent);
