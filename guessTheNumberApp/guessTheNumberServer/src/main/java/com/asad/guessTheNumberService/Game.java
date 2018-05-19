package com.asad.guessTheNumberService;

public class Game {
	
	
private String number;
private int numberOfGuesses;


public Game(String number, int numberOfGuesses) {
	super();
	this.number = number;
	this.numberOfGuesses = numberOfGuesses;
}
public String getNumber() {
	return number;
}
public void setNumber(String number) {
	this.number = number;
}
public int getNumberOfGuesses() {
	return numberOfGuesses;
}
public void setNumberOfGuesses(int numberOfGuesses) {
	this.numberOfGuesses = numberOfGuesses;
}


}
