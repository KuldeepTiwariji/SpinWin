# GameHub - Gaming Platform

## Overview

GameHub is a modern gaming platform built with React and Express.js that provides users with a curated collection of games across various categories. The application features a game discovery interface with search functionality, categorized browsing, and a responsive design optimized for both desktop and mobile experiences.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Library**: shadcn/ui components built on Radix UI primitives for accessible, customizable components
- **Styling**: Tailwind CSS with custom CSS variables for theming, featuring a dark gaming-focused color scheme
- **State Management**: TanStack Query (React Query) for server state management and API data fetching
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation through @hookform/resolvers

### Backend Architecture
- **Server Framework**: Express.js with TypeScript
- **API Design**: RESTful API structure with dedicated routes for games, categories, and search functionality
- **Development Setup**: Custom Vite integration for hot module replacement in development
- **Storage Pattern**: Repository pattern with in-memory storage implementation (MemStorage class)
- **Request Logging**: Custom middleware for API request logging and performance monitoring

### Database Schema
- **ORM**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Schema Design**: 
  - Users table with authentication fields
  - Games table with metadata, ratings, and categorization
  - Categories table with display information and game counts
- **Validation**: Zod schemas generated from Drizzle table definitions for runtime type checking

### Component Architecture
- **Design System**: Consistent component library with variants using class-variance-authority
- **Layout**: Fixed sidebar navigation with responsive mobile behavior
- **Game Display**: Card-based layouts with different sizes for featured/regular content
- **Search Interface**: Real-time search with debounced filtering across games and categories

### Development Workflow
- **TypeScript**: Strict type checking across client, server, and shared code
- **Build Process**: Separate builds for client (Vite) and server (esbuild)
- **Hot Reload**: Development server with automatic refresh for both frontend and backend changes
- **Path Aliases**: Configured import aliases for clean code organization

## External Dependencies

### Database & ORM
- **Neon Database**: PostgreSQL serverless database using @neondatabase/serverless
- **Drizzle Kit**: Database migrations and schema management
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### UI & Styling
- **Radix UI**: Comprehensive set of accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Lucide React**: Icon library for consistent iconography
- **class-variance-authority**: Component variant management
- **Font Awesome**: Additional icon support via CDN

### Development & Build Tools
- **Vite**: Fast build tool with React plugin and runtime error overlay
- **esbuild**: Server-side bundling for production builds
- **tsx**: TypeScript execution for development server
- **PostCSS**: CSS processing with Tailwind and Autoprefixer

### Utilities & Enhancements
- **date-fns**: Date manipulation and formatting
- **clsx & tailwind-merge**: Conditional CSS class management
- **cmdk**: Command palette/search interface component
- **embla-carousel-react**: Touch-friendly carousel component
- **nanoid**: Unique ID generation
- **wouter**: Lightweight routing solution

### Replit Integration
- **@replit/vite-plugin-runtime-error-modal**: Development error handling
- **@replit/vite-plugin-cartographer**: Development environment enhancements