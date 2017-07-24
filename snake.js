function Snake(headX, headY, blockSize, headColour, bodyColour) {
	this.headX = headX;
	this.headY = headY;
	this.blockSize = blockSize;
	this.headColour = headColour;
	this.bodyColour = bodyColour;
	this.body = [];
	this.direction = "WEST";
	this.speed = 1;
	this.growing = 0;

	var b;

	for (i = 1; i <= 3 ; i++) {
		var b = new Block(this.headX+i*this.blockSize, this.headY, this.blockSize, this.bodyColour);
		this.body.push(b);
	}
}

Snake.prototype.show = function() {
	noStroke();
	fill(255)
	rect(this.headX,this.headY,this.blockSize,this.blockSize);
	for (var i = 0; i < this.body.length; i++) {
		this.body[i].show();
	}
}

Snake.prototype.grow = function(v) {
	this.growing = this.growing + v;
}

Snake.prototype.move = function() {
	var len = this.body.length;
	var oldPosX;
	var oldPosY;
	var b;

	if (this.growing == 0) {
		for (var i = 1; i < len; i = i + 1) {
			oldPosX = this.body[i].xpos;
			oldPosY = this.body[i].ypos;
			this.body[i-1].newPosition(oldPosX,oldPosY);
		}
		this.body[len-1].newPosition(this.headX,this.headY);
	} else {
		b = new Block(this.headX, this.headY, this.blockSize, this.bodyColour);
		this.body.push(b);
		this.growing = this.growing - 1;
	}

	if (this.direction == "WEST") {
		this.headX = this.headX - this.blockSize*this.speed;
	}
	if (this.direction == "NORTH") {
		this.headY = this.headY - this.blockSize*this.speed;
	}
	if (this.direction == "SOUTH") {
		this.headY = this.headY + this.blockSize*this.speed;
	}
	if (this.direction == "EAST") {
		this.headX = this.headX + this.blockSize*this.speed;
	}
}

Snake.prototype.changeDirectionLeft = function() {
	if (this.direction == "NORTH") {
		this.direction = "WEST";
		return;
	}
	if (this.direction == "SOUTH") {
		this.direction = "EAST";
		return;
	}
	if (this.direction == "EAST") {
		this.direction = "NORTH";
		return;
	}
	if (this.direction == "WEST") {
		this.direction = "SOUTH";
	}
}

Snake.prototype.changeDirectionRight = function() {
	if (this.direction == "NORTH") {
		this.direction = "EAST";
		return;
	}
	if (this.direction == "SOUTH") {
		this.direction = "WEST";
		return;
	}
	if (this.direction == "EAST") {
		this.direction = "SOUTH";
		return;
	}
	if (this.direction == "WEST") {
		this.direction = "NORTH";
	}
}

Snake.prototype.collision = function() {
	var i;

	if (this.headX < 0) return true;
	if (this.headY < 0) return true;
	if (this.headX > width - this.blockSize) return true;
	if (this.headY > height - this.blockSize) return true;

	for (i = 0; i < this.body.length-1; i++) {
		if ((this.headX == this.body[i].xpos) && (this.headY == this.body[i].ypos)) return true;
	}

	return false;
}


