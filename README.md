[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/JDpeH8ak)


https://editor.p5js.org/Furi0usGeorgeX/sketches/OTuSUqvlH
In today's lab, we emulated the classic game of Frogger. We did so by constructing three parts.

The first step was to build the cars and the frog, using classes. Below is an example of the cars class.

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

This allows us to draw as many or as few cars as necessary. In order to get three lanes of cars, I defined the car loops in Setup three separate times with their own starting Y positions. One of these loops is seen below.

  // These loops set the car lanes' initial parameters.
  for (let carsDefined = 0; carsDefined < 3; carsDefined++) {
    let x = random(0, 520);
    let y = 500;
    cars.push(new Car(x, y));
  }
  
  I then set up the movement of the frog, increasing/decreasing it's X or Y position depending on which arrow key is pressed.
  
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

Finally, I created a function that resets the frog to it's starting position when hit by a car.

//Detects collision between frog and cars.
function isTouching(frog, car) {
  let colliding = dist(frog.x, frog.y, car.x, car.y);
  if (colliding < spriteWidth) {
    return true;
  } else {
    return false;
  }
}
