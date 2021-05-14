
package com;

import java.sql.*;

public class Funds {

	// A common method to connect to the DB
	private Connection connect() {
		Connection con = null;
		try {
			Class.forName("com.mysql.jdbc.Driver");

			// Provide the correct details: DBServer/DBName, username, password
			con = DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/test", "root", "");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return con;
	}

//////////////read funds////////////////////////////
		public String readFunds()
		{
				String output = "";
				
				try
				{
						Connection con = connect();
						if (con == null)
						{
							return "Error while connecting to the database for reading data!!"; 
						}
						
						// Prepare the html table to be displayed
						
						output = "<table border='1'><tr><th>Fund Code</th><th>Amount</th>" +
								"<th>Description</th>" +
								"<th>Request ID</th>" +
								"<th>Update</th><th>Remove</th></tr>";
						
						String query = "select * from funds";
						Statement stmnt = con.createStatement();
						ResultSet resultSt = stmnt.executeQuery(query);
			
						// iterate through the rows in the result set
						while (resultSt.next())
						{
								String fundId = Integer.toString(resultSt.getInt("fundId"));
								String fundCode = resultSt.getString("fundCode");
								String amount = Double.toString(resultSt.getDouble("amount"));
								String description = resultSt.getString("description");
								String requestId = resultSt.getString("requestId");
								
								// Add into the html table
								
								output += "<tr><td>" + fundCode + "</td>";
								output += "<td>" + amount + "</td>";
								output += "<td>" + description + "</td>";
								output += "<td>" + requestId + "</td>";
								
								// buttons
								
								output += "<td>"
										+ "<input name='btnUpdate' type='button' value='Update'class='btnUpdate btn btn-secondary' data-FundId = '"
										+ fundId + "'></td>"
										+ "<td>"
										+ "<input name='btnRemove' type='button' value='Remove'class='btnRemove btn btn-danger' data-fundid = '"
										+ fundId + "'></td></tr>";
						}
						con.close();
						
						// Complete the html table
						output += "</table>";
			 }
			 catch (Exception e)
			 {
				 output = "Error while reading the funds. Cannot complete the task!!";
				 System.err.println(e.getMessage());
			 }
			 return output; 
		}
///////////////////////insert funds///////////////////////////////////////
		public String insertFund(String fundId, String fundCode, String amount, String description, String requestId)
		{
			String output = "";
			
			try
			{
				Connection con = connect();
				
				if (con == null)
				{
					return "Error while connecting to the databse for inserting!";
				}
				
				String query = " insert into funds(`fundId`, `fundCode`,`amount`,`description`, `requestId`)"
						 + " values (?, ?, ?, ?, ?)"; 
				
				PreparedStatement preparedStmnt = con.prepareStatement(query);
				
				//binding values
				preparedStmnt.setInt(1, 0);
				preparedStmnt.setString(2, fundCode);
				preparedStmnt.setDouble(3, Double.parseDouble(amount));
				preparedStmnt.setString(4, description);
				preparedStmnt.setString(5, requestId);
				
				//execute
				
				preparedStmnt.execute();
				String newFunds = readFunds();
				output = "{\"status\":\"success\", \"data\": \"" + newFunds + "\"}";
			} catch (Exception e) {
				output = "{\"status\":\"error\", \"data\":\"Error while inserting the Fund.\"}";
				System.err.println(e.getMessage());
			}
			return output;
		}
			

///////////update funds//////////////////////
		
		public String updateFunds(String fundId, String fundCode, String amount, String description, String requestId)
		{
			String output = "";
			
			try
			{
				Connection con = connect();
				
				 if (con == null)
				 {
					 return "Cannot process the requested operation!!"; 
				 }
				 
				 // create a prepared statement
				 String query = "UPDATE funds SET fundCode = ?, amount = ?, description = ?, requestId = ? WHERE fundId =?";
				 PreparedStatement preparedStmnt = con.prepareStatement(query);
				 
				 // binding values
				 preparedStmnt.setString(1, fundCode);
				 preparedStmnt.setDouble(2, Double.parseDouble(amount));
				 preparedStmnt.setString(3, description);
				 preparedStmnt.setString(4, requestId);
				 preparedStmnt.setInt(0, Integer.parseInt(fundId));
				 
				 // execute the statement
				 preparedStmnt.execute();
				 con.close();
				 String newFunds = readFunds();
					output = "{\"status\":\"success\", \"data\": \"" + newFunds + "\"}";
				} catch (Exception e) {
					output = "{\"status\":\"error\", \"data\":\"Error while updating the Fund.\"}";
					System.err.println(e.getMessage());
				}
				return output;
		}

////////////////delete funds///////////////////
	
		
		public String deleteFund(String fundId)
		{
			String output = "";
			
			try
			 {
					Connection con = connect();
					if (con == null)
					{
						return "Error while connecting to the database for deleting!!"; 
					}
					
					// create a prepared statement
					
					String query = "delete from funds where fundId = ?";
					PreparedStatement preparedStmnt = con.prepareStatement(query);
					
					// binding values
					
					preparedStmnt.setInt(1, Integer.parseInt(fundId));
					
					// execute the statement
					
					preparedStmnt.execute();
					con.close();
					String newFunds = readFunds();
					output = "{\"status\":\"success\", \"data\": \"" + newFunds + "\"}";
				} catch (Exception e) {
					output = "{\"status\":\"error\", \"data\":\"Error while deleting the Fund.\"}";
					System.err.println(e.getMessage());
				}
				return output;
		}
}