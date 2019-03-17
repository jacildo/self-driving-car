import { CarSetting } from './CarSetting';
import { Brain } from './Brain';

class Car {
    // passed from the level
    x: number;
    delta: number;
    distanceScale: number;

    // passed from the settings/constructor
    brain: Brain;
    maxAcceleration: number;
    maxSpeed: number;
    minSpeed: number;
    learningRate: number;
    efficiencyFunction: Function;
    errorMultiplier: number;

    // current state of the car
    speed: number;
    active: boolean;
    efficiency: number;
    runningTime: number;

    constructor(settings: CarSetting) {
        this.brain              = settings.brain;
        // this.learningRate       = settings.learningRate;
        this.maxSpeed           = settings.maxSpeed;
        this.maxAcceleration    = settings.maxAcceleration;
        // this.distanceScale      = settings.distanceScale;
        this.efficiencyFunction = settings.efficiencyFunction;
        // this.errorMultiplier    = settings.errorMultiplier;

        this.minSpeed = 0;
        this.speed = 0;
        this.active = true;
        this.runningTime = 0;
    }

    tick(delta: number) {
        this.delta = delta;

        if(this.active) {
            this.update();
        }
    }

    // stop the car from updating
    // use this when end of line is reached
    stop() {
        this.active = false;
    }

    // get the next action to perform using the Action neuron
    // then call the appropriate function
    update() {
        let action = this.brain.getAction();
        switch(action) {
            case 0:
                this.accelerate();
            case 1:
                this.decelerate();
            case 2:
                break;
        }

        this.updateEfficiency();
        this.updateLocation();
    }

    // accelerate, but speed should not exceed the car's max speed
    accelerate() {
        let speed = this.speed + (this.maxAcceleration * this.delta);
        this.speed = Math.max(speed, this.maxSpeed);
    }

    // decelerate, but speed should not be lower than 0
    decelerate() {
        let speed = this.speed - (this.maxAcceleration * this.delta);
        this.speed = Math.min(speed, this.minSpeed);
    }

    updateEfficiency() {
        
    }

    // move the car forward depending on the speed
    updateLocation() {
        this.x += (this.delta * this.speed);
    }

    // returns the current error rate of the car

    get error(): number {
        return ;
    }

    // aim for perfect efficiency, and zero error
    learn() {
        this.brain.learn(1, 0);
    }

}




export { Car };