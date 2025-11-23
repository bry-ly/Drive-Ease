# Car Rental Platform

A modern, full-featured car rental platform built with Next.js, TypeScript, Prisma, and Tailwind CSS. This platform provides a complete solution for managing car rentals, bookings, users, and analytics.

## Features

### For Users
- 🔍 **Advanced Search & Filters**: Full-text search with autocomplete, price range, MPG, year, and more
- 📱 **Responsive Design**: Beautiful, mobile-first UI built with Tailwind CSS and shadcn/ui
- ⭐ **Favorites**: Save your favorite cars for quick access
- 📝 **Reviews & Ratings**: Rate and review cars you've rented
- 📅 **Booking System**: Easy booking with date selection and availability checking
- 📊 **Detailed Car Pages**: Comprehensive car details with image galleries and specifications

### For Administrators
- 🎛️ **Admin Dashboard**: Comprehensive management interface
- 🚗 **Car Management**: Full CRUD operations for car inventory
- 📋 **Booking Management**: View and manage all bookings with status updates
- 👥 **User Management**: Manage users, roles, and permissions
- 📈 **Analytics & Reports**: Revenue charts, booking trends, and export functionality
- 🔍 **Review Moderation**: Moderate user reviews and ratings

### Technical Features
- ⚡ **Next.js 15**: Latest App Router with Server Components
- 🗄️ **PostgreSQL**: Robust database with Prisma ORM
- 🔐 **Better Auth**: Secure authentication and authorization
- 📚 **Comprehensive Documentation**: Searchable docs with examples
- 🎨 **Modern UI**: Built with shadcn/ui components
- 🔍 **SEO Optimized**: Meta tags, sitemap, and structured data

## Quick Start

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd car-rental
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your configuration:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/carrental"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   NEXT_PUBLIC_BASE_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   # Run migrations
   npx prisma migrate dev
   
   # Seed the database (optional)
   npx prisma db seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
car-rental/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── dashboard/         # Admin dashboard
│   ├── docs/              # Documentation pages
│   └── ...
├── components/            # React components
│   ├── cars/             # Car-related components
│   ├── dashboard/        # Admin dashboard components
│   ├── docs/             # Documentation components
│   └── ui/               # shadcn/ui components
├── lib/                   # Utility functions and configurations
├── prisma/                # Prisma schema and migrations
├── types/                 # TypeScript type definitions
└── public/                # Static assets
```

## Architecture

### Frontend
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React hooks and URL state
- **Forms**: React Hook Form with Zod validation

### Backend
- **API**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Better Auth
- **Validation**: Zod schemas

### Database Schema
- **User**: Authentication and user management
- **Car**: Car inventory with details
- **Booking**: Rental bookings with status tracking
- **Favorite**: User favorite cars
- **Review**: Car reviews and ratings

## API Documentation

### Cars API

**GET /api/cars**
- Query parameters: `q`, `make`, `model`, `year`, `class`, `fuel_type`, `drive`, `transmission`, `min_price`, `max_price`, `min_year`, `max_year`, `min_mpg`, `max_mpg`, `available`, `sort_by`, `sort_order`, `limit`, `offset`
- Returns: List of cars with pagination

**Example:**
```bash
GET /api/cars?q=toyota&min_price=50&max_price=200&sort_by=price&sort_order=asc
```

### Bookings API

**GET /api/bookings**
- Returns: User's bookings

**POST /api/bookings**
- Body: `{ carId, startDate, endDate }`
- Creates a new booking

### Favorites API

**GET /api/favorites**
- Returns: User's favorite cars

**POST /api/favorites**
- Body: `{ carId }`
- Adds a car to favorites

**DELETE /api/favorites/[id]**
- Removes a car from favorites

### Reviews API

**GET /api/reviews?carId=[id]**
- Returns: Reviews for a specific car

**POST /api/reviews**
- Body: `{ carId, rating, comment }`
- Creates a new review

For complete API documentation, visit [/docs/api](/docs/api).

## Documentation

Comprehensive documentation is available at `/docs`:

- **[API Documentation](/docs/api)**: Complete API reference
- **[Components](/docs/components)**: React component documentation
- **[Getting Started](/docs/getting-started)**: Setup and installation guide
- **[Admin Guide](/docs/admin)**: Administrator features

Use `Cmd/Ctrl + K` to search documentation.

## Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint
- `npm run db:seed`: Seed the database

### Database Management

```bash
# Create a new migration
npx prisma migrate dev --name migration_name

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Open Prisma Studio
npx prisma studio
```

### Code Style

- Use TypeScript for all code
- Follow the existing code style
- Use functional components with hooks
- Prefer named exports
- Use descriptive variable and function names

## Admin Access

To create an admin user:

1. Sign up for a regular account
2. Update the user role in the database:
   ```sql
   UPDATE "user" SET role = 'admin' WHERE email = 'your-email@example.com';
   ```
3. Log in and access `/dashboard`

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Guidelines

- Write clear commit messages
- Add tests for new features
- Update documentation as needed
- Follow the existing code style
- Ensure all checks pass

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NEXT_PUBLIC_APP_URL` | Application URL | Yes |
| `NEXT_PUBLIC_BASE_URL` | Base URL for API calls | Yes |

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue on GitHub or refer to the [documentation](/docs).

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Better Auth](https://www.better-auth.com/)
- [Tailwind CSS](https://tailwindcss.com/)
