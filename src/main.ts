import { Car } from './models/Car';
import { Neuron, Layer, Network, Trainer, Architect } from 'synaptic';

// create the neural network layers
var inputLayer = new Layer(4);
var hiddenLayer1 = new Layer(8);
var hiddenLayer2 = new Layer(8);
var outputLayer = new Layer(2);

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

