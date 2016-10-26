function go(){
	var feed = document.createElement("div");
	feed.id = "auto-feed";
	var referenceNode = document.getElementById("LoginForm_password_em_");
	referenceNode.parentNode.insertBefore(feed, referenceNode.nextSibling);
	document.getElementById("auto-feed").textContent = "Inserting the data...";
	chrome.storage.local.get(["id", "password"], function(data){
		document.getElementById("LoginForm_username").value = data.id;
		document.getElementById("LoginForm_password").value = data.password;
		document.getElementById("login-form").submit();
		document.getElementById("auto-feed").textContent = "Waiting for STARS to reply...";
	});
}

chrome.storage.local.get("activated", function(data){
	if(data.activated == "true")
		go();
});