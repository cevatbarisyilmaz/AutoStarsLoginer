document.getElementById("save").addEventListener("click", save);
document.getElementById("erase").addEventListener("click", erase);
document.getElementById("activate").addEventListener("change", activate);

chrome.storage.local.get("activated", function(data){
	if(data.activated == "true")
		document.getElementById("activate").checked = true;
	else if(data.activated != "false"){
		document.getElementById("feed").textContent = "Be sure that you switched to email verification before acitaving this extension";
	}
});


function save(){
	chrome.storage.local.set({'id': document.getElementById("id").value, 'password': document.getElementById("password").value, 'mail': document.getElementById("mail").value, 'mailpassword': document.getElementById("mailpassword").value})
	document.getElementById("id").value = "";
	document.getElementById("password").value = "";
	document.getElementById("mail").value = "";
	document.getElementById("mailpassword").value = "";
	document.getElementById("feed").textContent = "Your data have been successfully saved!";
}

function erase(){
	chrome.storage.local.remove(['id', 'password', 'mail', 'mail-password'], function(){
		document.getElementById("feed").textContent = "Your all private data have been removed from memory!";
	});
}

function activate(){
	if(document.getElementById('activate').checked){
		chrome.storage.local.set({'activated': 'true'});
		document.getElementById("feed").textContent = "Auto STARS Loginer has been turned on!";
	}
	else{
		chrome.storage.local.set({'activated': 'false'});
		document.getElementById("feed").textContent = "Auto STARS Loginer has been turned off!";
	}
}