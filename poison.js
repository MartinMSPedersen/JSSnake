/*
   Date: 3th of Oktober 2017
   version 0.1
   All source under GPL version 3 or latter
   (GNU General Public License - http://www.gnu.org/)
   contact martin@linux.com for more information about this code
*/

function Poison() {
	this.xpos = Math.round(random(1,blockWidth))*blockSize;
	this.ypos = Math.round(random(1,blockHeight))*blockSize;
	this.noise = 15;
	this.color = color(255,0,0);
}

Poison.prototype.show = function() {
	fill(this.color);
	rect(this.xpos,this.ypos,blockSize,blockSize);
}

Poison.prototype.collision = function(x,y) {
	if ( (abs(this.xpos - x) < this.noise)  &&
		(abs(this.ypos - y) < this.noise)) {
		this.destroy = true;
		return true;
	}
	return false;
}

Poison.prototype.newPosition = function() {
	this.xpos = Math.round(random(1,blockWidth))*blockSize;
	this.ypos = Math.round(random(1,blockHeight))*blockSize;
}
