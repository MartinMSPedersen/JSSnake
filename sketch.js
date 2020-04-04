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

var move_left_key; 
var move_right_key;
var move_up_key;
var move_down_key;

var current_screen="definekeys";
//var current_screen="playing";

var key_down = false;
var last_key;

function setup() {
	var f;
	var p;
	
	/*
	move_left_key=LEFT_ARROW;
	move_right_key=RIGHT_ARROW;
	move_up_key=UP_ARROW;
	move_down_key=DOWN_ARROW;
	*/

	move_left_key='O';
	move_right_key='P';
	move_up_key='Q';
	move_down_key='A';

	createCanvas(1000, 800);
	blockHeight = height/blockSize-2;
	blockWidth = width/blockSize-2;

	snake = new Snake(width-10*blockSize,height/2,blockSize,200,100)

	f = new Food(2);
	foods.push(f);
	f = new Food(4);
	foods.push(f);
	f = new Food(6);
	foods.push(f);
}

function drawBorder() {
	noStroke();
	fill(0,255,0);
	rect(0,0,width,height);
	fill(0);
	rect(blockSize,blockSize,width-2*blockSize,height-2*blockSize);
}

function keyReleased() {
	key_down=false;
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
	if (current_screen == "playing") {
		draw_playing();
		return;
	}
	if (current_screen == "definekeys") {
		draw_definekeys();
		//console.log(keyCode);
		return;
	}
	console.log("THIS SHOULD NEVER HAPPEN - ERROR: 1.")
}

async function draw_definekeys() {
	frameRate(50);
	background(0);
	textFont("Courier");
	textSize(40);
	fill(255,255,0);
	
	text("LEFT    ?", 300, 220);
	while (key_down == false) {
		await new Promise(r => setTimeout(r, 50));
	}
	move_left_key=last_key;
	background(0);
	text("LEFT    "+move_left_key, 300, 220);
	text("RIGHT   ?", 300, 220+1*64);
	
	while (key_down == false || last_key == move_left_key) {
		await new Promise(r => setTimeout(r, 50));
	}
	move_right_key=last_key;
	background(0);
	text("LEFT    "+move_left_key, 300, 220);
	text("RIGHT   "+move_right_key, 300, 220+1*64);
	text("UP      ?", 300, 220+2*64);
	while (key_down == false || last_key == move_left_key || last_key == move_right_key) {
		await new Promise(r => setTimeout(r, 50));
	}
	move_up_key=last_key;
	background(0);
	text("LEFT    "+move_left_key, 300, 220);
	text("RIGHT   "+move_right_key, 300, 220+1*64);
	text("UP      "+move_up_key, 300, 220+2*64);
	text("DOWN    ?", 300, 220+3*64);
	while (key_down == false || last_key == move_left_key || last_key == move_right_key || last_key == move_up_key) {
		await new Promise(r => setTimeout(r, 50));
	}
	move_down_key=last_key;
	background(0);
	text("LEFT    "+move_left_key, 300, 220);
	text("RIGHT   "+move_right_key, 300, 220+1*64);
	text("UP      "+move_up_key, 300, 220+2*64);
	text("DOWN    "+move_down_key, 300, 220+3*64);
	noLoop();
}

function draw_playing() {
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

function keyPressed_definekeys() {
	last_key=key;
	return;
}

function keyPressed() {
	key_down=true;

	if (current_screen == "playing") {
		keyPressed_playing();
		return;
	}
	if (current_screen == "definekeys") {
		console.log(keyCode);
		keyPressed_definekeys();
		return;
	}
	console.log("THIS SHOULD NEVER HAPPEN - ERROR: 2.")
}

function keyPressed_playing() {
	var theKey=String.fromCharCode(keyCode).toUpperCase();
	console.log(theKey);

	if (theKey == move_left_key || keyCode == LEFT_ARROW) {
		snake.changeDirectionLeft();
		return;
	}
	if (theKey == move_right_key || keyCode == RIGHT_ARROW) {
		snake.changeDirectionRight();
		return;
	}
	if (theKey == move_up_key || keyCode == UP_ARROW) {
		snake.changeDirectionUp();
		return;
	}
	if (theKey == move_down_key || keyCode == DOWN_ARROW) {
		snake.changeDirectionDown();
		return;
	}
}
