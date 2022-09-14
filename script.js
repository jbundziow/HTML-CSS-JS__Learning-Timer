/* BUTTONS DISABLED */
/* /*   document.getElementById("start-button").disabled = true;
  document.getElementById("stop-button").disabled = true;
  document.getElementById("add-button").disabled = true;
  document.getElementById("dropdown-auto-manual").disabled = true; */


  //TEST!!!! - clock
  /* function addLeadingZeros(num, totalLength) { //it converts eg. '3' mins into '03' mins
    return String(num).padStart(totalLength, '0');
  }
  const currentDate = new Date();
  const actualTime = addLeadingZeros(currentDate.getHours(), 2) + ":" + addLeadingZeros(currentDate.getMinutes(), 2);
  document.getElementById("auto-hour-start").textContent = actualTime; //new text */


//MAIN CODE

document.getElementById("stop-button").disabled = true; //disable button 'Stop' on the beginning

/* FUNCTION THAT CONVERTS MINUTES INTO '#h #min' */
convertMinutesToHours = (mins) => parseInt(mins/60) +"h " + parseInt(mins%60) + " min";

/* FUNCTION THAT CONVERTS Date() INTO HH:MM */
function convertDateObjectIntoHHMM(MilisecondsSince1970) {
  var d = new Date(MilisecondsSince1970);
  return addLeadingZeros(d.getHours(),2) + ":" + addLeadingZeros(d.getMinutes(),2);
}

/* FUNCTION THAT CONVERTS MILISECONDS INTO MINUTES */
convertMilisecondsToMinutes = (miliseconds) => parseInt(miliseconds/1000/60);

  /* RETURN ID OF THE NEXT RECORD IN TABLE */
  function nextTableID () {
    let myTable = document.getElementById("history-table");
    return myTable.rows.length; /* this is ID */
  }

  /* FUNCTION THAT CONVERTS E.G. '3' MINS INTO '03' MINS */
  function addLeadingZeros(num, totalLength) {
    return String(num).padStart(totalLength, '0');
  }

/* COUNT TOTAL ELAPSED TIME FROM TABLE AND DISPLAY IT ON SCREEN */
setInterval(function () {
    var myTable = document.getElementById("history-table");
  
      let sum = 0;
      for (let i=1; i<myTable.rows.length; i++) //all rows in cell 'Mins'
      {
          sum += parseInt(myTable.rows[i].cells[3].innerHTML); //sum up minutes in #history-table
      }
      document.getElementById("total-elapsed-time").textContent = convertMinutesToHours(sum); //sum coverted into hours and displayed on screen
    
  }, 100); //repeat every 100ms

  /* SHOW CURRENT ELAPSED TIME SINCE START BUTTON IS CLICKED IN AUTO MODE */
setInterval(function () {
  if (document.getElementById("start-button").disabled == true)
  {
  const currentDate = new Date();
  let actualLearningTimeInMinutes = convertMilisecondsToMinutes(currentDate.getTime() - timeWhenStartButtonWasClicked);
  document.getElementById("auto-elapsed-time").textContent = convertMinutesToHours(actualLearningTimeInMinutes);
  }
  else
  {
    document.getElementById("auto-elapsed-time").textContent = " - ";
  }
}, 100); //repeat every 100ms

  /* SELECT MODE -> SWITCHING WINDOWS */
  setInterval(function () {
    let selectedOption = document.getElementById("dropdown-auto-manual").value;
  if (selectedOption == 1) //auto
  {
    document.getElementById("auto").style.display="block";
    document.getElementById("manual").style.display="none";
  }
  else {
    document.getElementById("auto").style.display="none";
    document.getElementById("manual").style.display="block";
  }
  }, 100); //repeat every 100ms
  
  /* IN MANUAL MODE IF THERE ARE EMPTY INPUT FIELDS => DISABLE BUTTON 'ADD'*/
  setInterval(function () {
      let mins = document.getElementById("manual-entered-minutes").value;
      let textarea = document.getElementById("textarea-comment").value;
  
      if (mins == "" || textarea == "")
      {
          document.getElementById("add-button").disabled = true;
          }
          else
          {
              document.getElementById("add-button").disabled = false;
          }
  }, 100);


  //modify table

  function addRecord_ManualMode() {
    //get elements
    let minutesFromInput = document.getElementById(
      "manual-entered-minutes"
    ).value;
    let commentFromInput = document.getElementById("textarea-comment").value;
    let table = document.querySelector("#history-table tbody");

    //enter record to the table
    table.innerHTML +=
      "<tr><td>" + nextTableID() + 
      "</td><td>-</td><td>-</td><td>" +
      minutesFromInput +
      "</td><td>" +
      commentFromInput +
      "</td></tr>";

      //clear input 'min' and 'comment'
      document.getElementById("manual-entered-minutes").value = "";
      document.getElementById("textarea-comment").value = "";
  }

  var timeWhenStartButtonWasClicked;
  function startButtonPushed () {
    //disable buttons and enable stop-button
    document.getElementById("start-button").disabled = true;
    document.getElementById("dropdown-auto-manual").disabled = true;
    document.getElementById("stop-button").disabled = false;

    //save time of click start button in global variable
    const currentDate = new Date();
    timeWhenStartButtonWasClicked = currentDate.getTime();
    
    //show hour when start button was clicked in 'started at' field
    const actualTime = addLeadingZeros(currentDate.getHours(), 2) + ":" + addLeadingZeros(currentDate.getMinutes(), 2);
    document.getElementById("auto-hour-start").textContent = actualTime;

    //current elapsed time counts by one of setInterval function above
  }

  function stopButtonPushed () {
    //save time of click stop button in variable
    const currentDate = new Date();
    let timeWhenStopButtonWasClicked = currentDate.getTime();
    

    //from
    console.log(convertDateObjectIntoHHMM(timeWhenStartButtonWasClicked)); //TODO: works OK, put it later into table

    //to
    console.log(convertDateObjectIntoHHMM(timeWhenStopButtonWasClicked)); //TODO: works OK, put it later into table

    //mins
    console.log(convertMilisecondsToMinutes(timeWhenStopButtonWasClicked-timeWhenStartButtonWasClicked)); //TODO: works OK, put it later into table

    //TODO:
    //add record into the table
    //'select mode', 'start' enabled; 'stop' disabled
    //started at - clear it from 22:05 into " - "
    //at the end:
    //timeWhenStartButtonWasClicked = 0;
    //timeWhenStopButtonWasClicked = 0;
  }

function addRecord_AutoMode(id, from, to, mins, comment) {
  //TODO
  let table = document.querySelector("#history-table tbody");
  table.innerHTML +=
    "<tr><td>Lp</td><td>From</td><td>To</td><td>Mins</td><td>Comment</td></tr>";
}