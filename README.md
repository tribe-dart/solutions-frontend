# innov8ive Solutions Frontend

Next.js frontend for the accessibility guides and updates site.

## Local development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env.local` from `.env.example`:

   ```bash
   cp .env.example .env.local
   ```

3. Run the app:

   ```bash
   npm run dev
   ```

The app runs on `http://localhost:3000`.

## Environment variables

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

- `NEXT_PUBLIC_API_URL`: backend base URL (Vercel backend URL in production)
- `NEXT_PUBLIC_SITE_URL`: canonical frontend URL used for metadata/open graph URLs

## Deploying to Vercel

Deploy the `solutions-frontend` folder as its own Vercel project.

Set these production env vars in Vercel:

```env
NEXT_PUBLIC_API_URL=https://your-backend-project.vercel.app
NEXT_PUBLIC_SITE_URL=https://your-frontend-project.vercel.app
```

After deploying, update the backend project `CORS_ORIGIN` to include the frontend URL.
