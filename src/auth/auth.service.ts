import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);

    if (
      !user ||
      user.password !== password
      // TODO !(await this.usersService.validatePassword(password, user.password))
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
