# Kargee - Premium Ethnic Fashion eCommerce

A fully responsive, modern eCommerce website frontend for ethnic and festive fashion, built with React, React Router, and Tailwind CSS.

## 🎨 Design Features

- **Premium aesthetic** with elegant Playfair Display headings and clean Inter body text
- **Brand colors**: Deep brown (#5E2A14) with soft beige backgrounds
- **Fully responsive** design optimized for mobile, tablet, and desktop
- **Modern UI** with smooth animations, hover effects, and transitions
- **Modular components** for easy scalability and maintenance

## 🏗️ Tech Stack

- **React 18** - UI library
- **React Router 7** - Client-side routing
- **Tailwind CSS v4** - Utility-first styling
- **Lucide React** - Beautiful icons
- **TypeScript** - Type safety
- **Vite** - Fast build tool

## 📦 Project Structure

```
src/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.tsx       # Sticky navigation with mobile menu
│   │   ├── Hero.tsx         # Hero section with CTA
│   │   ├── Features.tsx     # Feature icons grid
│   │   ├── BannerSection.tsx
│   │   ├── CollectionGrid.tsx
│   │   ├── CategoryCards.tsx
│   │   ├── PromoBanner.tsx
│   │   ├── ProductShowcase.tsx
│   │   ├── Reviews.tsx      # Customer reviews
│   │   ├── InstagramSection.tsx
│   │   ├── SupportSection.tsx
│   │   ├── Footer.tsx       # Footer with links
│   │   ├── OTPLogin.tsx     # OTP authentication modal
│   │   ├── ProductCard.tsx  # Product display card
│   │   └── ProductsGrid.tsx # Products grid layout
│   ├── data/
│   │   └── products.ts      # Mock product data
│   ├── pages/
│   │   └── Home.tsx         # Main home page
│   ├── api/
│   │   └── README.md        # Backend API documentation
│   ├── routes.ts            # Route configuration
│   └── App.tsx              # Root component
├── styles/
│   ├── fonts.css            # Google Fonts imports
│   └── theme.css            # Custom CSS variables
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

This project is ready to run in the Figma Make environment. All dependencies are already installed.

### Local Development

If running locally:

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎯 Features Implemented

### ✅ Home Page Sections

1. **Sticky Navbar** - Logo, navigation links, search, cart, user account, mobile menu
2. **Hero Section** - Large heading, product description, CTA, fashion model image
3. **Features** - 4 circular icon cards (Premium Quality, Secure Payment, Fast Delivery, Easy Returns)
4. **Banner Section** - Image + content split with "Explore More" CTA
5. **Collection Grid** - Mixed layout with large vertical and stacked images
6. **Category Cards** - Two horizontal cards with overlay text and CTAs
7. **Promotional Banner** - Full-width festive collection banner with 20% off
8. **Product Showcase** - Large model image with detail close-ups grid
9. **Reviews Section** - Customer testimonials with ratings
10. **Instagram Section** - Social media promotion
11. **Support Section** - Contact support and WhatsApp buttons
12. **Footer** - Multi-column layout with company info, links, and social icons

### ✅ Components Created

- `Navbar` - Responsive navigation with mobile menu
- `Hero` - Eye-catching hero section
- `Features` - Icon-based feature highlights
- `ProductCard` - Reusable product display card
- `ProductsGrid` - Grid layout for product listings
- `OTPLogin` - Phone-based OTP authentication modal
- `Reviews` - Star ratings and customer feedback
- `Footer` - Comprehensive footer

### ✅ OTP Authentication

- Frontend flow implemented with phone input and 6-digit OTP verification
- Mock authentication ready to connect to backend
- Complete backend documentation provided in `/src/app/api/README.md`

## 📱 Responsive Design

The website is fully responsive with breakpoints:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

All sections adapt gracefully:
- Grid layouts stack on mobile
- Navigation collapses to hamburger menu
- Images resize appropriately
- Typography scales for readability

## 🎨 Design System

### Colors
- Primary: `#5E2A14` (Deep Brown)
- Background: `#FAF8F5` (Light Beige)
- Background Alt: `#F5F1ED` (Beige)

### Typography
- Headings: Playfair Display (serif, elegant)
- Body: Inter (sans-serif, modern)

### Spacing
- Base unit: 8px
- Consistent padding and margins throughout

## 🛍️ Product Data

Sample products are defined in `/src/app/data/products.ts`:

```typescript
{
  id: string;
  name: string;
  category: string;
  price: number;
  discountPrice: number;
  fabric: string;
  sizes: string[];
  colors: string[];
  image: string;
  isFeatured: boolean;
  isNewArrival: boolean;
}
```

## 🔐 Backend Integration

### OTP Authentication API

Complete backend implementation guide is available in `/src/app/api/README.md`.

**Endpoints needed:**
- `POST /api/auth/send-otp` - Send OTP to phone
- `POST /api/auth/verify-otp` - Verify OTP and return JWT token

**Features:**
- 6-digit OTP generation
- 5-minute expiry
- Rate limiting (3 attempts max)
- JWT token authentication
- Secure phone validation

### Database Schema

Tables required:
- `otps` - Store OTP records with expiry
- `users` - User account information

See `/src/app/api/README.md` for complete SQL schemas.

## 🎁 Dummy Data

The project includes:
- 6 sample products with real Unsplash images
- 5 customer reviews with ratings
- Complete mock data for all sections

## 🔧 Customization

### Adding New Products

Edit `/src/app/data/products.ts`:

```typescript
export const products: Product[] = [
  {
    id: "P007",
    name: "Your Product Name",
    category: "Category",
    price: 2999,
    discountPrice: 2399,
    // ... other fields
  }
];
```

### Changing Brand Colors

Edit `/src/styles/theme.css`:

```css
:root {
  --brand-brown: #5E2A14;    /* Your primary color */
  --brand-beige: #F5F1ED;    /* Your background color */
}
```

### Adding New Pages

1. Create component in `/src/app/pages/`
2. Add route in `/src/app/routes.ts`
3. Link from navigation in `Navbar.tsx`

## 📸 Images

All images are sourced from Unsplash via the Unsplash API for high-quality, royalty-free fashion photography.

## 🚢 Deployment

The application is production-ready and can be deployed to:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Any static hosting service

Build command: `npm run build`
Output directory: `dist/`

## 🔒 Security Notes

- OTP system includes rate limiting
- JWT tokens for authentication
- Input validation on all forms
- HTTPS required for production
- Environment variables for sensitive data

## 📄 License

This project is created for demonstration purposes.

## 🤝 Contributing

This is a frontend template ready for:
- Backend API integration
- Payment gateway integration (Razorpay, Stripe)
- Inventory management system
- Order tracking features
- User profile management

## 📞 Support

For backend implementation or customization:
- Review `/src/app/api/README.md` for API specs
- All components are modular and well-documented
- TypeScript interfaces ensure type safety

---

Built with ❤️ using React, Tailwind CSS, and modern web technologies.
# Kargee
