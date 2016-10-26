function go(){
	var feed = document.createElement("div");
	feed.id = "auto-feed";
	var referenceNode = document.getElementById("EmailVerifyForm_verifyCode_em_");
	referenceNode.parentNode.insertBefore(feed, referenceNode.nextSibling);
	document.getElementById("auto-feed").textContent = "Getting the verification code[1/2]";
	chrome.extension.sendMessage('get code');
	chrome.runtime.onMessage.addListener(
	  function(request, sender, sendResponse) {
	  	if(request.mydata.length < 20){
		    document.getElementById("EmailVerifyForm_verifyCode").value = request.mydata;
		    document.getElementById("verifyEmail-form").submit();
		    document.getElementById("auto-feed").textContent = "Waiting for STARS to reply[2/2]";
		}
		else
			document.getElementById("auto-feed").textContent = "An error occurred, please check that you entered everything correctly about your mail.";
	  });
}
chrome.storage.local.get("activated", function(data){
	if(data.activated == "true")
		go();
});