import { Neuron, Layer, Network, Trainer, Architect } from 'synaptic';

class Brain {
    _net: Network;
    learningRate: number;

    constructor(learningRate: number) {
        this.learningRate = learningRate;
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
        return this.outputLayer.neurons[0];
    }
    
    get efficiencyNeuron(): Neuron {
        return this.outputLayer.neurons[1];
    }

    get errorNeuron(): Neuron {
        return this.outputLayer.neurons[2];
    }

    // get the action, whether 0, 1 or 2. 
    // Miniscule chance of value of action being a 3, so limit the max number to 2
    getAction() {
        const possibleActions = 3;
        let action = Math.floor(this.actionNeuron.activate() * possibleActions);
        return Math.min(action, possibleActions - 1);
    }

    learn(expectedEfficiency: number, expectedError: number) {
        this.efficiencyNeuron.propagate(this.learningRate, expectedEfficiency);
        this.errorNeuron.propagate(this.learningRate, expectedError);
    }
}

export { Brain };

// create the neural network layers
var inputLayer = new Layer(4);
var hiddenLayer1 = new Layer(8);
var hiddenLayer2 = new Layer(8);
var outputLayer = new Layer(3);

// define the projection in the layers
inputLayer.project(hiddenLayer1);
hiddenLayer1.project(hiddenLayer2);
hiddenLayer2.project(outputLayer);

// define the neural network
var net = new Network({
	input: inputLayer,
	hidden: [hiddenLayer1, hiddenLayer2],
	output: outputLayer
});

