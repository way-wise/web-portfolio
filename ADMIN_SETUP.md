# Admin Dashboard Setup Guide

## Overview
This portfolio website now includes a dynamic admin dashboard that allows you to manage portfolio items through a MongoDB database.

## Features
- **CRUD Operations**: Create, Read, Update, and Delete portfolio items
- **Simple Authentication**: Username/password login system
- **Real-time Updates**: Changes reflect immediately on the main portfolio page
- **Image Management**: Upload and manage project images
- **Category Management**: Organize projects by categories

## Quick Setup

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Start the Development Server
```bash
pnpm dev
```

### 3. Seed the Database
1. Navigate to `http://localhost:3000/admin`
2. Click the "Seed Database" button
3. This will:
   - Create an admin user (username: `admin`, password: `admin123`)
   - Import all existing portfolio data from the static file
   - Set up the MongoDB collections

### 4. Login to Admin Dashboard
- Username: `admin`
- Password: `admin123`

## Admin Dashboard Features

### Portfolio Management
- **View All Items**: See all portfolio items in a grid layout
- **Add New Item**: Create new portfolio projects with full details
- **Edit Items**: Modify existing portfolio items
- **Delete Items**: Remove portfolio items (with confirmation)

### Form Fields
- **Title**: Project name
- **Description**: Short project description
- **Category**: Project category (e.g., wordpress, shopify, mobile)
- **Highlight Keyword**: Key feature or technology
- **Image Path**: Path to project image (e.g., `/web/project-image.jpg`)
- **Technologies**: Comma-separated list of technologies used
- **Demo URL**: Link to live demo
- **GitHub URL**: Link to source code
- **Completion Date**: When the project was completed
- **Long Description**: Detailed project description
- **Features**: Comma-separated list of project features
- **Process**: Development process or methodology

## Database Schema

### Portfolio Items
```typescript
{
  id: string;           // Unique identifier
  title: string;        // Project title
  description: string;  // Short description
  category: string;     // Project category
  highlightKeyword?: string;
  image: string;        // Image path
  technologies: string[]; // Array of technologies
  demoUrl?: string;     // Demo link
  githubUrl?: string;   // GitHub link
  completionDate?: string;
  longDescription?: string;
  features?: string[];  // Array of features
  process?: string;     // Development process
}
```

### Admin Users
```typescript
{
  username: string;     // Login username
  password: string;     // Hashed password
}
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login

### Portfolio Management
- `GET /api/portfolio` - Get all portfolio items
- `POST /api/portfolio` - Create new portfolio item
- `GET /api/portfolio/[id]` - Get specific portfolio item
- `PUT /api/portfolio/[id]` - Update portfolio item
- `DELETE /api/portfolio/[id]` - Delete portfolio item

### Database Setup
- `POST /api/seed` - Seed database with initial data

## Security Notes
- The admin dashboard uses simple localStorage-based authentication
- For production use, consider implementing proper session management
- Admin credentials are stored in MongoDB with bcrypt hashing
- The system includes fallback to static data if the API is unavailable

## File Structure
```
app/
├── admin/
│   └── page.tsx              # Admin dashboard
├── api/
│   ├── auth/
│   │   └── login/
│   │       └── route.ts      # Login API
│   │   ├── portfolio/
│   │   │   ├── route.ts          # Portfolio CRUD
│   │   │   └── [id]/
│   │   │   └── route.ts      # Individual item operations
│   │   └── seed/
│   │       └── route.ts          # Database seeding
│   └── seed/
│       └── route.ts          # Database seeding
lib/
├── mongodb.ts                # Database connection
├── models/
│   ├── Admin.ts              # Admin user model
│   └── Portfolio.ts          # Portfolio item model
└── portfolio-data.ts         # Static data + API functions
```

## Troubleshooting

### Database Connection Issues
- Ensure MongoDB Atlas connection string is correct
- Check network connectivity
- Verify database permissions

### Admin Login Issues
- Use the "Seed Database" button to create admin credentials
- Default credentials: admin/admin123
- Check browser console for error messages

### Portfolio Not Loading
- The system falls back to static data if API fails
- Check API endpoints are working
- Verify MongoDB connection

## Production Deployment
1. Set up environment variables for MongoDB connection
2. Implement proper authentication (NextAuth.js recommended)
3. Add rate limiting to API endpoints
4. Set up proper error logging
5. Configure CORS if needed
6. Use environment variables for sensitive data

## Customization
- Modify the admin dashboard UI in `app/admin/page.tsx`
- Update portfolio item schema in `lib/models/Portfolio.ts`
- Customize API responses in the route handlers
- Add new categories or fields as needed 