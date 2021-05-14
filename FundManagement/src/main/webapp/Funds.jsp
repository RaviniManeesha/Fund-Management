<%@page import="com.Funds"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Funds Management</title>
<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.6.0.min.js"></script>
<script src="Components/Funds.js"></script>
</head>
<body>
<div class="container">
		<div class="row">
			<div class="col-6">
				<h1>Funds Details</h1>
				<form id="formFund" name="formFund" method="post"
					action="Funds.jsp">
					
						Fund Code: <input id="fundCode" name="fundCode" type="text"
						class="form-control form-control-sm"> <br> 
						Amount: <input id="amount" name="amount" type="text"
						class="form-control form-control-sm"> <br> 
						Description: <input id="description" name="description" type="text"
						class="form-control form-control-sm"> <br>
						Request ID: <input id="requestId" name="requestId" type="text"
						class="form-control form-control-sm"> <br> 
						 <input id="btnSave" name="btnSave" type="button" value="Save"
						class="btn btn-primary"> <input type="hidden"
						id="hidFundIDSave" name="hidFundIDSave" value="">

				</form>

				<div id="alertSuccess" class="alert alert-success"></div>
				<div id="alertError" class="alert alert-danger"></div>
				<br>
				<div id="divFundsGrid">
					<%
					Funds fundObj = new Funds();
					out.print(fundObj.readFunds());
					%>
				</div>
			</div>
		</div>
	</div>
</body>
</html>