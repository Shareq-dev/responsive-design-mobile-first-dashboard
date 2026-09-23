# Semantic Structure

The page shell keeps global navigation and complementary workspace navigation outside the primary content landmark. Every document has exactly one `main` element and a page-specific title.

Representative DOM tree:

```text
body
├── header.site-header
│   ├── a.brand
│   └── nav[aria-label="Primary navigation"]
├── div.app-shell
│   ├── aside[aria-label="Sidebar"]
│   │   └── nav[aria-label="Sidebar navigation"]
│   └── main
│       ├── section.page-heading
│       ├── section.metric-grid / report-grid / settings-layout
│       │   ├── article (self-contained metric or report)
│       │   └── section (thematic content)
│       └── dialog[aria-labelledby="dialog-title"] (users page)
└── footer.site-footer
```

The header contains primary navigation and account actions. The aside is complementary and has its own named navigation. Sections have headings to support scanning. Articles are used for independent metric/report cards. Settings uses a form with grouped controls and a fieldset/legend. Users uses a real table because the content is tabular, and the Add New User interaction uses native dialog semantics.
