const playerForm = document.querySelector("form");
const playerNameInput = document.getElementById("playerName");

playerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const playerName = playerNameInput.value.trim();
    if (playerName === "") {
        alert("Please enter your name.");
        return;
    }
    localStorage.setItem("playerName", playerName);
    window.location.href = "game.html";
});