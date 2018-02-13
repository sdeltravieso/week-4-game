// variable for the random target number we will play to match
var randomTargetNumber;
// array to hold random numbers that will be assigned to images
var randomNumbers = [];
// array to hold images
var crystalImages = ["assets/images/redCrystal.png", 
                    "assets/images/clearCrystal.png", 
                    "assets/images/blueCrystal.png", 
                    "assets/images/greenCrystal.png"];

// counter and stats variables
var counter = 0;
var wins = 0;
var losses = 0;

function newGame() {
    // resetting images, randomNumbers array, counter, and score display.
    $('#crystals').empty();
    randomNumbers = [];
    counter = 0;
    $('#score').text(counter);


    // generate random target number between 19 and 120.
    randomTargetNumber = Math.floor((Math.random() * 101) + 19);
    $('#randomTargetNumber').text(randomTargetNumber);

    // generate UNIQUE random numbers between 1 and 12 to put into randomNumbers array. this will 
    // create the amount of random numbers as how many crystal images there are.
    while (randomNumbers.length < crystalImages.length) {
        var randomNumber = (Math.floor((Math.random() * 11) + 1));
        
        var notUniqueNumber = false;
        
        // for loop. if randomNumbers Array already has the random number already, 
        // set notUniqueNumber to true
        for ( var i = 0; i < randomNumbers.length; i++) {
            if(randomNumbers[i] === randomNumber) {
                notUniqueNumber = true;
            }
        }

        // if notUniqueNumber is false, add the number to the array.
        if(!notUniqueNumber) {
            randomNumbers.push(randomNumber);
        }

        // randomNumbers.push(Math.floor((Math.random() * 11) + 1));
    }
    // check random numbers in console log.
    for (var i = 0; i < randomNumbers.length; i++) {
        console.log(randomNumbers[i]);
    }

    // creating image and assigning each image a value from randomNumbers array.
    for (var i = 0; i < randomNumbers.length; i++) {

        // For each iteration, create an imageCrystal
        var imageCrystal = $("<img>");

        imageCrystal.addClass("crystalImage");

        // Each crystal image generated from crystal Images array, which holds all the images.
        imageCrystal.attr("src", crystalImages[i]);

        // Each imageCrystal will be given a data attribute called data-crystalValue.
        // The value of each crystal is each value in the randomNumbers[] array.
        imageCrystal.attr("data-crystalvalue", randomNumbers[i]);

        // add images and their attributes to the page.
        $("#crystals").append(imageCrystal);
    }

    $(".crystalImage").on("click", function () {
        // message stating the game is in progress
        $('#status').text("Game In Progress");
        //extract crystalvalue and store in local variable crystalValue. use this to get value from clicked crystal.
        var crystalValue = ($(this).attr("data-crystalvalue"));

        // convert numbers of the crystalValue attribute from strings to integers
        crystalValue = parseInt(crystalValue, 10);

        // add crystalValue to counter
        counter += crystalValue;
        // update counter on display
        $('#score').text(counter);
        // console log to make sure numbers are adding correctly.
        console.log("New score: " + counter);

        // logic to determine winner or loser. updates wins and losses on display. begins new game.
        if (counter === randomTargetNumber) {
            wins++;
            $('#status').text("You Win!!!!!!!! Play Again.");
            $('#wins').text("Wins: " + wins);
            console.log("You win!");
            newGame();
        }

        else if (counter >= randomTargetNumber) {
            losses++;
            $('#status').text("You Lose. Try Again.");
            $('#losses').text("Losses: " + losses);
            console.log("You lose!!");
            newGame();
        }

    });
}
// start new game
newGame();