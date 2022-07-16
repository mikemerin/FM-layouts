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
    "The Colour Relay Race",
    "Relay Race"
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
                .append($("<th>", { text: "Make P3" }))
                .append($("<th>", { text: "Make P4" }))
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
                .append($("<td>", { text: 'P3', class: 'clickable', click: () => {
                        dashboardForm.insertPlayer(twitchHandle, 3);
                        setTimeout(() => dashboardForm.insertPlayer(twitchHandle, 3), 200);
                    }
                }))
                .append($("<td>", { text: 'P4', class: 'clickable', click: () => {
                        dashboardForm.insertPlayer(twitchHandle, 4);
                        setTimeout(() => dashboardForm.insertPlayer(twitchHandle, 4), 200);
                    }
                }))

            table.append(gamePlayers);
        });

        // TODO: store this somewhere else, duplicated from dashboard
        let featuredChannelUrl = 'https://api.furious.pro/featuredchannels/bot/ab8b468a5808ac206f12cbc7d80af868:90780102/';
        featuredChannelUrl += playerGroups[game].filter((twitchHandle) => players[twitchHandle].handleType === "Twitch").join(',');

        console.log('featuredChannelUrl', featuredChannelUrl)

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
                        $("<span>", { text: '\t\t\t\t'} ),
                        $("<span>", { class: 'updateFollowers' }).append(
                            $("<img>", {
                                id: sanitize("Update followers " + game),
                                click: (e) => {
                                    console.log('e', e)
                                    e.preventDefault();
                                    if (confirm(`WARNING: updates the followers to ${featuredChannelUrl}`)) {
                                        window.open(featuredChannelUrl)
                                    }
                                },
                                src: "/assets/dashboard/baseLayoutLayers/twitchIconPurple.png",
                                alt: "Update followers"
                            })
                        ),
                    ),
                    table
                )
        );

        $('#status' + sanitizedGameName).on('click', () => toggle(sanitizedGameName))
    });
};