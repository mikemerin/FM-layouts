const toggle = (id) => {
    var el = document.getElementById('playerTable' + id);
    var status = document.getElementById('status' + id);
    if (el.style.display === "none") {
      el.style.display = "block";
      status.innerText = " -";
    } else {
      el.style.display = "none";
      status.innerText = " +";
    }
};

const groupTableGames = [
    "Avoidance Tournament",
    "Gaborro's Goobawagawahoo Event",
    "I Wanna Can't Stop Tournament",
    "Monkey Ball Tournament",
    "The Colour Relay Race"
];

const makePlayerGroupTables = (players, playerGroups, dashboardForm) => {
    groupTableGames.forEach((game) => {
        const sanitizedGameName = sanitize(game);
        const table = $("<table>", {
            id: "playerTable" + sanitizedGameName,
            class: "panel-table",
            style: "border: 0; display: none;"
        })
            .append(
                $("<tr>")
                .append($("<th>", { text: "Twitch Handle" }))
                .append($("<th>", { text: "Display Name" }))
                .append($("<th>", { text: "Handle Type" }))
                .append($("<th>", { text: "Country" }))
                .append($("<th>", { text: "Pronouns" }))
                .append($("<th>", { text: "Make P1" }))
                .append($("<th>", { text: "Make P2" }))
            );
        
        playerGroups[game].forEach((player) => {
            const { country, handleType, displayName, pronouns, twitchHandle } = players[player];

            const gamePlayers = $("<tr>")
                .append($("<td>", { text: twitchHandle }))
                .append($("<td>", { text: displayName }))
                .append($("<td>", { text: handleType }))
                .append($("<td>", { text: country }))
                .append($("<td>", { text: pronouns }))
                .append($("<td>", { text: 'P1', class: 'clickable', click: () => {
                        dashboardForm.insertPlayer(twitchHandle, 1);
                        setTimeout(() => dashboardForm.insertPlayer(twitchHandle, 1), 200);
                    }
                }))
                .append($("<td>", { text: 'P2', class: 'clickable', click: () => {
                        dashboardForm.insertPlayer(twitchHandle, 2);
                        setTimeout(() => dashboardForm.insertPlayer(twitchHandle, 2), 200);
                    }
                }))

            table.append(gamePlayers);
        });

        $('#playerInfoBody').append(
            $("<br>"),
            $("<div>", { id: "playerInfo" + sanitizedGameName })
                .append(
                    $("<label>").append(
                        $("<span>", { text: game }),
                        $("<span>", {
                            id: "status" + sanitizedGameName,
                            text: ' +'
                        }),
                    ),
                    table
                )
        );

        $('#status' + sanitizedGameName).on('click', () => toggle(sanitizedGameName))
    });
};