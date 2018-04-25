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
// display the guesses in the table with auto update and check the digits and display the corect digits and the wrong ones
// display the high score table withe auto update


function hideTheGameOnStart() {
    setDisplayNone("admenPasswordId");
    setDisplayNone("nameSubmet");
    setDisplayNone("game-grid");

}



function startTheGame() {
    if (!app.firstGame) {
        app.firstGame = true;
        setDisplayNone("high-score-table");
    }
    element("guessedNum").value = "";
    setVisibilityOn("startBTN");
    // if (element("userName").value !== "") {
    setDisplayNone("start-menu");
    setDisplayVisible("game-grid");

    //TODO
    getTheNumberToGuess();

    element("userName").value = "";
    // element("high-score-table").style.display="none";
    // }
    // else {

    //     let worningText = element("name-worning")
    //     worningText.innerText = "Error Enter your User Name ...!!!";
    //     worningText.style.color = "red";
    // }
    setVisibilityOn("startBTN");
}


function checkTheGuessedNumber() {
    setVisibilityOff("checkNumberBTN");
    const guessedNumber = element("guessedNum").value;
    if (guessedNumber % 1 != 0) {//check if the user entered a number and not characters
        element("checked-number-worning").innerText = " Error what you entered is not anumber. enter a number of 4 different digets";
        setVisibilityOn("checkNumberBTN");
    } else {

        if (guessedNumber.length === 4) {

            if (!checkIfTheGuessedNumberIsContainsADifferentDigits(guessedNumber)) {
                element("checked-number-worning").innerText = "Error !! Enter a Number With four Different Digits";
                setVisibilityOn("checkNumberBTN");
            } else {
                app.guessesCount++;
                app.guessesNumbers[app.guessesCount] = guessedNumber;
                //
                console.log(guessedNumber + " guess number " + app.guessesCount + " " + app.guessesNumbers);
                //    
                let result = "";

                for (let i = 0; i < guessedNumber.length; i++) {
                    let isTheNumbersInTheSameDiget = false;
                    let isTheNumbersEqualsAndNotInTheSameDigits = false;
                    for (let j = 0; j < guessedNumber.length; j++) {

                        if (guessedNumber[i] == app.number[j]) {
                            isTheNumbersInTheSameDiget = i == j;
                            isTheNumbersEqualsAndNotInTheSameDigits = i !== j;

                        }
                    }
                    if (isTheNumbersInTheSameDiget) {
                        result += "<div style='background-color:green; color : white; display:inline; ' >0</div> <div style=' display:inline; ' > </div>";
                    } else if (isTheNumbersEqualsAndNotInTheSameDigits) {
                        result += "<div style='background-color:red; color : white; display:inline; ' >0</div> <div style=' display:inline; ' > </div>";
                    }

                }


                let tableRow = "";
                if (guessedNumber == app.number) {
                    sendTheNumberOfGuessesToDataBase();
                    setVisibilityOff("checkNumberBTN");
                    element("checked-number-worning").innerText = "Enter your name and submet the Results to send it to the database";
                    app.guessesCount = 0;
                    setDisplayVisible("nameSubmet");
                    tableRow = "<tr style='background-color:#a6ff00;'><td>" + app.guessesCount + "</td><td>" + guessedNumber + "</td><td>" + result + "</td></tr>";

                } else {
                    element("checked-number-worning").innerText = " worng number Enter anther one!!";
                    setVisibilityOn("checkNumberBTN");
                    tableRow = "<tr><td>" + app.guessesCount + "</td><td>" + guessedNumber + "</td><td>" + result + "</td></tr>";
                }

                element("guesses-table").innerHTML += tableRow;
            }


        } else {
            element("checked-number-worning").innerText = " worng number !! number most be 4 digets Enter anther one!!";
            setVisibilityOn("checkNumberBTN");
        }

        if (app.guessesCount == app.timesToGuess) {
            
            setVisibilityOff("checkNumberBTN");
            clearTheGame();
        }
    }
}

function checkIfTheGuessedNumberIsContainsADifferentDigits(number) {

    let isTheNumberValide = "";
    for (let digitIndex = 0; digitIndex < number.length; digitIndex++) {
        let dublicatDigits = 0;
        for (let j = 0; j < number.length; j++) {
            if (number[digitIndex] == number[j]) {
                dublicatDigits++;
            }

        }
        if (dublicatDigits > 1) {
            isTheNumberValide += "0";
        } else {
            isTheNumberValide += "1";
        }

    }
    console.log(isTheNumberValide);
    return isTheNumberValide === "1111";
}

function getTheNumberToGuess() { //TODO
    app.number = "0147";
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


function submetTheGameResults() {
    setDisplayVisible("high-score-table");
    setDisplayVisible("nameSubmet");
    if (element("userName").value !== "") {
        sendTheNumberOfGuessesToDataBase();
    } else {
        setDisplayNone("submetNamebtn");
        let worningText = element("checked-number-worning")
        worningText.innerText = "Error Enter your Name ...!!!";
        worningText.style.color = "red";
    }
    sendTheNumberOfGuessesToDataBase();
    clearTheGame();
}

function clearTheGame() {
    app.userName = "",
        getTheNumberToGuess();
    app.guessesNumbers = [];
    setVisibilityOn("checkNumberBTN");
    
    setDisplayVisible("submetNamebtn");
    setDisplayNone("nameSubmet");
    element("checked-number-worning").innerText = "guess  anther number";
    element("guesses-table").innerHTML = " <tr> <th>#</th> <th>Guess</th> <th>Result</th></tr>";
    element("guessedNum").value = "";
    app.guessesCount = 0;

}

function sendTheNumberOfGuessesToDataBase() {



    const plyer = {
        name: app.name,
        numberOfGuesses: app.numberOfGuesses,

    }

    //    let xhttp = new XMLHttpRequest();
    //        xhttp.onreadystatechange = function() {
    // 	    if (this.readyState == 4 && this.status == 200) {
    // console.log(this.responseText);
    // app.highScoreTable = JSON.parse(this.responseText);
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
        const tableRow = "<tr><td>" + i + "</td><td>" + highScoreTable[i].name + "</td><td>" + highScoreTable[i].numberOfGuesses + "</td></tr>";
        element("high-score-table").innerHTML += tableRow;
    }
}


function clearHighScoreTable() {
setDisplayVisible("admenPasswordId");
getAdmenPassword();


}
function getAdmenPassword(){
    //     let xhttp = new XMLHttpRequest();
    // xhttp.onreadystatechange = function() {
    // 	if (this.readyState == 4 && this.status == 200) {
    // 		console.log("admen password is " + this.responseText);
            // return this.responseText;
    // 	}
    // };
    // xhttp.open("get", app.baseURL + "/getAdmenPasword", true);
    // xhttp.setRequestHeader("Content-Type", "application/json");
    // xhttp.send();
}

function setVisibilityOff(elementId) {
    element(elementId).style.visibility ="hidden";
}
function setVisibilityOn(elementId) {
    element(elementId).style.visibility ="";
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