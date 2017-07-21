function Food(value) {
	this.xpos = random(3*blockSize,width-3*blockSize);
	this.ypos = random(3*blockSize,height-3*blockSize);
	this.value = value;
	this.destroy = false;
	this.noise = 15;

	this.show = function() {
		fill(255,0,0);
		rect(this.xpos,this.ypos,blockSize,blockSize);
	}

	this.collision = function(x,y) {
		if ( (abs(this.xpos - x) < this.noise)  &&
		     (abs(this.ypos - y) < this.noise)) {
			this.destroy = true;
			return true;
		}
		return false;
	}

	this.newPosition = function() {
		this.xpos = random(3*blockSize,width-3*blockSize);
		this.ypos = random(3*blockSize,height-3*blockSize);
		this.value = 2;
	}
}


