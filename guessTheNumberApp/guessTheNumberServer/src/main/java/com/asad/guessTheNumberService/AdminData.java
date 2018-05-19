package com.asad.guessTheNumberService;

public class AdminData {
private String password;
private String userName;



public AdminData() {


}
public AdminData(String password, String userName) {
	super();
	this.password = password;
	this.userName = userName;
}
@Override
public String toString() {
	return "AdminData [password=" + password + ", userName=" + userName + "]";
}
public String getPassword() {
	return password;
}
public void setPassword(String password) {
	this.password = password;
}
public String getUserName() {
	return userName;
}
public void setUserName(String userName) {
	this.userName = userName;
}


}
