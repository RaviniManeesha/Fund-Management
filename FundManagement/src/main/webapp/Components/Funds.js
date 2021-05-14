/**
 *
 */


$(document).ready(function()
{
if ($("#alertSuccess").text().trim() == "")
 {
 $("#alertSuccess").hide();
 }
 $("#alertError").hide();
});

// SAVE ============================================
$(document).on("click", "#btnSave", function(event) {
	// Clear alerts---------------------
	$("#alertSuccess").text("");
	$("#alertSuccess").hide();
	$("#alertError").text("");
	$("#alertError").hide();
	// Form validation-------------------
	var status = validateFundsForm();
	if (status != true) {
		$("#alertError").text(status);
		$("#alertError").show();
		return;
	}
	// If valid------------------------
	var type = ($("#hidFundIDSave").val() == "") ? "POST" : "PUT";

	$.ajax(
		{
			url: "FundsAPI",
			type: type,
			data: $("#formFund").serialize(),
			dataType: "text",
			complete: function(response, status) {
				onFundsaveComplete(response.responseText, status);
			}
		});
});

function onFundsaveComplete(response, status) {
	if (status == "success") {
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success") {
			$("#alertSuccess").text("Successfully saved.");
			$("#alertSuccess").show();
			$("#divFundsGrid").html(resultSet.data);
		} else if (resultSet.status.trim() == "error") {
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} else if (status == "error") {
		$("#alertError").text("Error while saving.");
		$("#alertError").show();
	} else {
		$("#alertError").text("Unknown error while saving..");
		$("#alertError").show();
	}
	$("#hidFundIDSave").val("");
	$("#formFund")[0].reset();
}

// UPDATE==========================================
$(document).on("click", ".btnUpdate", function(event) {

	$("#hidFundIDSave").val($(this).data("FundId"));
	$("#fundCode").val($(this).closest("tr").find('td:eq(0)').text());
	$("#amount").val($(this).closest("tr").find('td:eq(1)').text());
	$("#description").val($(this).closest("tr").find('td:eq(2)').text());
	$("#requestId").val($(this).closest("tr").find('td:eq(3)').text());
	
});


// DELETE===========================================================
$(document).on("click", ".btnRemove", function(event) {
	$.ajax(
		{
			url: "FundsAPI",
			type: "DELETE",
			data: "fundId=" + $(this).data("fundid"),
			dataType: "text",
			complete: function(response, status) {
				onFundDeleteComplete(response.responseText, status);
			}
		});
});

function onFundDeleteComplete(response, status) {
	if (status == "success") {
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success") {
			$("#alertSuccess").text("Successfully deleted.");
			$("#alertSuccess").show();
			$("#divFundsGrid").html(resultSet.data);
		} else if (resultSet.status.trim() == "error") {
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} else if (status == "error") {
		$("#alertError").text("Error while deleting.");
		$("#alertError").show();
	} else {
		$("#alertError").text("Unknown error while deleting..");
		$("#alertError").show();
	}
}

// CLIENT-MODEL================================================================
function validateFundsForm()
{
// fundCode
if ($("#fundCode").val().trim() == "")
 {
 return "Insert Fund Code.";
 }
// description
if ($("#description").val().trim() == "")
 {
 return "Insert Description.";
 }
// amount-------------------------------
if ($("#amount").val().trim() == "")
 {
 return "Insert Amount.";
 }
// is numerical value
var tmpAmount = $("#amount").val().trim();
if (!$.isNumeric(tmpAmount))
 {
 return "Insert a numerical value for Amount.";
 }
// convert to decimal price
 $("#amount").val(parseFloat(tmpAmount).toFixed(2));
 
// requestId------------------------
if ($("#requestId").val().trim() == "")
 {
 return "Insert Request ID.";
 }

return true;
}

