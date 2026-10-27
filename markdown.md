# Website Project - Part 2

## 1. Changelog (Part 1 Feedback & Part 2 Edits)
| Date | Version | Section | Description of Changes / Feedback Applied |
| :--- | :--- | :--- | :--- |
| 2026-10-27 | v1.1 | HTML / Structure | Fixed missing semantic tags (`<header>`, `<main>`, `<footer>`) based on Part 1 feedback. |
| 2026-10-27 | v1.2 | CSS Architecture | Created external stylesheet `css/style.css` and linked it across all HTML pages. |
| 2026-10-27 | v1.3 | Typography & Base | Added CSS Reset (`* { box-sizing: border-box; }`) and root design tokens using `rem`/`em` units. |
| 2026-10-27 | v1.4 | Layout & Visuals | Implemented desktop multi-column Grid & Flexbox navigation along with interactive pseudo-classes (`:hover`, `:focus`, `:active`). |
| 2026-10-27 | v1.5 | Responsiveness | Added mobile & tablet media query breakpoints (`768px`, `992px`) switching multi-column to single-column layout. |
| 2026-10-27 | v1.6 | Media Optimization | Integrated responsive images using `<picture>` elements and `srcset` / `sizes` attributes. |

---

## 2. Responsive Design Evidence (Browser DevTools Screenshots)

### Desktop View (1200px +)
*Description:* Multi-column layout with horizontal navigation bar.  
`[Insert Screenshot of Desktop View from Chrome DevTools]`

### Tablet View (768px - 992px)
*Description:* Adjusted grid columns collapsing to single main view while preserving padding.  
`[Insert Screenshot of Tablet View from Chrome DevTools]`

### Mobile View (320px - 768px)
*Description:* Full single-column stacked layout with full-width interactive navigation links.  
`[Insert Screenshot of Mobile View from Chrome DevTools]`

---

## 3. References
- W3C CSS Cascading and Inheritance Level 4: https://www.w3.org/TR/css-cascade-4/
- MDN Web Docs - CSS Grid Layout: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout
- MDN Web Docs - Responsive Images: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images