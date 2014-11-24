/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/

"use strict";

/*creates the states drop down list */
function onReady() {
	var signupForm = document.getElementById('signup');
	var stateSelect = signupForm.elements['state'];
	var i;
	var option;
	var state;
	for(i = 0; i < usStates.length; i++) {
		option = document.createElement('option');
		state = usStates[i];
		option.value = state.code;
		option.innerHTML = state.name;
		stateSelect.appendChild(option);
	}

	/*When other is selected for occupation, creates field to enter in occupation manually*/
	document.getElementById('occupation').addEventListener('change', function(){
		var occupationField = signupForm.elements['occupation'];
		var actualOccupation = occupationField.value;
		if(actualOccupation == 'other') {
			document.getElementById('occupationOther').style.display = 'block'; 		
		}else {
			document.getElementById('occupationOther').style.display = 'none';
		}
	});

	/*if no thanks is clicked then links to google.com if you hit ok*/
	document.getElementById('cancelButton').addEventListener('click', function(){
		var leavePage = confirm("Do you really want to leave the page?");
		if(leavePage) {
			location.href = "http://google.com";
		}
	});
	signupForm.addEventListener('submit', onSubmit); 
}

/* onSubmit()
 * Called when the user attempts to submit the form
 * The browser will pass an event object as the first parameter and we can use this object
 * to stop the form from being submitted if it is invalid.
 * Also the keyword 'this' will refer to the form that is being submitted while inside this function.
 * */
function onSubmit(evt) {
	
	try {
		var valid = validateForm(this);
	}
	catch(exception) {
		console.log(exception);
		valid = false; 
	}	
    if (!valid) {
        var errMsg = document.getElementById('error-message');
        errMsg.innerHTML = 'Please provide values for the required fields!';
        errMsg.style.display = 'block';
    }

    if (!valid && evt.preventDefault) {
        evt.preventDefault();
    }
    evt.returnValue = valid;
    return valid;
}



/*tests the fields to make sure that there are actual inputted values
*returns whether the values are valid*/
function validateForm(form) {
	var requiredFields =['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate', 'occupation'];
	var i;
	var valid = true;
	for(i = 0; i < requiredFields.length; i++) {
		if(!validateRequiredField(form.elements[requiredFields[i]])) {
			valid = false;
		}
	}
}
/*tests that the fields aren't just white space
also tests zip code if zip code is accurate 
checks birthdate to see if older than 13 years old
if a field is not correct it shows that it is invalid*/
function validateRequiredField(field) {
	/*checks if user picked an occupation and also
	checks if user picks other for occupation (if other: changes field value to the input box*/
	if(field = 'occupation' && occupation.value == 'other') {
		field = occupationOther;
	}else if(field = 'occupation') {
		field.className = 'form-control'; /*FIX THIS ERROR (occupation problem) */
		return valid;
	}
	/*tests for only blank space*/
	var value = field.value;
	value = value.trim();
	var valid = value.length > 0;

	/*tests for a 5 digit zip code*/
	if(field = 'zip') {
		var zipRegExp = new RegExp('^\\d{5}$');
		if(!zipRegExp.test(value)) {
			valid = false;
		}
	} 

	/*tests the birthdate to make sure it is >13 years old*/
	if(field = 'birthdate') {
		var t = new Date();
		var today = t.getUTCDate();
		var m = new Date();
		var month = m.getUTCMonth();
		var y = new Date();
		var year = y.getUTCFullYear(); 
		if((year - birthdate.getUTCFullYear()) > 13) {  
			valid = true;
		}else if(year == birthdate.value.getUTCFullYear() && birthdate.value.getUTCMonth() > month) {
			valid = true;
		}else if(year == birthdate.value.getUTCFullYear() && birthdate.value.getUTCMonth() == month && birthdate.value.getUTCDate() >= today) {
			valid = true;
		}else {
			valid = false;
		} 
		if(valid = false) {
			var errMsg = document.getElementById('birthdateMessage');
			errMsg.innerHTML = 'Users must be at least 13 years old.'	
			errMsg.style.display = 'block';
		}	
	}
	if(valid) {
		field.className = 'form-control';
	}else {
		field.className = 'form-control invalid-field';
	}
	return valid;
}

document.addEventListener('DOMContentLoaded', onReady);