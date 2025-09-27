# Karni Interiors

A modern interior design portfolio website built with Next.js, featuring an admin panel for content management.

## Features

- **Portfolio Showcase**: Display interior design projects with image galleries
- **Client Reviews**: Testimonials and ratings from satisfied clients
- **Contact System**: Contact form with email notifications
- **Admin Panel**: Complete CMS for managing projects, reviews, and contacts
- **Responsive Design**: Mobile-first approach with modern UI
- **SEO Optimized**: Built-in SEO features and meta tags

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS + shadcn/ui components
- **Email**: Resend for transactional emails
- **File Upload**: Cloudinary for image management
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Cloudinary account (for image uploads)
- Resend account (for emails)

### Installation

1. Clone the repository:
git clone <your-repo-url>
cd karni-interiors

text

2. Install dependencies:
npm install

text

3. Set up environment variables:
cp .env.example .env.local

text

4. Update `.env.local` with your credentials:
- Database connection string
- NextAuth secret
- Cloudinary credentials  
- Resend API key

5. Set up the database:
npx prisma migrate dev

text

6. Seed the database (optional):
npm run db:seed

text

7. Start the development server:
npm run dev

text

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## Admin Panel

Access the admin panel at `/admin` with these default credentials:
- **Email**: admin@Mkraftinteriors.com
- **Password**: admin123

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio

## Project Structure

Mkraft-interiors/
├── app/ # Next.js 14 app directory
├── components/ # React components
├── lib/ # Utilities and configurations
├── prisma/ # Database schema and migrations
├── public/ # Static assets
├── styles/ # CSS files
├── types/ # TypeScript type definitions
└── emails/ # Email templates

text

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Manual Deployment

1. Build the application:
npm run build

text

2. Start the production server:
npm start

text

## Environment Variables

See `.env.example` for required environment variables.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
