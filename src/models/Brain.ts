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

    /*
        The brain's output layers will have the following neurons:    
        1. Action: determines whether to accelerate, decelerate, or do nothing
        2. Efficiency: make sure this neuron aims for highest efficiency
        3. Errors: make sure this neuron aims for zero errors
    */
    get outputLayer(): Layer {
        return this.net.layers.output;
    }

    get actionNeuron(): Neuron {
        return this.outputLayer.neurons()[0];
    }

    // get the action, whether 0, 1 or 2. 
    // Miniscule chance of value of action being a 3, so limit the max number to 2
    getAction() {
        let value = this.actionNeuron.activate();
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
