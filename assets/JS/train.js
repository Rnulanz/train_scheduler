$(document).ready(function(){
   
    //Firebase Config
    
        var config = {
            apiKey: "AIzaSyBXWUDkyaJiDb31r_nXqJnSXGgyFqk01PQ",
            authDomain: "choo-choo-choose.firebaseapp.com",
            databaseURL: "https://choo-choo-choose.firebaseio.com",
            projectId: "choo-choo-choose",
            storageBucket: "",
            messagingSenderId: "844009194072",
            appId: "1:844009194072:web:9f5058ac7cfa6bc57bc02d"
          };
     
          firebase.initializeApp(config);
    
          var database = firebase.database()
    
    //--------------------------------------------------------------------------------
    
    $("#submit").on("click", function(event){
        event.preventDefault();
        console.log("Im the first train...")
    
        var trainInfo = {
            name: $("#trainName-input").val().trim(),
            destination: $("#destination-input").val().trim(),
            time: $("#time-input").val().trim(),
            frequency: $("#frequency-input").val().trim(),
        }
    
        database.ref('train/').push(trainInfo)
    
    });
    
    //------------------------------------------------------------------------------------------
    
    database.ref('train/').on("child_added", function(childSnapshot) {
        var newTrain = childSnapshot.val();
    
        console.log(newTrain.name);
        console.log(newTrain.destination);
        console.log(newTrain.time);
        console.log(newTrain.frequency);
            
        var trainRow = $('<tr>');
    //----------------------------------------------
        var trainName = $('<td>');
        var trainDestination = $('<td>');
        var trainTime = $('<td>');
        var trainFrequency = $('<td>');
        var trainMin = $('<td>');
    
        trainName.text(newTrain.name);
        trainDestination.text(newTrain.destination);
        trainTime.text(newTrain.time);
        trainFrequency.text(newTrain.frequency);
        trainMin.text(tMinToTrain);
    
         
    
        trainRow.append(trainName);
        trainRow.append(trainDestination);
        trainRow.append(trainTime);
        trainRow.append(trainFrequency);
        trainRow.append(trainMin);
    
        var currentTime = moment();
        console.log("The current time is: " + moment(currentTime).format("hh:mm"));
        var timeConvert = moment(trainTime, "hh:mm").subtract(1, "years");
        console.log(timeConvert);
        var diffTime = moment().diff(moment(timeConvert), "minutes");
        var tRemainder = diffTime % trainFrequency;
        console.log(tRemainder);
        var tMinToTrain = trainFrequency - tRemainder;
        console.log("Minutes until next train: " + tMinToTrain);
        var nextTrain = currentTime.add(tMinToTrain, "minute");
        console.log("Time to next train: " + trainMin);
    
        $('#train-display').append(trainRow);   
    
    }),
    
    function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    }
    
    
    });