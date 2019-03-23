class Level {

    intersectionStart: number;
    intersectionEnd: number;
    speedLimit: number;

    constructor(intersectionStart: number, speedLimit: number) {
        // make the intersection a constant 50px wide for now
        this.intersectionEnd = intersectionStart + 50;
        this.intersectionStart = intersectionStart;
    }
}

export { Level };
