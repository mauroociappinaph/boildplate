# Etapa de construcción
FROM node:18-alpine AS builder

WORKDIR /app

# Instalar pnpm
RUN npm install -g pnpm

# Copiar archivos de configuración
COPY package.json pnpm-lock.yaml ./
COPY turbo.json ./
COPY apps/web/package.json ./apps/web/
COPY packages/ui/package.json ./packages/ui/
COPY packages/utils/package.json ./packages/utils/
COPY packages/types/package.json ./packages/types/

# Instalar dependencias
RUN pnpm install

# Copiar el código fuente
COPY . .

# Construir la aplicación
RUN pnpm build --filter=web...

# Etapa de producción
FROM node:18-alpine AS runner

WORKDIR /app

# Instalar pnpm
RUN npm install -g pnpm

# Copiar archivos necesarios
COPY --from=builder /app/apps/web/next.config.js ./
COPY --from=builder /app/apps/web/public ./public
COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=3000

# Exponer puerto
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "apps/web/server.js"]
