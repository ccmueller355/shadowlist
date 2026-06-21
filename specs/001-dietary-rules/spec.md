# Feature Specification: Dietary Rules Integration

**Feature Branch**: `001-dietary-rules`

**Created**: 2026-06-17

**Status**: Draft

**Input**: User description: User described integrating dietary rule profiles into the existing shadowlist shopping list app — when a diet is active, incompatible items get warned about, with alternative suggestions and i18n support (EN+DE). No cloud, no AI, no food database. Simple icon-driven food type tagging.

## User Scenarios & Testing

### User Story 1 - Activate a Diet and See Warnings (Priority: P1)

A user on keto opens the app, selects "Keto" in Settings, then adds "Bread" to their list. The item is marked with a warning that grains are not keto-compatible.

**Why this priority**: This is the core value proposition — the diet filter must work end-to-end.

**Independent Test**: Open app → Settings → select Keto → add "Bread" with grain icon → see warning badge.

**Acceptance Scenarios**:

1. **Given** a user on keto, **When** they add an item tagged as `grain`, **Then** the item shows a warning indicator
2. **Given** a user on keto, **When** they add an item tagged as `non_food`, **Then** no warning is shown
3. **Given** a user on keto, **When** they add an item tagged as `meat`, **Then** no warning is shown

---

### User Story 2 - Tag an Item's Food Type (Priority: P1)

A user adds "Spätzle" to their list. The app doesn't know what it is. The user picks the "grain" icon, classifying it. The app remembers the food type for this item and checks diet compatibility.

**Why this priority**: Without item classification, no diet checking is possible. The icon picker → food type mapping is the mechanism.

**Independent Test**: Add item → pick icon from a food group → food type suggestion is applied → can override in edit.

**Acceptance Scenarios**:

1. **Given** a user adding an item, **When** they pick an icon from the "Grains" group, **Then** the item's food type is set to `grain`
2. **Given** a user editing an existing item, **When** they open EditModal, **Then** they see a food type tag with dropdown override
3. **Given** an item with `foodType: null`, **When** displayed in a list with active diet, **Then** it shows as "unchecked" (no warning, no false positive)

---

### User Story 3 - Alternative Suggestions (Priority: P2)

A user on keto tries to add "Pasta" tagged as grain. The app warns and suggests "Zucchini noodles" as an alternative. The user can tap to add the suggestion instead.

**Why this priority**: Adds practical value beyond warning — helps the user make a better choice.

**Independent Test**: Activate keto → add grain-tagged item → see warning with suggest button → tap to add alternative.

**Acceptance Scenarios**:

1. **Given** an incompatible item, **When** the warning is shown, **Then** a suggestion for an alternative is provided
2. **Given** a suggestion, **When** the user taps it, **Then** the alternative is added to the list
3. **Given** an incompatible item with no defined alternative, **When** the warning is shown, **Then** no suggestion button is shown

---

### User Story 4 - Multi-Language Support (Priority: P2)

A German user opens the app and switches the language to Deutsch. All diet names, warnings, food type labels, and settings are in German.

**Why this priority**: EN+DE is a stated market requirement for EU+US target.

**Independent Test**: Settings → switch language to DE → all UI strings render in German.

**Acceptance Scenarios**:

1. **Given** the app in English, **When** the user switches to German in settings, **Then** all diet-related strings display in German
2. **Given** the app language is set to German, **When** the user adds an incompatible item, **Then** the warning text is in German

---

### User Story 5 - Offline Operation (Priority: P1)

A user on the subway (no network) opens the app, browses their list, adds items, and sees diet warnings — all without internet.

**Why this priority**: The app must be fully usable offline. No feature should depend on network access.

**Independent Test**: Enable airplane mode → open app → all features work (add items, see warnings, tag food types, change settings).

**Acceptance Scenarios**:

1. **Given** no network connectivity, **When** the user opens the app, **Then** all features work as expected
2. **Given** no network connectivity, **When** the user changes diet or language settings, **Then** the setting persists locally

---

### Edge Cases

- What happens when the user has no diet selected? (No warnings, food type tag is hidden)
- What happens when existing items have `foodType: null` after app update? (Shown as unchecked — no warning, user can tag on edit)
- What happens when the user clears app data? (Re-initialize with defaults, no diet)
- What happens when an item matches multiple food types? (User picks one — the diet engine checks that one)
- What happens when no diet-specific alternative exists? (Show generic "this item may not be compatible" without suggestion)

## Requirements

### Functional Requirements

- **FR-001**: System MUST allow selecting one of 7 diet profiles (Keto, Low Carb, Slow Carb, Vegetarian, Vegan, Gluten-Free, Paleo) in Settings
- **FR-002**: System MUST allow selecting "No diet" to disable all checking
- **FR-003**: When a diet is active, items with incompatible food types MUST display a warning indicator
- **FR-004**: System MUST suggest alternative food types when an incompatible item is flagged
- **FR-005**: System MUST allow the user to always add an item regardless of compatibility (advisory only)
- **FR-006**: System MUST derive a suggested food type from the selected icon
- **FR-007**: System MUST allow overriding the food type in the EditModal
- **FR-008**: System MUST persist the chosen food type per item
- **FR-009**: Existing items (from previous versions) MUST have `foodType: null` and be treated as unchecked
- **FR-010**: System MUST support English and German language switching
- **FR-011**: All diet-related UI strings MUST use the i18n system
- **FR-012**: System MUST work fully offline — no network calls for any diet feature

### Key Entities

- **ShoppingItem**: Extended with `foodType: FoodType | null` — the user's classification of the item
- **AppSettings**: Extended with `activeDiet: DietId | null` and `lang: AppLang`
- **DietProfile**: Static definition of a diet (id, name, description, rules)
- **DietRule**: A rule with forbidden food types and optional alternative suggestions
- **FoodType**: A 13-value enum representing food categories (meat, fish, egg, dairy, grain, sugar, fruit, vegetable, legume, fat, beverage, supplement, non_food)

## Success Criteria

### Measurable Outcomes

- **SC-001**: User can activate a diet and see a warning on an incompatible item in under 3 taps from app launch
- **SC-002**: 100% of items with assigned food types are correctly checked against the active diet's rules
- **SC-003**: All 7 diet profiles have at least one forbidden food type defined
- **SC-004**: User can switch language and see diet strings in the correct language immediately
- **SC-005**: Zero network requests made by the diet feature (verified by code review)
- **SC-006**: All existing 27 unit tests + new diet engine tests pass
- **SC-007**: TypeScript strict mode compiles without errors
- **SC-008**: All new interactive elements have `accessibilityLabel` set, minimum 48dp touch targets, and warning badges meet color contrast requirements across all 3 themes

## Assumptions

- Users will correctly classify items via the icon picker — the icon group → food type mapping is a hint, not a constraint
- 7 diet profiles cover the majority of diet-conscious shoppers in the EU/US market (~65-80%)
- Food types are mutually exclusive per item (an item can't be both "meat" and "dairy")
- The 13 food types are sufficient for all diet rules (no new food types needed for these 7 diets)
- EN+DE is sufficient for launch; FR+ES can be added later without architecture changes
- The app will be sold as a paid app (€3-5) with no ads, no IAP, no subscriptions
