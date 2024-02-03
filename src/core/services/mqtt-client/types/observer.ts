import { ObserverArgumentType } from './observer-argument';

type ObserverType = (id: string, argument: ObserverArgumentType) => void;

export { ObserverType };
