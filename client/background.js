chrome.extension.onMessage.addListener(function(details) {
   getCode();
});

function getCode(){
	chrome.storage.local.get(["mail", "mailpassword"], function(data){
		var xhttp;
		xhttp = new XMLHttpRequest();
		xhttp.open("POST", "http://dormstudios.com/auto/stars.php", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send("mail=" + encodeURIComponent(data.mail) + "&password=" + encodeURIComponent(data.mailpassword));
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == XMLHttpRequest.DONE) {
				sendResponse(xhttp.responseText);
			}
		}
	});	
}
function sendResponse(data){
	chrome.tabs.query({
        url: "https://stars.bilkent.edu.tr/accounts/site/*"
    }, function(result) {
    	for(var index = 0; index < result.length; index++){
            chrome.tabs.sendMessage(result[index].id, {mydata: data});
    	}
    });
}
