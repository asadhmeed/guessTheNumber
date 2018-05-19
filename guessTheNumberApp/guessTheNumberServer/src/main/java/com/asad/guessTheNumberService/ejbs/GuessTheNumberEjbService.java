package com.asad.guessTheNumberService.ejbs;

import java.util.List;

import javax.ejb.Local;

import com.asad.guessTheNumberService.CheckTheNumber;
import com.asad.guessTheNumberService.CheckTheNumberResults;
import com.asad.guessTheNumberService.entitys.Player;

@Local
public interface GuessTheNumberEjbService {

	
	public void deleteAll(List<Player> player);
	public List<Player> listTheFirstTwelveOrAllPlayers(boolean isListAll);
	public String ganerateTheNumber();
	public int insertPlayer(Player player);
	int generateGameIdAndAnumberToGuess();
	public CheckTheNumberResults checkTheNumber(CheckTheNumber check);
	
	
}
