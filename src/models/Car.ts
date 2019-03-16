import { CarSetting } from './CarSetting';

class Car {
    // X and Y coordinates on the map
    x: number;

    speed: number;
    maxAcceleration: number;
    maxSpeed: number;
    minSpeed: number;
    distanceScale: number;
    error: number;
    efficiency: number;

    /*
        The brain's output layers will have the following neurons:    
        1. Action: determines whether to accelerate, decelerate, or do nothing
        2. Efficiency: make sure this neuron aims for highest efficiency
        3. Errors: make sure this neuron aims for zero errors
    */
    brain: any;
    learningRate: number;

    constructor(brain: any, settings: CarSetting) {
        this.error = 0;
        this.efficiency = 1;
        this.brain = brain;
        this.learningRate = settings.learningRate;

        this.maxAcceleration = settings.maxAcceleration;
        this.maxSpeed = settings.maxSpeed;
        this.minSpeed = 0;
        this.speed = 0;
        this.distanceScale = settings.distanceScale;
    }

    tick(delta: number) {
        // get the action, whether 0, 1 or 2. 
        var action = Math.floor(this.brain.neurons()[0].activate() * 3);
        // Miniscule chance of value of 3, if so, change 3 to 2
        action = action > 2 ? 2 : action;

        switch(action) {
            case 0:
                this.accelerate(delta);
            case 1:
                this.decelerate(delta);
            case 2:
                break;
        }

        this.updateLocation(delta);
    }

    // accelerate, but speed should not exceed the car's max speed
    accelerate(delta: number) {
        this.speed = Math.max(this.speed + (this.maxAcceleration * delta), this.maxSpeed);
    }

    // decelerate, but speed should not be lower than 0
    decelerate(delta: number) {
        this.speed = Math.min(this.speed - (this.maxAcceleration * delta), this.minSpeed);
    }

    // move the car forward depending on the speed
    updateLocation(delta: number) {
        this.x += delta * this.speed;
    }

}




export { Car };