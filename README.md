# HydroNet - Green Hydrogen Infrastructure Mapping & Optimization

A Next.js 15 application for mapping, analyzing, and optimizing green hydrogen infrastructure. Features interactive maps, data visualizations, site selection recommendations, and user authentication.

## 🚀 Features

- **Interactive Mapping**: Leaflet-based maps with hydrogen plants, storage facilities, renewables, and demand centers
- **Data Visualization**: D3.js charts for supply-demand analysis, capacity planning, and cost optimization
- **Site Recommendations**: AI-powered site selection with multi-criteria optimization
- **User Authentication**: Secure signup/login with MongoDB user storage
- **Responsive Design**: Modern UI with Tailwind CSS and shadcn/ui components
- **Real-time Data**: React Query for data fetching and caching

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Maps**: Leaflet.js with React-Leaflet
- **Charts**: D3.js for data visualizations
- **State Management**: TanStack Query (React Query)
- **Authentication**: Next.js API routes, JWT tokens, bcrypt
- **Database**: MongoDB with Mongoose
- **Validation**: Zod schemas

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- MongoDB Atlas account (connection string provided)

## 🔧 Installation & Setup

1. **Clone and install dependencies**:
   ```bash
   git clone <repository-url>
   cd hydronet
   npm install --legacy-peer-deps
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your values:
   ```env
   MONGODB_URI=mongodb+srv://hydro_net_admin_shrey:Shrey4567@hydronet0.unaaszw.mongodb.net/?retryWrites=true&w=majority&appName=hydronet0
   JWT_SECRET=your_super_secret_jwt_key_at_least_32_characters_long
   NEXT_PUBLIC_API_BASE=http://localhost:3000/api/mock
   NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
   ```

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
