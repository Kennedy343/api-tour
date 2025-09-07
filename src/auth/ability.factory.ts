// src/auth/ability.factory.ts
import { Injectable } from '@nestjs/common';
import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType } from '@casl/ability';
import { User } from '../entities/user.entity';
import { Action } from './action.enum';
import { Tour } from '../tours/entities/tour.entity';

// Define el tipo de Ability de tu app
export type AppAbility = Ability<[Action, string | Tour]>;

@Injectable()
export class AbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder(
      Ability as AbilityClass<AppAbility>
    );

    // Reglas para admin
    if (user.roles.some(r => r.name === 'admin')) {
      can(Action.Manage, 'all'); // admin puede todo
    }

    // Reglas para editor
    if (user.roles.some(r => r.name === 'editor')) {
      can([Action.Create, Action.Read, Action.Update], 'Tour'); // editor solo sobre Tour
      cannot(Action.Delete, 'Tour'); // no puede eliminar
    }

    return build({
      detectSubjectType: item =>
        typeof item === 'string' ? item : (item.constructor as ExtractSubjectType<AppAbility>),
    });
  }
}
