# MISUNI JEWELS

> Real diamond jewellery crafted in gold, white gold & rose gold.
> **Purity. Integrity. Brilliance.**

## Overview

MISUNI JEWELS is a premium e-commerce platform for fine diamond jewellery. Built with Next.js 16, React 19, and Supabase, the site offers a luxurious shopping experience with features like wishlists, cart management, and collection browsing.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Fonts**: Montserrat + Cormorant Garamond (Google Fonts)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/krushil298/misuni_jewels.git
cd misuni_jewels/frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The site will be available at [http://localhost:3000](http://localhost:3000).

### Environment Variables

Create a `.env.local` file in the `frontend/` directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Project Structure

```
frontend/
├── src/
│   ├── app/             # Next.js App Router pages
│   │   ├── cart/        # Shopping cart
│   │   ├── collections/ # Product collection browsing
│   │   ├── contact/     # Contact form
│   │   ├── product/     # Product detail pages
│   │   ├── search/      # Product search
│   │   └── wishlist/    # User wishlist
│   ├── components/      # React components
│   │   ├── collections/ # Collection-specific components
│   │   ├── home/        # Homepage sections
│   │   ├── layout/      # Navbar, Footer, MobileMenu
│   │   ├── product/     # Product cards, gallery, info
│   │   └── ui/          # Shared UI components
│   ├── context/         # React Context (Cart, Wishlist)
│   ├── data/            # Data fetching & static data
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utilities & configuration
│   └── types/           # TypeScript type definitions
```

## Features

- 🏠 **Homepage** — Hero section, category circles, bestsellers, testimonials, collections grid, editorial
- 🛍️ **Collections** — Filterable product grid with sidebar filters and pagination
- 📦 **Product Detail** — Image gallery, size/metal selection, related products
- 🛒 **Cart** — Add/remove/update items, order summary, tax calculation
- ❤️ **Wishlist** — Save favorites, move to cart
- 🔍 **Search** — Real-time product search with suggestions
- 📱 **Mobile** — Fully responsive with mobile menu drawer
- 💬 **WhatsApp** — Floating CTA for direct customer enquiries

## License

Private — All rights reserved.
