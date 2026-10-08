# 🌮 Groovy Grub

A bold, playful food & beverage store built as a single-page React app.

**Live demo:** https://wilmerrodriguez.github.io/groovy-grub/

## Features

| | |
|---|---|
| **Catalog** | 12 products, live search (name, tags, description), category filters and sorting. Filters live in the URL, so results are shareable. |
| **Product pages** | Quantity selector, ratings, tags and related items |
| **Cart** | Quantity controls, remove, free-delivery progress bar, promo codes (`GRUB10`, `GROOVY20`) |
| **Checkout** | Delivery form with inline validation and focus management, 3 payment options, simulated order placement |
| **Account** | Demo sign-in / sign-up stored in Redux |
| **Persistence** | Cart and session saved to `localStorage`, so a refresh keeps your order |
| **Polish** | Toast notifications, responsive down to small phones, keyboard-friendly, `prefers-reduced-motion` support |

## Stack

- **React 18** with **React Router 6**
- **Redux Toolkit**: `cart`, `auth` and `ui` slices, memoized selectors (`createSelector`) for totals
- **Vite** for dev server and builds
- Plain CSS with custom properties (no UI library)

## Project structure

```
src/
├── components/   Navbar, ProductCard, Summary, Toasts, Footer
├── data/         products.js (catalog data)
├── pages/        Catalog, ProductDetail, Cart, Checkout, Success, Account, NotFound
├── store/        index.js (store + persistence), slices/{cart,auth,ui}Slice.js
├── App.jsx       Routes
└── main.jsx      Entry point
```

## Run locally

```bash
npm install
npm run dev
# open http://localhost:5173/groovy-grub/
```

## Deploy

```bash
npm run deploy   # builds and publishes dist/ to the gh-pages branch
```

GitHub Pages serves the `gh-pages` branch. `404.html` is a copy of `index.html`, so deep links like `/groovy-grub/product/mango-lassi` load correctly.

---

Built by [Wilmer Rodriguez](https://wilmerrodriguez.github.io/cv_landingPage/). This is a portfolio demo: no real orders or payments.
