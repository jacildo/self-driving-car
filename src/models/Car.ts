import { CarSetting } from './CarSetting';
import { Brain } from './Brain';
import { CarAction } from './CarAction';
import { Level } from './Level';

class Car {
    // passed from the level
    x: number;
    delta: number;
    distanceScale: number;

    // passed from the settings/constructor
    brain: Brain;
    maxAcceleration: number;
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

    level: Level;

    constructor(settings: CarSetting, level: Level) {
        this.brain              = settings.brain;
        this.maxAcceleration    = settings.maxAcceleration;
        // this.distanceScale      = settings.distanceScale;
        this.efficiencyFunction = settings.efficiencyFunction;
        // this.errorMultiplier    = settings.errorMultiplier;

        this.minSpeed = 0;
        this.speed = 0;
        this.active = true;
        this.runningTime = 0;
        
        this.setLevel(level);

    }

    // stop the car from updating
    // use this when end of line is reached
    stop() {
        this.active = false;
    }

    setLevel(level: Level) { 
        this.level = level;
    }

    // get the next action to perform using the Action neuron
    // then call the appropriate function
    update(        
        delta: number,
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
        this.learn(action);
    }

    // accelerate, but speed should not exceed the car's max speed
    accelerate() {
        let speed = this.speed + (this.maxAcceleration * this.delta);
        this.speed = Math.max(speed, this.level.speedLimit);
    }

    // decelerate, but speed should not be lower than 0
    // when decelerating, energy is wasted, so deduct the score
    decelerate() {
        let deceleration = this.maxAcceleration * this.delta;
        let speed = this.speed - deceleration;
        this.speed = Math.min(speed, this.minSpeed);

        this.efficiencyPenalty -= deceleration * this.delta;
    }

    /*
     * 1   - Accelerate
     * 0.5 - Idle
     * 0   - Decelerate
     */

    learn(action: CarAction) {
        // if overspeeding, set the expected action to 1
        if(this.speed > this.level.speedLimit) {
            this.brain.propagateAction(0);
        } else if (this.speed < this.level.speedLimit) {
            this.brain.propagateAction(1);
        }
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