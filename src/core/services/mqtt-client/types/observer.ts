import { ObserverDataType } from './observer-data';

type ObserverType = (id: string, data: ObserverDataType) => void;

export { ObserverType };
