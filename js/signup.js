/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/


/*creates the states drop down list */
function onReady() {
	var signupForm = document.getElementById('signup');
	var stateSelect = signupForm.elements['states'];
	var i;
	var option;
	var states;
	for(i = 0; i < usStates.length; i++) {
		option = document.createElement('option');
		states = usStates[i];
		option.value = states.code;
		option.innerHTML = states.name;
		stateSelect.appendChild(option);
	}

	/* need to figure out this occupation crap */
	/*When other is selected for occupation, creates field to enter in occupation manually*/
	document.getElementById('occupation').addEventListener('change', function{
		var selected = document. /*  ############################################################     */
		document.getElementById('occupation').style.display = 'block'; 
	});

	document.getElementById('cancelButton').addEventListener("click", function{
		var leavePage = confirm("Do you really want to leave the page?");
		if(leavePage == true) {
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
		/*tests the zip code*/
		if(i = 6) {
			var zipRegExp = new RegExp('^\\d{5}$');
			if(!zipRegExp.test(form.elements[requiredFields[i]].value)) {
				valid = false;
			}
		}
		/*tests the age in the form*/
		if(i = 7) {
			var today = new Date();
			today = 
			if(form.elements[requiredFields[i]].value. )
		}

		if(!validateRequiredField(form.elements[requiredFields[i]])) {
			valid = false;
		}
	}
}

function validateRequiredField(field) {
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