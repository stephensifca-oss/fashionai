---
name: Editorial Automate
colors:
  surface: '#FFFFFF'
  surface-dim: '#d9dadc'
  surface-bright: '#f9f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f5'
  surface-container: '#edeef0'
  surface-container-high: '#e8e8ea'
  surface-container-highest: '#e2e2e4'
  on-surface: '#1a1c1d'
  on-surface-variant: '#47464a'
  inverse-surface: '#2f3132'
  inverse-on-surface: '#f0f0f2'
  outline: '#78767b'
  outline-variant: '#c8c5ca'
  surface-tint: '#5f5e60'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1d'
  on-primary-container: '#858386'
  inverse-primary: '#c8c6c8'
  secondary: '#a93702'
  on-secondary: '#ffffff'
  secondary-container: '#fe7440'
  on-secondary-container: '#641d00'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1e1b18'
  on-tertiary-container: '#88837e'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e1e4'
  primary-fixed-dim: '#c8c6c8'
  on-primary-fixed: '#1c1b1d'
  on-primary-fixed-variant: '#474649'
  secondary-fixed: '#ffdbcf'
  secondary-fixed-dim: '#ffb59c'
  on-secondary-fixed: '#380c00'
  on-secondary-fixed-variant: '#822800'
  tertiary-fixed: '#e8e1db'
  tertiary-fixed-dim: '#ccc5c0'
  on-tertiary-fixed: '#1e1b18'
  on-tertiary-fixed-variant: '#4a4642'
  background: '#f9f9fb'
  on-background: '#1a1c1d'
  surface-variant: '#e2e2e4'
  ink-soft: '#56565F'
  rule: '#DCDCE2'
  whatsapp: '#25D366'
typography:
  display-xl:
    fontFamily: Bodoni Moda
    fontSize: 64px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Bodoni Moda
    fontSize: 40px
    fontWeight: '400'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Bodoni Moda
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.2'
  body-md:
    fontFamily: Archivo Narrow
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  utility-label:
    fontFamily: DM Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.14em
  caption-tiny:
    fontFamily: DM Mono
    fontSize: 10px
    fontWeight: '400'
    lineHeight: '1.2'
spacing:
  margin-desktop: 64px
  margin-mobile: 20px
  gutter: 1px
  stack-lg: 80px
  stack-md: 40px
  stack-sm: 16px
---

## Brand & Style

The design system is rooted in the heritage of luxury French editorial design, adapted for the modern AI production era. It prioritizes the "image as artifact," treating every screen as a meticulously composed magazine spread rather than a digital interface. The target audience—West African and Francophone communication managers—expects a high-status, authoritative aesthetic that communicates professionalism and artistic rigor.

The style is **Strict Minimalism / Neo-Editorial**. It avoids all contemporary SaaS tropes (rounded corners, soft shadows, vibrant gradients) in favor of a rigid, grid-based layout characterized by hairline rules, expansive whitespace, and a high-contrast monochromatic base. The aesthetic response should be one of "calm authority"—reassuring the user that while the technology is futuristic (AI), the output is timeless fashion.

## Colors

This design system utilizes a restrained, print-inspired palette. The primary interaction color is `ink` (#0B0B0D), used for maximum legibility and structural grounding. The background is a cool off-white (`#F6F6F8`) to reduce screen glare and mimic high-quality paper stock.

**Rules for Color Application:**
- **Accent Usage:** Use `#B7410E` (Burnt Sienna) sparingly. It is restricted to a single element per viewport (e.g., a single text link, a category label, or an italicized keyword).
- **Functional Color:** The WhatsApp green is strictly reserved for the direct contact button and should not be used for any other UI elements.
- **Separation:** Depth is created through the `rule` color (#DCDCE2) as 1px borders, never through shadows.

## Typography

Typography is the primary vehicle for the brand's editorial tone. 

- **Bodoni Moda:** Used for all high-level headings. Italicize key words within headlines to evoke fashion journalism. Keep tracking tight to maintain the "heavy ink" look of print.
- **Archivo Narrow:** Selected for body copy to ensure high legibility and a neutral, professional tone. Maintain a maximum line length of 65 characters to ensure readability.
- **DM Mono:** This is the "functional" layer. It should be used for metadata, tags, and image captions. Always set in uppercase with increased letter spacing to provide a technical, "behind-the-scenes" contrast to the elegant serif.

## Layout & Spacing

The layout is governed by a **visible 12-column grid** on desktop and a **4-column grid** on mobile. 

- **The Hairline Rule:** All major sections and grid divisions must be separated by a 1px solid rule using the `rule` token.
- **Margins:** Vertical rhythm is intentionally generous. Use `stack-lg` between major narrative sections to allow the content to "breathe."
- **Image Treatment:** Images must always bleed to the edges of their assigned column containers. No internal padding within image cards.
- **Alignment:** Use hard-left alignment for all text blocks. Avoid centered text except for specific editorial pull-quotes.

## Elevation & Depth

This design system explicitly rejects the concept of Z-axis elevation via shadows. Depth is achieved through:

1.  **Framing:** Using 1px rules to create "cells" or "containers" that hold content.
2.  **Color Blocking:** Swapping between `#F6F6F8` (background) and `#FFFFFF` (surface) to distinguish between the page and a focused interactive area.
3.  **Contrast:** High-contrast ink on white surfaces creates a natural hierarchy without the need for visual effects.

## Shapes

The shape language is strictly **Rectilinear**. 

- **No Corner Radii:** All buttons, input fields, image containers, and cards must have a 0px border-radius. 
- **The Rule as Border:** Borders should be 1px. Active states can be indicated by increasing the border to 2px or filling the container with solid `ink`.

## Components

### Buttons
- **Primary:** Solid `ink` background, white `utility-label` text. No rounded corners.
- **Secondary:** 1px `ink` border, transparent background, `ink` text.
- **WhatsApp:** Solid `#25D366` background. This is the only exception to the monochromatic rule.

### Images & Captions
- All images must be followed by a `caption-tiny` text block using `DM Mono` located exactly 8px below the image, aligned to the left edge.
- Images should use a `600ms` fade-in with a `10px` vertical rise on scroll-entry.

### Inputs
- Bottom-border only (1px `rule`) for text inputs. When focused, the border transitions to `ink`. Use `body-md` for user-entered text.

### Cards
- Cards are defined by their grid position and 1px `rule` borders. Do not use background fills for cards unless they are the primary call-to-action on a page.

### Navigation
- A top-bar navigation separated by a 1px horizontal rule. Links use the `utility-label` style. The current page is indicated by the `accent` color.