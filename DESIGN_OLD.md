# NetHelp Website - Original Design Documentation

## Overview
This document captures the original design system of the NetHelp website before the NETHELP_OS v2.0 transformation.

## Color Palette

### Primary Colors
- **Dark Background**: `#233140` (nh-darker)
- **Card Background**: `#2c3e50` (nh-dark)
- **Light Text**: `#ecf0f1` (nh-light)
- **Primary Accent**: `#f39c12` (Cyber Orange - nh-accent)
- **Accent Hover**: `#e67e22` (nh-accent-hover)

### Glassmorphism
- **Glass Background**: `rgba(44, 62, 80, 0.6)` (glass-bg)
- **Glass Border**: `rgba(243, 156, 18, 0.3)` (glass-border)

### Form Elements
- **Input Text**: `#000000` (Black)
- **Placeholder Text**: `#6c757d`
- **Dropdown Background**: `#ffffff`
- **Dropdown Text**: `#212529`

## Typography

### Primary Font
- **Font Family**: Roboto (weights: 300, 400, 500, 700, 900)
- **Usage**: All body text, headings, and UI elements
- **Font Source**: Google Fonts

### Font Sizes
- Hero Headline: `text-4xl sm:text-5xl md:text-6xl lg:text-7xl`
- Section Headings: `text-3xl md:text-4xl`
- Card Titles: `text-xl`
- Body Text: `text-base md:text-xl` / `text-sm`
- Navigation Links: `text-sm`

## Layout Structure

### Header
- **Type**: Sticky top navigation bar
- **Background**: `bg-nh-dark/90` with backdrop blur
- **Logo**: Animated pulsing logo (images/logo.jpeg)
- **Navigation**: Desktop horizontal links with animated indicator
- **Mobile**: Slide-out drawer menu from right

### Hero Section
- **Layout**: Centered, full viewport height minus header
- **Background**: Animated diagonal lines pattern
- **Headline**: Wavy character animation on each letter
- **CTA Button**: Rounded full button with hover effects

### Services Section
- **Layout**: 3-column grid (2 columns on tablet, 3 on desktop)
- **Cards**: Glassmorphism cards with:
  - Icon at top (Font Awesome)
  - Title
  - Description text
  - Hover effects (lift + scale + glow)
- **Animation**: Staggered fade-in-up on scroll

### Process Section
- **Layout**: Alternating left/right timeline on desktop
- **Mobile**: Vertical timeline with dots
- **Elements**: Numbered circles, content cards
- **Connector**: Vertical line down center (desktop)

### Why Us Section
- **Layout**: 3-column grid
- **Cards**: Solid background cards with icons
- **Hover**: Scale transform effect

### Contact Form
- **Layout**: Centered, max-width container
- **Style**: Glassmorphic card container
- **Inputs**: Dark background with orange border focus
- **Button**: Full-width orange button
- **Success State**: Animated icon with message

### Footer
- **Layout**: Centered content
- **Elements**: Logo, tagline, copyright

## Background Elements

### Animated Lines
- **Type**: CSS gradient-based diagonal lines
- **Animation**: Continuous movement (8s linear infinite)
- **Opacity**: 0.3
- **Colors**: Orange and dark blue gradients

## Animations & Interactions

### Logo Animation
- **Type**: Pulse with glow
- **Duration**: 2.2s infinite
- **Effect**: Scale 1.0 → 1.07 → 1.0 with brightness and drop-shadow changes

### Hero Text Animation
- **Type**: Wavy character animation
- **Effect**: Each letter animates independently
- **Duration**: 2s infinite per character
- **Stagger**: 0.05s delay between characters
- **Movement**: Vertical translation + color shift

### Card Hover Effects
- **Transform**: `translateY(-10px) scale(1.02)`
- **Shadow**: Increased glow on hover
- **Radial gradient overlay on hover**

### Button Hover Effects
- **Shine Effect**: Gradient sweep from left to right
- **Scale**: 1.05x on hover
- **Transition**: 0.3s ease-out

### Scroll Animations
- **Type**: Intersection Observer-based
- **Effects**: 
  - `fade-in-up`: Opacity 0 → 1, translateY(20px) → 0
  - `slide-in-left`: Opacity 0 → 1, translateX(-30px) → 0
- **Threshold**: 0.1 (10% visible)

### Navigation Indicator
- **Type**: Animated underline bar
- **Behavior**: Follows hovered/active nav link
- **Transition**: Smooth cubic-bezier easing

## Component Styling

### Glassmorphism Cards
- **Background**: Semi-transparent dark with blur
- **Border**: Thin orange border with low opacity
- **Backdrop Filter**: `blur(12px) saturate(150%)`
- **Border Radius**: `1rem`
- **Shadow**: Soft orange glow

### Form Inputs
- **Background**: `bg-nh-dark/70`
- **Border**: Orange with 30% opacity
- **Focus**: Ring + border color change to full orange
- **Text Color**: Black for readability

### Process Steps
- **Number Badge**: Orange circle with dark text
- **Content Card**: Dark background with padding
- **Timeline**: Vertical line with connecting dots

## Responsive Breakpoints

- **Mobile**: Default (< 768px)
- **Tablet**: `md:` (≥ 768px)
- **Desktop**: `lg:` (≥ 1024px)

## Key Features

1. **Smooth Scrolling**: Native CSS smooth scroll behavior
2. **Mobile Menu**: Slide-out drawer with overlay
3. **Form Submission**: Google Apps Script integration
4. **Intersection Observer**: Performance-optimized scroll animations
5. **Tailwind CSS**: Utility-first styling framework
6. **Font Awesome**: Icon library for visual elements

## Technical Stack

- **HTML5**: Semantic markup
- **CSS3**: Custom styles with Tailwind utilities
- **JavaScript**: Vanilla JS (ES6+)
- **Tailwind CSS**: CDN version with custom config
- **Google Fonts**: Roboto font family
- **Font Awesome**: Icon library

