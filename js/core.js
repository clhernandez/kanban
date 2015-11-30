//Global Var
var grid = document.getElementById("laneHolder");
var flagLaneDAD = true;
var addLaneLink = document.getElementById("addLane");
var toggleDADLink = document.getElementById("toggleDAD");
var dev;//only for dev purposes.
var cnt = 1;//only for dev.
(function() {
	//Initial Events that execute only when dom is ready.
	addLaneLink.addEventListener("click", addLane, false);
	toggleDADLink.addEventListener("click", toggleLaneDAD, false);

	toggleDADLink.parentElement.className = (flagLaneDAD)? "active" : "";
	addLane("BACKLOG");//dev
	addLane("DEV");//dev
})();

	function addLane(title){
		var taskLanes = document.getElementsByClassName("lane");
		var countTaskLanes = taskLanes.length;

		if(countTaskLanes < 4 ){
			var newLane = createNewLane(title);
			grid.appendChild(newLane);
		}

	}

	function createNewLane(title){
		console.log(title);
		var lane = document.createElement("div");
		lane.id = CryptoJS.MD5(getRandom());
		lane.className = "col-md-3-5 col-xs-12 lane"
			var laneTitle = document.createElement("div");
			laneTitle.className = "lane-title clearfix";
				var titleSpan = document.createElement("span");
				titleSpan.className = "pull-left";
				titleSpan.contentEditable = "true";
				titleSpan.innerHTML = (typeof title=="string")?title : "New Lane";
			laneTitle.appendChild(titleSpan);
				var btnAddtask = document.createElement("span");
				btnAddtask.className = "glyphicon glyphicon-plus pull-right";
				btnAddtask.setAttribute("onClick", "addTaskToLane(this);");
			laneTitle.appendChild(btnAddtask);
		lane.appendChild(laneTitle);
			var laneTask = document.createElement("div");
			laneTask.className = "lane-tasks";
			laneTask.appendChild(createNewTask());
			laneTask.setAttribute("ondrop", "dropHandler(event);");
			laneTask.setAttribute("ondragover", "allowDropHandler(event)");
		lane.appendChild(laneTask);
		return lane;
	}

	function createNewTask(){
		var task = document.createElement("div")
		task.id =  CryptoJS.MD5(getRandom());	
		task.className = "task clearfix";
		task.draggable = "true";
		task.setAttribute("ondragstart","dragHandler(event);")
			var taskTitle = document.createElement("div");
			taskTitle.className = "task-title pull-left";
			taskTitle.contentEditable = "true";
			taskTitle.innerHTML = cnt + " New Task";
		task.appendChild(taskTitle);
			var taskOpts = document.createElement("div");
			taskOpts.className = "task-opts pull-left";
				var linkTaskEdit = document.createElement("span");
				linkTaskEdit.className = "glyphicon glyphicon-edit";
				linkTaskEdit.setAttribute("onClick", "toogleTaskEdit(this);");
			taskOpts.appendChild(linkTaskEdit);
			taskOpts.appendChild(document.createTextNode(" "));
				var linkTaskRemove = document.createElement("span");
				linkTaskRemove.className = "glyphicon glyphicon-remove"
				linkTaskRemove.setAttribute("onClick", "removeTask(this);");
			taskOpts.appendChild(linkTaskRemove);
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
		cnt++;
		return task;
	}
	
	function toggleLaneDAD(){
		cells = document.querySelectorAll('.lane');
		for (var i = 0; i < cells.length; i++) {
			if(flagLaneDAD){
				removeDAD(cells[i]);
				cells[i].draggable = false;
			}else{
				appendDAD(cells[i]);
				cells[i].draggable = true;
			}
		}
		flagLaneDAD = !flagLaneDAD;
		toggleDADLink.parentElement.className = (flagLaneDAD)? "active" : "";
	}

	function addTaskToLane(el){
		var laneTasks = el.parentElement.parentElement.getElementsByClassName("lane-tasks")[0];
		if(laneTasks!=null)
			laneTasks.appendChild(createNewTask());
	}

	function removeTask(el){
		el.parentElement.parentElement.remove();
	}

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