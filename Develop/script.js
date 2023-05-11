// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
// Start pseudo code//
//at the top of the page add today's day
 //so add text content of today's day and append to the element in the header in the form of 'Name of day', 'full name of month' and date with th format'
//add time blocks to div container using jquery (3 columns in a row, 9 rows):
 //first time in format '12AM'
 //then task container
 //then save icon
//create formatting feature to color code time block:
 //red for in progress
 //green for upcoming
 //grey for past
// add functionality so when user clicks into time block:
 //can edit the text content on focus
 //hardcode the content on blur
 // when user clicks the save button icon the text for the event saves into local storage via an array object
 // when user refreshes page - get the object array from local storage and recreate the events on the page



var currentDayEl = $('#currentDay'); //targetting <p> element for today's day to display
var container = dayjs();
$('.container').text(container.format('dddd, MMMM D[th]'));
var button =$('#button');
$(".description").on("click", "p", function(){
  var text =$(this)
    .text()
    .trim();
  var textInput =$("<textarea>")
    .addClass("form-control")
    .val(text);

  $(this).replaceWith(textInput);
   textInput.trigger("focus");
});

//Task needs to be updated
$(".description").on("blur", "textarea", function() {
//get the textareas; current value/text
  var text = $(this)
    .val()
    .trim();

  var taskP = $("<p>")
    .addClass("taskItem")
    .text(text);

  $(this).replaceWith(taskP);
});    

//Save tasks
$(".saveBtn").on("click", function(){
    var index = $(".saveBtn").index(this);
    tasks[index] = $(this).parent().find(".taskItem").text();
    localStorage.setItem("tasks", JSON.stringify(tasks));
});

var loadTasks = function(){
  tasks = JSON.parse(localStorage.getItem("tasks"))
  if(!tasks) {
      tasks={};
  } ;
  printTasks(tasks)
}

var printTasks = function(){
  $.each(tasks, function(list, arr){

      var taskP = $("<p>").addClass("description task-item-" + list).text(arr)
      
      // console.log(list)
      // console.log(taskP);

      $("#task-item-" + list).replaceWith(taskP);
  })
}

tasks = [];

var Today = dayjs()
$('.Today ').text(Today.format('h'));

//color code hours bins
var hourAudit =function(){
    var todayHour = $('.Today').text(Today.format('h'));

    for(var i=8; i<18; i++){
        var taskSpace = $("#task-"+i)  
        if(todayHour>i){
            $(taskSpace).addClass("past");
        } else if (todayHour === i){
            $(taskSpace).addClass("present");
        }else{
            $(taskSpace).addClass("future")
        }
    }
}


setInterval(function(){
    hourAudit();},1000*60*60);

loadTasks();
hourAudit();


