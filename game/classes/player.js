class Player {

    constructor(brain) {
        if (brain) {
            this.brain = brain.copy();
            this.brain.mutate(0.6);
        } else this.brain = new NeuralNetwork(2, 4, 2);
        this.brain.learningRate = 0.5;
        this.lift = -15;
        this.gravity = 0.8;
        this.radius = 30;
        this.groundY = height - (groundHeight + this.radius / 2);
        this.x = 80;
        this.y = this.groundY;
        this.velocity = 0;
        this.isAlive = true;
        this.distances;
        this.obstacleDistance;
        this.score = 0;
        this.fitness = 0;
        this.colorR = random() * 255;
        this.colorG = random() * 255;
        this.colorB = random() * 255;
    }

    die() { this.isAlive = false; }

    copy() { return new Player(this.brain); }

    think() {
        let inputs = [];
        inputs[0] = this.obstacleDistance
        inputs[1] = this.obstacleSpeed
        let action = this.brain.predict(inputs);
        if (action[1] > action[0]) {
            this.jump();
        }
    }

    show() {
        if (this.isAlive) {
            if (this.obstacleDistance < 50 && this.y > 400)
                this.isAlive = false;
            this.velocity += this.gravity;
            this.y += this.velocity;
            if (this.groundY < this.y) this.fix();
            this.draw();
            this.score++;
        }
    }

    fix() {
        this.velocity = 0;
        this.y = this.groundY;
    }

    jump() {
        if (this.groundY - this.y < 10)
            this.velocity = this.lift;
    }

    draw() {
        push();
        fill(this.colorR, this.colorG, this.colorB, 128);
        noStroke();
        ellipse(this.x, this.y, this.radius);
        pop();
    }

}