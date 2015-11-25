(function() {
	//Global Var
	var grid = document.getElementById("laneHolder");
	var flagLaneDAD = true;
	var addLaneLink = document.getElementById("addLane");
	var toggleDADLink = document.getElementById("toggleDAD");

	//Initial Events
	addLaneLink.addEventListener("click", addLane, false);
	toggleDADLink.addEventListener("click", toggleLaneDADCard, false);
	appendDAD(document.getElementById("init"));//only in development
	appendDAD(document.getElementById("init2"));//only in development
	toggleLaneDADCard();
	//test
	var trs = document.querySelectorAll("tr");
	cols  = trs;
	for (var i = 0; i < trs.length; i++) {
		if(trs[i].className.indexOf("head_table")<0)
			trs[i].draggable = true;
		
		appendDADfa(trs[i]);	
	};

	function createNewLane(){
		var newLane = document.createElement("div");
		var newTitle = document.createElement("div");
		var newContent = document.createElement("div");
		newLane.className = "mdl-card";
		newLane.draggable = "true";

		newTitle.innerHTML = "New Lane";
		newTitle.contentEditable = "true";
		newLane.appendChild(newTitle);
		newContent.id = "1";
		newLane.appendChild(newContent);
		return newLane;
	}

	function createNewTaskLane(){
		var lane = document.createElement("div");
		lane.id = CryptoJS.MD5(getRandom());
		lane.className = "col-md-3-5 col-xs-12 lane"
		//lane.draggable = "true";
			var laneTitle = document.createElement("div");
			laneTitle.className = "lane-title";
				laneTitle.contentEditable = "true";
				laneTitle.innerHTML = "New Lane";
		lane.appendChild(laneTitle);
			var laneTask = document.createElement("div");
			laneTask.className = "lane-tasks";
				var task = document.createElement("div")
				task.className = "task clearfix";
					var taskTitle = document.createElement("div");
					taskTitle.className = "task-title pull-left";
					taskTitle.contentEditable = "true";
					taskTitle.innerHTML = "New Task";
				task.appendChild(taskTitle);
					var taskOpts = document.createElement("div");
					taskOpts.className = "task-opts pull-left";
						var linkTaskOpts = document.createElement("span");
						linkTaskOpts.className = "glyphicon glyphicon-edit";
						linkTaskOpts.setAttribute("onClick", "toogleTaskEdit(this);");
					taskOpts.appendChild(linkTaskOpts);
				task.appendChild(taskOpts);
					var taskNotes = document.createElement("div");
					taskNotes.className = "task-notes pull-left";
					taskNotes.style.display = "none";
						var taskDate = document.createElement("div");
						taskDate.className = "task-date";
						taskDate.contentEditable = "true";
						taskDate.innerHTML = moment().format("DD/MM/YYYY");
					taskNotes.appendChild(taskDate);
						var taskText = document.createElement("div");
						taskText.className = "task-text";
						taskText.contentEditable = "true";
						taskText.innerHTML = "Some text related to the task.";
					taskNotes.appendChild(taskText);
				task.appendChild(taskNotes);
			laneTask.appendChild(task);
		lane.appendChild(laneTask);
		return lane;
	}

	function addLane(){
		var taskLanes = document.getElementsByClassName("lane");
		var countTaskLanes = taskLanes.length;

		if(countTaskLanes < 4 ){
			var newLane = createNewTaskLane();
			grid.appendChild(newLane);
			//appendDAD(newLane);	
		}

	}

	
	function toggleLaneDADCard(){
		cells = document.querySelectorAll('.mdl-card');
		for (var i = 0; i < cells.length; i++) {
			if(flagLaneDAD){
				removeDAD(cells[i]);
				cells[i].draggable = false;
			}else{
				appendDAD(cells[i]);
				cells[i].draggable = true;
			}
		}
		flagLaneDAD = (flagLaneDAD)? false : true;
		toggleDADLink.parentElement.className = (flagLaneDAD)? "active" : "";
	}

		
})();

function getRandom(){
	var arr = []
	while(arr.length < 8){
		var randomnumber=Math.ceil(Math.random()*100)
		var found=false;
		for(var i=0;i<arr.length;i++){
			if(arr[i]==randomnumber){found=true;break}
		}
		if(!found)arr[arr.length]=randomnumber;
	}
	return arr.toString();
}


function toogleTaskEdit(el){
	if(el.parentElement.parentElement.children[2]!=null){
		if(el.parentElement.parentElement.children[2].style.display != "block"){
			el.parentElement.parentElement.children[2].style.display = "block";
		}else{
			el.parentElement.parentElement.children[2].style.display = "none";
		}
	}
}