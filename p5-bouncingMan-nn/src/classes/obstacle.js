class Obstacle {

    constructor() {
        this.hardness = 17;
        this.width = 50;
        this.height = 50;
        this.speed;
        this.x;
        this.y;
        this.refresh();
    }

    getSpeed() { return this.speed; }

    calcDistance(x, y) {
        return dist(this.x, this.y, x, y);
    }

    refresh() {
        this.speed = parseInt(random() * this.hardness + 15);
        this.x = width + this.width + parseInt(random() * 100);
        this.y = height - this.height - groundHeight;
    }

    show() {
        this.x -= this.speed;
        this.draw();
        if (this.x + this.width < 0) this.refresh();
    }

    draw() {
        push();
        fill(52, 31, 151);
        noStroke();
        rect(this.x, this.y, this.width, this.height);
        pop();
    }

}