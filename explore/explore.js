/*      This page demonstrates the jQuery with XML file and also demonstrates most of the concepts that teached by professor.       */

var cartArray = []; // Initialize an empty array to store cart items

$(function(){
    $("#cart-btn").click(function(){ 
        if(cartArray.length){ // Check if the cart has items
            displayCart(); // Display the cart
        } else {
            alert("Add items to the cart first."); // Alert user if the cart is empty
        }
    });
    let xhrData; //storing the data which is call with the ajax.
    $.ajax({
        url:"books.xml",
        dataType: "xml",
        success: function(xml){
            xhrData = xml;
            console.log('success');
            $(xml).find("book").each(function(){
                //call functions and send data
                displayBooks($(this).find("title").text(), $(this).find("author").text(), $(this).find("price").text(),$(this).find("image").text());
            })//each
        }, //success
        error: function(xhr,textStatus,errorThrown){
            alert("An error occurred!" + (errorThrown? errorThrown: xhr.status + " " + textStatus));
        }//error
    });//ajax


    $("#filter").on("change",function(){
        //event listener that triggers when a select option is changed, this function clears and displays based on the selected value by filtering them.
        clearBooks();
        const option = $(this).val();
        if(option=="all"){
            $(xhrData).find("book").each(function(){
                //call functions and send data
                displayBooks($(this).find("title").text(), $(this).find("author").text(), $(this).find("price").text(),$(this).find("image").text());
            })//each
        }else{
            $(xhrData).find("book").each(function(){
                //call functions and send data
                if($(this).find("genre").text().toLowerCase()==option){ //selects the genre which the user opted for.
                    displayBooks($(this).find("title").text(), $(this).find("author").text(), $(this).find("price").text(),$(this).find("image").text());
                }
            })//each
        }
    });


    $("#searchBtn").click(function(){
        //this function searches for the book that the user entered to search for.
        clearBooks();//clears the present books displayed

        const bookSearch = $("#searchText").val().toLowerCase();// user entered input
        const option = $("#filter").val();//the genre option filtered.

        var gotBooks = false;//for data confirmation.

        $(xhrData).find("book").each(function(){
            const myTitle = $(this).find("title").text().toLowerCase();
            if(myTitle.match(bookSearch) && (option=="all" || (option!="all" && option==$(this).find("genre").text().toLowerCase()))){ 
                //searches for the book the user entered and the filter option selected.

                //calls the function and send data to display.
                displayBooks($(this).find("title").text(), $(this).find("author").text(), $(this).find("price").text(),$(this).find("image").text());

                gotBooks=true;//for data confirmation.
            }//end if
        })//each

        if(!gotBooks){
            //checks if i got the books or not.
            $("#booksShow").append("<p>No match found!!! for the title you searched for.</p>");
        }//end if
    });

    

    function displayBooks(title, author, price, image){
        //this function takes the data and creates the necessary tags and gets appended and puts the data.

        //Below are the necessary html elements to display the books.
        //each loop creates all the tags and is for a single book.
        var bookDiv = document.createElement("div");
        var titleP = document.createElement("h3");
        var authorP = document.createElement("p");
        var priceP = document.createElement("p");
        var imageImg = document.createElement("img");
        var addBtn = document.createElement("button");

        $(titleP).text(title);
        $(titleP).attr("class","book-title");

        $(authorP).text(author);
        $(authorP).attr("class","book-author");

        $(priceP).text("$"+price);
        $(priceP).attr("class","book-price");
        
        $(imageImg).attr("src",image);
        $(imageImg).attr("alt","image");
        $(imageImg).attr("class","book-image");

        $(addBtn).text("Add to Cart")
        $(addBtn).attr("class","add-to-cart-btn");
        $(addBtn).attr("id","add-to-cart-btn");

        $(addBtn).click(function(){ //event listener to add the book to the cart array.
            const result = cartArray.find(item => item.key === title);
            if(result){
                if(result.value.qty<10){
                    result.value.qty+=1;
                }
                else{
                    alert("You have reached max quantity. You can only order 10 books for each book.");
                }
            }
            else{
                cartArray.push({key:title,value: {"image":image,"price":price,"qty":1}});
            }
            //this event adds the book to the cart and if the quantity reached to 10. It stops adding to the cart.
        });//end addBtn event listener.

        $(bookDiv).attr("class","book-div");
        $(bookDiv).append(imageImg,titleP, authorP, priceP,addBtn);

        $("#booksShow").append(bookDiv);
    }


    function calcTotal(){
        //this function calculates the total price and the tax.
        var total_price = 0;
        cartArray.forEach(item => {
            total_price += parseFloat(item.value.price)*item.value.qty;
        });
        return total_price;
    }//end calcTotal
    

   function displayCart(){

        $("#explore-main").empty();//removing all the content in order to display the cart items.

        let booksCart = document.createElement("div");
        $(booksCart).attr("class","cart-show");
        $(booksCart).attr("id","cart-show");
        $("#explore-main").append(booksCart);

        if(!cartArray.length){
            //shows that there are no items if the cart is empty.
            $("#cart-show").append("<p>You don't have any items in your cart.</p>")
        }//end if.

        cartArray.forEach(item => {
            //creates the required elements and attributes to display a single book item and appends to the book show.
            var bookDiv = document.createElement("div");
            var titleP = document.createElement("h3");
            var priceP = document.createElement("p");
            var imageImg = document.createElement("img");
            var labelQty = document.createElement("label");
            var qty = document.createElement("input");
            var deleteBtn = document.createElement("button");

            //appending the text to the tags and also assigning attributes to those tags.
            $(titleP).text(item.key);
            $(titleP).attr("class","cart-book-title");

            $(priceP).text("$"+item.value.price);
            $(priceP).attr("class","cart-book-price");

            $(imageImg).attr("src",item.value.image);
            $(imageImg).attr("alt","cart-image");
            $(imageImg).attr("class","cart-book-image");

            $(labelQty).text("Quantity: ");
            $(labelQty).append(qty);
            $(qty).attr("type","number");
            $(qty).attr("min","0");
            $(qty).attr("max","10");
            $(qty).attr("class","cart-qty");
            $(qty).attr("value",item.value.qty);

            $(deleteBtn).text("Delete")
            $(deleteBtn).attr("class","delete-cart-btn");
            $(deleteBtn).attr("id","delete-cart-btn");

            $(qty).on('change', function() {
                if($(this).val()==0){
                    cartArray = cartArray.filter(i => i.key !== item.key);//deleting the item if the quantity changed to 0.
                }else{
                    item.value.qty = $(this).val();
                }
                displayCart();
            });//event listener for the quantity change

            $(deleteBtn).click(function(){
                cartArray = cartArray.filter(i => i.key !== item.key);//deleting the items in the cart array.
                displayCart();
            });//event listener for delete button for every book.

            $(bookDiv).attr("class","cart-book-div");
            $(bookDiv).append(imageImg, titleP, priceP,labelQty,deleteBtn);
            $("#cart-show").append(bookDiv);
            
        });//end for each

        var subTotal =calcTotal();//calls the calcTotal and value gets assigned to a variable.

        //creating the required tags in order display the total price details.
        var totalDiv = document.createElement("div");
        $(totalDiv).attr("class","total-bill");

        var subTotalPrice = document.createElement("h4");
        $(subTotalPrice).text(`Sub-total Price: ${subTotal.toFixed(2)}`);

        var subTotalTax = document.createElement("h5");
        $(subTotalTax).text(`Tax: ${(subTotal*0.065).toFixed(2)}`);

        var totalPrice = document.createElement("h4");
        $(totalPrice).text(`Total Price: ${(subTotal*1.065).toFixed(2)}`);

        var checkoutDiv = document.createElement("div");

        var checkoutBtn = document.createElement("button");
        $(checkoutDiv).attr("class","checkout-div");
        $(checkoutBtn).text("Proceed to Checkout");

        $(checkoutBtn).click(function () {
            const totalBill = (subTotal * 1.065).toFixed(2); // Calculate total with tax
            if(cartArray.length>0){
                window.location.href = `../checkout/checkout.html?bill=${totalBill}`; // Redirect to checkout
            }else{
                alert("You don't have any items in your cart");
            }
        });//event listener for checkout button.
        
        checkoutDiv.append(checkoutBtn);

        totalDiv.append(subTotalPrice, subTotalTax,totalPrice);
        $("#explore-main").append(totalDiv,checkoutDiv);
        
    }//end display cart

    function clearBooks(){
        $("#booksShow").empty(); //clears the html inside.
    }//end clearBooks
});


