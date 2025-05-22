import '@testing-library/jest-dom'

// Mock de fetch global
global.fetch = jest.fn()

// Limpiar todos los mocks después de cada prueba
afterEach(() => {
  jest.clearAllMocks()
})

// Configuración de variables de entorno para pruebas
process.env.NEXT_PUBLIC_API_URL = 'http://localhost:3000/api'

// Extender el tipo global de Jest
interface CustomGlobal extends Global {
  fetch: jest.Mock
}

declare const global: CustomGlobal
