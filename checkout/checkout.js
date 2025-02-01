/*      This page demonstrates the jQuery with JSON file       */

//ready function for page.
$(function(){
    //declaring what state is selected.
    var stateSelected = "none";

    //global variables
    var totalBill;
    var shippingCost = 0;
    var shippingMethod = "";

    makeOptions();//options for states to select.

    //event listener for selection change:
    $("#statesSelect").on("change",function(){
        stateSelected = $(this).val(); //$(this) refers to the select dropdown object. You are directly accessing the val() attribute that you set when adding options.
        console.log(stateSelected);
    })//listener for change event.

    var urlParams = new URLSearchParams(window.location.search);
    totalBill = urlParams.get("bill");// getting the total bill from the cart page.

    $("#expressShipping").click(() => {
        shippingCost = 5;
        shippingMethod = "Express Shipping (2 business days)";
    });//event listener for express shipping radio button.
    $("#standardShipping").click(() => {
        shippingCost = 0;
        shippingMethod = "Standard Shipping (5-7 business days)";
    });//event listener for standard shipping radio button

    $("#orderButton").click(displayConfirmation);// event listner for order button

    function makeOptions(){
        //this function creates the select options for states with abbrevations displaying in the page.
        $.ajax({
            url:"states.json",
            dataType: "json",
            success: function(data){
                console.log("success");
                $(data.states).each(function(){
                    //create options
                    let stateName = this.name;
                    let optionTag = document.createElement("option");//element created.
                    $("#statesSelect").append(optionTag);//append to parent
                    $(optionTag).text(this.abbreviation).val(stateName);//set the text and val() attributes
                })//each
            }, //success
            error: function(xhr,textStatus,errorThrown){
                alert("An error occurred!" + (errorThrown? errorThrown: xhr.status + " " + textStatus));
            }//error
        });//ajax call
    }//options creating function

    function displayConfirmation(){
        //This function checks if all deatails are filled by user or not then after user submission it will display the user provided details.
        let firstNameInput = $("#firstName").val();
        let lastNameInput = $("#lastName").val();
        let emailInput = $("#email").val();
        let addressInput = $("#address").val();
        let cityInput = $("#city").val();
        let stateInput = stateSelected;
        let zipCodeInput = $("#zipCode").val();
        let shippingInput = shippingMethod;

        let output = $("#resultPara");
        // check if all the inputs are provided
        if (!firstNameInput || !lastNameInput || !emailInput || !addressInput || !cityInput || !zipCodeInput) {
            output.text("Please fill in all fields ");
        } else if ((!shippingInput)) {
            output.text("Select a shipping method.");
        }else if(stateInput=="none"){
            output.text("Please select a state");
        }
        else{
            let address = firstNameInput + " " + lastNameInput + "<p>" + addressInput +"</p>" + "<p>" + cityInput +"</p>" + "<p>" + stateInput +"</p>" + "<p>" + zipCodeInput +"</p>";
            let totalCost = shippingCost + parseFloat(totalBill);
            // display output
            output.html("Your order has been placed. Order will be sent to below address :" +"<h3> Address: </h3>"+ address + "<h3> Email-ID: </h3>"+ emailInput + "<p><b>Delivery Method: </b>" + shippingMethod +"</p><h3> Total cost: $" + totalCost+"</h3>"); 
        } // end if else
    }
});

