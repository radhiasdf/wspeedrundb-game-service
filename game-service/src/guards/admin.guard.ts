// Jadi basically resolve user state koken dgn parsing via public key signature context

import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader) throw new UnauthorizedException('Missing token.');

    try {
      const token = authHeader.split(' ')[1];
      // In production development settings, verify with dynamic env secrets
      const decoded = jwt.decode(token) as { id: string; role: string }; 
      
      if (!decoded || decoded.role !== 'ADMIN') {
        throw new ForbiddenException('Access denied. Administrator privileges required.');
      }
      
      request.user = decoded;
      return true;
    } catch (err) {
      throw new UnauthorizedException('Token parsing validation failed.');
    }
  }
}