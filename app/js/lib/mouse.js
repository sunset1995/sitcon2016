mousePosX=0;
mousePosY=0;

var handleMouseMove = function(e) {
	mousePosX = e.clientX;
	mousePosY = e.clientY;
}
document.onmousemove = handleMouseMove;
