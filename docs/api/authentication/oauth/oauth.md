# Autenticación OAuth 2.0

## ¿Qué es OAuth 2.0?

OAuth 2.0 es un protocolo de autorización que permite a las aplicaciones obtener acceso limitado a cuentas de usuario en servicios HTTP.

## Flujos de Autorización

### 1. Authorization Code Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Cliente   │     │    Usuario  │     │  Servidor   │
└──────┬──────┘     └──────┬──────┘     └──────┬──────┘
       │                   │                   │
       │ 1. Auth Request   │                   │
       │──────────────────>│                   │
       │                   │                   │
       │ 2. Login          │                   │
       │<─────────────────>│                   │
       │                   │                   │
       │ 3. Auth Code      │                   │
       │<──────────────────────────────────────│
       │                   │                   │
       │ 4. Access Token   │                   │
       │──────────────────────────────────────>│
       │                   │                   │
       │ 5. Token Response │                   │
       │<──────────────────────────────────────│
```

### 2. Implicit Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Cliente   │     │    Usuario  │     │  Servidor   │
└──────┬──────┘     └──────┬──────┘     └──────┬──────┘
       │                   │                   │
       │ 1. Auth Request   │                   │
       │──────────────────>│                   │
       │                   │                   │
       │ 2. Login          │                   │
       │<─────────────────>│                   │
       │                   │                   │
       │ 3. Access Token   │                   │
       │<──────────────────────────────────────│
```

## Implementación

### Configuración del Cliente

```typescript
const oauthConfig = {
  clientId: process.env.OAUTH_CLIENT_ID,
  clientSecret: process.env.OAUTH_CLIENT_SECRET,
  redirectUri: 'https://tuapp.com/auth/callback',
  authorizationUrl: 'https://oauth.proveedor.com/authorize',
  tokenUrl: 'https://oauth.proveedor.com/token',
  scope: 'read write',
};
```

### Endpoint de Autorización

```typescript
app.get('/auth/oauth', (req, res) => {
  const authUrl = `${oauthConfig.authorizationUrl}?
    client_id=${oauthConfig.clientId}&
    redirect_uri=${oauthConfig.redirectUri}&
    response_type=code&
    scope=${oauthConfig.scope}`;

  res.redirect(authUrl);
});
```

### Callback Handler

```typescript
app.get('/auth/callback', async (req, res) => {
  const { code } = req.query;

  try {
    const tokenResponse = await axios.post(oauthConfig.tokenUrl, {
      client_id: oauthConfig.clientId,
      client_secret: oauthConfig.clientSecret,
      code,
      redirect_uri: oauthConfig.redirectUri,
      grant_type: 'authorization_code',
    });

    // Guardar tokens y redirigir
    res.redirect('/dashboard');
  } catch (error) {
    res.status(400).json({ error: 'Error en la autenticación' });
  }
});
```

## Proveedores Soportados

### Google OAuth

```typescript
const googleConfig = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: 'https://tuapp.com/auth/google/callback',
  scope: 'email profile',
};
```

### GitHub OAuth

```typescript
const githubConfig = {
  clientId: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  redirectUri: 'https://tuapp.com/auth/github/callback',
  scope: 'user:email',
};
```

## Manejo de Tokens

### Almacenamiento

```typescript
interface OAuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
  tokenType: string;
}

const storeTokens = async (userId: string, tokens: OAuthTokens) => {
  await User.updateOne(
    { _id: userId },
    {
      $set: {
        oauthTokens: tokens,
        tokenUpdatedAt: new Date(),
      },
    }
  );
};
```

### Refresh de Tokens

```typescript
const refreshAccessToken = async (refreshToken: string) => {
  try {
    const response = await axios.post(oauthConfig.tokenUrl, {
      client_id: oauthConfig.clientId,
      client_secret: oauthConfig.clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    });

    return response.data;
  } catch (error) {
    throw new Error('Error al refrescar el token');
  }
};
```

## Seguridad

1. **Validación de Estado**

   ```typescript
   const generateState = () => {
     return crypto.randomBytes(16).toString('hex');
   };

   const validateState = (state: string, storedState: string) => {
     return state === storedState;
   };
   ```

2. **PKCE (Proof Key for Code Exchange)**

   ```typescript
   const generateCodeVerifier = () => {
     return crypto
       .randomBytes(32)
       .toString('base64')
       .replace(/\+/g, '-')
       .replace(/\//g, '_')
       .replace(/=/g, '');
   };

   const generateCodeChallenge = async (verifier: string) => {
     const hash = crypto
       .createHash('sha256')
       .update(verifier)
       .digest('base64')
       .replace(/\+/g, '-')
       .replace(/\//g, '_')
       .replace(/=/g, '');
     return hash;
   };
   ```

## Ejemplos de Uso

### Iniciar Flujo OAuth

```bash
curl -X GET "https://api.tudominio.com/v1/auth/oauth?provider=google"
```

### Callback OAuth

```bash
curl -X GET "https://api.tudominio.com/v1/auth/callback?code=AUTHORIZATION_CODE"
```

### Refresh Token

```bash
curl -X POST "https://api.tudominio.com/v1/auth/refresh" \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "REFRESH_TOKEN"
  }'
```
