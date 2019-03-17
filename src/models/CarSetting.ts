import { Brain } from './Brain';

class CarSetting {
    maxAcceleration: number;
    maxSpeed: number;
    learningRate: number;
    distanceScale: number;
    brain: Brain;
    efficiencyFunction: Function;
    errorMultiplier: number;
}

export { CarSetting };