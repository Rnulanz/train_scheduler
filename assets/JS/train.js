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
            time: $('#hours').val() + ":" + $('#minutes').val(),
            frequency: $("#frequency-input").val(),
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

        var trainName = $('<td>');
        var trainDestination = $('<td>');
        var trainTime = $('<td>');
        var trainFrequency = $('<td>');
        var trainMin = $('<td>');
    
    //----------------------------------------------

        var newName = newTrain.name;
        var newDest = newTrain.destination;
        var newTime = newTrain.time;
        var newFreq = newTrain.frequency

        var trainFirstMoment = moment(newTime, "HH:mm A");
        var differenceInMs = moment().diff(trainFirstMoment);

        var trainNextMoment = trainFirstMoment;

        if (differenceInMs > 0) {
            var remaining = (newFreq * 60000) - (differenceInMs % (newFreq * 60000));
            trainNextMoment = moment().add(remaining);
        }

        var trainArrivalTime = trainNextMoment.format("HH:mm");
        var minutesAway = Math.ceil(trainNextMoment.diff(moment()) / 60000);

        trainName.text(newName);
        trainDestination.text(newDest);
        trainTime.text(trainArrivalTime);
        trainFrequency.text(newFreq);
        trainMin.text(minutesAway);
    
         
    
        trainRow.append(trainName);
        trainRow.append(trainDestination);
        trainRow.append(trainTime);
        trainRow.append(trainFrequency);
        trainRow.append(trainMin);
    
    
        $('#train-display').append(trainRow);   
    
    }),
    
    function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    }
    
    
    });