  const apiUrl = 'http://localhost:8080/v1/pass';
 
  var userName = document.getElementById("userName");
  var masterPassword = document.getElementById("masterPassword");
  var showPassword = document.getElementById("showPassword")
  var appName = document.getElementById("appName");
  var appAddress = document.getElementById("appAddress");
  var numberOfSigns = document.getElementById("numberOfSigns");
  var numberOfSignsValue = document.getElementById("numberOfSignsValue");
  var smallLetters = document.getElementById("smallLetters");
  var largeLetters = document.getElementById("largeLetters");
  var numbers = document.getElementById("numbers");
  var specialSigns = document.getElementById("specialSigns");
  var passField = document.getElementById("pass");
	
	function send() {
		var data = {"userName":userName.value,
					"masterPassword":masterPassword.value,
					"appName":appName.value,
					"appAddress":appAddress.value,
					"numberOfSigns":numberOfSigns.value,
					"smallLetters":smallLetters.checked,
					"largeLetters":largeLetters.checked,
					"numbers":numbers.checked,
					"specialSigns":specialSigns.checked};
		
		var json = JSON.stringify(data);
		
		var xhr = new XMLHttpRequest();
		//xhr.responseType = "json";
	
		xhr.open('POST', apiUrl, true); /* Argument trzeci, wartość true, określa, że żądanie ma być asynchroniczne */
		xhr.setRequestHeader("Content-Type", "application/json", "Access-Control-Allow-Origin: *");

		xhr.send(json); 

		xhr.onreadystatechange = function (aEvt) {
		if (xhr.readyState == 4) {
			if(xhr.status == 200)
				passField.value = xhr.responseText;
				//alert(xhr.responseText);
			else
				alert("Błąd podczas ładowania strony!!!\n");
			}
		};
	};

	function showMasterPassword() {
		if (masterPassword.type === "password") {
			masterPassword.type = "text";
		} else {
			masterPassword.type = "password";
		}
	};

	function changeValue(fieldName) {
		if (fieldName === "nos") {
			numberOfSignsValue.value = numberOfSigns.value;
		} else {
			numberOfSigns.value = numberOfSignsValue.value;
		}
	};

	function copy() {
		var textArea = document.createElement("textarea");
  		textArea.value = passField.value;
  
  		// Avoid scrolling to bottom
		textArea.style.top = "0";
		textArea.style.left = "0";
		textArea.style.position = "fixed";

		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();

		try {
			var successful = document.execCommand('copy');
			var msg = successful ? 'successful' : 'unsuccessful';
			console.log('Fallback: Copying text command was ' + msg);
		} catch (err) {
			console.error('Fallback: Oops, unable to copy', err);
		}

		document.body.removeChild(textArea);

	};







