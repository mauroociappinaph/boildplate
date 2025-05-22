# Guía de Instalación

## Requisitos Previos

- Node.js (v18 o superior)
- pnpm (v8 o superior)
- Docker y Docker Compose
- Git

## Pasos de Instalación

1. **Clonar el Repositorio**

   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd [NOMBRE_DEL_PROYECTO]
   ```

2. **Instalar Dependencias**

   ```bash
   pnpm install
   ```

3. **Configurar Variables de Entorno**

   ```bash
   cp .env.example .env
   # Editar .env con tus configuraciones
   ```

4. **Iniciar Base de Datos**

   ```bash
   docker-compose up -d
   ```

5. **Ejecutar Migraciones**

   ```bash
   pnpm prisma migrate dev
   ```

6. **Iniciar el Proyecto**
   ```bash
   pnpm dev
   ```

## Verificación de la Instalación

Para verificar que todo está funcionando correctamente:

1. Abre http://localhost:3000 en tu navegador
2. Deberías ver la página principal de la aplicación
3. Verifica los logs en la consola para asegurarte de que no hay errores

## Solución de Problemas Comunes

### Error: Puerto en Uso

Si el puerto 3000 está en uso, puedes cambiarlo en el archivo `.env`:

```
PORT=3001
```

### Error: Dependencias

Si hay problemas con las dependencias:

```bash
rm -rf node_modules
pnpm install
```

### Error: Docker

Si Docker no inicia correctamente:

```bash
docker-compose down
docker-compose up -d
```
