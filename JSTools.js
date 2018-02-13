class JSTools {
	
	constructor(){
		
	}
	
	
	//********************************************
	//Vanilla Ajax
	//********************************************
	postAjax(url, formData, onComplete, onError) {
	   const urlEncodedDataPairs = [];
	   Object.keys(formData).forEach(function (key) {
		  urlEncodedDataPairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(formData[key]));
	   });
	   const urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

	   const xhr = new XMLHttpRequest();
	   xhr.open('POST', url);
	   xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

	   xhr.onreadystatechange = () => {
		  if (xhr.readyState === 4) {
			 if (xhr.status === 200) {
				const responseObj = JSON.parse(xhr.responseText);
				onComplete(responseObj);
			 } else {
				onError();
			 }
		  }
	   };

	   xhr.send(urlEncodedData);
	}
	
	getAjax(url, onComplete, onError) {
	   const xhr = new XMLHttpRequest();
	   xhr.open('GET', url);

	   xhr.onreadystatechange = () => {
		  if (xhr.readyState === 4) {
			 if (xhr.status === 200) {
				const responseObj = JSON.parse(xhr.responseText);
				onComplete(responseObj);
			 } else {
				onError();
			 }
		  }
	   };

	   xhr.send();
	}
	
	//********************************************
	//Clear object and keep it's keys (recursive)
	//********************************************	
	refreshObject(obj){
		
		if(!Array.isArray(obj)){
			obj = refreshObject_helper(obj, refreshObject);		
		}else{
			obj.forEach((o) => {
				o = refreshObject_helper(o, refreshObject);						
			});
		}
		
		return obj;
	}

	refreshObject_helper(obj, refreshObject){
		if(typeof obj === 'object'){
			Object.keys(obj).forEach((key) => {
				obj[key] = refreshObject(obj[key])
			});		
		}else{
			switch(typeof obj){
				case 'string':
					obj = '';
				break;
				case 'number':
					obj = null;
				break;
				case 'boolean':
					obj = false;
				break;							
			}
		}
		return obj;
	}
	
	//********************************************
	//Replace all substring from an html template
	//ex:  replaceAllString('<div class="@@class@@">@@name@@</div>', {'@@class@@':'class-name', '@@name@@':'Abe Lincoln'})
	//********************************************		
	function replaceAllStrings(htmlTemplate, substringObj){
	    Object.keys(substringObj).forEach(function(key){
		var regex = new RegExp(key, "g");
		htmlTemplate = htmlTemplate.replace(regex, substringObj[key]);
	    });
	    return htmlTemplate;
	}	
	
	
	
}

let jsTools = new JSTools();
