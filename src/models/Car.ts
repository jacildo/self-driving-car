import { CarSetting } from './CarSetting';
import { Brain } from './Brain';
import { CarAction } from './CarAction';

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
    efficiencyFunction: Function;
    errorMultiplier: number;

    // current state of the car
    speed: number;
    active: boolean;
    efficiency: number;
    runningTime: number;

    efficiencyPenalty: number;
    overspeedingPenalty: number;
    violationPenalty: number;

    constructor(settings: CarSetting) {
        this.brain              = settings.brain;
        this.maxSpeed           = settings.maxSpeed;
        this.maxAcceleration    = settings.maxAcceleration;
        // this.distanceScale      = settings.distanceScale;
        this.efficiencyFunction = settings.efficiencyFunction;
        // this.errorMultiplier    = settings.errorMultiplier;

        this.minSpeed = 0;
        this.speed = 0;
        this.active = true;
        this.runningTime = 0;
        
        this.efficiencyPenalty = 0;
        this.overspeedingPenalty = 0;
        this.violationPenalty = 0;
    }

    // stop the car from updating
    // use this when end of line is reached
    stop() {
        this.active = false;
    }

    // get the next action to perform using the Action neuron
    // then call the appropriate function
    update(        
        delta: number,
        isInRedIntersection: boolean,
        speedLimit: number,
    ) {
        if(!this.active) return;

        let action = this.brain.getAction();
        switch(action) {
            case CarAction.Accelerate:
                this.accelerate();
            case CarAction.Decelerate:
                this.decelerate();
            case CarAction.Idle:
                break;
        }

        this.updateLocation();
    }

    // accelerate, but speed should not exceed the car's max speed
    accelerate() {
        let speed = this.speed + (this.maxAcceleration * this.delta);
        this.speed = Math.max(speed, this.maxSpeed);
    }

    // decelerate, but speed should not be lower than 0
    // when decelerating, energy is wasted, so deduct the score
    decelerate() {
        let deceleration = this.maxAcceleration * this.delta;
        let speed = this.speed - deceleration;
        this.speed = Math.min(speed, this.minSpeed);

        this.efficiencyPenalty -= deceleration * this.delta;
    }


    // move the car forward depending on the speed
    updateLocation() {
        this.x += (this.delta * this.speed);
    }

    // returns the current error rate of the car
    get error(): number {
        return ;
    }

}




export { Car };