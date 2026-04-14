const fs = require('fs');
const path = require('path');

const files = {
  'assets/scss/main.scss': `@tailwind base;\n@tailwind components;\n@tailwind utilities;`,
  'tailwind.config.js': `/** @type {import('tailwindcss').Config} */\nmodule.exports = {\n  content: [\n    './components/**/*.{js,vue,ts}',\n    './layouts/**/*.vue',\n    './pages/**/*.vue',\n    './plugins/**/*.{js,ts}',\n    './app.vue',\n    './error.vue'\n  ],\n  theme: {\n    extend: {},\n  },\n  plugins: [],\n}`,
  'components/admin/DataCard.vue': `<template>\n  <div><!-- Admin DataCard --></div>\n</template>\n<script setup lang="ts">\n// composables notes\n</script>`,
  'components/events/EventCard.vue': `<template>\n  <div><!-- EventCard --></div>\n</template>\n<script setup lang="ts"></script>`,
  'components/events/EventDetail.vue': `<template>\n  <div><!-- EventDetail --></div>\n</template>\n<script setup lang="ts"></script>`,
  'components/events/EventForm.vue': `<template>\n  <div><!-- EventForm --></div>\n</template>\n<script setup lang="ts"></script>`,
  'components/shared/BaseButton.vue': `<template>\n  <button><!-- BaseButton --></button>\n</template>\n<script setup lang="ts"></script>`,
  'components/layout/Navbar.vue': `<template>\n  <nav><!-- Navbar --></nav>\n</template>\n<script setup lang="ts"></script>`,
  'components/layout/Sidebar.vue': `<template>\n  <aside><!-- Sidebar --></aside>\n</template>\n<script setup lang="ts"></script>`,
  'components/layout/Footer.vue': `<template>\n  <footer><!-- Footer --></footer>\n</template>\n<script setup lang="ts"></script>`,
  'layouts/default.vue': `<template>\n  <div>\n    <LayoutNavbar />\n    <slot />\n    <LayoutFooter />\n  </div>\n</template>\n<script setup lang="ts"></script>`,
  'layouts/admin.vue': `<template>\n  <div class="flex">\n    <LayoutSidebar />\n    <div class="flex-1">\n      <slot />\n    </div>\n  </div>\n</template>\n<script setup lang="ts"></script>`,
  'middleware/auth.ts': `export default defineNuxtRouteMiddleware((to, from) => {\n  // check if user logged in\n})`,
  'middleware/admin.ts': `export default defineNuxtRouteMiddleware((to, from) => {\n  // check if user role is admin\n})`,
  'pages/index.vue': `<template>\n  <div>\n    <h1>Landing Page / Event Discovery</h1>\n  </div>\n</template>\n<script setup lang="ts"></script>`,
  'pages/auth/login.vue': `<template>\n  <div>\n    <h1>Login</h1>\n  </div>\n</template>\n<script setup lang="ts"></script>`,
  'pages/auth/register.vue': `<template>\n  <div>\n    <h1>Register</h1>\n  </div>\n</template>\n<script setup lang="ts"></script>`,
  'pages/events/[id].vue': `<template>\n  <div>\n    <h1>Event details</h1>\n  </div>\n</template>\n<script setup lang="ts"></script>`,
  'pages/events/submit.vue': `<template>\n  <div>\n    <h1>Submit Event</h1>\n  </div>\n</template>\n<script setup lang="ts"></script>`,
  'pages/admin/index.vue': `<template>\n  <div>\n    <h1>Admin Analytics & Reports</h1>\n  </div>\n</template>\n<script setup lang="ts">\ndefinePageMeta({ layout: 'admin', middleware: ['auth', 'admin'] })\n</script>`,
  'pages/admin/events.vue': `<template>\n  <div>\n    <h1>Admin Event Management</h1>\n  </div>\n</template>\n<script setup lang="ts">\ndefinePageMeta({ layout: 'admin', middleware: ['auth', 'admin'] })\n</script>`,
  'pages/admin/users.vue': `<template>\n  <div>\n    <h1>Admin Users Management</h1>\n  </div>\n</template>\n<script setup lang="ts">\ndefinePageMeta({ layout: 'admin', middleware: ['auth', 'admin'] })\n</script>`,
  'server/api/ping.ts': `export default defineEventHandler(() => {\n  return { ping: 'pong' }\n})`,
  'stores/auth.ts': `import { defineStore } from 'pinia'\n\nexport const useAuthStore = defineStore('auth', {\n  state: () => ({\n    user: null as any | null\n  }),\n  getters: {\n    isAdmin: (state) => state?.user?.role === 'admin'\n  },\n  actions: {\n    setUser(user: any) {\n      this.user = user\n    }\n  }\n})`,
  'stores/events.ts': `import { defineStore } from 'pinia'\n\nexport const useEventsStore = defineStore('events', {\n  state: () => ({\n    list: [] as any[]\n  })\n})`,
  'app.vue': `<template>\n  <NuxtLayout>\n    <NuxtPage />\n  </NuxtLayout>\n</template>`
};

for (const [filepath, content] of Object.entries(files)) {
  const fullPath = path.join(process.cwd(), filepath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
}
console.log('Files generated successfully.');
