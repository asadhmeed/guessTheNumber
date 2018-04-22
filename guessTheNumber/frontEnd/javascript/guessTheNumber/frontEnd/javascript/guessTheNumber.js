const app = {
    userName: "",
    timesToGuess: 20,
    guessesCount: 0,
    number: "",
    baseURL: "",
    guessesNumbers: [],
    firstGame: false,
    highScoreTable: [],
}

// tasks
// clear button
// restart button
// display the guesses in the table withe auto update and check the digets and display the corect digets and the wrong ones
// display the high score table withe auto update


function hideTheGameOnStart() {
    setDisplayNone("game-grid")
}



function startTheGame() {
    if (!app.firstGame) {
        app.firstGame = true;
        setDisplayNone("high-score-table");
    }
    element("guessedNum").value = "";
    element("startBTN").style.visibility = "hidden";
    if (element("userName").value !== "") {
        setDisplayNone("start-menu");
        setDisplayVisible("game-grid");
        app.userName = element("userName").value;
        element("name-display-text").innerHTML = app.userName + " turn";
        //TODO
        getTheNumberToGuess();

        element("userName").value = "";
        // element("high-score-table").style.display="none";
    }
    else {

        let worningText = element("name-worning")
        worningText.innerText = "Error Enter your User Name ...!!!";
        worningText.style.color = "red";
    }
    element("startBTN").style.visibility = "";
}
function restartTheGame() {
    app.numberOfGuesses = 0;
    app.guessesCount = 0;
    app.guessesNumbers = [];
    element("startBTN").style.visibility = "";
    element("checkNumberBTN").style.visibility = "";

}


function checkTheGuessedNumber() {
    element("checkNumberBTN").style.visibility = "hidden";
    const guessedNumber = element("guessedNum").value;
    if (guessedNumber % 1 != 0) {//check if the user entered a number and not characters
        element("checked-number-worning").innerText = " error cannot enter anumber of 4 digets";
        element("checkNumberBTN").style.visibility = "";
    } else {

        if (guessedNumber.length === 4) {
            app.guessesCount++;
            app.guessesNumbers[app.guessesCount] = guessedNumber;
            //
            console.log(guessedNumber + " guess number " + app.guessesCount + " " + app.guessesNumbers);
            //    
            let result = "";
            for (let i = 0; i < guessedNumber.length; i++) {
                if (guessedNumber[i] == app.number[i]) {
                    result += "<div style='background-color:green; color : white; display:inline; ' >0</div> <div style=' display:inline; ' > </div>";
                } else {
                    result += "<div style='background-color:red; color : white; display:inline; ' >0</div> <div style=' display:inline; ' > </div>";
                }
            }
            let tableRow = "<tr><td>" + app.guessesCount + "</td><td>" + guessedNumber + "</td><td>" + result + "</td></tr>"
            

            element("guesses-table").innerHTML += tableRow;

            if (guessedNumber == app.number) {
                sendTheNumberOfGuessesToDataBase();// TODO
                element("checkNumberBTN").style.visibility = "hidden";
                app.guessesCount = 0;

            } else {
                element("checked-number-worning").innerText = " worng number Enter anther one!!";
                element("checkNumberBTN").style.visibility = "";
            }

        } else {
            element("checked-number-worning").innerText = " worng number !! number most be 4 digets Enter anther one!!";
            element("checkNumberBTN").style.visibility = "";
        }
        
        if (app.guessesCount == app.timesToGuess) {
            element("checkNumberBTN").style.visibility = "hidden";
            element("checked-number-worning").innerText = " click the restart button your guesses are 20 guesses";
            sendTheNumberOfGuessesToDataBase();
        }
    }
}



function getTheNumberToGuess() { //TODO
    app.number="0147";
    //     let xhttp = new XMLHttpRequest();
    // xhttp.onreadystatechange = function() {
    // 	if (this.readyState == 4 && this.status == 200) {
    // 		console.log("new number " + this.responseText);

    // 	}
    // };
    // xhttp.open("get", app.baseURL + "/getNumber", true);
    // xhttp.setRequestHeader("Content-Type", "application/json");
    // xhttp.send();

}

function sendTheNumberOfGuessesToDataBase() {

    setDisplayVisible("high-score-table");

    const plyer = {
        name: app.name,
        numberOfGuesses: app.numberOfGuesses,

    }

    //    let xhttp = new XMLHttpRequest();
    //        xhttp.onreadystatechange = function() {
    // 	    if (this.readyState == 4 && this.status == 200) {
               console.log(this.responseText);
               app.highScoreTable=JSON.parse( this.responseText);
               creatTheHighScoreTable(app.highScoreTable);
    // 	}
    // };
    // xhttp.open("POST", app.baseURL + "/insertPlayer", true);
    // xhttp.setRequestHeader("Content-Type", "application/json");
    // xhttp.send(JSON.stringify(plyer));
}
function creatTheHighScoreTable(highScoreTable) {
    for (let i = 0; i < highScoreTable.length; i++) {
       // "<tr><td>" + app.guessesCount + "</td><td>" + guessedNumber + "</td><td>" + result + "</td></tr>"
         const tableRow = "<tr><td>"+ i +"</td><td>" + highScoreTable[i].name + "</td><td>" + highScoreTable[i].numberOfGuesses + "</td></tr>;
        element("high-score-table").innerHTML += tableRow;
    }
}

function setDisplayVisible(elementId) {
    element(elementId).style.display = "";
}


function setDisplayNone(elementId) {
    element(elementId).style.display = "none";
}



function element(elementId) {
    return document.getElementById(elementId);
}