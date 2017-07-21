function Block(xpos, ypos, size, colour) {

	this.xpos = xpos;
	this.ypos = ypos;
	this.size = size;
	this.colour = colour;

	this.show = function() {
		noStroke();
		fill(this.colour);
		rect(this.xpos,this.ypos,this.size,this.size);
	}

	this.newPosition = function(x,y) {
		this.xpos = x;
		this.ypos = y;
	}
}
