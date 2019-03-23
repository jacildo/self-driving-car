import { Neuron, Layer, Network, Trainer, Architect } from 'synaptic';
import { CarAction } from './CarAction';

class Brain {
    private _net: Network;

    constructor(neuralNetwork: Network) {
        this._net = neuralNetwork;
    }

    get net(): Network {
        return this._net;
    }

    set net(neuralNetwork: Network) {
        this._net = neuralNetwork;
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

    // mutate neurons in this brain's hidden layers by a mutation rate
    mutate(mutationRate: number) {
        for(var i = 0; i < this.net.neurons.length; i++) {
            if(this.getChance(mutationRate)) {

                // (<any>this.net.neurons)[i] = (<any>source.net.neurons)[i]; 
            }
        }
        
    }

    // take a percentage of another Brain's neural network and mutate this Brain
    crossBreed(source: Brain, mutationRate: number) {
        let destinationNeurons = this.net.neurons();
        let sourceNeurons = source.net.neurons();
        for(var i = 0; i < destinationNeurons.length; i++) {
            if(this.getChance(mutationRate)) {
                destinationNeurons[i] = sourceNeurons[i]; 
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
}

export { Brain };
