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

function drawBorder() {
	noStroke();
	fill(0,255,0);
	rect(0,0,width,height);
	fill(0);
	rect(blockSize,blockSize,width-2*blockSize,height-2*blockSize);
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
