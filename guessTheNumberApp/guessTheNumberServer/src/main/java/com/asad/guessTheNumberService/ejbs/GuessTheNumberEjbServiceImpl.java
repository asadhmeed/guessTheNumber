package com.asad.guessTheNumberService.ejbs;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import com.asad.guessTheNumberService.CheckTheNumber;
import com.asad.guessTheNumberService.CheckTheNumberResults;
import com.asad.guessTheNumberService.Game;
import com.asad.guessTheNumberService.PlayerInfoFromTheCliant;
import com.asad.guessTheNumberService.PlayerInsertedToDataBaseInfo;
import com.asad.guessTheNumberService.entitys.Player;

@Stateless(name = "gussTheNumber1")
public class GuessTheNumberEjbServiceImpl implements GuessTheNumberEjbService {

	private static int gameId;
	private static Map<Integer, Game> gamesStatus;

	@PersistenceContext(unitName = "guessTheNumberWeb")
	private EntityManager entityManager;

	public GuessTheNumberEjbServiceImpl() {
		GuessTheNumberEjbServiceImpl.gameId = 0;
		GuessTheNumberEjbServiceImpl.gamesStatus = new HashMap<>();
	}

	/**
	 * deletes all the data in the players table in the data base
	 */
	@TransactionAttribute(TransactionAttributeType.REQUIRED)
	@Override
	public void deleteAll(List<Player> players) {
		for (Player player : players) {
			entityManager.remove(entityManager.contains(player) ? player : entityManager.merge(player));
		}

	}

	/**
	 * return the list of all or the first twelve players from the data base depends
	 * on the input, true for the first ten players data false for all the
	 * players data
	 */
	@Override
	public List<Player> listTheFirstTenOrAllPlayers(boolean isListAll) {
		try {
			
			TypedQuery<Player> query = entityManager
					.createQuery("select p from Player p " + "order By p.numberOfGuesses ASC ", Player.class);
			
			if (!isListAll) {
				query.setMaxResults(10);
			}

			return query.getResultList();

		} catch (Exception e) {
			System.out.println(e.getMessage());
			List<Player> arr = new ArrayList<>();
			arr.add(new Player(1, "error", 0));

			return arr;
		}

	}

	@Override
	/**
	 * generates the number for the player to guess
	 */
	public String ganerateTheNumber() {
		boolean finshed = false;
		int count = 0;
		String theNumber = "";
		int[] theValideDigitsOfTheNumber = new int[10];
		while (!finshed) {
			int a = new Random().nextInt(10);
			if (theValideDigitsOfTheNumber[a] == 0) {
				theValideDigitsOfTheNumber[a] = 1;
				theNumber += a + "";
				count++;
			}
			if (count == 4) {
				finshed = true;
			}
		}
		System.out.println(theNumber);
		return theNumber;
	}

	/**
	 * inserts the player data to the data base table if the insert is ok (the name
	 * must be unique) then returns the id and if not (throws sql exception) returns
	 * errorEnterAntherName
	 */
	
	
	
	@TransactionAttribute(TransactionAttributeType.REQUIRED)
	@Override
	public String insertPlayer(PlayerInfoFromTheCliant player) {
		try {
			if (player != null) {
				Player newPlayer = new Player(null, player.getName(),
						GuessTheNumberEjbServiceImpl.gamesStatus.get(player.getGameId()).getNumberOfGuesses());
				entityManager.persist(newPlayer);
				return PlayerInsertedToDataBaseInfo.inserted.toString();
			}
		} catch (NullPointerException e) {
			return PlayerInsertedToDataBaseInfo.gameIdIsNotValid.toString();
		}
		catch (Exception e) {
			return PlayerInsertedToDataBaseInfo.errorEnterAntherName.toString();
		}
		return PlayerInsertedToDataBaseInfo.errorEnterAntherName.toString();
	}

	/**
	 * generate a game id and save a new game into the games status hash map with a
	 * new number for the player to guess.
	 */

	@Override
	public synchronized int generateGameIdAndAnumberToGuess() {

		GuessTheNumberEjbServiceImpl.gameId++;
		GuessTheNumberEjbServiceImpl.gamesStatus.put(gameId, new Game(ganerateTheNumber(), 0));

		return (GuessTheNumberEjbServiceImpl.gameId);
	}

	@Override
	/**
	 * the method takes the guessed number and return validation results for the
	 * client
	 */
	public synchronized CheckTheNumberResults checkTheNumber(CheckTheNumber check) {
		System.out.println(check);
		CheckTheNumberResults results = new CheckTheNumberResults();
		if (check.getGuessedNumber().length() == 4) {
			results.setTheNumberOfDigitsCorrect(true);
			if (checkIfTheNumberContainACharacters(check.getGuessedNumber())) {
				results.setTheNumberDoesNotContainACharacter(true);
				if (checkIfTheNumberDoesNotContainAduplicateDigits(check.getGuessedNumber())) {
					results.setTheNumberDoesNotContainAduplicateDigits(true);
					String number="";
					try {
						number = GuessTheNumberEjbServiceImpl.gamesStatus.get(check.getGameId()).getNumber();
					}catch (NullPointerException e) {
						results.setGameIdIsNotValid(true);
						return results;
					}
					results.setTheNumberIsGuessed(
							checkTheDigitsOfTheNumberAndOfTheGuessedNumber(number, check.getGuessedNumber()));
					int numberOfGuesses = GuessTheNumberEjbServiceImpl.gamesStatus.get(check.getGameId())
							.getNumberOfGuesses();
					results.setNumberOfGuesses(numberOfGuesses + 1);
					GuessTheNumberEjbServiceImpl.gamesStatus.get(check.getGameId())
							.setNumberOfGuesses(numberOfGuesses + 1);
					if ((numberOfGuesses + 1) == 20) {
						results.setIsTwentyChecks(true);
					}
				}

			}
		}

		return results;
	}

	/**
	 * the method checks if the guessed number contain a character
	 * 
	 * @param number
	 * @return true if the number does not contain character false if it does
	 */
	private boolean checkIfTheNumberContainACharacters(String number) {
		char[] digits = number.toCharArray();

		for (char c : digits) {
			if (c < '0' || c > '9') {
				return false;
			}

		}
		return true;

	}

	/**
	 * 
	 * @param number
	 * @return true if the number has different digits false if he does
	 */
	private boolean checkIfTheNumberDoesNotContainAduplicateDigits(String number) {
		String result = "";
		char[] digits = number.toCharArray();
		for (int i = 0; i < digits.length; i++) {
			int duplicatCount = 0;
			for (int j = 0; j < digits.length; j++) {
				if (digits[i] == digits[j]) {
					duplicatCount += 1;
				}
			}
			if (duplicatCount == 1) {
				result += "1";
			}

		}
		return result.equals("1111");
	}

	/**
	 * checks if the digits in the number are equal and if the digits in the same
	 * index or not
	 * 
	 * @param number
	 * @param guessedNumber
	 * @return a string of zeros and ones that resembles the equal digits,"0" not in
	 *         the same index ,"1" in the same index
	 */
	private String checkTheDigitsOfTheNumberAndOfTheGuessedNumber(String number, String guessedNumber) {
		String result = "";
		char[] numberDigits = number.toCharArray();
		char[] guessedNumberDigits = guessedNumber.toCharArray();
		for (int i = 0; i < numberDigits.length; i++) {
			for (int j = 0; j < numberDigits.length; j++) {
				if (numberDigits[j] == guessedNumberDigits[i] && i == j) {
					result += "1";
				}
				if (numberDigits[j] == guessedNumberDigits[i] && i != j) {
					result += "0";
				}
			}
		}
		return result;

	}

}
