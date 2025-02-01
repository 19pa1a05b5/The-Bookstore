/*      This page demonstrates the javascript with text file       */

// initializing an array of book lover synonyms.
var welcomeMessage = ["Bibliophile","Bookworm","Bookman","Scholar","Intellectual","Reader","Savant"]

function start(){
    //start function
    this.document.getElementById("welcome-heading").innerHTML += welcomeMessage[Math.floor(Math.random() * 7)]; // This gives us a new book lover synonym with Math.random() function.

    this.document.getElementById("cart-btn").addEventListener("click",function(){
        alert("Go to explore and add your items! Then you will be able to see the cart.");
    },false);// event listener for cart btn.

    try{
        //instantiate xhr object.
        xhr = new XMLHttpRequest()
        //event listener with anon function to handle the event.
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                //checking whether the file is successfully extracted.
                console.log("success");
                document.getElementById("intro").innerHTML = xhr.responseText;
            }//end if
        }//end anon function

        //raise the ajax request.
        xhr.open("GET","homeIntro.txt",true);
        xhr.send(null);
    }catch(ex){
        alert("XHR failed: "+ex.message);
    }//end try/catch
}//end start

// window load event listener
window.addEventListener("load",start,false);