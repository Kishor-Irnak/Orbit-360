# Orbit 360 - Dashboard Analytics

Orbit 360 is a modern, high-performance dashboard analytics platform built with **Next.js 15**, **Tailwind CSS 4**, and **Shadcn UI**. It provides a comprehensive suite of tools for managing Sales, Marketing, and Logistics operations with a sleek, premium user interface.

## 🚀 Live Demo

You can view the live project deployed on GitHub Pages:
**[Orbit 360 Live](https://kishor-irnak.github.io/Orbit-360/)**

---

## ✨ Features

- **📊 Advanced Analytics**: Real-time data visualization and performance tracking.
- **🛒 Sales Management**: Manage orders, products, and customer data seamlessly.
- **📣 Marketing Hub**: Track campaign performance, ROAS, and creative assets.
- **🚚 Logistics Engine**: Monitor inventory, real-time shipment tracking, and returns.
- **🌓 Dark Mode**: Built-in dark and light mode support with smooth transitions.
- **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile devices.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) / [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/) & [Tabler Icons](https://tabler-icons.io/)
- **State Management**: React Hooks
- **Deployment**: GitHub Pages (Static Export)

---

## 📂 Project Structure

```bash
Orbit-360/
├── app/                  # Next.js App Router (Pages & Layouts)
│   ├── (auth)/           # Authentication routes
│   ├── sales/            # Sales: Orders, Products, Customers
│   ├── marketing/        # Marketing: Performance, Campaigns, Creatives
│   ├── logistics/        # Logistics: Inventory, Tracking, Returns
│   ├── analytics/        # Business Analytics dashboard
│   ├── automation/       # Workflow automation settings
│   ├── settings/         # Profile and System settings
│   ├── globals.css       # Global styles & Tailwind utilities
│   └── layout.tsx        # Main application layout
├── components/           # Reusable React components
│   ├── ui/               # Primitive components (buttons, dialogs, etc.)
│   ├── charts/           # Recharts implementations
│   ├── nav-main.tsx      # Sidebar navigation logic
│   ├── site-header.tsx   # Top navigation & Breadcrumbs
│   └── *-table.tsx       # Domain-specific data tables
├── public/               # Static assets (Images, Logos, Favicon)
├── hooks/                # Custom React hooks (useSidebar, etc.)
├── lib/                  # Utility functions and shared logic
├── next.config.ts        # Next.js configuration (basePath, export)
└── package.json          # Dependencies and scripts
```

---

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Kishor-Irnak/Orbit-360.git
   cd Orbit-360
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to see the result.

---

## 📦 Deployment

This project is configured for **Static Export** to GitHub Pages.

1. **Build and Deploy**:
   ```bash
   npm run deploy
   ```
   This command runs `next build` (which triggers `next export` via the `output: 'export'` config) and pushes the `out/` directory to the `gh-pages` branch.

---

## 📄 License

Powered by **Evoc Labs**. All rights reserved.
