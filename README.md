# Atlas Admin Dashboard

Atlas Admin is a small, static operations dashboard built for the RabTech Academy Task 04 assignment. It carries forward the semantic HTML and accessible interactions from Task 03, with a responsive layout for phones, tablets, and desktop screens.

The dashboard includes workspace activity and statistics, a searchable user directory with an invitation dialog, reports, workspace settings, and a profile page. Light and dark themes are available from the header.

## Run the project

No build step is required. Open `index.html` in a current browser, or serve the project folder locally:

```powershell
python -m http.server 8080
```

Then visit `http://localhost:8080/`. The Dashboard is the home page; the other views are in `pages/`.

## Responsive layout

The styles start with the mobile layout and add wider arrangements as space allows. At phone widths, the sidebar becomes a drawer and content stacks. At 1024px, the Dashboard uses a narrower persistent sidebar, a two-by-two statistics grid, and side-by-side activity and capacity panels. At 1280px and above, it returns to four statistics across and the wider desktop proportions.

Design tokens live in `css/tokens.css`. The original visual foundation is in `css/style.css`, component-specific icon treatments are in `css/components.css`, responsive rules are in `css/responsive.css`, and focus and validation states are in `css/accessibility.css`. Theme colors are provided through the same semantic tokens.

## Project map

- `index.html`: Dashboard
- `pages/`: Users, Reports, Settings, and Profile
- `components/`: reusable markup references for the header, sidebar, form, table, and dialog
- `css/`: design tokens and page styling
- `js/`: theme, navigation, forms, table, and dialog behavior
- `tests/`: responsive browser audit and accessibility checklist
- `docs/`: design notes and verification records
- `screenshots/`: responsive browser captures

The primary navigation is the sidebar. On smaller screens, its menu button opens the keyboard-operable drawer; Escape closes it and returns focus to the menu button. Forms use native controls and labels, the invitation flow uses a native dialog, and the Users table retains its table semantics while scrolling within its own container on narrow screens.

## Verification

The Playwright/Edge layout audit checks all five pages at 15 viewport sizes, in both themes. It checks page and element overflow, clipped text, header overlap, major layout rules, report stacking, profile alignment, dark surfaces, and the Add User dialog at Users-page sizes. The latest recorded run passed 150 page/viewport/theme combinations.

To run the audit on Windows, start the local server in the project folder, then open another PowerShell window in that folder and run:

```powershell
$env:NODE_PATH='<path-to-your-global-node_modules>'
node tests/responsive-layout-audit.js
```

The audit expects Microsoft Edge at its standard Windows installation path and the globally installed Playwright module at the `NODE_PATH` above. JavaScript syntax checks can be run with `node --check` for each file in `js/` and `tests/responsive-layout-audit.js`. Test details and known limitations are recorded in `docs/testing.md` and `docs/final-verification.md`.

## Screenshot evidence

The repository includes four Dashboard screenshots, one at each size listed below. They show the light-theme Dashboard only. Separately, the automated browser audit checks all five pages at additional viewport widths in both light and dark themes.

- [320px mobile](screenshots/screenshotsmobile-320.png)
- [768px tablet](screenshots/screenshotstablet-768.png)
- [1024px small desktop](screenshots/screenshotsdesktop-1024.png)
- [1440px desktop](screenshots/screenshotsdesktop-1440.png)
