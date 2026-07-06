# Pizza Yolo Technical Specification

---

# Purpose

This document defines the technical expectations for the Pizza Yolo website.

The objective is not simply to build a working website.

The objective is to build a modern, scalable, high-performance website that reflects the quality of the Pizza Yolo brand.

Every technical decision should support four things:

• Performance

• Simplicity

• Maintainability

• User Experience

---

# General Philosophy

Technology should never become visible.

Visitors should notice:

the pizza,

the photography,

the branding,

the experience.

Never the technology.

The best frontend feels invisible.

---

# Tech Stack

Preferred

Next.js (App Router)

TypeScript

React

TailwindCSS

Framer Motion

shadcn/ui (only as a base, customize every component)

Lucide Icons

Vercel Deployment

The website should feel custom.

Avoid obvious component library styling.

---

# Architecture

Keep the project modular.

Example

/app

/components

/sections

/lib

/hooks

/public

/styles

/content

/types

Each section should exist as an isolated component.

Hero

USP

Menu

Gallery

Location

Instagram

Footer

Nothing should become one massive page component.

---

# Component Philosophy

Every component should have one responsibility.

Small components.

Reusable where appropriate.

Readable.

Never create abstractions that reduce readability.

---

# Styling

Use TailwindCSS.

Keep utility classes organized.

Extract repeated patterns into reusable components.

Avoid inline styles.

Avoid CSS files unless necessary.

---

# Design Tokens

Centralize:

Colors

Typography

Spacing

Border Radius

Animations

Transitions

Shadows

Never hardcode repeated values.

---

# Responsive Strategy

Mobile First.

Breakpoints should be intentional.

Mobile

↓

Tablet

↓

Laptop

↓

Desktop

↓

Ultra Wide

The layout should adapt.

Not simply shrink.

---

# Performance Goals

Lighthouse

95+

Performance

95+

Accessibility

95+

SEO

100

Best Practices

100

Anything below these targets should be considered unfinished.

---

# Loading Speed

Target

Largest Contentful Paint

<2 seconds

Time To Interactive

Extremely fast

JavaScript should remain lightweight.

Remove unnecessary dependencies.

---

# Images

All photography should use:

next/image

WebP or AVIF

Responsive sizing

Lazy loading below the fold

Priority loading only for Hero media

Never upload oversized images.

---

# Fonts

Self-host fonts.

Avoid Google Fonts requests when possible.

Optimize loading.

Preload display font.

Use font-display: swap.

---

# Icons

Lucide Icons preferred.

Avoid mixing icon packs.

Keep icon sizes consistent.

---

# Animations

Use Framer Motion.

Animations should support navigation.

Never become entertainment.

Examples

Fade

Slide

Reveal

Scale

Image Parallax

Hover

Scroll Reveal

Avoid

Spinning

Bouncing

Excessive motion

Long delays

Motion should feel fast.

---

# Scroll Behavior

Smooth scrolling.

Sticky navigation.

Proper anchor links.

Respect reduced motion preferences.

---

# Navigation

Sticky.

Transparent initially.

Solid background after scrolling.

Mobile navigation should feel lightweight.

Avoid full-screen complicated menus.

---

# Hero Section

Support

Image

Video

Future replacement

The Hero should allow media updates without code changes.

---

# Content Management

Content should be easy to update.

Menu items

Opening hours

Events

Gallery

Instagram

Texts

Ideally stored separately from components.

Avoid hardcoded content throughout the application.

---

# Events

Events should be data-driven.

Example

title

date

description

poster

button

status

Adding an event should not require changing layout code.

---

# Gallery

Gallery should support:

Multiple aspect ratios

Lazy loading

Lightbox

Touch gestures

Keyboard navigation

High-resolution images

---

# Accessibility

Every page should support:

Keyboard navigation

Visible focus states

Alt texts

ARIA labels

Proper heading hierarchy

Sufficient contrast

Semantic HTML

Accessibility is not optional.

---

# Forms

Keep forms minimal.

Only request necessary information.

Validation should be immediate.

Friendly error messages.

---

# Google Maps

Embed efficiently.

Avoid blocking page rendering.

Provide direct Google Maps button.

---

# Analytics

Integrate:

Google Analytics 4

Google Search Console

Google Tag Manager

Meta Pixel

Track:

Page Views

CTA Clicks

Directions

Instagram Clicks

Scroll Depth

Event Clicks

Menu Views

Performance should not suffer.

---

# Error Handling

Graceful loading states.

Meaningful empty states.

404 page should match brand identity.

Avoid default browser errors.

---

# Code Quality

Strict TypeScript.

Meaningful naming.

Readable files.

No dead code.

No commented legacy code.

No duplicated logic.

---

# SEO Implementation

Semantic HTML

Structured Data

Metadata API

Open Graph

Twitter Cards

Canonical URLs

robots.txt

sitemap.xml

Everything should be automated where possible.

---

# Security

HTTPS only.

Minimal third-party scripts.

No unnecessary trackers.

Sanitize all user inputs.

Protect against common vulnerabilities.

---

# Deployment

Deploy using Vercel.

Automatic Preview Deployments.

Production Branch

Development Branch

Simple deployment workflow.

---

# Browser Support

Latest versions of:

Chrome

Safari

Edge

Firefox

Mobile Safari

Chrome Android

Progressive enhancement over perfect parity.

---

# Future Scalability

The architecture should allow future additions such as:

Online ordering

Merchandise

Gift cards

Loyalty program

Blog

Multiple locations

Franchise pages

English language

Without requiring a complete rebuild.

---

# Performance Budget

JavaScript should remain minimal.

Avoid unnecessary packages.

Question every dependency.

If a package saves five lines of code but adds 100 KB,

don't install it.

---

# Maintainability

Future developers should understand the project quickly.

Readable code is more valuable than clever code.

Optimize for long-term maintainability.

---

# Final Technical Principle

Technology should amplify the brand.

Never dominate it.

The visitor should leave remembering the pizza, the atmosphere and the experience—

not the framework that powered the website.
