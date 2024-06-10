function chanceDices(imgDices) {
    const results = [];
    for (const element of imgDices) {
        let diceChance = Math.floor(Math.random() * 6 + 1);
        element.classList.remove("shake");
        element.setAttribute("src", "img/dice-0" + diceChance + ".svg");
        results.push(diceChance);
    }
    return results;
}

function checkWin(dificultad, total) {
    if (dificultad == 'Novato' && total == 6) {
        return true;
    } else if (dificultad == 'Normal' && total >= 7) {
        return true;
    } else if (dificultad == 'Experto' && total >= 15) {
        return true;
    }
    return false;
}

function getPoints(rolls, win) {
    if (!win) {
        return 0;
    }
    if (rolls == 3) {
        return 100;
    } else if (rolls == 2) {
        return 75;
    } else if (rolls == 1) {
        return 50;
    }
    return 0;
}

function tryRoll(dificultad, tiros) {
    if (tiros < 1) {
        return;
    }
    const diceGame = document.getElementById("dices");
    if (tiros >= 1 && diceGame) {
        diceGame.replaceChildren();
        for (let i = 1; i <= tiros; i++) {
            let diceChance = Math.floor(Math.random() * 6 + 1);
            let img = document.createElement("img");
            img.src = "img/dice-0" + diceChance + ".svg";
            img.classList.add("shake");
            diceGame.appendChild(img);
        }
        let timeCount = 0;
        const diceTime = setInterval(function () {
            timeCount++;
            const dices = chanceDices(diceGame.querySelectorAll("img"));
            if (timeCount == 15) {
                clearInterval(diceTime);

                const total = dices.reduce((d, a) => d + a, 0);
                const isWin = checkWin(dificultad, total);
                const userData = getLoggedUser();

                const userGame = userData.partidas.find((p) => p.dificultad == dificultad);
                if (userGame) {
                    userGame.finish = isWin;
                    userGame.puntaje = getPoints(userGame.intentos, isWin);
                    userGame.intentos--;
                    userGame.resultado = dices;
                    if (userGame.intentos == 0) {
                        userGame.intentos = 3;
                    }
                    setLoggedUserData(userData);
                } else {
                    userData.partidas.push({ dificultad: dificultad, intentos: 2, puntaje: getPoints(3, isWin), finish: isWin, resultado: dices });
                    setLoggedUserData(userData);
                }
                loadStatistics(dificultad);
                checkReRoll(dificultad, isWin);
            }
        }, 1000 / 5);
    }
}

function checkReRoll(dificultad, isWin) {
    // const userData = getLoggedUser();
    const btnReRoll = document.getElementById("reroll");
    if (btnReRoll) {
        if (isWin) {
            btnReRoll.innerText = "Reintentar";
        } else {
            btnReRoll.innerText = "Lanzar dados";
        }
    }
}

function loadStatistics(dificultad) {
    const userData = getLoggedUser();
    const gameData = userData.partidas.find((p) => p.dificultad == dificultad);
    if (!gameData) {
        return;
    }

    const totalPanel = document.getElementById("puntos");
    if (totalPanel) {
        totalPanel.innerText = gameData.puntaje;
    }

    const totalIntentos = document.getElementById("intentos");
    if (totalIntentos) {
        totalIntentos.innerText = gameData.intentos;
    }
}

function loadUserStatistics() {
    const userData = getLoggedUser();
    const pnjPanel = document.getElementById("puntos");
    if (pnjPanel) {
        console.log(userData);
        const total = userData.partidas.map(({puntaje}) => puntaje).reduce((c,b) => c + b, 0);
        pnjPanel.innerText = total;
        console.log(total);
    }

    const tableBd = document.getElementById("tableBody");
    if (tableBd) {
        let contents = "";
        for (const partida of userData.partidas) {
            contents += "<tr>"
            contents += "<td>" + partida.dificultad + "</td>";
            contents += "<td>" + partida.resultado.join(", ") + "</td>";
            contents += "<td>" + partida.intentos + "</td>";
            contents += "<td>" + partida.puntaje + "</td>";
            contents += "<td>" + (partida.finish ? "Gano" : "Perdio") + "</td>";
            contents += "</tr>"
        }
        tableBd.innerHTML = contents;
    }
}

function rollNovato() {
    tryRoll("Novato", 1);
}

function rollNormal() {
    tryRoll("Normal", 2);
}

function rollExperto() {
    tryRoll("Experto", 3);
}

window.onload = function () {
  // Lee el contador de aciertos de localStorage
  var aciertos = localStorage.getItem("aciertos");

  // Actualiza la tabla de resultados
  document.getElementById("tablaResultados").textContent =
    "Aciertos: " + aciertos + " " + "de 12";
};
