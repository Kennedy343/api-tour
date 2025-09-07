import { AppAbility } from './ability.factory';

// Un objeto handler siempre debe tener handle definido
export interface PolicyHandler {
  handle: (ability: AppAbility) => boolean;
}

// También podemos pasar callbacks directamente
export type PolicyHandlerCallback = (ability: AppAbility) => boolean;
