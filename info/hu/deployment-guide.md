# Deployment Guide

Ez a dokumentum részletesen leírja a Heroui Sidebar Clone rendszer telepítési és deployment folyamatát különböző környezetekre.

## Tartalomjegyzék

1. [Előfeltételek](#előfeltételek)
2. [Fejlesztői Környezet](#fejlesztői-környezet)
3. [Staging Környezet](#staging-környezet)
4. [Production Környezet](#production-környezet)
5. [Vercel Deployment](#vercel-deployment)
6. [Docker Deployment](#docker-deployment)
7. [CI/CD Pipeline](#cicd-pipeline)
8. [Környezeti Változók](#környezeti-változók)
9. [Adatbázis Migráció](#adatbázis-migráció)
10. [Hibaelhárítás](#hibaelhárítás)

## Előfeltételek

A rendszer telepítéséhez és deploymentjéhez a következő előfeltételekre van szükség:

- Node.js 18.x vagy újabb
- npm 9.x vagy újabb
- Git
- Supabase fiók
- (Opcionális) Docker és Docker Compose
- (Opcionális) Vercel fiók

## Fejlesztői Környezet

### Telepítés

1. Klónozza a repository-t:
   \`\`\`bash
   git clone https://github.com/Winmix713/v0-heroui-sidebar-clone-fl.git
   cd v0-heroui-sidebar-clone-fl
   \`\`\`

2. Függőségek telepítése:
   \`\`\`bash
   npm install
   \`\`\`

3. Környezeti változók beállítása:
   Hozzon létre egy `.env.local` fájlt a projekt gyökérkönyvtárában a következő tartalommal:
   \`\`\`
   NEXT_PUBLIC_SUPABASE_URL=az_ön_supabase_url-je
   NEXT_PUBLIC_SUPABASE_ANON_KEY=az_ön_supabase_anon_key-je
   SUPABASE_SERVICE_ROLE_KEY=az_ön_supabase_service_role_key-je
   \`\`\`

4. Fejlesztői szerver indítása:
   \`\`\`bash
   npm run dev
   \`\`\`

5. Böngészőben megnyitás:
   Nyissa meg a `http://localhost:3000` címet a böngészőben.

### Fejlesztési Tippek

- Használja a `npm run lint` parancsot a kód ellenőrzéséhez
- Használja a `npm run build` parancsot a produkciós build teszteléséhez
- A `.env.local` fájlt ne commitolja a verziókezelő rendszerbe

## Staging Környezet

A staging környezet a production környezet előtti tesztelésre szolgál.

### Telepítés

1. Klónozza a repository-t a staging szerverre:
   \`\`\`bash
   git clone https://github.com/Winmix713/v0-heroui-sidebar-clone-fl.git
   cd v0-heroui-sidebar-clone-fl
   \`\`\`

2. Függőségek telepítése:
   \`\`\`bash
   npm install --production
   \`\`\`

3. Környezeti változók beállítása:
   Hozzon létre egy `.env.production` fájlt a következő tartalommal:
   \`\`\`
   NEXT_PUBLIC_SUPABASE_URL=az_ön_staging_supabase_url-je
   NEXT_PUBLIC_SUPABASE_ANON_KEY=az_ön_staging_supabase_anon_key-je
   SUPABASE_SERVICE_ROLE_KEY=az_ön_staging_supabase_service_role_key-je
   NODE_ENV=production
   \`\`\`

4. Build készítése:
   \`\`\`bash
   npm run build
   \`\`\`

5. Szerver indítása:
   \`\`\`bash
   npm start
   \`\`\`

## Production Környezet

### Telepítés

1. Klónozza a repository-t a production szerverre:
   \`\`\`bash
   git clone https://github.com/Winmix713/v0-heroui-sidebar-clone-fl.git
   cd v0-heroui-sidebar-clone-fl
   \`\`\`

2. Függőségek telepítése:
   \`\`\`bash
   npm install --production
   \`\`\`

3. Környezeti változók beállítása:
   Hozzon létre egy `.env.production` fájlt a következő tartalommal:
   \`\`\`
   NEXT_PUBLIC_SUPABASE_URL=az_ön_production_supabase_url-je
   NEXT_PUBLIC_SUPABASE_ANON_KEY=az_ön_production_supabase_anon_key-je
   SUPABASE_SERVICE_ROLE_KEY=az_ön_production_supabase_service_role_key-je
   NODE_ENV=production
   \`\`\`

4. Build készítése:
   \`\`\`bash
   npm run build
   \`\`\`

5. Szerver indítása:
   \`\`\`bash
   npm start
   \`\`\`

### PM2 Használata

A production környezetben javasolt a PM2 használata a Node.js alkalmazás futtatásához:

1. PM2 telepítése:
   \`\`\`bash
   npm install -g pm2
   \`\`\`

2. Alkalmazás indítása PM2-vel:
   \`\`\`bash
   pm2 start npm --name "heroui-sidebar" -- start
   \`\`\`

3. Automatikus újraindítás beállítása:
   \`\`\`bash
   pm2 startup
   pm2 save
   \`\`\`

## Vercel Deployment

A Vercel platformon való telepítés a legegyszerűbb módja a rendszer deploymentjének.

### Telepítés Lépései

1. Hozzon létre egy fiókot a [Vercel](https://vercel.com) oldalon
2. Kapcsolja össze a GitHub fiókját a Vercel fiókjával
3. Importálja a GitHub repository-t
4. Konfigurálja a környezeti változókat a Vercel felületén:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
5. Kattintson a "Deploy" gombra

### Automatikus Deployment

A Vercel automatikusan deployolja az alkalmazást, amikor változtatásokat push-ol a fő ágra (main/master). A következő beállításokat javasoljuk:

- **Production Branch**: main
- **Preview Branches**: Enabled (minden pull request automatikus preview deployment-et kap)
- **Environment Variables**: Különböző környezeti változók beállítása a production és preview környezetekhez

## Docker Deployment

A Docker használata lehetővé teszi a rendszer konténerizált telepítését.

### Dockerfile

Hozzon létre egy `Dockerfile` fájlt a projekt gyökérkönyvtárában:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]