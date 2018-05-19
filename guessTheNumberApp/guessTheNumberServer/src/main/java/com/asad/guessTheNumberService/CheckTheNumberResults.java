package com.asad.guessTheNumberService;

public class CheckTheNumberResults {

	private boolean isTheNumberOfDigitsCorrect;
	private boolean isTheNumberDoesNotContainACharacter;
	private boolean isTheNumberDoesNotContainAduplicateDigits;
	private String theNumberIsGuessed;
	private boolean isTwentyChecks;
	private int numberOfGuesses;
	     
	
	





	




	public int getNumberOfGuesses() {
		return numberOfGuesses;
	}





	public void setNumberOfGuesses(int numberOfGuesses) {
		this.numberOfGuesses = numberOfGuesses;
	}





	public void setTwentyChecks(boolean isTwentyChecks) {
		this.isTwentyChecks = isTwentyChecks;
	}





	public boolean getIsTwentyChecks() {
		return isTwentyChecks;
	}





	public void setIsTwentyChecks(boolean isTwentyChecks) {
		this.isTwentyChecks = isTwentyChecks;
	}





	public String getTheNumberIsGuessed() {
		return theNumberIsGuessed;
	}





	public void setTheNumberIsGuessed(String theNumberIsGuessed) {
		this.theNumberIsGuessed = theNumberIsGuessed;
	}





	public boolean isTheNumberOfDigitsCorrect() {
		return isTheNumberOfDigitsCorrect;
	}





	public void setTheNumberOfDigitsCorrect(boolean isTheNumberOfDigitsCorrect) {
		this.isTheNumberOfDigitsCorrect = isTheNumberOfDigitsCorrect;
	}





	public boolean isTheNumberDoesNotContainACharacter() {
		return isTheNumberDoesNotContainACharacter;
	}





	public void setTheNumberDoesNotContainACharacter(boolean isTheNumberDoesNotContainACharacter) {
		this.isTheNumberDoesNotContainACharacter = isTheNumberDoesNotContainACharacter;
	}





	public boolean isTheNumberDoesNotContainAduplicateDigits() {
		return isTheNumberDoesNotContainAduplicateDigits;
	}





	public void setTheNumberDoesNotContainAduplicateDigits(boolean isTheNumberContainAduplicateDigits) {
		this.isTheNumberDoesNotContainAduplicateDigits = isTheNumberContainAduplicateDigits;
	}





	@Override
	public String toString() {
		return "CheckTheNumberResults [isTheNumberOfDigitsCorrect=" + isTheNumberOfDigitsCorrect
				+ ", isTheNumberDoesNotContainACharacter=" + isTheNumberDoesNotContainACharacter
				+ ", isTheNumberDoesNotContainAduplicateDigits=" + isTheNumberDoesNotContainAduplicateDigits + "]";
	}





	
	
}
