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

	var b = new Block(this.headX+this.blockSize, this.headY, this.blockSize, this.bodyColour);
	this.body.push(b);

	var b = new Block(this.headX+2*this.blockSize, this.headY, this.blockSize, this.bodyColour);
	this.body.push(b);

	var b = new Block(this.headX+3*this.blockSize, this.headY, this.blockSize, this.bodyColour);
	this.body.push(b);

	this.show = function() {
		noStroke();
		//fill(this.headColour);
		fill(255)
		rect(this.headX,this.headY,this.blockSize,this.blockSize);
		for (var i = 0; i < this.body.length; i++) {
			this.body[i].show();
		}
	}

	this.grow = function(v) {
		this.growing = this.growing + v;
	}

	this.move = function() {
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

	this.changeDirectionLeft = function() {
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

	this.changeDirectionRight = function() {
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


	this.collision = function() {
		var i;

		if (this.headX < this.blockSize) return true;
		if (this.headY < this.blockSize) return true;
		if (this.headX > width - 2*this.blockSize) return true;
		if (this.headY > height - 2*this.blockSize) return true;

		for (i = 0; i < this.body.length-1; i++) {
			if ((this.headX == this.body[i].xpos) && (this.headY == this.body[i].ypos)) return true;
		}

		return false;
	}
}


