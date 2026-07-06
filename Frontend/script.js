const startBtn = document.getElementById("startBtn");
const historyBtn = document.getElementById("historyBtn");

startBtn.addEventListener("click", () => {
    window.location.href = "player.html";
});

historyBtn.addEventListener("click", () => {
    window.location.href = "history.html";
});