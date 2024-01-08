const checkForm = document.querySelector("#btnCheck")
let errorsArray = []

//Zorg ervoor dat geen alerts zichtbaar zijn
hideAlerts()

//Check of formulier correct is ingevuld
function validateForm() {
	hideAlerts()

	//Check of velden zijn ingevuld
	checkEmptyField(voornaam, "Voornaam is verplicht.")
	checkEmptyField(naam, "Naam is verplicht.")
	if (checkEmptyField(gebruikersnaam, "Gebruikersnaam is verplicht.")) validateUsername() ? true : errorsArray.push("Gebruikersnaam mag niet starten met '.' of '-'.")
	checkEmptyField(adres, "Adres is verplicht.")
	checkEmptyField(land, "Land is verplicht.")
	checkEmptyField(provincie, "Provincie is verplicht.")

	//Controlleer valide email
	validateEmail(email.value) ? true : errorsArray.push("E-mailadres is niet correct.")

	//Controlleer wachtwoord overeenkomst
	checkPassword()

	//Valideer betalingswijze
	if (errorsArray.length == 0) validatePayment(betalingsMethode)

	//Check Postcode
	checkPC(postcode)

	//Check algemene voorwaarden
	checkTermsAndConditions()

	//behandel de verschillende alerts af
	handleAlerts()
}

//Check of het veld is ingevuld
function checkEmptyField(field, msg) {
	if (field.value == "") {
		errorsArray.push(msg)
		return false
	}
	return true
}

//Check of email valide is
function validateEmail(email) {
	// RegEx voor email te valideren (https://emaillistvalidation.com/blog/email-validation-in-javascript-using-regular-expressions-the-ultimate-guide/)
	const emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/
	return email.match(emailRegEx) ? true : false
}

//CheckPassword
function checkPassword() {
	const pw = document.querySelector("#wachtwoord")
	const herhaalPw = document.querySelector("#herhaalWachtwoord")

	if (!checkEmptyField(pw, "Wachtwoord is verplicht.")) return

	if (pw.value.length < 7) {
		errorsArray.push("Wachtwoord moet minstens 8 karakters zijn.")
		return
	}

	if (!checkEmptyField(herhaalPw, "Herhaal wachtwoord is verplicht.")) return

	if (pw.value != herhaalPw.value) {
		errorsArray.push("Wachtwoorden zijn niet gelijk aan elkaar.")
		return
	}
}

//valideer gebruikersnaam
function validateUsername() {
	const username = document.querySelector("#gebruikersnaam").value
	const firstChar = username.charAt(0)

	return firstChar == "." || firstChar == "-" ? false : true
}

//Valideer betalingswijze
function validatePayment(field) {
	const betalingswijze = document.querySelector(`#${field.id} input:checked`).value
	const infoAlertText = document.querySelector("#info>p")

	infoAlertText.innerHTML = `Je betalingswijze is ${betalingswijze}`
}

//check postcode
function checkPC(field) {
	checkEmptyField(field, "Postcode is verplicht.")

	const min = parseInt(field.getAttribute("min"))
	const max = parseInt(field.getAttribute("max"))
	if (parseInt(field.value) < min || parseInt(field.value) > max) errorsArray.push(`De waarde van de postcode moet tussen ${min} en ${max} liggen`)
}

//Check algemene voorwaarden
function checkTermsAndConditions() {
	const tac = document.querySelector("#algemeneVoorwaarden")
	if (!tac.checked) errorsArray.push("U moet de algemene voorwaarden accepteren.")
}

//Toon of verberg de bepaalde alerts aan de hand van de errors
function handleAlerts() {
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

//Verberg de alerts
function hideAlerts() {
	errorsArray = []
	document.querySelector("#errors").classList.add("d-none")
	document.querySelector("#succes").classList.add("d-none")
	document.querySelector("#info").classList.add("d-none")
}

//Voeg event toe aan knop. Voert functie uit als hierop geklikt wordt
checkForm.addEventListener("click", validateForm)
