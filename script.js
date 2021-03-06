/* if(window.location.protocol != 'https:') {
      location.href = location.href.replace("http://", "https://");
    }
*/

  const apiUrl = 'https://api.klenio.com:8083/v1/pass';
 
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
  var sendButton = document.getElementById("sendButton");
	
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

		$.ajax({
			type: "POST",
			url: apiUrl,
			data: json,
			contentType: "application/json; charset=utf-8",
			dataType: "text",
			headers: {
				'Access-Control-Allow-Origin':'*'
			},
          	success: function (msg) {
				passField.value = msg;
			},
			error: function() {
				alert("error")
			}
		});	
	  };

	function showMasterPassword() {
		if (masterPassword.type === "password") {
			masterPassword.type = "text";
			showPassword.value = "Hide password"
		} else {
			masterPassword.type = "password";
			showPassword.value = "Show password"
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
		clear();
	};

	function clear() {
		userName.value = "";
  		appName.value = "";
        appAddress.value = "";
  		numberOfSigns.value = "16";
  		numberOfSignsValue.value = "16";
  		smallLetters.checked = true;
  		largeLetters.checked = true;
  		numbers.checked = true;
  		specialSigns.checked = true;
		passField.value = "";
		shouldMasterPasswordClear = true;
	};

	function clearMasterPassword() {
		masterPassword.value = "";
		showPassword.value = "Show password";
		masterPassword.type = "password";
	};

	function checkParameters() {
		if (!smallLetters.checked && !largeLetters.checked && !numbers.checked && !specialSigns.checked) {
			//smallLetters.style.backgroundColor.borderColor = "red";
			sendButton.disabled = true;
		} else {
			sendButton.disabled = false;
		}
	};











