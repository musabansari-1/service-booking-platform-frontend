# 🎯 Service Booking Platform

A full-stack service booking application that connects service providers with customers. This is the frontend client built with Next JS.

## ✨ Features

- **User Authentication** - Secure login and registration with JWT-based authentication
- **Service Discovery** - Browse and search available services with detailed information
- **Booking Management** - Easy-to-use booking system with real-time slot availability
- **User Dashboard** - Personalized profile and booking history
- **Service Management** - Edit and manage service profiles
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Real-time Updates** - Dynamic content carousel and interactive UI components

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 14+](https://nextjs.org/) - React metaframework for production-grade applications
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript for scalable code
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **HTTP Client**: [Axios](https://axios-http.com/) - Promise-based HTTP client for API communication
- **Post-Processing**: PostCSS - CSS transformation pipeline

### Architecture Patterns
- **API Integration** - Axios instance with centralized configuration
- **Service Layer** - Modular service files for API operations (booking, service, slots)
- **Custom Hooks** - Reusable authentication logic with `useAuth`
- **Component-Driven** - Modular, reusable React components
- **Type Safety** - Comprehensive TypeScript type definitions

## 📁 Project Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── (protected)/         # Protected routes requiring authentication
│   │   ├── bookings/        # User bookings page
│   │   ├── edit-profile/    # Profile editing
│   │   └── services/[id]/   # Service details with dynamic routing
│   ├── login/               # Login page
│   ├── register/            # Registration page
│   ├── profile/             # User profile
│   └── layout.tsx           # Root layout
├── components/              # Reusable React components
│   ├── AuthLayout.jsx       # Authentication page wrapper
│   ├── BookingCard.tsx      # Booking display component
│   ├── ServiceCard.tsx      # Service listing card
│   ├── TimeSlot.tsx         # Booking slot selector
│   ├── Modal.tsx            # Modal dialog component
│   ├── ConfirmationModal.tsx# Confirmation dialog
│   ├── DataCarousel.tsx     # Carousel component
│   └── Navbar.tsx           # Navigation bar
├── services/                # API service layer
│   ├── booking.ts           # Booking API calls
│   ├── service.ts           # Service API calls
│   └── slots.ts             # Slot availability API
├── hooks/                   # Custom React hooks
│   └── useAuth.js           # Authentication hook
├── types/                   # TypeScript type definitions
│   ├── booking.type.ts      # Booking types
│   ├── service.types.ts     # Service types
│   └── slot.type.ts         # Slot types
└── utils/                   # Utility functions
    └── axiosInstance.ts     # Configured Axios instance
```

##  Getting Started

### Prerequisites
- Node.js 16.x or higher
- npm, yarn, or pnpm package manager

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd service-booking-platform-frontend
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Environment Configuration**
Create a `.env.local` file in the project root:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

4. **Start the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Access the application**
Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔧 Development

### Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

### Hot Module Replacement
Changes to files are automatically reflected in the browser during development. Edit `src/app/page.tsx` or any component to see updates instantly.

## 🔐 Authentication Flow

1. Users register or login through dedicated pages
2. JWT token obtained from backend and stored in client
3. Protected routes verified via `useAuth` hook
4. Axios interceptor automatically includes token in requests
5. Automatic redirects for unauthenticated users

## 🎨 Component Highlights

- **ServiceCard** - Displays service information with booking capability
- **BookingCard** - Shows user's booking history and status
- **TimeSlot** - Interactive slot selection with availability checking
- **DataCarousel** - Responsive carousel for browsing services
- **ConfirmationModal** - User confirmations for critical actions

## 🌐 API Integration

The frontend integrates with a REST API backend for:
- User authentication and profile management
- Service listing and details
- Booking creation and management
- Time slot availability queries

All API calls are made through the centralized Axios instance with proper error handling and request/response interceptors.

## 📱 Responsive Design

The application is fully responsive using Tailwind CSS breakpoints, ensuring optimal viewing experience across all devices:
- Mobile (320px and up)
- Tablet (768px and up)
- Desktop (1024px and up)

## 🚢 Deployment

### Deploy on Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com/) from the creators of Next.js:

1. Connect your repository to Vercel
2. Configure environment variables in the dashboard
3. Deploy automatically on push

[Vercel Deployment Documentation](https://nextjs.org/docs/deployment)

### Other Deployment Options
- Docker containerization
- Traditional Node.js hosting
- Static export with `next export`

## 📚 Key Technologies Explained

### Next.js App Router
Modern file-based routing system with support for:
- Dynamic routes `[id]`
- Protected route groups `(protected)`
- Automatic code splitting and optimization

### TypeScript
Provides:
- Type safety across components and services
- Better IDE autocompletion
- Early error detection during development

### Tailwind CSS
- Utility-first approach for rapid UI development
- Responsive design with minimal custom CSS
- Consistent design system and spacing

## 🤝 Contributing

Contributions are welcome! Please:
1. Create a feature branch
2. Make your changes
3. Submit a pull request with clear descriptions

