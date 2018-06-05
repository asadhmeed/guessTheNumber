const app = {
	userName : "",
	timesToGuess : 20,
	baseURL : "api/appServices",
	guessesNumbers : [],
	highScoreTable : [],
	adminPass : "",
	adminUser : "",
	gameId : 0,

}
// on the start only the start view  should be display
function hideTheGameOnStart() {
	//display none hides the view
	setDisplayNone("admenPasswordId");
	setDisplayNone("nameSubmet");
	setDisplayNone("game-grid");

}

function hideTheGameButtons() {
	setVisibilityOff("checkNumberBTN");
	setVisibilityOff("submetNamebtn");
	setVisibilityOff("clearBTN");
	setVisibilityOff("restartBTN");
}
function showTheGameButtons() {
	setVisibilityOn("checkNumberBTN");
	setVisibilityOn("submetNamebtn");
	setVisibilityOn("clearBTN");
	setVisibilityOn("restartBTN");
}
// restart the game returns the game to default view with default arguments
function restartTheGame() {
	app.userName = "";
	app.guessesNumbers = [];
	setVisibilityOn("checkNumberBTN");
	setDisplayVisible("submetNamebtn");
	setDisplayNone("nameSubmet");
	


	element("guesses-table").innerHTML = " <tr> <th>#</th> <th>Guess</th> <th>Result</th></tr>";
	element("guessedNum").value = "";
	setDisplayNone("high-score-table");
	hideTheGameOnStart();
	setDisplayVisible("start-menu");
	setVisibilityOn("submetNamebtn");
}

// the function sends a request to get game id from the server
function getGameId() {
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log("new Game Id " + this.responseText);
			app.gameId = this.responseText;
		}
	};
	xhttp.open("get", app.baseURL + "/getGameId", true);
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.send();
}

// when the player presses the start game button this function shows the game box 
// and setup the game component to default values
function startTheGame() {
    
	setDisplayNone("high-score-table");
	getGameId();
	setTheElementInnerTextWithNewColor("checked-number-worning","guess  a number","black");
	element("guessedNum").value = "";
	setDisplayNone("start-menu");
	setDisplayVisible("game-grid");
	element("userName").value = "";
	setVisibilityOn("startBTN");
}

// on click the check button checks if the number valid and send it to the
// server for more validation
// and return validation results and guesses times and if the number is guessed
// and the digits that been guessed correctly
function checkTheGuessedNumber() {
	setVisibilityOff("checkNumberBTN");
	const CheckTheNumber = {
		gameId : app.gameId,
		guessedNumber : element("guessedNum").value,

	}
	if (CheckTheNumber.guessedNumber % 1 != 0) {// check if the user entered a
		// number and
		// not characters
		setTheElementInnerTextWithNewColor("checked-number-worning"," Error what you entered is not anumber. enter a number of 4 different digets","#df2920");


		setVisibilityOn("checkNumberBTN");
	} else {
		if (CheckTheNumber.guessedNumber.length === 4) {// checks if the length
														// of the number is
														// equal to 4
			let xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					console.log(this.responseText);
					const response = JSON.parse(this.responseText);
					if (!response.gameIdIsNotValid) {
						
					
					if (!response.theNumberDoesNotContainACharacter) {// check
						// if
						// the
						// user entered
						// a number and
						// not characters
						setTheElementInnerTextWithNewColor("checked-number-worning"," Error what you entered is not anumber. enter a number of 4 different digets","#df2920");

						setVisibilityOn("checkNumberBTN");
					} else {

						if (response.theNumberOfDigitsCorrect) { // more
																	// validation
																	// for the
																	// number of
																	// digits
																	// that has
																	// been
																	// checked
																	// in the
																	// server
																	// side

							if (!response.theNumberDoesNotContainAduplicateDigits == true) {// check
																							// if
																							// the
																							// guessed
																							// number
																							// does
																							// not
																							// have
																							// a
																							// duplicate
																							// digits
								setTheElementInnerTextWithNewColor("checked-number-worning","Error !! Enter a Number With four Different Digits","#df2920");

								setVisibilityOn("checkNumberBTN");
							} else {
								
								app.guessesNumbers[response.numberOfGuesses] = CheckTheNumber.guessedNumber;
								// log
								console.log(CheckTheNumber.guessedNumber
										+ " guess number "
										+ response.numberOfGuesses + " "
										+ app.guessesNumbers);
								// build the results of the digits that has been
								// guessed correctly.
								// "0" red box for the digits that been guessed
								// but not in the same digit index thats in the
								// number to guess
								// and "1" green box for the digits that was
								// guessed correctly on the same digit index
								let result = "";
								const theDigitsThatGuessedRight = response.theNumberIsGuessed;

								for (let j = 0; j < theDigitsThatGuessedRight.length; j++) {

									if (theDigitsThatGuessedRight[j] === "1") {
										result += "<div style='background-color:green; color : white; display:inline; ' >0</div> <div style=' display:inline; ' > </div>";

									}
									if (theDigitsThatGuessedRight[j] === "0") {
										result += "<div style='background-color:red; color : white; display:inline; ' >0</div> <div style=' display:inline; ' > </div>";

									}

								}
								// 1111 means that the number is guessed
								// correctly on the same digit index
								// building the table row depends on the
								// validation results from the server
								let tableRow = "";
								if (theDigitsThatGuessedRight == "1111") {

									setVisibilityOff("checkNumberBTN");
									setTheElementInnerTextWithNewColor("checked-number-worning","Enter your name and submet the Results to send it to the database","black");


									setDisplayVisible("nameSubmet");
									tableRow = "<tr style='background-color:#a6ff00;'><td>"
											+ response.numberOfGuesses
											+ "</td><td>"
											+ CheckTheNumber.guessedNumber
											+ "</td><td>"
											+ result
											+ "</td></tr>";

								} else {
									setTheElementInnerTextWithNewColor("checked-number-worning"," worng number Enter anther one!!","#df2920");

									setVisibilityOn("checkNumberBTN");
									tableRow = "<tr><td>"
											+ response.numberOfGuesses
											+ "</td><td>"
											+ CheckTheNumber.guessedNumber
											+ "</td><td>" + result
											+ "</td></tr>";
								}

								element("guesses-table").innerHTML += tableRow;
							}

						} else {
							setTheElementInnerTextWithNewColor("checked-number-worning"," worng number !! number most be 4 digets Enter anther one!!","#df2920");

							setVisibilityOn("checkNumberBTN");
						}

						if (response.isTwentyChecks) {

							setVisibilityOff("checkNumberBTN");

						}
					}
					}else{
						setTheElementInnerTextWithNewColor("checked-number-worning"," worning Restart the game game id is not valid!!","#df2920");
					}
				}
			};
			xhttp.open("post", app.baseURL + "/checkTheGuessedNumber", true);
			xhttp.setRequestHeader("Content-Type", "application/json");
			xhttp.send(JSON.stringify(CheckTheNumber));
		} else {
			setTheElementInnerTextWithNewColor("checked-number-worning"," worng number !! number most be 4 digets Enter anther one!!","#df2920");


			setVisibilityOn("checkNumberBTN");
		}
	}

}

// submit the game results to and checks if the player name is entered
// if not displays a error message
function submetTheGameResults() {

	setDisplayVisible("nameSubmet");

	if (element("userName").value !== "") {
		app.userName = element("userName").value;

		sendTheNumberOfGuessesToDataBase();
		
	} else {

		
		setTheElementInnerTextWithNewColor("checked-number-worning","Error Enter your Name ...!!!","#df2920");

	}

}

// sends the player info to be saved in the data base
//
function sendTheNumberOfGuessesToDataBase() {
	setVisibilityOff("submetNamebtn");
	const player = {

		name : app.userName,
		gameId:app.gameId,

	};

	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log(this.responseText);
			
			// check if the name is already exists in the data base 
			if (this.responseText == "errorEnterAntherName" ) {
				setTheElementInnerTextWithNewColor("checked-number-worning","the name you Enter is already used enter anther one","#df2920");
				setVisibilityOn("submetNamebtn");
				
			} else {
				
				setVisibilityOff("submetNamebtn");
				getHighScoreTableFromDataBase();
				setDisplayVisible("high-score-table");

			}

		}
	};

	xhttp.open("POST", app.baseURL + "/insertPlayer", true);
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.send(JSON.stringify(player));

}

// gets the first ten high score data from the data base
function getHighScoreTableFromDataBase() {
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log(this.responseText);
			app.highScoreTable = JSON.parse(this.responseText);
			for ( var player in app.highScoreTable) {
				if(app.name === player.name){
					setTheElementInnerTextWithNewColor("checked-number-worning","Congratulations you are one of the first ten players in highe scores table , press the restart the game button!!","black");
				}
			}
			creatTheHighScoreTable(app.highScoreTable);

		}
	};
	xhttp.open("get", app.baseURL + "/getHighScores", true);
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.send();
}
// read the title of the function
function creatTheHighScoreTable(highScoreTable) {
	element("high-score-table").innerHTML = "<tr><th>#</th><th>Name</th><th>Number of Guesses</th></tr>";
	for (let i = 0; i < highScoreTable.length; i++) {

		const tableRow = "<tr><td>" + (i + 1) + "</td><td>"
				+ highScoreTable[i].name + "</td><td>"
				+ highScoreTable[i].numberOfGuesses + "</td></tr>";
		element("high-score-table").innerHTML += tableRow;
	}
}

function setAdminPopUpDisplayVisible() {

	setDisplayVisible("admenPasswordId");

}
// the function checks if the admin user name and password valid .
// if admin user name and password are valid the high score data well be deleted
// .
function checkAdminUserNameAndPasswordAndDeletHighScoreData() {

	const adminData = {
		password : element("admin-pass").value,
		userName : element("admin-user").value,
	}
	console.log(adminData);
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log("deleted " + this.responseText);
			let adminDataValidation = JSON.parse(this.responseText);
			if (this.responseText == "true") {
				
				
				setTheElementInnerTextWithNewColor("admin-pass-error","Data successfully deleted","green");

				setVisibilityOn("admin-pass-error");

			} else if (this.responseText == "false") {
				setTheElementInnerTextWithNewColor("admin-pass-error","Error Admin password or user name is worng","#df2920");

				setVisibilityOn("admin-pass-error");

			}

		}
	};
	xhttp.open("post", app.baseURL + "/deleteHighScoreTable", true);
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.send(JSON.stringify(adminData));

}
//takes a elementId,text and a color .
//change  the text color and change the element inner text with the new colored text
function setTheElementInnerTextWithNewColor(elementId,text,color){
	let worningText = element(elementId)
	worningText.innerText = text;
	worningText.style.color = color;
}

function setVisibilityOff(elementId) {
	element(elementId).style.visibility = "hidden";
}
function setVisibilityOn(elementId) {
	element(elementId).style.visibility = "";
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