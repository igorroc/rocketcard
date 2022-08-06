const form = document.querySelector("#form")
const result = document.getElementById("result")
const input = document.getElementById("gitUser")

function searchUser(event) {
	event.preventDefault()
	fetch(`https://api.github.com/users/${input.value}`)
		.then((res) => res.json())
		.then((data) => {
			if (data.message === "Not Found") {
				return alert("Usuário nao encontrado")
			}
			input.value = ""
			form.style = "display: none"
			result.style = "display: flex"
			console.log(data)
			document.title = `RocketCard - ${data.name}`

			document.querySelector("#userPic img").src = data.avatar_url

			document.querySelector("#card #wrapper #head span").innerText =
				data.login

			document.querySelector(
				"#card #wrapper #content #seguidores span"
			).innerText = data.followers + " seguidores"

			document.querySelector(
				"#card #wrapper #content #seguindo span"
			).innerText = data.following + " seguindo"

			document.querySelector(
				"#card #wrapper #content #repositorios span"
			).innerText = data.public_repos + " repositórios"

			if (data.company) {
				document.querySelector(
					"#card #wrapper #content #empresa"
				).style = ""
				document.querySelector(
					"#card #wrapper #content #empresa span"
				).innerText = data.company
			} else {
				document.querySelector(
					"#card #wrapper #content #empresa"
				).style = "display: none"
			}

			if (data.location) {
				document.querySelector(
					"#card #wrapper #content #cidade"
				).style = ""
				document.querySelector(
					"#card #wrapper #content #cidade span"
				).innerText = data.location
			} else {
				document.querySelector(
					"#card #wrapper #content #cidade"
				).style = "display: none"
			}
		})
}

function goBack() {
	form.style = "display: flex"
	result.style = "display: none"
	document.title = "RocketCard"
	input.focus()
	document.querySelectorAll("canvas").forEach((canvas) => canvas.remove())
}

function newBackground() {
	let newColor = generateRandomColor()
	document.querySelector("#card").style = "background-color: " + newColor
}

function generateRandomColor() {
	var letters = "0123456789ABCDEF"
	var color = "#"
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)]
	}
	return color
}

function salvarImg() {
	document.querySelectorAll("canvas").forEach((canvas) => canvas.remove())
	html2canvas(document.querySelector("#card"), {
		backgroundColor: null,
		allowTaint: true,
	}).then((canvas) => {
		console.log(canvas)
		document.body.appendChild(canvas)
	})
}
