

// När sidan laddas körs denna kod
document.addEventListener('DOMContentLoaded', function() {

	// Hitta inloggningsformuläret på sidan
	const form = document.querySelector('.login-form');
	if (form) {
		// När användaren försöker logga in
		form.addEventListener('submit', function(e) {
			e.preventDefault(); // Stoppa vanlig formulärskickning
			const username = document.getElementById('username').value;
			const password = document.getElementById('password').value;

			// Enkel kontroll: båda fält måste vara ifyllda
			if (username && password) {
				showSuccess('Välkommen, ' + username + '!'); // Visa välkomstmeddelande
				// Efter en kort stund, gå vidare till dashboard
				setTimeout(function() {
					window.location.href = 'home.html';
				}, 1400); // Vänta lite så alerten syns
			} else {
				showError('Fyll i alla fält!'); // Visa felmeddelande
			}
		});
	}
});

// Visar ett grönt meddelande
function showSuccess(message) {
	showAlert(message, '#5ee7df');
}
// Visar ett rött meddelande
function showError(message) {
	showAlert(message, '#ff6b6b');
}

// Skapar och visar en alert på sidan
function showAlert(message, color) {
	let alert = document.createElement('div');
	alert.textContent = message;
	alert.style.position = 'fixed';
	alert.style.top = '30px';
	alert.style.left = '50%';
	alert.style.transform = 'translateX(-50%)';
	alert.style.background = color;
	alert.style.color = '#fff';
	alert.style.padding = '1rem 2rem';
	alert.style.borderRadius = '8px';
	alert.style.boxShadow = '0 2px 12px rgba(0,0,0,0.12)';
	alert.style.fontSize = '1.1rem';
	alert.style.zIndex = 9999;
	alert.style.opacity = 0.95;
	document.body.appendChild(alert);
	setTimeout(() => {
		alert.style.transition = 'opacity 0.5s';
		alert.style.opacity = 0;
		setTimeout(() => alert.remove(), 500);
	}, 1800);
}
