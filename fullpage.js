$.prototype.fullpage = function(options){
	options = options ? options : {};
	var activeElem;
	if(window.location.hash && options.anchors){
		var index = options.anchors.indexOf(window.location.hash.split("#")[1]);
		activeElem = this[0].children[index];
	}
	else if(options.active){
		activeElem = this[0].querySelector(options.active);
		if(options.anchors){
			for(var i=0; i<this[0].children.length; i++){
				if(this[0].children[i] == activeElem){
					setHash(i);
					break;
				}
			}
		}
	}
	else{
		activeElem = this[0].children[0];
		if(options.anchors){
			setHash(0);
		}
	}
	const controlArrows = options.controlArrows == false ? false : true;
	activeElem.style.height = window.innerHeight;
	activeElem.classList.add("fullPageActive");
	var self = this;
    var scrollableElement = document.body; //document.getElementById('scrollableElement');
	scrollableElement.addEventListener('wheel', checkScrollDirection);
	function checkScrollDirection(event) {
		clearTimeout(self.timeout);
		self.timeout = setTimeout(function(){
			var next;
			  if (!checkScrollDirectionIsUp(event)) {
			  	self.scroll("down");
			  } else {
			  	self.scroll("up");
			  }
		}, 20);
	}
	function checkScrollDirectionIsUp(event) {
	  if (event.wheelDelta) {
	    return event.wheelDelta > 0;
	  }
	  return event.deltaY < 0;
	}
	if(controlArrows){
		scrollableElement.addEventListener("keydown", function(){
			if(event.key == "ArrowDown"){
				self.scroll("down");
			}
			else if(event.key == "ArrowUp"){
				self.scroll("up");
			}
		})		
	}
	this.scroll = function(pos){
		clearTimeout(this.timeout);
		this.timeout = setTimeout(function(){
			var ele = document.querySelector(".fullPageActive");
			var next;

			var index = -1;
			if(options.anchors){
				index = options.anchors.indexOf(window.location.hash.split("#")[1]);				
			}
			if(pos == "down"){
			  	next = ele.nextElementSibling;
			  	
			  	if(index > -1){
			  		index++;
			  	}
			}
			else{
			  	next = ele.previousElementSibling;
			  	
			  	if(index > -1){
			  		index--;
			  	}
			}
			if(!next){
				if(pos == "up" && loopTop){
					next = self[0].children[self[0].children.length-1];
					index = options.anchors ? options.anchors.length-1 : -1;					
				}
				else if(pos == "down" && loopBottom){
					next = self[0].children[0];
					index = 0;
				}
			}
			if(next){
	  			ele.classList.remove("fullPageActive");
				  ele.style.height = "0px";
				  next.style.height = window.innerHeight;
				  next.classList.add("fullPageActive");		  	

				  if(index > -1){
				  	setHash(index);
				  }
			}
		}, scrollingSpeed);
	}
	const scrollingSpeed = options.scrollingSpeed ? options.scrollingSpeed : 700;

	function setHash(index){
		window.location.hash = options.anchors[index];
	}

	const loopTop = options.loopTop ? options.loopTop : false;

	const loopBottom = options.loopBottom ? options.loopBottom : false;
}