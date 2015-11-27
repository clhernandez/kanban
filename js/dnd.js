var drag = {};
var drop = {};

function allowDropHandler(ev) {
	ev.preventDefault();
}

function dragHandler(ev) {
	drag.ev = ev;
	drag.parent = ev.target.parentElement;
    ev.dataTransfer.setData("text", ev.target.id);
}

function dropHandler(ev) {
    ev.preventDefault();
    drop.ev = ev;
    drop.target = ev.target;
    drop.parent = ev.target.parentElement;
    var data = ev.dataTransfer.getData("text");
    
    if(!ev.target.className.contains("lane-tasks")){
    	//console.log("Not lane-tasks");
    	drop.target = ev.target.parentElement.parentElement;
    }

    if(drag.parent!=drop.target){
    	//if the task if moving from one lane to another, append at the end.
    	//console.log("change lane");
    	drop.target.appendChild(document.getElementById(data));
    }else{
    	//if the task if moving in the same lane
    	//console.log(drop.parent.previousSibling);
    	//console.log(drag.ev.target);
    	if(drop.parent.previousSibling == drag.ev.target){
    		//Swap Down Task
    		//console.log("DOWN");
    		//console.log(drop.parent);
    		//console.log(document.getElementById(data));
    		drop.target.insertBefore(drop.parent, document.getElementById(data));
    	}else{
    		//Swap Up Task
    		//console.log("UP");
    		//console.log(document.getElementById(data));
    		//console.log(drop.parent);
    		if(drop.parent.className.contains("lane")){
    			drop.target.appendChild(document.getElementById(data));
    		}else{
    			drop.target.insertBefore(document.getElementById(data), drop.parent);
    		}
    		
    	}
    }
    
    
    
    ////console.log(drag);
    //console.log(drop);
}


function addDragHandler(element){
	element.addEventListener('ondragstart', dragHandler, false);
}

function addDropHandler(element){
	element.addEventListener('ondragover', allowDropHandler, false);
	element.addEventListener('ondrop', dropHandler, false);
}