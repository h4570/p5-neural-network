const groundHeight = 50;
const playersAmount = 5;

let players, obstacle, display, dna = 1;

function setup() {
  createCanvas(900, 500);
  obstacle = new Obstacle();
  players = [];
  for (let i = 0; i < playersAmount; i++)players[i] = new Player();

  display = createP("STARTING");
  display.class("results");
  display.position(10, 10);

}

function draw() {
  background(220, 221, 225);
  drawGround();
  obstacle.show();
  let aliveAmount = 0;

  for (let i = 0; i < playersAmount; i++)
    if (players[i].isAlive) {
      aliveAmount++;
      players[i].obstacleDistance = obstacle.calcDistance(players[i].x, players[i].y);
      players[i].obstacleSpeed = obstacle.getSpeed();
      players[i].think();
      players[i].show();
    }
  if (aliveAmount == 0) {
    obstacle = new Obstacle();
    dna++;
    players = GeneticAlgorithm.nextGeneration(players);
  }


  let everything = "DNA #" + dna;
  textFont("Courier");
  display.html(everything);

}

function drawGround() {
  push();
  fill(87, 101, 116);
  noStroke();
  rect(0, height - groundHeight, width, groundHeight);
  pop();
}