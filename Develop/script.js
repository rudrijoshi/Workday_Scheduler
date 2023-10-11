var tasks = {};

var currentDayEl = $('#currentDay');
var container = dayjs();
$('.container').text(container.format('dddd, MMMM D[th]'));

var button = $('#button');

$('.description').on('click', 'p', function () {
  var text = $(this).text().trim();
  var textInput = $('<textarea>').addClass('form-control').val(text);
  $(this).replaceWith(textInput);
  textInput.trigger('focus');
});

$('.description').on('blur', 'textarea', function () {
  var text = $(this).val().trim();
  var taskP = $('<p>').addClass('taskItem').text(text);
  $(this).replaceWith(taskP);
});

$('.saveBtn').on('click', function () {
  var taskId = this.id;
  var taskText = $(this).parent().find('textarea').val();
  console.log("Task text:", taskText);
  tasks[taskId] = taskText;
  console.log("tasks for savebtn", tasks);
  localStorage.setItem('tasks', JSON.stringify(tasks));
});

var loadTasks = function () {
  var loadedTasks = JSON.parse(localStorage.getItem('tasks'));
  if (loadedTasks) {
    tasks = loadedTasks;
    console.log("Here is tasks: " + tasks)
    printTasks(tasks);
  } else {
    tasks = {};
  };
};

var printTasks = function (tasks) {
  Object.keys(tasks).forEach(function (taskId) {
    var timeBlock = $('#hour-' + taskId);
    if (timeBlock.length > 0) {
      var taskTextarea = timeBlock.find('textarea');
      taskTextarea.val(tasks[taskId]);
    }
  })
};

var currentHour = dayjs().hour();
var workdayStartHour = 9;
var workdayEndHour = 17;

var hourAudit = function () {
  console.log('hourAudit function called');
  $(".time-block").each(function () {
    var taskHour = parseInt($(this).attr("id").split("-")[1], 10);
    if (currentHour < taskHour) {
      $(this).addClass('future');
    } else if (currentHour === taskHour) {
      $(this).addClass('present');
    } else {
      $(this).addClass('past')
    }
  })
};
hourAudit();

setInterval(function () {
  hourAudit();
}, 1000 * 60 * 60);

$(document).ready(function () {
  loadTasks();
});