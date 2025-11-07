# React Native Developer Portfolio

One-page portfolio built with React + Vite to showcase React Native case studies, skills, and experience. The layout is optimized for mobile-first product teams evaluating engineering partners and can be deployed to Vercel in minutes.

## Scripts

- `npm run dev` – start Vite locally
- `npm run build` – create a production build in `dist`
- `npm run preview` – preview the production build
- `npm run lint` – run ESLint

## Customizing the Copy

All portfolio copy lives in `src/App.tsx` inside the `profile`, `skills`, `projects`, `experience`, and `toolbelt` objects. Update the placeholder résumé URL, GitHub, LinkedIn, and project links with your details.

## Deploying to Vercel

1. Push this project to a GitHub repository.
2. In the [Vercel dashboard](https://vercel.com/new), select **Add New… → Project** and import the repo.
3. Accept the defaults:
   - Framework preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Ensure **Install Command** is `npm install --ignore-scripts` if your environment requires skipping postinstall hooks. Otherwise, `npm install` is fine.
5. Click **Deploy**. Vercel will build and publish your production URL automatically.

## Local Development Notes

If you encounter `patch-package: command not found` during `npm install`, rerun the install with `npm install --ignore-scripts`. This project does not rely on any postinstall scripts.
