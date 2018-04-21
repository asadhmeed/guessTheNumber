const app ={
userName :"",
timesToGuess : 20,
guessesCount:0,
number:"",
baseURL:"",
}

function hideTheGameOnStart(){
    setDisplayNone("game-grid")
}

function setDisplayNone(elementId) {
    element(elementId).style.display = "none";
}
    
    function setDisplayBlock(elementId){
        element(elementId).style.display = "block";
    }

    function startTheGame(){
       element("guessedNum").value ="";
        element("startBTN").style.visibility="hidden";
        if(element("userName").value !== ""){
            setDisplayNone("start-menu");
            setDisplayBlock("game-grid");
            app.userName = element("userName").value;
            element("name-display-text").innerHTML = app.userName +" turn";
            //TODO
            getTheNumberToGuess();

            element("userName").value="";
        }
        else{
         
            let worningText=element("name-worning")
            worningText.innerText = "Error Enter your User Name ...!!!";
            worningText.style.color ="red";
        }
        element("startBTN").style.visibility="";
    }


    function checkTheGessedNumber(){
        element("checkNumberBTN").style.visibility="hidden";
            const guessedNumber =element("guessedNum").value ;
        if (guessedNumber % 1 != 0) {
            element("checked-number-worning").innerText =" error cannot enter anumber of 4 digets";  
            element("checkNumberBTN").style.visibility="";
        } else{   
        if (guessedNumber.length === 4) {
            app.guessesCount++;

        //
            console.log(guessedNumber+" guess number " +app.guessesCount );
        //    
            if (guessedNumber == app.number) {
                sendTheNumberOfGuessesToDataBase();// TODO

                app.guessesCount=0;

            } else {
                element("checked-number-worning").innerText =" worng number Enter anther one!!";
            }
            
        } else{
            element("checked-number-worning").innerText =" worng number !! number most be 4 digets Enter anther one!!";

        }
        element("checkNumberBTN").style.visibility="";
        if (app.guessesCount== app.timesToGuess) {
            element("checkNumberBTN").style.visibility="hidden";
            element("checked-number-worning").innerText =" click the restart button your guesses are 20 guesses";
        }
    }
    }



    function getTheNumberToGuess(){ //TODO
        let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log("new number " + this.responseText);
			
		}
	};
	xhttp.open("get", app.baseURL + "/getNumber", true);
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.send();
        
    }

    function sedTheNumberOfGuessesToDataBase(){

       const plyer={
           name:app.name,
           numberOfGuesses:app.numberOfGuesses,

       }

       let xhttp = new XMLHttpRequest();
	       xhttp.onreadystatechange = function() {
		    if (this.readyState == 4 && this.status == 200) {
			   console.log("new id is " + this.responseText);
			
		}
	};
	xhttp.open("POST", app.baseURL + "/insertPlayer", true);
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.send(JSON.stringify(plyer));
    }
  






function element(elementId){
  return  document.getElementById(elementId);
}