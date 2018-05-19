package com.asad.guessTheNumberService;

public class CheckTheNumber {

	private int gameId;
	private String guessedNumber;
	public int getGameId() {
		return gameId;
	}
	public void setGameId(int gameId) {
		this.gameId = gameId;
	}
	public String getGuessedNumber() {
		return guessedNumber;
	}
	public void setGuessedNumber(String guessedNumber) {
		this.guessedNumber = guessedNumber;
	}
	@Override
	public String toString() {
		return "CheckTheNumber [gameId=" + gameId + ", guessedNumber=" + guessedNumber + "]";
	}
	
	
}
