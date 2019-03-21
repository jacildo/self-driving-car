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
}

export { Brain };
