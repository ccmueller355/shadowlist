const fs = require('fs');

const content = fs.readFileSync('src/components/IconPickerGrid.tsx', 'utf-8');

const newContent = content.replace(/    const hasActiveFoodType[\s\S]*?return false;\n  \};/,
`    const hasActiveCategory = activeCategory && activeCategory !== null;
    const hasActiveFoodType = activeFoodType && activeFoodType !== null;

    if (!hasActiveCategory && !hasActiveFoodType) {
      return false;
    }

    if (hasActiveCategory && hasActiveFoodType) {
      if (activeFoodType === 'non_food') {
        return !catMatch;
      }
      return !(catMatch || ftMatch); // Or prioritize category? Let's prioritize category if it is specific, but if category is ALL_FOOD, prioritize ftMatch.
    }

    if (hasActiveCategory) {
      return !catMatch;
    }

    if (hasActiveFoodType) {
      if (activeFoodType === 'non_food') {
         return !isNonFoodIcon;
      }
      return !ftMatch;
    }

    return false;
  };`);

// Let's rewrite it cleanly to address the code review:
// When category is selected (e.g. Bakery), it should highlight Bakery icons.
// If foodType is also selected (e.g. Bakery + Meat), since Bakery category implies Bakery icons, should we only show intersection or union? The review says: "If a user has "Food" selected and clicks the "Bakery" category, ftMatch remains true for all food items. Consequently, all food icons remain highlighted, and the bakery items fail to stand out, leaving the user's specific complaint unfixed. "

// So, if Category is specific (not ALL_FOOD/ALL_NON_FOOD), it should override Food Type, OR we should intersect.
// Wait, the UI has FoodType selected by default (since there's no "none" option). It defaults to 'non_food'.
// The user clicks Edit, they are on a food item, foodType='meat', category='None'. Only meat icon is highlighted.
// User clicks category 'Bakery', now foodType='meat', category='Bakery'.
// The category 'Bakery' should take precedence, or intersection? If they contradict, intersection is empty, so everything dims.
// The review suggests: "fails to narrow down the selection using an intersection (AND) or prioritization strategy when multiple filters (Food Type + Category) are applied."
// Prioritizing Category over FoodType (or vice versa) makes sense. Since Category is at the bottom, clicking it last means it should win, but we don't know the click order.
// However, 'activeCategory' and 'activeFoodType' are just states.
// Let's implement prioritization: If activeCategory is specific (not ALL_FOOD/ALL_NON_FOOD), it strictly determines the highlight. If it's general (ALL_FOOD), we rely on activeFoodType if activeFoodType is specific (not 'non_food' which means all non-food).
// Wait, 'non_food' IS a specific food type in the data model (meaning it's not a food).
// Let's use intersection if both are specific, or just prioritize Category if it's set and specific?

// Let's use a simpler logic:
// - If activeCategory is set:
//     - If activeCategory mapping is 'ALL_FOOD':
//          - If activeFoodType is 'non_food', return !isFoodIcon (highlight all food icons because Category says so, overriding FoodType's 'non_food').
//          - If activeFoodType is a specific food (e.g., 'meat'), return !(isFoodIcon && ftMatch) -> just return !ftMatch. So we narrow down to 'meat' within food.
//     - If activeCategory mapping is 'ALL_NON_FOOD':
//          - If activeFoodType is 'non_food', return !isNonFoodIcon.
//          - If activeFoodType is specific food, return !isNonFoodIcon (Category overrides FoodType since they conflict).
//     - If activeCategory mapping is an Array (e.g., 'Bakery' -> ['bread-slice-outline']):
//          - Return !catMatch. Category is specific, so it strictly dictates the highlighted icons.
// - If activeCategory is not set:
//     - If activeFoodType is 'non_food', return !isNonFoodIcon (highlight all non-food icons).
//     - If activeFoodType is specific (e.g., 'meat'), return !ftMatch (highlight only 'meat' icons).
// - Default return false.
