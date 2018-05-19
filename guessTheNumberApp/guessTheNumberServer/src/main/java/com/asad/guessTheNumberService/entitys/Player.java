package com.asad.guessTheNumberService.entitys;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "highScoreTable")
public class Player {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column(name="playerName")
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
