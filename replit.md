# Overview

This is a Ashok Gaming casino gaming web application that provides users with an immersive online casino experience. The application features a modern React frontend with a premium dark theme design, backed by an Express.js server and PostgreSQL database. The app includes various casino games and features like a spin wheel game with prize tracking, user authentication capabilities, and a sophisticated UI built with shadcn/ui components.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing with pages for Home, Games, Spin Wheel, and About
- **UI Framework**: shadcn/ui components built on Radix UI primitives for accessible, customizable components
- **Styling**: Tailwind CSS with a premium dark casino theme featuring gold accents and Ashok Gaming fonts
- **State Management**: TanStack React Query for server state management and data fetching
- **Animations**: Framer Motion for smooth page transitions and interactive elements
- **Component Structure**: Modular component architecture with reusable UI components and layout components

## Backend Architecture
- **Framework**: Express.js with TypeScript running on Node.js
- **API Design**: RESTful API with dedicated routes for spin results and user history
- **Data Layer**: Drizzle ORM for type-safe database operations with PostgreSQL
- **Storage Strategy**: In-memory storage implementation with interface for future database integration
- **Error Handling**: Centralized error handling middleware with proper HTTP status codes
- **Development Setup**: Vite integration for seamless development experience with HMR

## Database Schema
- **Users Table**: Stores user credentials with unique usernames and hashed passwords
- **Spin Results Table**: Tracks spin wheel outcomes with prizes, credits, and timestamps
- **Schema Management**: Drizzle Kit for database migrations and schema synchronization
- **Validation**: Zod schemas for runtime type checking and API request validation

## UI/UX Design Patterns
- **Theme System**: Comprehensive CSS custom properties for consistent theming
- **Typography**: Premium font stack with Playfair Display for headings and Inter for body text
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Component Variants**: Class Variance Authority for consistent component styling patterns
- **Accessibility**: ARIA-compliant components with keyboard navigation support

# External Dependencies

## Database & ORM
- **Neon Database**: Serverless PostgreSQL database for production deployment
- **Drizzle ORM**: Type-safe database operations with automatic TypeScript inference
- **connect-pg-simple**: PostgreSQL session store for Express sessions

## UI & Styling
- **Radix UI**: Headless component primitives for complex UI patterns
- **Tailwind CSS**: Utility-first CSS framework with custom theme configuration
- **Framer Motion**: Animation library for smooth transitions and interactions
- **Lucide React**: Icon library with consistent styling

## Development Tools
- **Vite**: Fast build tool with TypeScript support and HMR
- **ESBuild**: JavaScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind and Autoprefixer plugins
- **Replit Integration**: Development environment plugins for seamless deployment

## Frontend Libraries
- **TanStack React Query**: Server state management with caching and synchronization
- **React Hook Form**: Form handling with validation and performance optimization
- **Wouter**: Lightweight client-side routing solution
- **Date-fns**: Date manipulation library for timestamp formatting