package com.asad.rest.restServices;



import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.asad.rest.Player;


@Path("/appServices")
public class GuessTheNumberRestServices {

	
	@GET
	@Path("/getNumber")
	@Produces(MediaType.APPLICATION_JSON)
	public String getNumber() {
		return "0123";
	}
	
	@Path("/insertPlayer")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public String saveTheGuesses(Player player) {
		System.out.println(player.getName());
		return player.getName();	
		}
	@Path("/getHighScores")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Player> listHighScoreLimit12(){
		List<Player> players = new ArrayList<>();
		players.add(new Player(1,"asad",12));
		return players;
	}
	
}
