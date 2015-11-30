var db;
const dbName = "kanban";

var request = indexedDB.open(dbName, 2);
//prefixes of implementation that we want to test
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
 
//prefixes of window.IDB objects
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

request.onerror = function(event) {
  // Do something with request.errorCode!
  console.log("bad!, error code: " + event.target.errorCode);
};

const kanbanData = [
   {
      "user":"user1",
      "lanes":[
         {
            "laneID":"eefa4d60e8a7a8da5fb98336ce8b2d64",
            "laneTitle":"lane 1",
            "laneTasks":[
               {
                  "taskID":"99527e8d1dc36ad602e235578e540647",
                  "taskTitle":"New task",
                  "taskDate":"27/11/2015",
                  "tasktext":"Some tasktext related to the task."
               }
            ]
         },
         {
            "laneID":"bcc22a0918481ad2c4c2905e80f43c8c",
            "laneTitle":"lane 2",
            "laneTasks":[
               {
                  "taskID":"2469f723852c8e6052317c6d17cfed09",
                  "taskTitle":"New task 2",
                  "taskDate":"27/11/2015",
                  "tasktext":"Some tasktext related to the task 2."
               }
            ]
         }
      ]
   }
];

request.onsuccess = function(event) {
  // Do something with request.result!
  db=request.result;
  console.log("good!");
 };

 request.onupgradeneeded = function(event) {
  var db = event.target.result;
  var objectStore = db.createObjectStore("project", { keyPath: "user" });

  // Create an index to search project by laneID. We may have duplicates
  // so we can't use a unique index.
  /*objectStore.createIndex("lanes.laneID", "lanes.laneID", { unique: true });*/

  // Create an index to search project by taskID, taskTitle and taskDate
/*  objectStore.createIndex("taskID", "lanes.laneTasks.taskID", { unique: false });
  objectStore.createIndex("taskTitle", "lanes.laneTasks.taskTitle", { unique: false });
  objectStore.createIndex("taskDate", "lanes.laneTasks.taskDate", { unique: false });*/
};

function add() {
        var request = db.transaction(["project"], "readwrite")
                .objectStore("project")
                .add({
      user:"user2",
      lanes:[
         {
            laneID:"eefa4d60e8a7a8da5fb98336ce8b2d64",
            laneTitle:"lane 1",
            laneTasks:[
               {
                  taskID:"99527e8d1dc36ad602e235578e540647",
                  taskTitle:"New task",
                  taskDate:"27/11/2015",
                  tasktext:"Some tasktext related to the task."
               }
            ]
         },
         {
            laneID:"bcc22a0918481ad2c4c2905e80f43c8c",
            laneTitle:"lane 2",
            laneTasks:[
               {
                  taskID:"2469f723852c8e6052317c6d17cfed09",
                  taskTitle:"New task 2",
                  taskDate:"27/11/2015",
                  tasktext:"Some tasktext related to the task 2."
               }
            ]
         }
      ]
   });
                                 
        request.onsuccess = function(event) {
                alert("Kenny has been added to your database.");
        };
         
        request.onerror = function(event) {
                alert("Unable to add data\r\nKenny is aready exist in your database! ");       
        }
         
}
