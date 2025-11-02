# ChatBI UX/UI Design Mockup

## Overview

ChatBI features a modern, intuitive interface designed for business users who need quick access to data insights without technical expertise. The design follows Microsoft's Fluent Design principles, inspired by Power BI, with a clean, professional aesthetic.

## Color Palette

### Primary Colors
- **Primary Blue**: `#3b82f6` (Actions, links, primary buttons)
- **Primary Blue Dark**: `#2563eb` (Hover states, active elements)
- **Primary Blue Light**: `#dbeafe` (Backgrounds, subtle highlights)

### Semantic Colors
- **Success**: `#10b981` (Positive actions, confirmations)
- **Warning**: `#f59e0b` (Warnings, cautions)
- **Error**: `#ef4444` (Errors, destructive actions)
- **Info**: `#3b82f6` (Information, help text)

### Neutral Colors
- **Background**: `#f8fafc` (Main background)
- **Surface**: `#ffffff` (Cards, panels, modals)
- **Text Primary**: `#1e293b` (Headings, important text)
- **Text Secondary**: `#64748b` (Body text, labels)
- **Text Muted**: `#94a3b8` (Disabled text, placeholders)
- **Border**: `#e2e8f0` (Dividers, borders)

## Typography

### Font Family
- **Primary**: Inter (Google Fonts) - Clean, modern, highly legible
- **Fallback**: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif

### Font Sizes
- **H1**: 2.25rem (36px) - Page titles
- **H2**: 1.875rem (30px) - Section headers
- **H3**: 1.5rem (24px) - Component headers
- **H4**: 1.25rem (20px) - Card titles
- **Body Large**: 1.125rem (18px) - Primary content
- **Body**: 1rem (16px) - Standard text
- **Body Small**: 0.875rem (14px) - Secondary text
- **Caption**: 0.75rem (12px) - Metadata, hints

### Font Weights
- **Light**: 300 - Large headings
- **Regular**: 400 - Body text
- **Medium**: 500 - Emphasized text, labels
- **Semibold**: 600 - Buttons, navigation
- **Bold**: 700 - Strong emphasis

## Layout & Spacing

### Grid System
- **Container Max Width**: 1400px
- **Breakpoints**:
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px

### Spacing Scale (rem-based)
- **xs**: 0.25rem (4px)
- **sm**: 0.5rem (8px)
- **md**: 1rem (16px)
- **lg**: 1.5rem (24px)
- **xl**: 2rem (32px)
- **2xl**: 3rem (48px)

## Component Library

### Buttons

#### Primary Button
```
┌─────────────────────┐
│      Primary        │
└─────────────────────┘
```
- Background: Primary Blue
- Text: White
- Border Radius: 6px
- Padding: 8px 16px
- Font Weight: 500

#### Secondary Button
```
┌─────────────────────┐
│     Secondary       │
└─────────────────────┘
```
- Background: White
- Border: 1px solid Border
- Text: Text Secondary
- Hover: Light gray background

### Cards

#### Data Card
```
┌─────────────────────────────────┐
│ Title                    [icon] │
├─────────────────────────────────┤
│                                 │
│           Content               │
│                                 │
└─────────────────────────────────┘
```
- Shadow: Subtle (0 2px 4px rgba(0,0,0,0.1))
- Border Radius: 8px
- Padding: 16px

### Chat Interface

#### Chat Bubble (User)
```
┌─────────────────────────────────┐
│ User message text              │
│ with multiple lines if needed  │
└─────────────────────────────────┘
     ▲
    User Avatar
```
- Background: Primary Blue
- Text: White
- Border Radius: 18px (left-bottom rounded)
- Max Width: 75%

#### Chat Bubble (Bot)
```
                    Bot Avatar
                        ▼
┌─────────────────────────────────┐
│ Bot response with insights     │
│ and analysis                   │
└─────────────────────────────────┘
```
- Background: Light Gray (#f1f5f9)
- Text: Text Primary
- Border Radius: 18px (right-bottom rounded)
- Max Width: 75%

### Input Components

#### Message Input
```
┌─────────────────────────────────────────────────┬───────┐
│ Type your question here...                      │ Send  │
└─────────────────────────────────────────────────┴───────┘
```
- Border: 1px solid Border
- Border Radius: 24px (pill shape)
- Padding: 12px 16px
- Auto-resize height

## Screen Layouts

### Desktop Layout (1200px+)

```
┌─────────────────────────────────────────────────────────┐
│ Header: Logo | Navigation | User Menu                   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────┐  ┌─────────────────────────────────┐   │
│  │ Navigation  │  │        Main Content             │   │
│  │ Panel       │  │                                 │   │
│  │             │  │  ┌─────────────────────────┐    │   │
│  │ - Dashboard │  │  │ Dashboard with Charts   │    │   │
│  │ - Chat      │  │  │ and KPIs                │    │   │
│  │ - Settings  │  │  └─────────────────────────┘    │   │
│  │             │  │                                 │   │
│  │             │  │  ┌─────────────────────────┐    │   │
│  │             │  │  │ Chat Interface          │    │   │
│  └─────────────┘  │  │                         │    │   │
│                   │  └─────────────────────────┘    │   │
│                   │                                 │   │
└─────────────────────────────────────────────────────────┘
```

### Mobile Layout (< 640px)

```
┌─────────────────────┐
│ Header: Menu Button │
├─────────────────────┤
│                     │
│   Main Content      │
│                     │
│  ┌────────────────┐ │
│  │   Dashboard    │ │
│  │   Charts       │ │
│  └────────────────┘ │
│                     │
│  ┌────────────────┐ │
│  │   Chat         │ │
│  │   Interface    │ │
│  └────────────────┘ │
│                     │
└─────────────────────┘
```

## Interactive States

### Hover States
- **Buttons**: Slight scale (1.02x) and shadow increase
- **Cards**: Shadow elevation and subtle border color change
- **Links**: Underline animation and color transition

### Loading States
- **Skeleton screens** for content loading
- **Spinners** for actions (24px, Primary Blue)
- **Progress bars** for long-running operations

### Error States
- **Red borders** for invalid inputs
- **Error messages** below form fields
- **Toast notifications** for system errors

## Accessibility

### WCAG 2.1 AA Compliance
- **Color Contrast**: Minimum 4.5:1 ratio
- **Focus Indicators**: Visible focus rings (2px, Primary Blue)
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: Proper ARIA labels and roles
- **Reduced Motion**: Respects user's motion preferences

### Keyboard Shortcuts
- **Ctrl/Cmd + K**: Focus search/chat input
- **Ctrl/Cmd + /**: Open help
- **Escape**: Close modals, clear selections
- **Tab**: Navigate through interactive elements

## Responsive Design

### Breakpoint Strategy
- **Mobile First**: Design for mobile, enhance for larger screens
- **Flexible Grids**: CSS Grid and Flexbox for layouts
- **Responsive Images**: Charts and visualizations scale appropriately
- **Touch Targets**: Minimum 44px touch targets on mobile

### Performance
- **Lazy Loading**: Components load as needed
- **Image Optimization**: Charts render efficiently
- **Bundle Splitting**: Separate chunks for different features
- **Caching**: API responses cached appropriately

## Animation & Micro-interactions

### Page Transitions
- **Fade in**: 200ms ease-out for content loading
- **Slide transitions**: 300ms for navigation changes

### Feedback Animations
- **Button press**: Scale down to 0.98x
- **Success checkmark**: Bounce animation
- **Loading dots**: Pulsing animation

### Data Visualizations
- **Chart animations**: Smooth transitions when data updates
- **Hover effects**: Highlight data points on hover
- **Progressive disclosure**: Expand/collapse sections smoothly

## Dark Mode (Future Enhancement)

### Dark Color Palette
- **Background**: `#0f172a`
- **Surface**: `#1e293b`
- **Text Primary**: `#f1f5f9`
- **Text Secondary**: `#cbd5e1`
- **Primary**: `#3b82f6` (same as light mode)

### Implementation Strategy
- **CSS Custom Properties**: Easy theme switching
- **User Preference**: System preference detection
- **Manual Toggle**: User-controlled theme switch
- **Smooth Transitions**: 300ms theme transitions