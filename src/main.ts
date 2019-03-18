import { Car } from './models/Car';
import { CarSetting } from './models/CarSetting';
import { Architect } from 'synaptic';
import { Brain } from './models/Brain';

var net = new Architect.Perceptron(4,16,16,3);

// simple wave function that gives a peak efficiency at 80kph
var efficiencyFunction = function(speed: number) {
	return Math.sin((Math.PI * speed)/160);
}

var settings: CarSetting = {
	maxAcceleration: 10,
	maxSpeed: 160,
	brain: new Brain(net),
	efficiencyFunction,
}

