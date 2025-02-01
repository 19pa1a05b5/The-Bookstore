/*      This page demonstrates the javascript with JSON and XML files in a single page       */

var xhr; //declaring variable for http request.

function start(){
    this.document.getElementById("cart-btn").addEventListener("click",function(){
        alert("Go to explore and add your items! Then you will be able to see the cart."); 
    },false);// event listener for cart btn.

    document.getElementById("founders-contact").addEventListener("click",function(){
        try{
            //instantiate xhr;
            xhr1 = new XMLHttpRequest();
            //adding event listener for xhr;
            xhr1.addEventListener("readystatechange",getJsonData,false);
            //open request
            xhr1.open("GET", "contact.json",true);
            xhr1.send(null);
        }catch(err){
            alert("xhr failed"+err);
        }//end try catch
    });

    document.getElementById("store-contact").addEventListener("click",function(){
        try{
            //instantiate xhr;
            xhr2 = new XMLHttpRequest();
            //adding event listener for xhr;
            xhr2.onreadystatechange = function(){
                if(xhr2.readyState == 4 && xhr2.status == 200 && xhr2.responseXML){
                    clearDiv();
                    let storeContact = xhr2.responseXML.getElementsByTagName("storeContact");
                    appendData("contact-details",storeContact.item(0),"xml");
                }
            }//end ready state change.
            //open request
            xhr2.open("GET", "contact.xml",true);
            xhr2.send(null);
        }catch(err){
            alert("xhr failed"+err);
        }//end try catch
    });
}//end start

function getJsonData(){
    // this function gets the data and parses the data and displays the data.
    console.log("getData");
    if(xhr1.readyState == 4 && xhr1.status== 200 && xhr1.responseText){
        //checks if the data is received or not.
        clearDiv();//clears all the data.
        data = JSON.parse(xhr1.responseText);//parses the data into json.
        founder = data.founders;
        for(let i=0;i<founder.length;i++){
            appendData("contact-details",founder[i],"json");
        }//loop to get the founder each.
    }//end if
}//end getJsonData

function appendData(whereTo,data,dataType){
    //this function takes the tag where to append data and the data that needed to be appended and the datatype received.
    nameTag = document.createElement("h3");
    emailTag = document.createElement("p");
    phoneTag = document.createElement("p");
    if(dataType=="json"){
        // this checks if it is json data and assigns data accordingly.
        nameTag.innerHTML = data.name;
        emailTag.innerHTML = "&#9993; "+data.email;
        phoneTag.innerHTML = "&#9990; "+data.phone;
    }//end if
    if(dataType=="xml"){
        // this checks if it is xml data and assigns data accordingly.
        nameTag.innerHTML = data.getElementsByTagName("name").item(0).firstChild.nodeValue;
        emailTag.innerHTML = "&#9993; "+data.getElementsByTagName("email").item(0).firstChild.nodeValue;
        phoneTag.innerHTML = "&#9990; "+data.getElementsByTagName("phone").item(0).firstChild.nodeValue;
    }//end if
    
    document.getElementById(whereTo).append(nameTag,emailTag,phoneTag);// this appends data to the required tag
}// end appendData.

function clearDiv(){
    // this function clears the div and keep the needed data when ever clicked
    document.getElementById("contact-details").innerHTML = "";
}//end clearDiv

//window load event listener.
window.addEventListener("load",start,false);