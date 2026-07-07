const historyTable = document.getElementById("historyTable");
const backBtn = document.getElementById("backBtn");

async function loadHistory() {
    try {
        const response = await fetch("https://tic-tac-toe-t88q.onrender.com/");
        const result = await response.json();
        const matches = result.data;
        historyTable.innerHTML = "";
        if (!matches || matches.length === 0) {
            historyTable.innerHTML = `
                <tr>
                    <td colspan="4">
                        No Match History Available
                    </td>
                </tr>
            `;
            return;
        }
        matches.forEach(match => {
            const row = document.createElement("tr");
            const date = new Date(match.date);
            row.innerHTML = `
                <td>${match.playerName}</td>
                <td>${match.winner}</td>
                <td>${match.moves}</td>
                <td>${date.toLocaleString()}</td>
            `;
            historyTable.appendChild(row);
        });
    }

    catch (error) {
        console.error(error);
        historyTable.innerHTML = `
            <tr>
                <td colspan="4">
                    Failed to Load Match History
                </td>
            </tr>
        `;
    }
}

backBtn.addEventListener("click", () => {
    window.location.href = "index.html";
});

loadHistory();