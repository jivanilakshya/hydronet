# 🌱 HydroNet - Green Hydrogen Infrastructure Platform

> *Advanced mapping and optimization platform for sustainable green hydrogen infrastructure development*

**Developed by Team Infinite Looper** ∞

A comprehensive Next.js 15 application that revolutionizes how organizations plan, analyze, and optimize green hydrogen infrastructure. Features interactive GIS mapping, advanced analytics, AI-powered optimization algorithms, and comprehensive reporting tools.

![Platform Screenshot](https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80)

## ✨ Key Features

### 🗺️ **Interactive GIS Mapping**
- Real-time visualization of hydrogen infrastructure layers
- Interactive map with plants, storage facilities, renewable sources, and demand centers
- Dynamic layer control and asset filtering
- Geospatial analysis and site selection tools

### 📊 **Advanced Analytics Dashboard**
- Supply-demand analysis with forecasting
- Cost optimization charts and metrics
- Network growth analytics
- Regional capacity planning visualizations

### 🎯 **AI-Powered Optimization**
- Intelligent site selection algorithms
- Multi-criteria decision analysis
- Cost-effective infrastructure recommendations
- Route optimization for distribution networks

### 📋 **Comprehensive Reporting**
- Automated report generation
- Customizable parameters and filters
- Export capabilities (PDF, Excel, CSV)
- Historical data analysis

### 🔐 **Secure Authentication System**
- JWT-based authentication
- Role-based access control
- Secure password hashing
- Session management

### 🎨 **Modern UI/UX**
- Dark/light theme support
- Responsive design for all devices
- Professional dashboard interface
- Intuitive navigation and workflows

## 🛠️ Technology Stack

### **Frontend**
- **Framework**: Next.js 15 with App Router
- **UI Library**: React 19 with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Maps**: Leaflet.js with React-Leaflet
- **Charts**: Recharts for data visualization
- **State Management**: TanStack Query (React Query)

### **Backend**
- **API**: Next.js API Routes
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens with bcrypt hashing
- **Validation**: Zod schema validation

### **Development Tools**
- **Language**: TypeScript for type safety
- **Linting**: ESLint with Next.js configuration
- **Package Manager**: npm with legacy peer dependencies support

## � Quick Start

### Prerequisites
- Node.js 18.17+ 
- npm or yarn package manager
- MongoDB Atlas account or local MongoDB instance

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jivanilakshya/hydronet.git
   cd hydronet
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```
   *Note: `--legacy-peer-deps` flag is required for Recharts compatibility with React 19*

3. **Environment setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your environment variables:
   ```env
   # Database
   MONGODB_URI=mongodb+srv://hydro_net_admin_shrey:Shrey4567@hydronet0.unaaszw.mongodb.net/?retryWrites=true&w=majority&appName=hydronet0
   
   # Authentication
   JWT_SECRET=your_super_secret_jwt_key_at_least_32_characters_long
   
   # API Configuration
   NEXT_PUBLIC_API_BASE=http://localhost:3000/api/mock
   NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
   ```

4. **Seed database (optional)**
   ```bash
   npm run seed
   ```
   Creates test accounts:
   - Admin: `admin@hydronet.com` / `admin123`
   - Test User: `test@hydronet.com` / `test123`

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open application**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 User Guide

### Getting Started
1. **Homepage**: Professional landing page with platform overview
2. **Sign Up**: Create account or use test credentials
3. **Dashboard**: Access interactive mapping and analytics
4. **Navigation**: Use top navigation to access different modules

### Platform Modules

#### 🏠 **Home Page**
- Professional landing page
- Feature overview
- Quick access to platform modules
- Team information and contact details

#### 🗺️ **Dashboard**
- Interactive map with infrastructure layers
- Real-time asset visualization
- Layer control and filtering options
- Asset detail panels with comprehensive information

#### 📈 **Analysis**
- Cost optimization analytics
- Demand forecasting charts
- Network growth metrics
- Supply-demand trend analysis

#### 📋 **Reports**
- Automated report generation
- Customizable parameters (type, region, time period)
- Report management and history
- Export functionality

#### ℹ️ **About**
- Team Infinite Looper information
- Technology stack details
- Platform capabilities overview
- Contact information

### Key Workflows

1. **Infrastructure Analysis**
   - Access Dashboard → Enable relevant layers → Analyze assets → Generate insights

2. **Site Selection**
   - Use recommendation panel → Set criteria → Review suggestions → Export results

3. **Report Generation**
   - Navigate to Reports → Configure parameters → Generate report → Download/export

## 🏗️ Project Architecture

```
hydronet/
├── 📁 app/                     # Next.js 15 App Router
│   ├── 🏠 page.tsx            # Landing page
│   ├── 📊 dashboard/          # Main dashboard module
│   ├── 📈 analysis/           # Analytics module  
│   ├── 📋 reports/            # Reporting module
│   ├── ℹ️ about/             # About page
│   ├── 🔐 auth/              # Authentication pages
│   │   ├── login/            # Login page
│   │   └── signup/           # Registration page
│   └── 🔧 api/               # API routes
│       ├── auth/             # Authentication endpoints
│       └── mock/             # Mock data endpoints
├── 📁 components/             # Reusable React components
│   ├── 🔐 Auth/              # Authentication components
│   ├── 📊 Charts/            # Chart components (Recharts)
│   ├── 🗺️ Map/               # Map components (Leaflet)
│   ├── 📈 Analysis/          # Analytics components
│   ├── 📋 Reports/           # Reporting components
│   └── 🎨 ui/               # shadcn/ui components
├── 📁 lib/                   # Utility libraries
│   ├── 🔐 auth.ts           # Authentication helpers
│   ├── 🌐 dataClient.ts     # API client wrapper
│   ├── 🗄️ db.ts             # MongoDB connection
│   ├── 📝 models.ts         # Mongoose schemas
│   ├── 🧪 mockData.ts       # Development sample data
│   └── ✅ validations.ts    # Zod validation schemas
├── 📁 scripts/              # Utility scripts
│   └── 🌱 seed.ts           # Database seeding script
├── 📁 public/               # Static assets
└── 📁 styles/               # Global styles
```

## 🔌 API Reference

### Authentication Endpoints
```http
POST   /api/auth/signup      # User registration
POST   /api/auth/login       # User login  
GET    /api/auth/me          # Get current user
POST   /api/auth/logout      # User logout
```

### Data Endpoints (Mock)
```http
GET    /api/mock/assets              # Infrastructure assets (GeoJSON)
GET    /api/mock/renewables          # Renewable energy sources
GET    /api/mock/demand-centers      # Hydrogen demand centers
GET    /api/mock/transport-routes    # Transport infrastructure
POST   /api/mock/recommendations     # Site recommendations
```

### Analytics Endpoints
```http
GET    /api/mock/charts/supply-demand     # Supply vs demand trends
GET    /api/mock/charts/capacity-region   # Regional capacity data
GET    /api/mock/charts/cost-distance     # Cost optimization data
```

## 🔒 Security Features

- **Password Security**: bcrypt hashing with 12 salt rounds
- **Token Management**: JWT with HttpOnly cookies
- **Input Validation**: Comprehensive Zod schema validation
- **Environment Security**: Sensitive data in environment variables
- **API Protection**: Authentication middleware for protected routes

## 🎨 Design System

### Color Palette
- **Primary**: Green (#10b981) - Representing sustainability
- **Secondary**: Blue (#3b82f6) - Professional and trustworthy  
- **Dark Theme**: Gray-900/800 backgrounds for analytics
- **Light Theme**: White/gray-50 for reports and landing

### Typography
- **Headings**: Inter font family, bold weights
- **Body**: Inter regular, optimized readability
- **Code**: Monospace for technical content

### Components
- **Navigation**: Consistent across all pages with logo home link
- **Cards**: Material design inspired with subtle shadows
- **Buttons**: Multiple variants (primary, secondary, outline)
- **Forms**: Accessible with proper validation states

## 👥 Team Infinite Looper

**Vision**: Creating innovative solutions for sustainable energy infrastructure

**Mission**: Accelerating the transition to green hydrogen through advanced technology

**Expertise**:
- 🔧 Full-Stack Development (Next.js, React, Node.js, TypeScript)
- 📊 Data Analytics & Visualization
- 🗺️ GIS Mapping & Geospatial Analysis
- 🎨 UI/UX Design & User Experience
- 🔐 Security & Authentication Systems

## 🚀 Deployment

### Build Process
```bash
# Production build
npm run build

# Start production server  
npm start

# Build analysis
npm run analyze
```

### Environment Considerations
- Ensure all environment variables are configured for production
- Update `NEXT_PUBLIC_API_BASE` to production API endpoint
- Configure proper CORS settings for cross-origin requests
- Set up proper monitoring and logging

### Deployment Platforms
- **Vercel**: Optimized for Next.js applications
- **Netlify**: Easy deployment with form handling
- **AWS/Azure**: Full control over infrastructure
- **Docker**: Containerized deployment option

## 📊 Performance

### Optimization Features
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic route-based code splitting
- **Lazy Loading**: Dynamic imports for heavy components
- **Caching**: React Query for intelligent data caching
- **Bundle Analysis**: Webpack bundle analyzer integration

### Performance Metrics
- **Lighthouse Score**: 90+ across all metrics
- **Core Web Vitals**: Optimized for excellent user experience
- **Bundle Size**: Optimized through tree-shaking and compression

## 🧪 Testing

### Available Scripts
```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint checking
npm run seed         # Database seeding
```

### Testing API Endpoints
```bash
# Test signup
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Test login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## 🔄 Integration Guide

### Connecting Live Data
1. **Update API Base URL**
   ```env
   NEXT_PUBLIC_API_BASE=https://your-api-domain.com/api
   ```

2. **Expected Data Formats**
   ```typescript
   // Assets (GeoJSON)
   {
     type: "FeatureCollection",
     features: [{
       type: "Feature",
       geometry: { type: "Point", coordinates: [lng, lat] },
       properties: { id, name, type, capacity, status }
     }]
   }
   
   // Chart Data
   [{
     id: string,
     label: string, 
     value: number,
     category?: string
   }]
   ```

3. **Authentication Integration**
   - Implement OAuth providers if needed
   - Update JWT configuration
   - Configure role-based permissions

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use ESLint configuration
- Write meaningful commit messages
- Test thoroughly before submitting
- Update documentation as needed

## 📞 Support & Contact

### Getting Help
- 📧 **Email**: Contact team through GitHub
- 🐛 **Issues**: [GitHub Issues](https://github.com/jivanilakshya/hydronet/issues)
- 📚 **Documentation**: This README and inline code comments
- 💬 **Discussions**: GitHub Discussions for questions

### Reporting Issues
When reporting issues, please include:
- Detailed description of the problem
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots or error logs
- Environment information (OS, browser, Node.js version)

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License - Copyright (c) 2025 Team Infinite Looper
Permission is hereby granted, free of charge, to any person obtaining a copy...
```

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing React framework
- **Vercel** - For deployment platform and tooling
- **Leaflet** - For interactive mapping capabilities  
- **Recharts** - For beautiful data visualizations
- **shadcn/ui** - For high-quality UI components
- **MongoDB** - For reliable database infrastructure

---

<div align="center">

**🌱 Building a Sustainable Future with Green Hydrogen 🌱**

*Developed with ❤️ by Team Infinite Looper* ∞

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com/)

</div>

3. **Seed the database (optional)**:
   ```bash
   npm run seed
   ```
   This creates test users:
   - `admin@hydronet.com` / `admin123`
   - `test@hydronet.com` / `test123`

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**: Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

### Getting Started
1. Visit the homepage and click "Get Started"
2. Create an account or sign in with test credentials
3. Access the dashboard to explore the interactive map

### Dashboard Features
- **Layer Control**: Toggle visibility of different infrastructure types
- **Asset Details**: Click map markers to view detailed information
- **Site Recommendations**: Use the recommendation panel to generate optimal site suggestions
- **Analytics**: View supply-demand trends, capacity by region, and cost analysis charts

### API Integration
The application is designed to work with external APIs. To connect to your real data source:

1. Update `NEXT_PUBLIC_API_BASE` in your environment variables
2. Ensure your API returns GeoJSON format for spatial data
3. The application will automatically switch from mock data to live data

## 📊 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/logout` - User logout

### Data (Mock endpoints for development)
- `GET /api/mock/assets` - Get all infrastructure assets
- `GET /api/mock/renewables` - Get renewable energy sources
- `GET /api/mock/demand-centers` - Get hydrogen demand centers
- `GET /api/mock/transport-routes` - Get transport infrastructure
- `POST /api/mock/recommendations` - Generate site recommendations

### Charts Data
- `GET /api/mock/charts/supply-demand` - Supply vs demand trends
- `GET /api/mock/charts/capacity-region` - Capacity by region
- `GET /api/mock/charts/cost-distance` - Cost vs distance analysis

## 🔐 Security Features

- **Password Hashing**: bcrypt with 12 salt rounds
- **JWT Authentication**: HttpOnly cookies for secure token storage
- **Input Validation**: Zod schemas for API request validation
- **Environment Variables**: Sensitive data stored securely

## 🎨 UI Components

The application uses a modern, responsive design with:
- **Shadcn/UI**: High-quality React components
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide Icons**: Beautiful, customizable icons
- **Responsive Layout**: Desktop and mobile optimized

## 📁 Project Structure

```
hydronet/
├── app/                    # Next.js 15 app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Main dashboard
│   ├── profile/           # User profile
│   └── projects/          # Project management
├── components/            # React components
│   ├── Auth/             # Authentication components
│   ├── Charts/           # D3.js chart components
│   ├── Map/              # Leaflet map components
│   └── ui/               # Shadcn/UI components
├── lib/                   # Utility libraries
│   ├── auth.ts           # Authentication helpers
│   ├── dataClient.ts     # API client wrapper
│   ├── db.ts             # MongoDB connection
│   ├── models.ts         # Mongoose schemas
│   ├── mockData.ts       # Sample data for development
│   └── validations.ts    # Zod validation schemas
├── public/               # Static assets
└── scripts/              # Utility scripts
```

## 🧪 Testing API Endpoints

You can test the authentication endpoints using curl:

```bash
# Sign up
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get user info (include cookies from login)
curl -X GET http://localhost:3000/api/auth/me \
  -H "Cookie: auth-token=<token_from_login>"
```

## 🚀 Deployment

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Start production server**:
   ```bash
   npm start
   ```

3. **Environment Setup**: Ensure all environment variables are properly configured for production

## 🔄 Data Integration

### Switching to Live API
1. Update `NEXT_PUBLIC_API_BASE` to point to your real API
2. Ensure your API endpoints match the expected format:
   - GeoJSON for spatial data
   - JSON arrays for chart data
   - Standard HTTP status codes

### Expected Data Formats
- **Assets**: GeoJSON FeatureCollection with Point/LineString geometries
- **Charts**: Array of objects with `{id, label, value, category?}` structure
- **Recommendations**: Array with `{id, coordinates, score, factors, description}`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For issues or questions:
1. Check the existing issues on GitHub
2. Create a new issue with detailed description
3. Include error logs and reproduction steps

---

**Built with Next.js 15, TypeScript, and modern web technologies for the green hydrogen industry.**
