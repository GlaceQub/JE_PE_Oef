const checkForm = document.querySelector("#btnCheck")
let errorsArray = []

hideAlerts()

function checkFormulier() {
	checkEmptyField(voornaam, "Voornaam is verplicht")
	checkEmptyField(naam, "Naam is verplicht")
}

function checkEmptyField(field, msg) {
	if (field.value == "") {
		errorsArray.push(msg)
	}

	if (errorsArray.length > 0) {
		let errorList = document.querySelector("#errors ul")
		errorList.innerHTML = ""
		errorsArray.forEach((error) => {
			errorList.innerHTML += `<li>${error}</li>`
		})
		document.querySelector("#errors").classList.remove("d-none")
		document.querySelector("#succes").classList.add("d-none")
		document.querySelector("#info").classList.add("d-none")
	} else {
		document.querySelector("#info").classList.remove("d-none")
		document.querySelector("#succes").classList.remove("d-none")
	}
}

function hideAlerts() {
	document.querySelector("#errors").classList.add("d-none")
	document.querySelector("#succes").classList.add("d-none")
	document.querySelector("#info").classList.add("d-none")
}

checkForm.addEventListener("click", checkFormulier)
