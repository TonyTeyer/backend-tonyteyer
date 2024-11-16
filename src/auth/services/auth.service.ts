import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  // Simulación de validación de usuario
  async validateUser(username: string, pass: string): Promise<any> {
    // Aquí deberías buscar el usuario en la base de datos
    const user = { userId: 1, username: 'test', password: 'password' }; // Usuario simulado

    // Comparar contraseñas
    const isMatch = await bcrypt.compare(
      pass,
      '$2b$10$KIXQ4eYdLkI3Y2QvyO6eYuW7rPwz9bY0xEwR1WQZQtkFwXCIHTgfe',
    ); // Contraseña: 'password'

    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // Generar el token JWT
  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
