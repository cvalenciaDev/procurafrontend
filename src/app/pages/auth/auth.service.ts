// src/app/pages/auth/auth.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { Router } from '@angular/router'; // Importa Router para redireccionar

@Injectable({
  providedIn: 'root'
})
class AuthService {
  // BehaviorSubject para mantener el estado de autenticación.
  // Emitirá el valor actual a nuevos suscriptores y a los existentes cuando cambie.
  // Se inicializa leyendo de localStorage para persistir el estado al recargar la página.
  private _isLoggedIn = new BehaviorSubject<boolean>(this.checkLoginStatus());

  // Observable público para que otros componentes puedan suscribirse y reaccionar a los cambios.
  // Usamos asObservable() para evitar que componentes externos modifiquen el BehaviorSubject directamente.
  isLoggedIn: Observable<boolean> = this._isLoggedIn.asObservable();

  constructor(private router: Router) { } // Inyecta Router

  // Verifica el estado de login en el localStorage al iniciar el servicio.
  private checkLoginStatus(): boolean {
    // Por defecto, asumimos que no está logueado si no hay nada en localStorage.
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  /**
   * Simula el inicio de sesión del usuario.
   * En una aplicación real, esto implicaría enviar credenciales a una API de backend.
   * @param username El nombre de usuario a simular.
   * @param password La contraseña a simular.
   * @returns Un Observable que emite `true` en un inicio de sesión simulado exitoso, `false` si falla.
   */
  login(username: string, password: string): Observable<boolean> {
    // --- LÓGICA DE SIMULACIÓN: Reemplaza esto con una llamada a tu API real. ---
    // Para la simulación, consideramos éxito si las credenciales son 'test@example.com' y 'password123'.
    if (username === 'test@example.com' && password === 'password123') {
        return of(true).pipe(
            delay(1000), // Simula un retraso de red de 1 segundo
            tap(() => {
                this._isLoggedIn.next(true); // Actualiza el estado a logeado
                localStorage.setItem('isLoggedIn', 'true'); // Persiste el estado en localStorage
                console.log('Inicio de sesión simulado exitoso para:', username);
                this.router.navigate(['/']); // Navega a la página de inicio/dashboard
            })
        );
    } else {
        console.warn('Inicio de sesión simulado fallido: Credenciales inválidas.');
        return of(false).pipe(
            delay(500), // Simula un retraso más corto para intentos fallidos
            tap(() => {
                this._isLoggedIn.next(false); // Asegura que el estado sea no logeado
                localStorage.removeItem('isLoggedIn');
            })
        );
    }
    // --- FIN LÓGICA DE SIMULACIÓN ---
  }

  /**
   * Simula el cierre de sesión del usuario.
   * En una aplicación real, esto podría implicar invalidar tokens en el backend.
   */
  logout(): void {
    this._isLoggedIn.next(false); // Establece el estado a no logeado
    localStorage.removeItem('isLoggedIn'); // Elimina el estado de localStorage
    console.log('Cierre de sesión simulado exitoso.');
    this.router.navigate(['/login']); // Navega a la página de login después de cerrar sesión
  }
}