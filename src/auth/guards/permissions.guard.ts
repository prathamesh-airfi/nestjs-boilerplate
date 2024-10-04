import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { Permission } from '@enums/permission.enum';
import { PERMISSION_KEY } from '@decorators/permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<
      Permission[] | undefined
    >(PERMISSION_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredPermissions || !requiredPermissions.length) {
      return true;
    }

    /* TODO:- add code to fetch user permissions 
      const request = context.switchToHttp().getRequest();
      const user = request.user;
      const userPermissions = getUserPermissions(user);
    */

    const userPermissions = [];
    return requiredPermissions.some((permission) =>
      userPermissions.includes(permission),
    );
  }
}
