# Dibs (Client App)

A modern, responsive Vue 3 frontend application designed to help users post, search, find, and claim lost and found items. Dibs provides a clean user interface powered by Tailwind CSS and DaisyUI, allowing seamless interaction with a companion backend API.

---

## Features

- **Secure Authentication**: 
  - Local account registration with profile image upload (`multipart/form-data`).
  - Local credentials login.
  - Social login integration via **OAuth2 Google Authorization**.
- **Lost & Found Feed**:
  - View a feed of lost and found items.
  - Interactive item detail cards featuring uploaded item photos, approximate date/time, probable location, description, and contact info.
- **Search Feed**:
  - Quick, real-time query searching for items.
- **Post Items**:
  - Upload lost or found items with a descriptive form (name, description, probable location, contact number, approximate time) and an image file.
- **Item Claiming**:
  - Claim found items directly from the feed. Claimed items are instantly updated across the app and showcased on the user profile page.
- **User Profiles**:
  - Dedicated user space showing account details, profile picture, and a list of all items claimed by the user.

---

## Tech Stack & Key Libraries

- **Framework**: [Vue.js 3](https://vuejs.org/) (Composition API setup)
- **Build Tool**: [Vite](https://vite.dev/)
- **Router**: [Vue Router 5](https://router.vuejs.org/)
- **HTTP Client**: [Axios](https://github.com/axios/axios)
- **Styling & Components**: 
  - [Tailwind CSS v4](https://tailwindcss.com/)
  - [DaisyUI v5](https://daisyui.com/) for rich dashboard component aesthetics

---

## Directory Structure

```text
dibs-client/
├── .vscode/
│   └── extensions.json       # Recommended VS Code extensions
├── public/
│   └── favicon.ico           # Application favicon
├── src/
│   ├── components/
│   │   ├── Forms/
│   │   │   └── LoginForm.vue # Local login form fields
│   │   ├── Items/
│   │   │   └── ClaimedItems.vue # Grid layout showing user claimed items
│   │   ├── Navigation/
│   │   │   ├── navBar.vue    # Top-level navbar with user profile avatar
│   │   │   └── searchTab.vue # Real-time text-input query search bar
│   │   ├── register/
│   │   │   └── Signup.vue    # New user sign-up with profile photo upload form
│   │   ├── addItem.vue       # Page/Form to list lost or found items
│   │   ├── Founditems.vue    # Gallery of reported found items with claim action
│   │   ├── Homepage.vue      # Welcome landing screen
│   │   ├── Login.vue         # User credentials + Google OAuth login view
│   │   ├── Logout.vue        # Standard logout route component
│   │   ├── LostItems.vue     # Gallery of reported lost items
│   │   ├── NotFound.vue      # Custom 404 error redirect view
│   │   └── user.vue          # User dashboard container with claimed item metrics
│   ├── router/
│   │   └── index.js          # Vue Router configurations and path matching rules
│   ├── App.vue               # Main entry layout matching components to paths
│   ├── main.js               # Application setup, router loading, and Vue mounting
│   └── style.css             # Main styling import containing Tailwind configurations
├── index.html                # Vite entry template layout
├── jsconfig.json             # JS path alias mapping (e.g. '@/*')
├── package.json              # Project dependencies, scripts, and details
├── vite.config.js            # Vite build, Vue plugin, and Tailwind CSS options
└── README.md                 # Project documentation
```

---

## API Integrations

The client application communicates with a backend services server at `http://localhost:8081`. 

### Key Endpoints Used:

| Method | Endpoint | Description | Content-Type |
|:---|:---|:---|:---|
| **POST** | `/login` | Authenticate user locally | `application/json` |
| **POST** | `/register` | Sign up a new user with a profile picture | `multipart/form-data` |
| **POST** | `/item` | Register a new lost/found item with image | `multipart/form-data` |
| **GET** | `/user` | Retrieve details for the logged-in user | `application/json` |
| **GET** | `/lostitems` | Fetch all reported lost items | `application/json` |
| **GET** | `/founditems` | Fetch all reported found items | `application/json` |
| **GET** | `/claimitem/{id}` | Claim a specific found item | `application/json` |
| **GET** | `/claimedItems` | Retrieve list of items claimed by current user | `application/json` |
| **GET** | `/search/{query}` | Query search for items matching keyword | `application/json` |
| **GET** | `/oauth2/authorization/google` | Trigger OAuth2 Google Login redirection | - |

---

## Getting Started

### 1. Prerequisites
Ensure you have **Node.js** (version `^20.19.0` or `>=22.12.0`) and `npm` installed.

### 2. Setup
Clone the repository and install all dependencies:
```bash
npm install
```

### 3. Run Development Server
Start the frontend development server:
```bash
npm run dev
```
The app will normally run on `http://localhost:5173`. Make sure the companion backend server is running on `http://localhost:8081`.

### 4. Build for Production
To compile and minify the files for production:
```bash
npm run build
```
Preview the production build:
```bash
npm run preview
```

---

## Recommended IDE Setup

We recommend using **VS Code** with the **Vue (Official)** extension (Volar) enabled, and disabling Vetur to prevent configuration conflicts.

