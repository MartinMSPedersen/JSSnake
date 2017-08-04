/*
   Date: 4th of August 2017
   version 0.1
   All source under GPL version 3 or latter
   (GNU General Public License - http://www.gnu.org/)
   contact martin@linux.com for more information about this code
*/

function Block(xpos, ypos, size, colour) {
	this.xpos = xpos;
	this.ypos = ypos;
	this.size = size;
	this.colour = colour;
}

Block.prototype.show = function() {
	noStroke();
	fill(this.colour);
	rect(this.xpos,this.ypos,this.size,this.size);
}

Block.prototype.newPosition = function(x,y) {
	this.xpos = x;
	this.ypos = y;
}
