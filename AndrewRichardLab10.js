let frogX, frogY, x, y;

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  colorMode(HSL);

  spriteWidth = 50;

  cars = [];
  frogs = [];

  //Car Speed
  addX = 2;

  // These loops set the car lanes' initial parameters.
  for (let carsDefined = 0; carsDefined < 3; carsDefined++) {
    let x = random(0, 520);
    let y = 500;
    cars.push(new Car(x, y));
  }
  for (let carsDefined = 0; carsDefined < 3; carsDefined++) {
    let x = random(0, 520);
    let y = 450;
    cars.push(new Car(x, y));
  }
  for (let carsDefined = 0; carsDefined < 3; carsDefined++) {
    let x = random(0, 520);
    let y = 400;
    cars.push(new Car(x, y));
  }
  //Frog starting position.
  myFrog = new Frog(300, 550);
}

function draw() {
  background(50, 0, 30);

  //Lanes
  fill("yellow");
  rect(0, 400, 600, 10);
  rect(0, 440, 600, 10);
  rect(0, 500, 600, 10);
  rect(0, 540, 600, 10);
  // This loop moves the cars back and forth.
  for (let carsShown = 0; carsShown < cars.length; carsShown++) {
    cars[carsShown].show();
    cars[carsShown].update();
    if (isTouching(myFrog, cars[carsShown])) {
      myFrog.x = 300;
      myFrog.y = 550;
    }
  }

  //Spawns frog
  myFrog.show();
}

class Car {
  constructor(x, y, hue) {
    this.x = x;
    this.y = y;
    this.hue = floor(random(360));
    this.addX = addX; // This initializes an increment unique to each car.
  }
  update() {
    // This animates each car differently thanks to the "this" prefix.
    this.x = this.x + this.addX;
    // This conditional detects barrier collisions.
    if (this.x < 0 || this.x > width - 80) {
      this.addX = -this.addX; // This reverses the direction for each car.
    }
  }
  show() {
    push();
    translate(this.x, this.y);
    stroke(0);
    fill(this.hue, 100, 50);
    rect(0, 0, 80, 50);
    pop();
  }
}

class Frog {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  update() {
    this.x = this.x + this.addX;
  }
  show() {
    push();
    translate(this.x, this.y);
    //Pandy
    fill("green");
    rect(0, 0, 40);
    fill("black");
    ellipse(30, 12, 8);
    ellipse(10, 12, 8);
    fill("white");
    ellipse(20, 23, 27);
    fill("black");
    ellipse(20, 27, 4);
    ellipse(25, 22, 7);
    ellipse(15, 22, 7);
    fill(255, 0, 0);
    ellipse(15, 22, 5);
    ellipse(25, 22, 5);
    fill(0);
    ellipse(15, 22, 5);
    ellipse(25, 22, 5);
    pop();
  }
}

//Allows change in speed/direction
function keyPressed() {
  if (keyCode == UP_ARROW) {
    myFrog.y -= 50;
  }
  if (keyCode == DOWN_ARROW) {
    myFrog.y += 50;
  }
  if (keyCode == LEFT_ARROW) {
    myFrog.x -= 50;
  }
  if (keyCode == RIGHT_ARROW) {
    myFrog.x += 50;
  }
}

//Detects collision between frog and cars.
function isTouching(frog, car) {
  let colliding = dist(frog.x, frog.y, car.x, car.y);
  if (colliding < spriteWidth) {
    return true;
  } else {
    return false;
  }
}
