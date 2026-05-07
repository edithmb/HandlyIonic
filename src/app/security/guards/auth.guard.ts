import { inject } from "@angular/core";
import { Router, CanActivateFn } from "@angular/router";


// Guard para rutas protegidas (requieren autenticación)
// Verifica si el token de autenticación está presente en localStorage
export const authGuard: CanActivateFn = () => {
    const router = inject(Router);
    const token = localStorage.getItem('token');

    if (token) {
        return true;
    } else {
        router.navigate(['/sign-in']);
        return false;
    }
};

// Guard para rutas públicas (no requieren autenticación)
// Si el token de autenticación está presente, redirige al usuario a su página de inicio correspondiente
export const publicGuard: CanActivateFn = () => {
    const router = inject(Router);
    const token = localStorage.getItem('token');

    if(token) {
        const userKeeped = localStorage.getItem('user');
        if(userKeeped) {
            const user = JSON.parse(userKeeped);
            if (user.rol_id === 1) {
                router.navigate(['/home-client']);
            } else if (user.rol_id === 2) {
                router.navigate(['/home-professional']);
            }
        }
        return false;
    }
    return true;
}