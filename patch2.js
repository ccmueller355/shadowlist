const fs = require('fs');
let content = fs.readFileSync('src/components/IconPickerGrid.tsx', 'utf-8');
content = content.replace("if (activeFoodType && (activeFoodType as string) !== 'non_food') {", "if (activeFoodType) {");
fs.writeFileSync('src/components/IconPickerGrid.tsx', content);
