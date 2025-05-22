# Etapa de construcción
FROM node:18-alpine AS builder

WORKDIR /app

# Instalar pnpm
RUN npm install -g pnpm

# Copiar archivos de configuración
COPY package.json pnpm-lock.yaml ./
COPY turbo.json ./
COPY apps/api/package.json ./apps/api/
COPY packages/utils/package.json ./packages/utils/
COPY packages/types/package.json ./packages/types/
COPY config/tsconfig.api.json ./config/

# Instalar dependencias
RUN pnpm install

# Copiar el código fuente
COPY . .

# Construir la aplicación
RUN pnpm build --filter=api...

# Etapa de producción
FROM node:18-alpine AS runner

WORKDIR /app

# Instalar pnpm
RUN npm install -g pnpm

# Copiar archivos necesarios
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/package.json ./apps/api/
COPY --from=builder /app/node_modules ./node_modules

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=4000

# Exponer puerto
EXPOSE 4000

# Comando para iniciar la aplicación
CMD ["node", "apps/api/dist/index.js"]
