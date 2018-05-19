package com.asad.rest.restServices;




import java.util.ArrayList;
import java.util.List;


import javax.ejb.EJB;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;

import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.asad.guessTheNumberService.AdminData;
import com.asad.guessTheNumberService.CheckTheNumber;
import com.asad.guessTheNumberService.CheckTheNumberResults;
import com.asad.guessTheNumberService.ejbs.GuessTheNumberEjbService;
import com.asad.guessTheNumberService.entitys.Player;



@Path("/appServices")
public class GuessTheNumberRestServices {

	@EJB(mappedName="gussTheNumber1")
	private GuessTheNumberEjbService guessTheNmberService;
	
	
	@Path("/insertPlayer")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public int saveTheGuesses(Player player) {
		System.out.println(player.getName());
		int id =guessTheNmberService.insertPlayer( player);
		return id;	
		}
	@Path("/getHighScores")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Player> listHighScoreLimit12( ){
		
		List<Player> players = new ArrayList<>();
		
		try {
		 players =
				guessTheNmberService.listTheFirstTwelveOrAllPlayers(false);
		
		
		}catch(Exception e ){
			
			System.out.println(e.getMessage());
			return new ArrayList<>();
		}
		return players;
		
	}

	@Path("/deleteHighScoreTable")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public String deleteHighScoreTable(AdminData adminData) {
		if(adminData.getPassword().equals("admin") && adminData.getUserName().equals("admin")) {
			List<Player> players =
					guessTheNmberService.listTheFirstTwelveOrAllPlayers(true);
			
			guessTheNmberService.deleteAll(players);
			return "true";
			
		}
		return "false";
	}
	
	@Path("/getGameId")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public int getGameId() {
		
	return	guessTheNmberService.generateGameIdAndAnumberToGuess();
	
	}
	
	

	@Path("/checkTheGuessedNumber")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public CheckTheNumberResults checkTheGuessedNumber(CheckTheNumber check) {
		System.out.println(check);
		return this.guessTheNmberService.checkTheNumber(check);
		
	}

	
	
	
	
	
}
