/*      This page demonstrates the jQuery with text file       */

// document ready event listener
$(document).ready(function(){
    $("#cart-btn").click(() => {//gives an alert to user.
        alert("Go to explore and add your items! Then you will be able to see the cart.");// event listener for cart btn.
    });

    $.get("about.txt",function(data){
        $("#about-para").html(data);
        console.log("success");
    });// instead $.ajax we have used $.get to get the file.
})