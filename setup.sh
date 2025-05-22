#!/bin/bash

# Colores para mensajes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🚀 Iniciando configuración del proyecto...${NC}"

# Verificar si pnpm está instalado
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm no está instalado. Por favor, instálalo primero:"
    echo "npm install -g pnpm"
    exit 1
fi

# Inicializar proyecto si no existe package.json
if [ ! -f "package.json" ]; then
    echo -e "${BLUE}📦 Inicializando proyecto Node.js...${NC}"
    pnpm init
fi

# Instalar dependencias de desarrollo
echo -e "${BLUE}📦 Instalando dependencias de desarrollo...${NC}"
pnpm add -D typescript @types/node
pnpm add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
pnpm add -D prettier eslint-config-prettier eslint-plugin-prettier
pnpm add -D husky lint-staged
pnpm add -D jest @types/jest ts-jest

# Configurar Husky
echo -e "${BLUE}🔧 Configurando Husky...${NC}"
pnpm dlx husky-init
pnpm install

# Crear archivo de configuración de ESLint
echo -e "${BLUE}📝 Creando configuración de ESLint...${NC}"
cat > .eslintrc.json << EOL
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint"],
  "rules": {
    "prettier/prettier": "error"
  }
}
EOL

# Crear archivo de configuración de Prettier
echo -e "${BLUE}📝 Creando configuración de Prettier...${NC}"
cat > .prettierrc << EOL
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
EOL

# Actualizar package.json con scripts
echo -e "${BLUE}📝 Actualizando scripts en package.json...${NC}"
node -e '
const fs = require("fs");
const package = JSON.parse(fs.readFileSync("package.json", "utf8"));
package.scripts = {
  ...package.scripts,
  "dev": "ts-node src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js",
  "lint": "eslint . --ext .ts",
  "lint:fix": "eslint . --ext .ts --fix",
  "format": "prettier --write \"src/**/*.ts\"",
  "test": "jest",
  "prepare": "husky install"
};
fs.writeFileSync("package.json", JSON.stringify(package, null, 2));
'

# Crear estructura básica de directorios
echo -e "${BLUE}📁 Creando estructura de directorios...${NC}"
mkdir -p src

# Crear archivo tsconfig.json
echo -e "${BLUE}📝 Creando configuración de TypeScript...${NC}"
cat > tsconfig.json << EOL
{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "lib": ["es2020"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
EOL

# Crear archivo index.ts básico
echo -e "${BLUE}📝 Creando archivo index.ts básico...${NC}"
cat > src/index.ts << EOL
console.log('🚀 Proyecto Node.js configurado correctamente!');
EOL

echo -e "${GREEN}✅ ¡Configuración completada!${NC}"
echo -e "${BLUE}📝 Próximos pasos:${NC}"
echo "1. Ejecuta 'pnpm install' para instalar todas las dependencias"
echo "2. Ejecuta 'pnpm dev' para iniciar el servidor de desarrollo"
echo "3. Ejecuta 'pnpm build' para compilar el proyecto"
echo "4. Ejecuta 'pnpm test' para correr las pruebas"
