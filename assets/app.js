
// Clock in the header
function startClock () {
  setInterval(function(){
    const now = moment().format("YYYY-MM-DD HH:mm:ss");

    $('#current-time').text(now);
  }, 1000);
}

// Function to create each hour block
function createTimeBlock(hour) {
  
  // Creating a parent div for other elements to sit in
  const row = $("<div>");
  const currentHour = Number(moment().format("H"));
  
  // past -- hour < current hour
  const isPast = hour < currentHour;
  // present -- current hour === hour
  const isPresent = hour === currentHour;
  // future -- hour > current hour
  const isFuture = hour > currentHour;

  // Creating a variable for the row classes so we can add the colours 
  let rowClass = 'row justify-content-center align-items-center m-1 rounded ';

  // Adding colour classes depending on when the block is
  if (isPast) {rowClass = rowClass + 'past'};
  if (isPresent) {rowClass = rowClass + 'present'};
  if (isFuture) {rowClass = rowClass + 'future'};

  row.attr('class', rowClass)

  // Time column
  const timeCol = $("<div>")
  timeCol.attr('class', "time-col col-2");

  timeCol.text(hour + ":00")

  // Text entry column
  const textareaCol = $('<div>');
  textareaCol.attr('class', 'textarea-col col-8');
  const textarea = $("<textarea rows='3' cols='50'>")
  textareaCol.append(textarea);

  const existingActivities = localStorage.getItem(hour);
  textarea.val(existingActivities);

  // Column for save button
  const buttonCol = $('<div>');

  const saveButton = $('<button class="btn btn-primary save-button ">')
  saveButton.text('save');

  buttonCol.append(saveButton);
  // Appending all columns to the row
  row.append(timeCol,textareaCol,buttonCol);

  return row;
}


// Starts when page is run
$(function(){
  // Clock begins
  startClock();

  const timeBlockContainer = $('.container');
  // Loops through the times to create a block for each one
  for (let hour = 9; hour < 18; hour++) {
    const timeblock = createTimeBlock(hour);
    
    timeBlockContainer.append(timeblock);
  }
});

// Event listener for the save button
$(document).on('click', '.save-button', function(event) {
  
  // When user clicks on the save button of a particular time block
  const buttonClicked = $(event.target);
  // Targeting the child elements to create variables for the time & message
  const textarea = buttonClicked.parent().prev().children();
  const timeCol = buttonClicked.parent().prev().prev();
  const time = timeCol.text();
  // removes the ":00" from each time
  const hour = time.slice(0, -3);

  // Grab the user input
  const userInput = textarea.val();

  // Save to local storage with hour key
  localStorage.setItem(hour, userInput);

})



