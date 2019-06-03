var firebaseConfig = {
    apiKey: "AIzaSyDnZMuNQFSMzp42YqmDXjHglA4Om9BA94o",
    authDomain: "train-scheduler-e1ee3.firebaseapp.com",
    databaseURL: "https://train-scheduler-e1ee3.firebaseio.com",
    projectId: "train-scheduler-e1ee3",
    storageBucket: "",
    messagingSenderId: "1096949344327",
    appId: "1:1096949344327:web:aef9dcfaa04c420a"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  // Button for adding train

  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    // Takes the input from the user
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainTime = $("#train-time-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();

    // Creates a local temporary object to hold the data from the user
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        time: trainTime,
        frequency: trainFrequency,
    };

    // Uploads train data to database
    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);

    alert("New train successfully added");

    // Clears all the text from the input fields
    $("#train-name-input").val("")
    $("#destination-input").val("")
    $("#train-time-input").val("")
    $("#frequency-input").val("")
  });

  // Create Firebase event for adding train to the database and a row in the html when user adds a new train

  database.ref().on("child_added", function(childSnapshot){
    console.log(childSnapshot.val());

    // Stores everything into a variable
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().frequency;

    //Train info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainTime);
    console.log(trainFrequency);

    // setting format for train time
    var newTrainFormat = moment.unix(trainTime).format("HH:mm");
    


    // Calculate the train frequency
    var minutesAway

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(newTrainFormat),
        $("<td>").text(trainFrequency),
        $("<td>").text(minutesAway),
    );

    // append the new row to the table
    $("#train-table > tbody").append(newRow);

  });