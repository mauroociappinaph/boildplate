# Requisitos Previos

## Requisitos del Sistema

### Sistema Operativo

- macOS 10.15 o superior
- Linux (Ubuntu 20.04 o superior)
- Windows 10/11 con WSL2

### Hardware Recomendado

- CPU: 2+ núcleos
- RAM: 8GB mínimo (16GB recomendado)
- Espacio en disco: 10GB libre

## Herramientas Necesarias

### Node.js y pnpm

```bash
# Instalar Node.js (v18 o superior)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18

# Instalar pnpm
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

### Docker y Docker Compose

```bash
# macOS (usando Homebrew)
brew install docker docker-compose

# Linux
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

### Git

```bash
# macOS
brew install git

# Linux
sudo apt-get update
sudo apt-get install git
```

## Configuración del Entorno

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Base de datos
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

# API
API_URL="http://localhost:3000/api"
API_KEY="tu-api-key"

# Autenticación
JWT_SECRET="tu-jwt-secret"
```

### Configuración de Git

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

## Verificación de la Instalación

Ejecuta los siguientes comandos para verificar que todo está instalado correctamente:

```bash
# Verificar Node.js
node --version  # Debe ser v18 o superior

# Verificar pnpm
pnpm --version  # Debe ser v8 o superior

# Verificar Docker
docker --version
docker-compose --version

# Verificar Git
git --version
```

## Solución de Problemas

### Problemas con Node.js

Si tienes problemas con Node.js:

1. Asegúrate de tener nvm instalado correctamente
2. Ejecuta `nvm use 18` para usar la versión correcta
3. Verifica la variable PATH en tu shell

### Problemas con Docker

Si Docker no inicia:

1. Verifica que el servicio de Docker esté corriendo
2. En macOS, abre Docker Desktop
3. En Linux, ejecuta `sudo systemctl start docker`

### Problemas con pnpm

Si pnpm no funciona:

1. Verifica que Node.js esté instalado correctamente
2. Reinstala pnpm: `npm install -g pnpm`
3. Limpia la caché: `pnpm store prune`
