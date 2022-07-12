var map = {
    a: 'q', b: 'w', c: 'e', d: 'r', e: 't', f: 'y',
    g: 'u', h: 'i', i: 'o', j: 'p', k: 'a', l: 's',
    m: 'd', n: 'f', o: 'g', p: 'h', q: 'j', r: 'k',
    s: 'l', t: 'z', u: 'x', v: 'c', w: 'v', x: 'b',
    y: 'n', z: 'm',
    A: 'Q', B: 'W', C: 'E', D: 'R', E: 'T', F: 'Y',
    G: 'U', H: 'I', I: 'O', J: 'P', K: 'A', L: 'S',
    M: 'D', N: 'F', O: 'G', P: 'H', Q: 'J', R: 'K',
    S: 'L', T: 'Z', U: 'X', V: 'C', W: 'V', X: 'B',
    Y: 'N', Z: 'M',
    1: '2', 2: '3', 3: '4', 4: '5', 5: '6',
    6: '7', 7: '8', 8: '9', 9: '0', 0: '1',
    '-': '-'
  };
  
  const scramble = (t) => {
      const m = (u) => u.split("").map(x => map[x]).join("");
      var tm = m(t), tl = tm.length, tla = tl - (tl % 2 === 0 ? 0 : 1), s = "";
      for (let i = 0; i < tla; i++) { i % 2 === 0 ? s += tm[i+1] : s += tm[i-1] };
      if (tl % 2 === 1) { s+=tm[tl-1] }; s = m(s); return s;
  }
  
  export {
    map, scramble,
  };

// This is for is for depositing Twitch player info, specifically for the avoidance tournament. Copy the cells and set to 's'

people = s.split(/[\t\n]/).reduce((acc, el, i) => {
    const fields = 5
    n = Math.floor(i / fields);
    
    if (i % fields === 0) {
        acc[n] = { playerName: el };
    } else if (i % fields === 1) {
        acc[n].twitchHandle = el;
    } else if (i % fields === 2) {
        acc[n].handleType = el;
    } else if (i % fields === 3) {
        acc[n].country = el;
    } else {
        acc[n].pronouns = el;
    }
    return acc;
}, []).sort((a,b) => (a.twitchHandle.toLowerCase() > b.twitchHandle.toLowerCase()) ? 1 : -1)


// Note: this script is a copy/paste into the Chrome console. TODO: consolidate into program
// entries = '';
games = {};
// gamesByName = {};

headers = {};

sanitize = (str) => {
  var replace = {
    "#": "number",
	  '"': "",
    ":": "",
    "-": "",
    ".": "",
    "'": "",
    "!": "",
    "~": "",
  };
  str = str.trim().toString().toLowerCase().replace(/[#:\-\.'!~]/g, (matched) => replace[matched]);
  str = str.replace(/ {1,}/g, " ");
  return str.replace(/\s([\w|\d])/g, ($1) => $1[1].toUpperCase());
};

removeNAs = (str) => str.replace('N/A', '');

fields = {
	category: {
		name: "category",
		group: "runInfo"
	},
	commentators: {
		name: "commentators",
		group: "playerInfo"
	},
	commentator_pronouns: {
		name: "commentator_pronouns",
		group: "runInfo"
	},
	console: {
		name: "console",
		group: "gameInfo"
	},
	country: {
		name: "country",
		group: "playerInfo",
        prependPlayer: true,
	},
	createdBy: {
		name: "createdBy",
		group: "gameInfo"
	},
	estimate: {
		name: "estimate",
		group: "runInfo"
	},
	gameLink: {
		name: "gameLink",
		group: "gameInfo"
	},
	gameName: {
		name: "gameName",
		group: "gameInfo"
	},
	numberOfPlayers: {
		name: "numberOfPlayers",
		group: "playerInfo"
	},
	pronouns: {
		name: "pronouns",
		group: "playerInfo",
        prependPlayer: true,
	},
	resolution: {
		name: "resolution",
		group: "gameInfo",
		map: true
	},
	displayName: {
		name: "displayName",
		group: "playerInfo",
        prependPlayer: true,
	},
	pb: {
		name: "pb",
		group: "playerInfo",
        prependPlayer: true,
	},
	twitchHandle: {
		name: "twitchHandle",
		group: "playerInfo",
        prependPlayer: true,
	},
	handleType: {
		name: "handleType",
		group: "playerInfo",
        prependPlayer: true,
	},
	runType: {
		name: "runType",
		group: "runInfo"
	},
	camera: {
		name: "camera",
		group: "playerInfo",
		map: true,
        prependPlayer: true,
	},
	worldRecord: {
		name: "worldRecord",
		group: "runInfo",
	},
}

mapping = {
    'Category': fields.category.name,
    'Commentary Pronouns': fields.commentator_pronouns.name,
    'Commentary\nHandle(s)': fields.commentators.name,
    'Console': fields.console.name,
    'Country': fields.country.name,
    'Created By': fields.createdBy.name,
    'Estimate': fields.estimate.name,
    'Game': fields.gameName.name,
    'Handle Type': fields.handleType.name,
    'Handle': fields.twitchHandle.name,
    'Players': fields.numberOfPlayers.name,
    'Pronouns': fields.pronouns.name,
    'Resolution': fields.resolution.name,
    'Run Type': fields.runType.name,
    'Runner Name': fields.displayName.name,
    'Runner PB': fields.pb.name,
    'Twitch\nGame Link': fields.gameLink.name,
    'Using Webcam': fields.camera.name,
    'WR': fields.worldRecord.name,

	'1:1': '1:1',
	'3:2': '3:2',
	'4:3 (800x600 1024x768 etc)': '600',
	'8:7 (256x224 800x700 etc)': '8:7',
	'16:9 (1920x1080 1280x720 etc)': '16:9',
	'10:7 (roughly 64:45, 714x500)': '10:7',
	'800 x 608': '608',

	'Yes': true,
	'No': false,
	'Not Sure': false,
}

setDefaultGameInfo = () => {
    defaultGameInfo = {
        "gameInfo": {
        "console": null,
        "gameLink": null,
        "gameName": null,
        "resolution": null,
        "createdBy": null
        },
        "playerInfo": {
        "numberOfPlayers": null, // TODO: keep only player# into this section; move 
        "player1_twitchHandle": null,
        "player1_handleType": null,
        "player1_displayName": null,
        "player1_country": null,
        "player1_pronouns": null,
        "player1_camera": false,
        "player1_pb": null,
        "player2_twitchHandle": null,
        "player2_handleType": null,
        "player2_displayName": null,
        "player2_country": null,
        "player2_pronouns": null,
        "player2_camera": false,
        "player2_pb": null,
        "player3_twitchHandle": null,
        "player3_handleType": null,
        "player3_displayName": null,
        "player3_country": null,
        "player3_pronouns": null,
        "player3_camera": false,
        "player3_pb": null,
        "player4_twitchHandle": null,
        "player4_handleType": null,
        "player4_displayName": null,
        "player4_country": null,
        "player4_pronouns": null,
        "player4_camera": false,
        "player4_pb": null,
        "commentators": null,
        "commentator_pronouns": null
        },
        "runInfo": {
        "category": null,
        "estimate": null,
        "runType": null,
        "worldRecord": null,
        "wrHolder": null
        },
        "visuals": {
        "backgroundOpacity": '.3',
        "chromaKeyColor": "green"
        }
    }
}

setDefaultGameInfo();

resetInfo = () => {
    setDefaultGameInfo();
    games = {};
    headers = {};
}


resetInfo();


URL = "https://sheets.googleapis.com/v4/spreadsheets/1O3dkoJ_oU2m1gToOarV3SebkbmtkDdmteZJ6f11G_pg/values/D6:V78?key=";
fetch(URL).then(x => x.json()).then(x => entries = x.values).then(() => {
    currentPlayer = 1;
    currentGameName = '';
	headers = entries[0].map((header) => mapping[header]);
    // console.log(headers)
    headerIndexes = headers.reduce((acc, header, i) => ({ ...acc, [header]: i }), {})
    // console.log(headers)
    // console.log(headerIndexes)
    entries.slice(2).forEach((entry) => {
        sanitizedGameName = sanitize(entry[headerIndexes.gameName])
        newGame = !!entry[headerIndexes.numberOfPlayers];

        if (newGame) {
            currentGameName = sanitizedGameName;
        }

        if (!games[currentGameName]) {
            currentPlayer = 1;
            games[currentGameName] = JSON.parse(JSON.stringify(defaultGameInfo));
        } else {
            currentPlayer++;
        }

        entry.forEach((value, i) => {
            if (!['N/A', ''].includes(value)) {
                headerName = headers[i];
                const { name, group, map, prependPlayer } = fields[headers[i]];
                
                // console.log('games[sanitizedGameName][group][headerName]', games[sanitizedGameName][group][headerName])
                
                if (prependPlayer) {
                    headerName = `player${currentPlayer}_${headerName}`;
                }
    
                if (map) {
                    value = mapping[value];
                }
    
                // console.log(value, headerName, name, group, map, prependPlayer)
    
                if (newGame || prependPlayer) {
                    games[currentGameName][group][headerName] = value;
                }
                // console.log('games[sanitizedGameName][group][headerName]', games[sanitizedGameName][group][headerName])
            }
        });
    });
    console.log(games)
});



// after scraping, these get the player info

// array of players for tournaments
tournamentGamePlayerInfo = {}
arr = [];

Object.keys(tournamentGamePlayerInfo).forEach(field => {
    if (field.includes('twitchHandle')) {
        arr.push(s[field]);
    }
});

arr.sort();


// all player info lookup table
let num = 0;
let output = Object.keys(runsBackup).reduce((acc, el) => {
    const playerInfo = Object.keys(runsBackup[el].playerInfo);
    let i = 1;
    if (runsBackup[el].playerInfo['player' + i + '_twitchHandle']) {
        num++
        console.log(runsBackup[el].playerInfo['player' + i + '_twitchHandle'])
        const fields = ['twitchHandle', 'displayName', 'pronouns', 'country', 'handleType']
        const info = fields.reduce((fieldAcc, fieldEl) => ({
            ...fieldAcc,
            [fieldEl]: runsBackup[el].playerInfo['player' + i + '_' + fieldEl],
        }), {});
        acc[runsBackup[el].playerInfo['player' + i + '_twitchHandle']] = info;
    }
    return acc;
}, {})

let playerInfo = [...new Set(Object.keys(output))].sort().reduce((acc, el) => ({ ...acc, [el]: output[el] }), {});