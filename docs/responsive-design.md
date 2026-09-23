# Responsive Design

Task 04 keeps the Task 03 semantic Atlas Admin markup and adds a mobile-first CSS layer in `css/responsive.css`. The main foundation is `css/style.css`, while component styling remains in `css/components.css`.

## Breakpoints

- Base: approximately 320px, with one-column cards, compact header, and a drawer sidebar.
- `768px`: tablet grid, two-column metrics, and two-column form fields.
- `1024px`: persistent desktop sidebar with multi-column dashboard and the restored vertical settings navigation beside the form.
- `1024px` to `1279px`: small-desktop dashboard treatment with a 224px sidebar, compact main gutters, 2×2 metrics, and a balanced activity/capacity split.
- `1280px`: restore the wider 272px sidebar, four-column metrics, and established desktop content proportions.
- `1440px`: full-width content beside the persistent sidebar with more comfortable outer spacing.

CSS Grid handles dashboard, metric, report, settings, and profile composition. Flexbox remains responsible for header, navigation, sidebar links, card headers, and footer flow. Wide data tables are contained in their own scrolling wrapper where present, so the page itself does not need horizontal scrolling.

The mobile drawer retains the Task 03 `aria-expanded`, focus, and Escape behavior. The header remains usable at narrow widths by hiding secondary profile text and keeping notifications, theme, and menu controls available.

At tablet width the settings navigation may wrap as a compact horizontal group to preserve available space. At 1024px and above it returns to the Task 03 vertical navigation with a stable two-column settings layout. The profile card keeps its avatar, name, role, and status centered at all widths.

Responsive hardening uses shrinkable grid/flex children, fluid metric typography, natural wrapping for meaningful text, and a dedicated table overflow region. The document body is not given a blanket horizontal overflow rule; wide table content is the only intentional horizontal scrolling area.

The 1024px Dashboard layout intentionally differs from wide desktop: four statistics use two evenly sized columns so their labels and values remain comfortable, while Recent Activity and Team Capacity sit side-by-side. At 1280px the original four-card desktop composition returns.
