import { Car } from './models/Car';
import { CarSetting } from './models/CarSetting';
import { Architect } from 'synaptic';
import { Brain } from './models/Brain';

declare global {
    interface Window { finals: any; }
}


// simple wave function that gives a peak efficiency at 80kph
var efficiencyFunction = function(speed: number) {
	return Math.sin((Math.PI * speed)/160);
}

let population: Car[];
const populationSize = 16;

// create 16 cars, then initialize their neural networks
function initialize() {
	population =  [...Array(populationSize)].map((_, i) => {

		let net = new Architect.Perceptron(4,16,16,3);
		let settings: CarSetting = {
			maxAcceleration: 10,
			maxSpeed: 160,
			brain: new Brain(net),
			efficiencyFunction,
		}
	
		return new Car(settings);
	});
}


window.finals = {
	initialize
};