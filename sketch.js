/*
   Date: 4th of August 2017
   version 0.1
   All source under GPL version 3 or latter
   (GNU General Public License - http://www.gnu.org/)
   contact martin@linux.com for more information about this code
*/

var snake;
var blockSize = 20;

var blockWidth; 
var blockHeight; 

var foods = [];
var poisons = [];

function setup() {
	var f;
	var p;

	createCanvas(1000, 800);
	blockHeight = height/blockSize-2;
	blockWidth = width/blockSize-2;

	snake = new Snake(width-10*blockSize,height/2,blockSize,200,100)

	for (var i=1; i<=3; i++) {
		f = new Food(i*2, color(0,255,0));
		foods.push(f);
	}
}

function drawMouseArea() {
	noStroke();
	if (snake.direction != 'NORTH' && snake.direction != 'SOUTH') {
		fill(0,0,200);
		rect(snake.headX-blockSize, snake.headY+3*blockSize, 3*blockSize, height-4*blockSize-snake.headY); // south
		rect(snake.headX-blockSize, blockSize, 3*blockSize, snake.headY-3*blockSize);        // north
	}
	if (snake.direction != 'EAST' && snake.direction != 'WEST') {
		fill(0,0,200);
		rect(blockSize, snake.headY-blockSize, snake.headX-3*blockSize, 3*blockSize); // west
		rect(snake.headX+3*blockSize, snake.headY-blockSize, width-snake.headX-4*blockSize, 3*blockSize); // east
	}
}

function drawBorder() {
	noStroke();
	fill(0,255,0);
	rect(0,0,width,height);
	fill(0);
	rect(blockSize,blockSize,width-2*blockSize,height-2*blockSize);
	drawMouseArea();
}

function gameOver() {
    var start_text="Game Over. Points = " + snake.body.length;
    textFont("Courier");
    textSize(40);
    fill(255,255,0); 
    text(start_text,0.5*(width-textWidth(start_text)),0.5*(height-16))
    noLoop();
}

function draw() {
	var p;

	if (snake.collision()) {
		gameOver();
		return;
	}
	frameRate(map(snake.body.length,3,120,10,25));
	background(0);
	drawBorder();
	snake.show();
	checkMouse();
	snake.move();
	for (var i = 0; i < foods.length; i++) {
		foods[i].show();
	}
	for (var i = 0; i < poisons.length; i++) {
		poisons[i].show();
	}

	for (var i = 0; i < foods.length; i++) {
		if (foods[i].collision(snake.headX, snake.headY)) {
			snake.grow(foods[i].value);
			foods[i].newPosition();
			p = new Poison();	
			poisons.push(p);
		}
	}
	for (var i = 0; i < poisons.length; i++) {
		if (poisons[i].collision(snake.headX, snake.headY)) {
			gameOver();
			return;
		}
	}
}

function keyPressed() {
	if (keyCode == LEFT_ARROW) {
		snake.changeDirectionLeft();
	}
	if (keyCode == RIGHT_ARROW) {
		snake.changeDirectionRight();
	}
	if (keyCode == UP_ARROW) {
		snake.changeDirectionUp();
	}
	if (keyCode == DOWN_ARROW) {
		snake.changeDirectionDown();
	}
}

function checkMouse() {
	if (snake.direction != "NORTH") {
		if (mouseX >= snake.headX-blockSize && mouseX <= snake.headX+2*blockSize && mouseY >= snake.headY+2*blockSize) {
			snake.direction = "SOUTH";
		}
	}
	if (snake.direction != "SOUTH") {
		if (mouseX >= snake.headX-blockSize && mouseX <= snake.headX+2*blockSize && mouseY <= snake.headY-2*blockSize) {
			snake.direction = "NORTH";
		}
	}
	if (snake.direction != "WEST") {
		if (mouseY >= snake.headY-blockSize && mouseY <= snake.headY+2*blockSize && mouseX >= snake.headX+2*blockSize) {
			snake.direction = "EAST";
		}
	}
	if (snake.direction != "EAST") {
		if (mouseY >= snake.headY-blockSize && mouseY <= snake.headY+2*blockSize && mouseX <= snake.headX-2*blockSize) {
			snake.direction = "WEST";
		}
	}
}
