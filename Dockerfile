# syntax=docker/dockerfile:1
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Public URL baked into canonical links, sitemap and social cards
ARG SITE_URL=http://localhost:3457
ENV NEXT_TELEMETRY_DISABLED=1 SITE_URL=$SITE_URL
RUN npm run build

FROM node:20-alpine AS run
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
RUN addgroup -S app && adduser -S app -G app
COPY --from=build /app/public ./public
COPY --from=build --chown=app:app /app/.next/standalone ./
COPY --from=build --chown=app:app /app/.next/static ./.next/static
# Default content; overridden by the ./data volume in docker-compose
COPY --from=build --chown=app:app /app/data ./data
USER app
EXPOSE 3000
CMD ["node", "server.js"]
