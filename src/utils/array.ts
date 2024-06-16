import { randomInt } from './number';

export const random = (array: any[]) => array[randomInt(0, array.length - 1)];

export const shuffle = (array: any[]) => array.sort(() => Math.random() - 0.5);
