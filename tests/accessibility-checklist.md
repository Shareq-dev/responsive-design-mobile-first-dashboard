# Accessibility Checklist

| Test | Status | Evidence / limitation |
|---|---|---|
| Keyboard test | VERIFIED MANUALLY | Tested in a desktop browser using Tab, Shift+Tab, Enter, Space, and Escape |
| Focus test | VERIFIED MANUALLY | Focus movement and visible focus behavior were checked during the manual keyboard test |
| Navigation test | VERIFIED MANUALLY | Header navigation, sidebar/menu interactions, and keyboard activation were checked |
| Modal test | VERIFIED MANUALLY | Modal opening, keyboard interaction, Escape behavior, and focus behavior were checked |
| Form test | VERIFIED MANUALLY | Form controls and keyboard interaction were checked |
| Table test | SOURCE REVIEW ONLY | Caption, headers, scope, row actions, search labeling, and empty state inspected |
| Responsive test | SOURCE REVIEW ONLY | Mobile drawer, stacked forms, scrollable table, and dialog sizing inspected |
| Responsive browser automation | VERIFIED | Playwright/Edge layout audit covers five pages, 15 viewport sizes, both themes, and dialog containment |
| axe / automated accessibility scan | NOT TESTED | No axe scan is recorded |
| W3C HTML validator | VERIFIED MANUALLY | All five pages submitted to the W3C Nu checker; zero errors and zero warnings |
