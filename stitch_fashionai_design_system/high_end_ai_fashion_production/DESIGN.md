---
name: High-End AI Fashion Production
colors:
  surface: '#FFFFFF'
  surface-dim: '#dad9e4'
  surface-bright: '#fbf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f2fd'
  surface-container: '#eeecf8'
  surface-container-high: '#e9e7f2'
  surface-container-highest: '#e3e1ec'
  on-surface: '#1a1b23'
  on-surface-variant: '#47464a'
  inverse-surface: '#2f3038'
  inverse-on-surface: '#f1effa'
  outline: '#78767b'
  outline-variant: '#c8c5ca'
  surface-tint: '#5f5e60'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1d'
  on-primary-container: '#858386'
  inverse-primary: '#c8c6c8'
  secondary: '#5d5e60'
  on-secondary: '#ffffff'
  secondary-container: '#dfdfe1'
  on-secondary-container: '#616365'
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
  secondary-fixed: '#e2e2e4'
  secondary-fixed-dim: '#c6c6c8'
  on-secondary-fixed: '#1a1c1d'
  on-secondary-fixed-variant: '#454749'
  tertiary-fixed: '#e8e1db'
  tertiary-fixed-dim: '#ccc5c0'
  on-tertiary-fixed: '#1e1b18'
  on-tertiary-fixed-variant: '#4a4642'
  background: '#F6F6F8'
  on-background: '#1a1b23'
  surface-variant: '#e3e1ec'
  ink: '#0B0B0D'
  ink-soft: '#56565F'
  rule: '#DCDCE2'
  accent-sienna: '#B7410E'
  whatsapp-green: '#25D366'
typography:
  display-xl:
    fontFamily: Bodoni Moda
    fontSize: 72px
    fontWeight: '400'
    lineHeight: '1.0'
    letterSpacing: -0.04em
  display-xl-mobile:
    fontFamily: Bodoni Moda
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.0'
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Bodoni Moda
    fontSize: 40px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Bodoni Moda
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.1'
  body-md:
    fontFamily: Archivo
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Archivo
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.6'
  utility-label:
    fontFamily: DM Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.14em
spacing:
  margin-mobile: 20px
  margin-desktop: 64px
  gutter: 1px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 80px
---

## Brand & Style

This design system is built for a high-end AI fashion production studio targeting West African and Francophone brand managers. The aesthetic is strictly editorial, drawing inspiration from physical fashion magazines and prestigious design boutiques like Porto Rocha and ANCC Studio. 

The brand personality is authoritative, avant-garde, and meticulously restrained. It prioritizes the "image as the hero," using typography not just for readability but as a structural graphic element. The style is a blend of **Minimalism** and **Brutalism**, characterized by a visible underlying grid, sharp edges, and high-contrast ink-on-paper visuals. There are no shadows, gradients, or decorative flourishes; the luxury stems from the precision of alignment and the rhythm of whitespace.

## Colors

The palette is rooted in a "Cool Editorial" spectrum. The primary interaction and text color is **Ink**, a deep, near-black that provides maximum contrast against the **Background** (a cool off-white). 

- **Ink (#0B0B0D)**: Used for all primary headings, borders, and solid button states.
- **Ink-Soft (#56565F)**: Reserved for secondary descriptions and metadata to create a hierarchy of focus.
- **Rule (#DCDCE2)**: A precise hairline color for 1px dividers that define the grid.
- **Accent Sienna (#B7410E)**: To be used sparingly for identity tags or specific status labels to break the monochrome flow.
- **WhatsApp Green (#25D366)**: Strictly reserved for direct communication CTAs.

## Typography

The typography strategy mirrors a print fashion journal. 

- **Display (Bodoni Moda)**: High-contrast serifs used for headlines. Use italics for emphasis to evoke a sense of high-fashion editorializing. Tracking should be tight to create a "locked" typographic block.
- **Body (Archivo)**: A neutral, legible sans-serif for descriptions. Limit line lengths to 65 characters to ensure readability and maintain the "column" feel of a magazine.
- **Utility (DM Mono)**: Used for metadata, labels, and technical specs. It should always be uppercase with generous letter spacing to provide a technical, "behind-the-scenes" contrast to the elegant serifs.

## Layout & Spacing

This design system utilizes a **Visible Grid** model. The layout is structured by hairline rules (1px) that separate content sections horizontally and vertically.

- **Hard Left Alignment**: All text and elements must anchor to the left grid line. No centered text.
- **Margins**: Generous outer margins (64px on desktop) create a "frame" for the content, emphasizing the premium nature of the studio.
- **Vertical Rhythm**: Use large, purposeful gaps (stack-lg) between major sections to allow the AI-generated imagery to breathe.
- **Mobile-First Reflow**: On mobile, the multi-column grid collapses into a single-column stack, but the hairline rules remain to define the vertical boundaries.

## Elevation & Depth

Elevation in this design system is purely **Tonal and Structural**. There are no shadows or blurs. 

- **Flat Hierarchy**: Depth is communicated through the layering of elements. Images occupy the base layer, often bleeding to the edges of their container grid. 
- **1px Rules**: Hierarchy is established by 1px borders. A section is "elevated" simply by being separated by a rule or by shifting the background color from the default cool off-white to pure white.
- **Inversion**: To highlight a specific call-to-action or section, use a full "Ink" background with "White" text, creating a bold, high-contrast block that interrupts the lighter rhythm.

## Shapes

The shape language is strictly **Geometric and Sharp**. 

- **Zero Radius**: All buttons, input fields, image containers, and decorative elements have a border-radius of 0px. 
- **The Box**: Elements should feel like they are part of a rigid grid system. If a container is used, it should be defined by a 1px rule rather than a soft shadow.
- **Images**: Use hard edges for all photography. Never use rounded corners on fashion assets.

## Components

### Buttons
- **Primary**: Solid `ink` background, `background` text, 0px radius, uppercase `utility-label` typography.
- **Secondary**: 1px `ink` border, no background, `ink` text.
- **Tertiary**: Text-only with a 1px underline that extends to the container edge.

### Cards & Imagery
- Images must bleed to the edges of their specific grid cell.
- Information overlays on images should be avoided; place text in an adjacent grid cell or below the image separated by a hairline rule.

### Inputs & Forms
- Simple 1px `rule` bottom-border only. 
- Labels use `utility-label` style placed above the input.
- Focus state: The bottom border darkens to `ink`.

### Dividers
- All dividers are 1px solid `rule` (#DCDCE2). They should be used to separate menu items in lists and to define the header and footer boundaries.

### Motion
- All transitions use a refined 600ms fade combined with a subtle 10px vertical rise. This creates a "gliding" entry effect that feels expensive and deliberate. Avoid any elastic or bouncy easing.