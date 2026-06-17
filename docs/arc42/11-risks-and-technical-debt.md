# 11. Risks and Technical Debt

## Known Risks

| Risk | Severity | Mitigation |
|------|----------|-----------|
| AsyncStorage data loss on device failure | Low | Shopping data is replaceable; no financial data |
| Expo SDK upgrade breaks draggable-flatlist | Medium | Pin dependencies; test before SDK bumps |
| Large lists (> 1000 items) degrade performance | Low | Users rarely have > 200 items; search is filtered in JS |
| No automated tests | Medium | Manual testing only; risk of regression on changes |

## Technical Debt

| Item | Impact | Effort to Fix |
|------|--------|---------------|
| Static styles use module-level theme import | Theme change doesn't update `StyleSheet.create` styles until remount | Medium — migrate to all-dynamic `useThemeStyles` |
| No test suite | Regression risk on changes | High — add Jest + React Native Testing Library |
| Toast configuration is ad-hoc per screen | Duplicated toast calls | Low — centralize toast helpers |
| `cyberpunkTheme.ts` legacy re-export | Confusing for new contributors | Low — remove after all consumers migrated |
| Icon picker uses raw grid of 54 icons | Not paginated or searchable | Medium — add search/filter to `IconPickerGrid` |
