/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/


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

	/* need to figure out this occupation crap */
	/*When other is selected for occupation, creates field to enter in occupation manually*/
	document.getElementById('occupation').addEventListener('change', function(){
		if(document.getElementById('occupation').value = "other") {
			document.getElementByName('occupationOther').style.display = 'block'; 		
		}
	});

	document.getElementById('cancelButton').addEventListener('click', function(){
		var leavePage = confirm("Do you really want to leave the page?");
		if(leavePage) {
			location.href = "http://google.com";
		}
	});
	signupForm.addEventListener('submit', onSubmit);
}

function onSubmit(evt) {
	var valid = validateForm(this);

	if(!valid) {
		var 
	}
}

function validateForm(form) {
	var requiredFields =['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];
	var i;
	var valid = true;
	for(i = 0; i < requiredFields.length; i++) {
		if(!validateRequiredField(form.elements[requiredFields[i]])) {
			valid = false;
		}
	}
}

function validateRequiredField(field) {
	var value = field.value;
	value = value.trim();
	var valid = value.length > 0;
	if(field = 'zip') {
		var zipRegExp = new RegExp('^\\d{5}$');
		if(!zipRegExp.test(form.elements[requiredFields[i]].value)) {
			valid = false;
		}
	}
	if(field = 'birthdate') {
		var t = new Date();
		var today = t.getUTCDate();
		var m = new Date();
		var month = m.getUTCMonth();
		var y = new Date();
		var year = y.getUTCFullYear();
		if((year - birthdate.getUTCFullYear()) > 13) {  
			valid = true;
		}else if(year = birthdate.getUTCFullYear() && birthdate.getUTCMonth() > month) {
			valid = true;
		}else if(year = birthdate.getUTCFullYear() && birthdate.getUTCMonth() = month && birthdate.getUTCDate() >= today) {
			valid = true;
		}else {
			valid = false;
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