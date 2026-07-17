# Dibs-client

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## Project Structure & Guidelines

To maintain a clean and scalable codebase, please adhere to the following conventions when creating new pages or components:

### 1. Folder Locations

- **Pages / Views (`src/views/`)**:
  - Contains components that are loaded directly via routing in `src/router/index.js`.
  - Filename naming convention: **PascalCase** suffixed with `View.vue` (e.g., `HomeView.vue`, `LoginView.vue`, `AddItemView.vue`).

- **Reusable Components (`src/components/`)**:
  - Contains modular UI elements, forms, and layout components (e.g. components that are imported and used inside other views or parent components).
  - Organize into subdirectories by category/feature (e.g., `src/components/Navigation/`, `src/components/Forms/`, `src/components/Items/`).
  - Filename naming convention: **PascalCase** (e.g., `NavBar.vue`, `SearchTab.vue`, `LoginForm.vue`).

### 2. Imports Reference

- Always use the `@` alias (which points to the `src` folder) for cleaner imports instead of deep relative paths:
  ```javascript
  import SearchTab from '@/components/Navigation/SearchTab.vue';
  ```
- Make sure components are imported using their exact case-sensitive PascalCase filenames.

