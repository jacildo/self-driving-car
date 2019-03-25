import { Neuron, Layer, Network, Trainer, Architect } from 'synaptic';
import { CarAction } from './CarAction';
import * as _ from 'lodash';

class Brain {
    private _net: Architect.Perceptron;
    private _neurons: Neuron[];

    constructor(neuralNetwork: Architect.Perceptron) {
        this._net = neuralNetwork;
    }

    get net(): Architect.Perceptron {
        return this._net;
    }

    set net(neuralNetwork: Architect.Perceptron) {
        this._net = neuralNetwork;
    }

    // TypeScript Type interface for net.neurons does not match the definition
    //      so, create our own interface here
    get neurons(): any {
        return <any>this.net.neurons();
    }

    // the neural network is expected to only have one output value
    // the value will be used to determine if the car is to accelerate, decelerate,
    // or do nothing
    getAction(...inputs: number[]) {
        let value = this.net.activate(inputs)[0];
        if(value > (2/3)) {
            return CarAction.Accelerate;
        } else if (value > (1/3)) {
            return CarAction.Idle;
        } else {
            return CarAction.Decelerate;
        }
    }

    // if we know what the proper output is, propagate the value and the 
    //    neural network will try to optimize itself
    propagateAction(input: number) {
        this.net.propagate(0.01, [input]);
    }

    // mutate neurons in this brain's hidden layers by a mutation rate
    mutate(mutationRate: number) {
        for(var i = 0; i < this.neurons.length; i++) {
            if(this.getChance(mutationRate)) {
                this.neurons[i].neuron.bias = this.getMutationValue(this.neurons[i].neuron.bias, -0.1, 0.1);
            }
        }
        
    }

    // take a percentage of another Brain's neural network and mutate this Brain
    crossBreed(source: Brain, mutationRate: number) {
        let destinationNeurons = this.neurons;
        let sourceNeurons = source.neurons;
        for(var i = 0; i < destinationNeurons.length; i++) {
            if(this.getChance(mutationRate)) {
                destinationNeurons[i] = _.clone(sourceNeurons[i]); 
            }
        }
    }

    // use a random number generator to get a boolean based on a success rate
    private getChance(rate: number) {
        if(rate < 0 || rate > 1) {
            return false;
        }

        return Math.random() < rate;
    }

    private getSign() {
        return Math.round(Math.random()) * 2 - 1;
    }

    private getMutationValue(value: number, min: number, max: number) {
        let newValue = value + (value * (1 + Math.random()) * this.getSign());
        return _.clamp(newValue, min, max);
    }
}

export { Brain };
