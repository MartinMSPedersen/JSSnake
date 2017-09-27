/*
   Date: 4th of August 2017
   version 0.1
   All source under GPL version 3 or latter
   (GNU General Public License - http://www.gnu.org/)
   contact martin@linux.com for more information about this code
*/

function Food(value, color) {
	this.xpos = random(3*blockSize,width-3*blockSize);
	this.ypos = random(3*blockSize,height-3*blockSize);
	this.value = value;
	this.destroy = false;
	this.noise = 15;
	this.color = color;
}

Food.prototype.show = function() {
	fill(this.color);
	rect(this.xpos,this.ypos,blockSize,blockSize);
}

Food.prototype.collision = function(x,y) {
	if ( (abs(this.xpos - x) < this.noise)  &&
		(abs(this.ypos - y) < this.noise)) {
		this.destroy = true;
		return true;
	}
	return false;
}

Food.prototype.newPosition = function() {
	this.xpos = random(3*blockSize,width-3*blockSize);
	this.ypos = random(3*blockSize,height-3*blockSize);
}
