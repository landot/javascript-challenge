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
	var valid = true;
	try {
		var valid = validateForm(this);
	}
	catch(err) {
		valid = !valid; 
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
	var requiredFields =['firstName', 'lastName', 'address1', 'city', 'state'];
	var i;
	var valid = true;
	for(i = 0; i < requiredFields.length; i++) {
		if(!validateRequiredField(form.elements[requiredFields[i]])) {
			valid = false;
		}
	}
	/*tests if occupation is valid*/
	if(occupation.value == 'other') {
		if(occupationOther.value.trim().length > 0) {
			occupationOther.className = 'form-control';
		}else {
			occupationOther.className = 'form-control invalid-field';
			valid = false;
		}
	}else if(occupation.value == '') {
		occupation.className = 'form-control invalid-field';
		valid = false; 
	}else {
		occupation.className = 'form-control';
	}
	//tests the zip code to see if it's valid (5 digits of numbers)
	var zipRegExp = new RegExp('^\\d{5}$');
	if(!zipRegExp.test(zip.value.trim())) {
		valid = false;
		zip.className = 'form-control invalid-field';
	}else {
		zip.className = 'form-control';
	}

	//test the birthdate to make sure the person is over 13 years old
    var birthday = form.elements['birthdate']; 
    var birthdayError = document.getElementById('birthdateMessage');
    var age = calculateAge(birthday.value);
    if(age < 13){
        valid = false;
        birthday.className = 'form-control invalid-form';
        birthdayError.style.display = 'block';
        birthdayError.innerHTML = "You must be 13 years or older to sign up"
    } else {
        birthdayError.style.display = 'none';
    }
	return valid;
}


function calculateAge(dob) {
    dob = new Date(dob);  
    var today = new Date();

    var yearsDiff = today.getFullYear() - dob.getUTCFullYear();
    var monthsDiff = today.getMonth() - dob.getUTCMonth();
    var daysDiff = today.getDate() - dob.getUTCDate();
    
    if (monthsDiff < 0 || (0 == monthsDiff && daysDiff < 0)) {
        yearsDiff--;
    }
    
    return yearsDiff;
};

/*tests that the fields aren't just white space
also tests zip code if zip code is accurate 
checks birthdate to see if older than 13 years old
if a field is not correct it shows that it is invalid*/
function validateRequiredField(field) {
	/*tests for only blank space*/
	var value = field.value;
	value = value.trim();
	var valid = value.length > 0;

	if(valid) {
		field.className = 'form-control';
	}else {
		field.className = 'form-control invalid-field';
	}
	return valid;
}

document.addEventListener('DOMContentLoaded', onReady);