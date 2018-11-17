class Forklift{

    constructor(speed){
        this.speed = speed;
        this.isCarrying = false;
    }

    getSpeed() {
        return this.speed;
    }

    isFree() {
        return this.isCarrying;
    }

}

export default Forklift;