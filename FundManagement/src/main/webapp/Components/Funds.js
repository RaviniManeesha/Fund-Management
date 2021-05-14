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
	var status = validateOrderForm();
	if (status != true) {
		$("#alertError").text(status);
		$("#alertError").show();
		return;
	}
	// If valid------------------------
	var type = ($("#hidOrderIDSave").val() == "") ? "POST" : "PUT";

	$.ajax(
		{
			url: "OrdersAPI",
			type: type,
			data: $("#formOrder").serialize(),
			dataType: "text",
			complete: function(response, status) {
				onOrderSaveComplete(response.responseText, status);
			}
		});
});

function onOrderSaveComplete(response, status) {
	if (status == "success") {
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success") {
			$("#alertSuccess").text("Successfully saved.");
			$("#alertSuccess").show();
			$("#divOrdersGrid").html(resultSet.data);
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
	$("#hidOrderIDSave").val("");
	$("#formOrder")[0].reset();
}

// UPDATE==========================================
$(document).on("click", ".btnUpdate", function(event) {
	$("#hidOrderIDSave").val($(this).data("Orderid"));
	$("#productName").val($(this).closest("tr").find('td:eq(1)').text());
	$("#quantity").val($(this).closest("tr").find('td:eq(2)').text());
	$("#price").val($(this).closest("tr").find('td:eq(3)').text());
	$("#prodDesc").val($(this).closest("tr").find('td:eq(4)').text());
	$("#orderDate").val($(this).closest("tr").find('td:eq(5)').text());
});



// DELETE===========================================================
$(document).on("click", ".btnRemove", function(event) {
	$.ajax(
		{
			url: "OrdersAPI",
			type: "DELETE",
			data: "orderID=" + $(this).data("orderid"),
			dataType: "text",
			complete: function(response, status) {
				onOrderDeleteComplete(response.responseText, status);
			}
		});
});

function onOrderDeleteComplete(response, status) {
	if (status == "success") {
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success") {
			$("#alertSuccess").text("Successfully deleted.");
			$("#alertSuccess").show();
			$("#divOrdersGrid").html(resultSet.data);
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
function validateOrderForm()
{
// NAME
if ($("#productName").val().trim() == "")
 {
 return "Insert Product Name.";
 }
// QUANTITY
if ($("#quantity").val().trim() == "")
 {
 return "Insert Product Quantity.";
 }
// PRICE-------------------------------
if ($("#price").val().trim() == "")
 {
 return "Insert Product Price.";
 }
// is numerical value
var tmpPrice = $("#price").val().trim();
if (!$.isNumeric(tmpPrice))
 {
 return "Insert a numerical value for Product Price.";
 }
// convert to decimal price
 $("#price").val(parseFloat(tmpPrice).toFixed(2));
 
// DESCRIPTION------------------------
if ($("#prodDesc").val().trim() == "")
 {
 return "Insert Product Description.";
 }
 if ($("#orderDate").val().trim() == "")
 {
 return "Insert Order Date.";
 }
return true;
}

