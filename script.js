function feedbackForm(event) {
	// Mendapatkan nilai dari input form
	var name = document.getElementById('name').value;
	var email = document.getElementById('email').value;
	var feedback = document.getElementById('feedback').value;

	alert(`hi ${name}`);
	alert(`your email is ${email}`);
	alert(`your feedback: ${feedback}`);
	alert('Terima kasih atas feedback Anda!');
	event.preventDefault();
}
