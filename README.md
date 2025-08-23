# Oralie E-commerce Platform

[![Next.js](https://img.shields.io/badge/Next.js-14.2.14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-Supported-2496ED?style=flat-square&logo=docker)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

A modern, full-featured e-commerce platform built with Next.js 14, TypeScript, and Tailwind CSS. Oralie provides a complete shopping experience with user authentication, product management, shopping cart functionality, and administrative dashboard.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Authors](#authors)
- [Acknowledgments](#acknowledgments)

## Features

### Current Features
- 🛒 **E-commerce Core**
  - Product catalog with search and filtering
  - Shopping cart functionality
  - Order management and checkout process
  - User account management
  
- 🔐 **Authentication & Authorization**
  - NextAuth.js integration with Keycloak
  - Role-based access control (User/Admin)
  - JWT token management
  - Protected routes and middleware

- 📱 **User Interface**
  - Responsive design for all device sizes
  - Dark/light theme support
  - Modern UI components with Radix UI
  - Interactive elements with Framer Motion

- 🎛️ **Admin Dashboard**
  - Product management (CRUD operations)
  - Order tracking and management
  - User management
  - Analytics and reporting dashboard

- 🎨 **Design System**
  - Consistent component library
  - Customizable themes
  - Icon system with Lucide React
  - Form handling with React Hook Form

### Planned Features
- 📊 Advanced analytics and reporting
- 💳 Multiple payment gateway integration
- 📧 Email notifications and marketing
- 🌐 Multi-language support
- 📦 Inventory management system

## Technology Stack

**Frontend:**
- [Next.js 14](https://nextjs.org/) - React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Low-level UI primitives
- [Framer Motion](https://www.framer.com/motion/) - Animation library

**State Management & Forms:**
- [Zustand](https://zustand-demo.pmnd.rs/) - Lightweight state management
- [React Hook Form](https://react-hook-form.com/) - Performant forms
- [Zod](https://zod.dev/) - TypeScript-first schema validation

**Authentication:**
- [NextAuth.js](https://next-auth.js.org/) - Authentication for Next.js
- [Keycloak](https://www.keycloak.org/) - Identity and access management

**Development:**
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting
- [Docker](https://www.docker.com/) - Containerization

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.0 or later
- **npm**: Version 8.0 or later (comes with Node.js)
- **Git**: For version control
- **Docker** (optional): For containerized deployment

### System Requirements
- **OS**: Windows 10+, macOS 10.15+, or Linux
- **RAM**: Minimum 4GB, recommended 8GB+
- **Storage**: At least 1GB free space

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/vietviet08/FE-Oralie.git
cd FE-Oralie
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

### 4. Configure Environment Variables

Edit `.env.local` with your configuration:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here

# Keycloak Configuration
KEYCLOAK_ISSUER=https://your-keycloak-domain/auth/realms/your-realm
KEYCLOAK_CLIENT_ID=your_client_id
KEYCLOAK_CLIENT_SECRET=your_client_secret

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NEXTAUTH_URL` | The URL of your application | Yes | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | Secret for NextAuth.js | Yes | - |
| `KEYCLOAK_ISSUER` | Keycloak realm issuer URL | Yes | - |
| `KEYCLOAK_CLIENT_ID` | Keycloak client ID | Yes | - |
| `KEYCLOAK_CLIENT_SECRET` | Keycloak client secret | Yes | - |
| `NEXT_PUBLIC_API_URL` | Backend API URL | Yes | - |

### Keycloak Setup

1. Create a new realm in your Keycloak instance
2. Create a client with the following settings:
   - Client ID: `oralie-frontend`
   - Client Protocol: `openid-connect`
   - Access Type: `confidential`
   - Valid Redirect URIs: `http://localhost:3000/api/auth/callback/keycloak`

3. Configure realm roles: `USER`, `ADMIN`

### Theme Configuration

Modify `tailwind.config.ts` to customize the design system:

```typescript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          // Your primary color palette
        }
      }
    }
  }
}
```

## Usage

### Development

```bash
# Start development server
npm run dev

# Run linting
npm run lint

# Build for production
npm run build

# Start production server
npm run start
```

### Key Features Usage

#### Authentication
```typescript
// Login with Keycloak
import { signIn, signOut } from 'next-auth/react'

// Sign in
await signIn('keycloak')

// Sign out
await signOut()
```

#### Shopping Cart
```typescript
// Add item to cart
const addToCart = (product: Product, quantity: number) => {
  // Cart logic implementation
}
```

#### Admin Dashboard
Navigate to `/admin` (requires ADMIN role) to access:
- Product management
- Order tracking
- User administration
- Analytics dashboard

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── (dash)/            # Dashboard routes
│   ├── (store)/           # Store routes
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── auth/             # Authentication components
│   ├── common/           # Common UI components
│   ├── dash/             # Dashboard components
│   ├── store/            # Store components
│   └── ui/               # Base UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
├── model/                # TypeScript type definitions
├── services/             # API service functions
├── types/                # Global type definitions
└── utils/                # Utility functions
```

## API Documentation

The application integrates with a REST API backend. Key endpoints include:

### Authentication
- `POST /auth/login` - User authentication
- `POST /auth/refresh` - Token refresh
- `POST /auth/logout` - User logout

### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `POST /products` - Create new product (Admin)
- `PUT /products/:id` - Update product (Admin)
- `DELETE /products/:id` - Delete product (Admin)

### Orders
- `GET /orders` - Get user orders
- `POST /orders` - Create new order
- `GET /orders/:id` - Get order details

For complete API documentation, visit: [API Documentation Link](#)

## Testing

### Running Tests

```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Structure

```
__tests__/
├── components/           # Component tests
├── pages/               # Page tests
├── utils/               # Utility function tests
└── __mocks__/           # Mock implementations
```

## Deployment

### Docker Deployment

The application includes Docker support for easy deployment:

```bash
# Build Docker image
docker build -t oralie-frontend .

# Run container
docker run -p 3000:3000 oralie-frontend
```

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

```bash
# Deploy with Vercel CLI
npm i -g vercel
vercel --prod
```

### Environment-specific Builds

```bash
# Production build
npm run build

# Development build
npm run dev
```

### CI/CD Pipeline

The project supports GitHub Actions for automated testing and deployment:

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci
      - run: npm run build
      - run: npm run test
```

## Contributing

We welcome contributions! Please follow these guidelines:

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes following our coding standards
4. Write or update tests as needed
5. Commit your changes: `git commit -m "feat: add your feature"`
6. Push to your fork: `git push origin feature/your-feature-name`
7. Create a Pull Request

### Coding Standards

- Use TypeScript for all new code
- Follow ESLint and Prettier configurations
- Write meaningful commit messages following [Conventional Commits](https://www.conventionalcommits.org/)
- Include tests for new features
- Update documentation as needed

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] New tests added for features
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Oralie Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## Authors

- **Viet Viet** - *Lead Developer* - [@vietviet08](https://github.com/vietviet08)

### Maintainers

For questions or support, please contact:
- Email: [support@oralie.com](mailto:support@oralie.com)
- GitHub Issues: [Project Issues](https://github.com/vietviet08/FE-Oralie/issues)

## Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Low-level UI components
- [Keycloak](https://www.keycloak.org/) - Identity and access management
- [Vercel](https://vercel.com/) - Deployment platform
- [Framer Motion](https://www.framer.com/motion/) - Animation library

### Special Thanks

- The Next.js team for an amazing framework
- The open-source community for incredible tools and libraries
- All contributors who have helped improve this project

---

**[⬆ Back to Top](#oralie-e-commerce-platform)**
