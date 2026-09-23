# Design Tokens

Task 04 centralizes the Atlas Admin visual system in `css/tokens.css`.

## Token groups

- Colors: primary, semantic status colors, surfaces, text, borders, and the page background.
- Typography: the `--font-size-*` scale, system font family, weights, and line heights.
- Spacing: the `--space-*` scale used for layout gaps and padding.
- Radii: small control, panel, large panel, and full-pill radii.
- Shadows: restrained elevation levels for cards, panels, and the header.

## Themes

Light values are defined on `:root`. Dark values override the same semantic variables under `[data-theme="dark"]`; components consume the semantic variables instead of duplicating component styles.
