package com;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/FundsAPI")
public class FundsAPI extends HttpServlet {
	private static final long serialVersionUID = 1L;
	Funds FundsObj = new Funds() ;

    public FundsAPI() {
        super();
        // TODO Auto-generated constructor stub
    }


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String output = FundsObj.insertFund( 
				request.getParameter("fundId"),
				request.getParameter("fundCode"),
				request.getParameter("amount"),
				request.getParameter("description"),	
				request.getParameter("requestId"));
		
		response.getWriter().write(output);
	}

	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
     Map paras = getParasMap(request);
		
		String output = FundsObj.updateFunds(
				
				paras.get("fundId").toString(),
				paras.get("fundCode").toString(),
				paras.get("amount").toString(),
				paras.get("description").toString(),
				paras.get("requestId").toString());
		 response.getWriter().write(output);
		
		
	}
	
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Map paras = getParasMap(request);
		String output = FundsObj.deleteFund(
				paras.get("fundId").toString());
		response.getWriter().write(output);

	}
	// Convert request parameters to a Map
			private static Map getParasMap(HttpServletRequest request) {
				Map<String, String> map = new HashMap<String, String>();
				try {
					Scanner scanner = new Scanner(request.getInputStream(), "UTF-8");
					String queryString = scanner.hasNext() ? scanner.useDelimiter("\\A").next() : "";
					scanner.close();
					String[] params = queryString.split("&");
					for (String param : params) {

						String[] p = param.split("=");
						map.put(p[0], p[1]);
					}
				} catch (Exception e) {
				}
				return map;
			}
}
