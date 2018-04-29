package com.asad.rest;

public class Player {

	private int id;
	private String name;
	private int numberOfGuesses;
	
	public Player() {
		
	}
	public Player(int id,String name, int numberOfGuesses) {
		this.id =id;
		this.name=name;
		this.numberOfGuesses=numberOfGuesses;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getNumberOfGuesses() {
		return numberOfGuesses;
	}

	public void setNumberOfGuesses(int numberOfGuesses) {
		this.numberOfGuesses = numberOfGuesses;
	}

	@Override
	public String toString() {
		return "Score [id=" + id + ", name=" + name + ", numberOfGuesses=" + numberOfGuesses + "]";
	}
	
	
}
