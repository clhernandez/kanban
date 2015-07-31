//drag&drop
var dragSrcEl = null;
var cols = document.querySelectorAll('.mdl-card');//null in production;
function handleDragStart(e) {
	this.style.opacity = '0.4';  // this / e.target is the source node.
	dragSrcEl = this;

	e.dataTransfer.effectAllowed = 'move';
	e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
	if (e.preventDefault) {
		e.preventDefault(); // Necessary. Allows us to drop.
	}

	e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
	return false;
}

function handleDragEnter(e) {
	// this / e.target is the current hover target.
	this.classList.add('over');
}

function handleDragLeave(e) {
	this.classList.remove('over');  // this / e.target is previous target element.
}
function handleDrop(e) {
	// this / e.target is current target element.

	if (e.stopPropagation) {
		e.stopPropagation(); // stops the browser from redirecting.
	}

	// See the section on the DataTransfer object.
	// Don't do anything if dropping the same column we're dragging.
	if (dragSrcEl != this) {
		// Set the source column's HTML to the HTML of the columnwe dropped on.
		dragSrcEl.innerHTML = this.innerHTML;
		this.innerHTML = e.dataTransfer.getData('text/html');
	}
	return false;
}

function handleDragEnd(e) {
  // this/e.target is the source node.

	[].forEach.call(cols, function (col) {
		col.classList.remove('over');
		col.style.opacity = '1';
	});
	
}

function appendDAD(element){
	element.addEventListener('dragstart', handleDragStart, false);
	element.addEventListener('dragenter', handleDragEnter, false);
	element.addEventListener('dragover', handleDragOver, false);
	element.addEventListener('dragleave', handleDragLeave, false);
  	element.addEventListener('drop', handleDrop, false);
	element.addEventListener('dragend', handleDragEnd, false);
}