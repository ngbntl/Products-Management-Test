# Product Management

A React-based web application for product management, built with TypeScript, React, and TailwindCSS.

## Features

- **Product Management**: Create, view, edit products with name, price, and image
- **Responsive Design**: Optimized for desktop and mobile devices
- **Modern UI**: Sleek interface built with shadcn/ui components
- **Authentication**: User authentication system with secure token handling

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Routing**: React Router v7
- **State Management**: Zustand + React Query
- **UI Components**: Customized shadcn/ui components
- **Styling**: TailwindCSS + CSS animations
- **API Integration**: Axios for REST API requests
- **Internationalization**: i18next for multi-language support
- **Form Validation**: Zod + React Hook Form
- **Notifications**: Sonner for toast notifications
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v16.x or later)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd test
```

2. Install dependencies

```bash
npm install
# or
yarn
```

3. Set up environment variables

```bash
cp .env.example .env
```

Edit the `.env` file and set your API URL:

```
VITE_API_URL=your_api_url_here
```

4. Start the development server

```bash
npm run dev
# or
yarn dev
```

The application will be available at http://localhost:5173

## Project Structure

```
├── public/                # Static assets
│   └── app/
│       ├── fonts/         # Font files
│       └── images/        # Images
├── src/
│   ├── assets/            # Source assets
│   ├── components/        # Reusable components
│   │   ├── layout/        # Layout components
│   │   ├── products/      # Product-specific components
│   │   └── ui/            # UI components (shadcn)
│   ├── hooks/             # Custom hooks
│   ├── lib/               # Utility libraries
│   ├── locales/           # Internationalization files
│   ├── pages/             # Page components
│   ├── services/          # API services
│   │   └── api/           # API clients
│   ├── store/             # State management
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
├── index.html             # HTML entry point
└── vite.config.ts         # Vite configuration
```

## Development

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production version
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the production build locally

## Deployment

This project is configured for deployment on Vercel:

1. Build the application

```bash
npm run build
```

2. Deploy to Vercel

```bash
vercel --prod
```

## License

This project is licensed under the MIT License.

## Contributors

- Nguyen Gia Bao

---
