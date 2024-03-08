// app/api/auth/[auth0]/route.js
import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

export const GET = handleAuth({
    login: handleLogin({
        authorizationParams: {
            audience: 'http://localhost:3001/',
            scope: 'openid profile email read-system',
        },
        returnTo: '/extoai'

    })
});