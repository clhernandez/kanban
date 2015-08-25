(function() {
	//Global Var
	var grid = document.getElementById("grid");
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

	function createNewCard(){
		var card = document.createElement("div");
		card.id = CryptoJS.MD5(getRandom());
		card.className = "mdl-card mdl-shadow--4dp card-wide"
		card.draggable = "true";
			var cardTitle = document.createElement("div");
			cardTitle.className = "mdl-card__title";
				var cardTitleH2 = document.createElement("h2");
				cardTitleH2.className = "mdl-card__title-text";
				cardTitleH2.contentEditable = "true";
				cardTitleH2.innerHTML = "New Lane";
				cardTitle.appendChild(cardTitleH2);
			card.appendChild(cardTitle);
			var cardText = document.createElement("div");
			cardText.className = "mdl-card__supporting-text mdl-card--border";
				var cardTable  = document.createElement("table");
				cardTable.id = "tab_"+card.id
				cardTable.className = "mdl-data-table mdl-js-data-table mdl-shadow--2dp";
				var headTable = "<thead><tr><th class='mdl-data-table__cell--non-numeric'>tarea</th><th>Fecha</th></tr></thead>";
				cardTable.innerHTML = headTable + "<tr><td class='mdl-data-table__cell--non-numeric'>Acrylic (Transparent)</td><td>25</td></tr>";
				cardText.appendChild(cardTable);
			card.appendChild(cardText);
		return card;
	}

	function addLane(){
		var cells = document.getElementsByClassName("mdl-card");
		var countCells = cells.length;

		if(countCells < 4 ){
			var newLane = createNewCard();
			grid.appendChild(newLane);
			appendDAD(newLane);	
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