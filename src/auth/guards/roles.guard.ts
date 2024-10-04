import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { Role } from '../../common/enums/role.enum';
import { ROLE_KEY } from '../../common/decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLE_KEY, [
      context.getClass(),
      context.getHandler(),
    ]);

    if (!requiredRoles || !requiredRoles.length) {
      return true;
    }

    /* TODO:- add code to fetch user roles 
      const request = context.switchToHttp().getRequest();
      const user = request.user;
      const userRoles = getUserRoles(user);
    */

    const userRoles = [];
    return requiredRoles.some((role) => userRoles.includes(role));
  }
}
