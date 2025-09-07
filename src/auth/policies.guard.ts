import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AbilityFactory, AppAbility } from './ability.factory';
import { CHECK_POLICIES_KEY } from './check-ability.decorator';
import { PolicyHandler, PolicyHandlerCallback } from './policy-handler.interface';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(private reflector: Reflector, private abilityFactory: AbilityFactory) {}

  canActivate(context: ExecutionContext): boolean {
    const policyHandlers =
      this.reflector.get<(PolicyHandler | PolicyHandlerCallback)[]>(CHECK_POLICIES_KEY, context.getHandler()) || [];

    const { user } = context.switchToHttp().getRequest();
    const ability: AppAbility = this.abilityFactory.createForUser(user);

    return policyHandlers.every(handler => this.execPolicyHandler(handler, ability));
  }

  private execPolicyHandler(handler: PolicyHandler | PolicyHandlerCallback, ability: AppAbility) {
    // si es función, ejecútala
    if (typeof handler === 'function') {
      return handler(ability);
    }

    // si es objeto PolicyHandler, ejecuta handle
    return handler.handle(ability);
  }
}
