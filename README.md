# Event Management System

## Project Architecture & Folder Structure

This project uses Nuxt 3 (with Nuxt 4 compatibility settings) combined with Tailwind CSS and Pinia. Below is a breakdown of how the folders and files are organized and how routing and data flows within the system.

```text
event-management-system/
├── assets/
│   └── scss/ # Global styles, Tailwind directives, and CSS variables.
├── components/
│   ├── admin/  # Admin-specific UI components (DataTables, metric cards).
│   ├── events/ # Event-specific components like EventCard, EventDetail, and EventForm.
│   ├── shared/ # Reusable UI pieces (Buttons, Modals, Form Inputs).
│   └── layout/ # Structural components like Navbar, Sidebar, and Footer.
├── layouts/
│   ├── default.vue # Standard layout (Navbar + Footer) applied to all public pages.
│   └── admin.vue   # Dashboard layout (Sidebar + Topbar) applied to management pages.
├── middleware/
│   ├── auth.ts  # Route middleware to check if a user is logged in before accessing private paths.
│   └── admin.ts # Route middleware to ensure the logged-in user has the 'admin' role.
├── pages/
│   ├── index.vue # Landing page / Event Discovery (maps to `/`).
│   ├── auth/
│   │   ├── login.vue    # Login page (maps to `/auth/login`).
│   │   └── register.vue # Registration page (maps to `/auth/register`).
│   ├── events/
│   │   ├── [id].vue     # Dynamic route for viewing a single event (maps to `/events/123`).
│   │   └── submit.vue   # Page with a form for users to submit a new event.
│   └── admin/ # ALL ROUTES IN HERE REQUIRE ADMIN PRIVILEGES
│       ├── index.vue    # Admin Analytics & Reports dashboard (maps to `/admin`).
│       ├── events.vue   # Admin queue for event creation and approval.
│       └── users.vue    # User management datatable for administrators.
├── server/
│   └── api/ # Custom server-side backend endpoints (e.g. `server/api/ping.ts` mapped to `/api/ping`).
├── stores/
│   ├── auth.ts   # Pinia store that handles user session, state and role data.
│   └── events.ts # Pinia store caching bulk event lists and details.
├── app.vue          # The main entrypoint that renders your layouts and pages.
├── nuxt.config.ts   # Main configuration for Nuxt, enabling Tailwind, Pinia, and custom settings (like `srcDir`).
└── package.json     # Project dependencies and script commands.
```

## How It Works (Paths & Architecture)

1. **Pages and Routing:** 
   Nuxt utilizes file-system routing. Every `.vue` file you create inside the `pages/` directory automatically becomes a route! 
   - `pages/index.vue` is the root (`/`).
   - `pages/events/[id].vue` represents dynamic URLs like `/events/1` or `/events/hello-world`. The bracket notation `[id]` allows your page to access that parameter dynamically!

2. **Layouts:** 
   Layouts are wrappers for your pages. In `app.vue`, the tags `<NuxtLayout><NuxtPage /></NuxtLayout>` tell Nuxt to render components this way. 
   - If a page doesn't specify a layout in its `<script setup>`, the `layouts/default.vue` is used.
   - For the Admin pages (e.g., `pages/admin/index.vue`), we use a function `definePageMeta({ layout: 'admin' })` to instruct Nuxt to wrap it in the Sidebar/Admin dashboard interface.

3. **Global State Strategy (Pinia):** 
   Located in `stores/`, this is your global brain. Any page or component can use these values seamlessly. For example, `auth.ts` holds the state of the user. Once they log in globally, the `Navbar.vue` or any specific `page` can access if `isAdmin` is true dynamically!

4. **Styling (Tailwind):** 
   Styling defaults are driven primarily by Tailwind CSS utility classes inside your `<template>` tags.
   Global generic configurations and generic scss components should continue residing inside `assets/scss/main.scss` since it is already integrated with the framework.

5. **Server Side Logic:**
   Any `.ts` file created under `server/api/` will serve as an independent backend endpoint mapping automatically! `server/api/ping.ts` provides a backend API directly at `http://localhost:3000/api/ping` without needing extra complex Node.js/Express setups.
