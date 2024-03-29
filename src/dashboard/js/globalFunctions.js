class TwitchAPI {
    constructor() {
        this.channelId = '90780102';
        this.clientId = '';
        this.clientSecret = '';
        this.redirectURI = 'http://localhost:9090/';
        this.responseType = 'token';
        this.scope = 'channel_editor';

        this.oauthToken = '';
        this.bearerToken = '';

        this.gameId;
        this.gameName;
        this.title;

        // this.setInMotion();
    }

    async updateTwitchConfig() {
    // updateTwitchConfig = ({ clientId, clientSecret, oauthToken, bearerToken }) => {
      const url = './env.json';
      var http = new XMLHttpRequest();
      http.open('HEAD', url, false);
      http.send();
      if (http.status !== 404) {
        const res = await fetch('./env.json');
        const { clientId, clientSecret, oauthToken, bearerToken } = await res.json();
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.oauthToken = oauthToken;
        this.bearerToken = bearerToken;
      }
    }

    async fetcher(url, options = {}, ignoreJson = false) {
        console.log('url', url, '\noptions', options)
        const res = await fetch(url, options);
        if (ignoreJson) {
          return res;
        }
        const data = await res.json();
        console.log('fetcher data', data);
        return data;
    }

    async getOauthToken() {
      const url = 'https://id.twitch.tv/oauth2/authorize?' + [
          `client_id=${this.clientId}`,
          `redirect_uri=${this.redirectURI}`,
          `response_type=${this.responseType}`,
          `scope=${this.scope}`
      ].join('&');

      const instructions = [
        'Sign into FM\'s Twitch account',
        'Copy the following link',
        'Open a new Chrome tab and open the Network tab',
        'Paste the link into the browser and accept',
        'Scroll to the top of the Network tab. The first call will be an "authorize" call. The Response Header will have your access_token',
        'URL: ' + url
      ]
      console.log(instructions.join("\n"));
    }

    // async getBearerToken() { // disabled as we're using OAuth
    //   const url = 'https://id.twitch.tv/oauth2/token?' + [
    //     `client_id=${this.clientId}`,
    //     `client_secret=${this.clientSecret}`,
    //     `grant_type=client_credentials`,
    //     `scope=${this.scope}`
    //   ].join('&');
    //
    //   const options = {
    //   	method: 'POST'
    //   };
    //
    //   const data = await this.fetcher(url, options);
    //   this.bearerToken = data?.access_token;
    //   console.log('token set to ' + this.bearerToken);
    // }

    async getChannelInfo() {
      const channelName = 'fangamemarathon';
      // const channelName = 'shadowsdieaway'; // For game_id debugging
      const url = `https://api.twitch.tv/helix/search/channels?query=${channelName}/`;

      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.twitchtv.v5+json',
          'Client-ID': this.clientId,
          'Authorization': 'Bearer ' + this.oauthToken,
        }
      };

      const data = await this.fetcher(url, options);
      const fmChannel = data.data.find(({ broadcaster_login }) => broadcaster_login === channelName);
      const { game_id, game_name, id, title } = fmChannel;
      this.channelId = id;
      this.gameId = game_id;
      this.gameName = game_name;
      this.title = title;
      console.log('output data', data);
    }

    async updateChannel(status, game, channels) {
      this.getChannelInfo()
      console.log('game', game)
      console.log('status', status)
      console.log('channels', channels)
      const gameMap = {
        "Banjo-Kazooie": 10033,
        "Celeste": 492535,
        "Clone Hero": 125264560,
        "E.Y.E. Divine Cybermancy": 26800,
        "Holo Dungeon": 2041888201,
        "I Wanna Be The Guy": 20716,
        "I Wanna Be the Guy": 20716,
        "La-Mulana": 20422,
        "Mega Man": 4815,
        "Metroid: Zero Mission": 15919,
        "Momentum Mod": 2043449207,
        "Piano": 26936,
        "Smol Ame": 1518385830,
        "Sonic Adventure": 7195,
        "Super Mario 64": 2692,
        "Super Mario Bros.": 509508,
        "Super Mario World": 1229,
        "Super Metroid": 7595,
        "Super Monkey Ball": 6624,
        "Super Monkey Ball 2": 4694,
        "The Legend of Zelda: Ocarina of Time": 11557,
        "Touhou Project": 448375,
      }
      // game list https://raw.githubusercontent.com/Nerothos/TwithGameList/master/game_info.json
      let url = `https://api.twitch.tv/helix/channels?broadcaster_id=${this.channelId}`;
      if (game && gameMap[game]) {
        url += '&game_id=' + gameMap[game];
      }
      if (status) {
        url += '&title=' + encodeURI(status);
      }
      let featuredChannelUrl = 'https://api.furious.pro/featuredchannels/bot/ab8b468a5808ac206f12cbc7d80af868:90780102/';

      const body = JSON.stringify({
          channel: {
              ...(status && { status }),
              ...(game && { game }),
              channel_feed_enabled: true
          }
      });

      const options = {
          method: 'PATCH',
          body,
          headers: {
              'Content-Type': 'application/json',
          		'Accept': 'application/vnd.twitchtv.v5+json',
          		'Client-ID': this.clientId,
          		'Authorization': 'Bearer ' + this.oauthToken,
          }
      };

      const data = this.fetcher(url, options);
      console.log('set data', data)

      if (channels !== undefined) {
        featuredChannelUrl += channels.replace(/ /g,'');
        this.fetcher(featuredChannelUrl);
      }
    }

    updateTwitchFull(game) {
      const { gameInfo, playerInfo, runInfo } = NodeCG.masterRunList.replicantValues[sanitize(game)];
      const { gameName, gameLink } = gameInfo;
      const { commentators, numberOfPlayers } = playerInfo
      const { category, runType } = runInfo;

      let players, channels;

      // TODO: this is a carveout, work into code instead with "multiple_people": true
      const multiplePeopleEvents = ['Avoidance Tournament', 'Relay Race'];
      if (multiplePeopleEvents.includes(gameName)) {
        players = 'Multiple People';
        channels = (gameName === 'Avoidance Tournament'
          ? ["Arzztt", "Draconical879", "Framzo", "IanBoy141", "Make_North", "Mastermaxify", "Not2Dey", "Razzor_iw", "Skulldude_", "Tehninza", "Wolsk", "bummerman222", "cheez8", "iraqlobster1", "popop4342", "romrom4444"]
          : gameName === 'Relay Race'
            ? ["BV502", "CeleCele", "Cosmoing", "Gaborro14", "Kalemandu", "Naloas", "Not2Dey", "Tehninza", "Wolfiexe", "d0ppller", "strelook21"]
            : []
        ).join(', ');
      } else {
        channels = players = new Array(parseInt(numberOfPlayers)).fill().map((x,i) => playerInfo[`player${i+1}_twitchHandle`]).join(', ');
      }

      if (commentators) {
        const nonTwitchChannels = [
          'Multiple People',
          'KevinStevens525',
          'killer336',
          'SloppySlime',
          'SpookyDad2',
        ]
        let commentatorsTwitch = commentators.split(', ').filter(c => !nonTwitchChannels.includes(c));
        if (commentatorsTwitch.length) {
          channels += ', ' + commentatorsTwitch.join(', ');
        }
      }

      const status = `FM 2022 - ${gameName}, ${category} ${runType} by ${players}`;

      if (confirm(`WARNING: this updates the FM Twitch channel with the info below.\nPlease make sure it is correct before confirming.\n\nTitle:\n${status}\n\nGame Link: ${gameLink}\n\nFeatured Channels: ${channels}`)) {
        // this.getChannelInfo() // for game_id debugging
        this.updateChannel(status, gameLink, channels);
      }
    }
}

const twitchApi = new TwitchAPI;
twitchApi.updateTwitchConfig();

// todo: add this to api.js (and min) this to the global scope class to be able to just call them anywhere
const getGameNameTitle = (gameName) => {
  return gameName.replace(/(I Wanna |Be the )/gi, "");
};

const sanitize = (str) => {
  var replace = {
    "#": "number",
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

const sanitizeFilename = (str) => {
  var replace = {
    "#": "number",
    ":": "",
    "\n": " ",
  };
  return str.replace(/[#:\n]/g, (matched) => replace[matched]);
};

function deepMerge(target, source) {
  const isObject = (obj) => obj && typeof obj === 'object';

  if (!isObject(target) || !isObject(source)) {
    return source;
  }

  Object.keys(source).forEach(key => {
    const targetValue = target[key];
    const sourceValue = source[key];

    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      target[key] = targetValue.concat(sourceValue);
    } else if (isObject(targetValue) && isObject(sourceValue)) {
      target[key] = deepMerge(Object.assign({}, targetValue), sourceValue);
    } else {
      target[key] = sourceValue;
    }
  });

  return target;
}

const colorToHex = {
  "red": "#FF0000",
  "orange": "#FF4500",
  "yellow": "#FFFF00",
  "green": "#00FF00",
  "blue": "#0000FF",
  "indigo": "#FF00BB",
  "purple": "#6441A4",
  "pink": "#FF69B4",
};

const doesFileExist = (url, asset = false) => {
  if (asset) url = "/assets/dashboard/" + url;
  var http = new XMLHttpRequest();
  http.open('HEAD', url, false); // todo: use FS or something better; it needs to be async which gives the error
  http.send();
  const status = http.status !== 404;
  if (!status) console.log(`Note for the HEAD error above:\n${url}\nIf this file is a gameBackgroundsAlt image, please ignore this error`);
  return status;
};

const changeCSSRule = (ruleKey, ruleValue, cssTextName, cssText) => {
  var sheet = document.styleSheets[0];
  var rules = sheet.cssRules || sheet.rules;
  for (let i = 0; i < rules.length; i++) {
      if (rules[i][ruleKey] === ruleValue) {
          rules[i].deleteRule(cssTextName);
          rules[i].appendRule(cssTextName + cssText);
          break;
      }
  };
};

const initReplicants = () => {
  initFieldValues();
  initRuns();
};

const initFieldValues = () => {
  NodeCG.dashboardPanels.replicant = nodecg.Replicant("fieldValues");
  const { name, namespace } = NodeCG.dashboardPanels.replicant;

  nodecg.readReplicant(name, namespace, replicantValues => {
    NodeCG.dashboardPanels.replicantValues = replicantValues;
    // console.log("replicantValuesFieldValues:", replicantValues);

    Object.keys(NodeCG.dashboardPanels.panels).forEach(panel => {
      NodeCG.dashboardPanels.panels[panel].loadValues(true);
    });
  });
};

const initRuns = () => {

  const url = "https://oengus.io/api/marathons/fm2022/schedule";
  fetch(url).then(resp => resp.json()).then(res => {

    const oengusRunOrderReplicant = nodecg.Replicant("oengusRunOrder");
    oengusRunOrderReplicant.value = res.lines;

    NodeCG.masterRunList.schedule.order = res.lines.map(({gameName}) => gameName );

    NodeCG.masterRunList.replicant = nodecg.Replicant("runs");
    const { name, namespace } = NodeCG.masterRunList.replicant;
    nodecg.readReplicant(name, namespace, replicantValues => {
      NodeCG.masterRunList.replicantValues = replicantValues;
      updateMasterRunList();
    })
  })


};

const updateMasterRunList = () => {
  NodeCG.dashboardPanels.panels["masterRunList"].dashboardFields.find(field => {
      if (field.id === "masterRunList") field.updateValue(true);
  });
};

class SetReplicant {

  constructor() {
    this.runsReplicant = nodecg.Replicant("runs");
    this.fieldValuesReplicant = nodecg.Replicant("fieldValues");
    this.stagingFieldReplicant = nodecg.Replicant("stagingField");
    // this.outputReplicant();
  }

  outputReplicant(replicantName = "runsReplicant", gameName = "all") {
    const {name, namespace} = this[replicantName];
    nodecg.readReplicant(name, namespace, replicantValues => {
      console.log("replicantValues:", replicantValues);
      Object.keys(replicantValues).forEach(run => {
        console.log(replicantValues[run]);
      });
    })
  };

  forceSet(value) {
    if (value) {
      this.runsReplicant.value = value; // warning: use only when needed as this overwrites the replicant permanently
      // this.runsReplicant.value =
      console.log("Force Set New Value")
      console.log("this.runsReplicant.value:", this.runsReplicant.value);
    }
  };

  loadRunIntoDashboard(gameName) {
    // console.log("setReplicant:", setReplicant);
    // console.log("NodeCG.adminPanel:", NodeCG.adminPanel);
    NodeCG.dashboardPanels.replicantValues = this.runsReplicant.value[sanitize(gameName)];
    this.fieldValuesReplicant.value = this.runsReplicant.value[sanitize(gameName)];
    ["gameInfo", "runInfo", "playerInfo", "adminPanel", "visuals"].forEach(panel => {
      NodeCG.dashboardPanels.panels[panel].loadValues(true);
    })
    NodeCG.adminPanel.setDropdownGameName(gameName);
  };

  saveRunFromDashboard(gameName) {
    let gameNameConfirmation = false;
    let fieldsChanged = 0;
    let text = "Are you sure you want to ";
    let textChanged = "";

    if (gameName === "Create New Run") {
      text += `make a new run for ${gameName}?`;
      // TODO: check if on the schedule or not (make an issue for this, may not be needed)
    } else {
      const savedGameRun = this.runsReplicant.value[sanitize(gameName)];
      ["gameInfo", "runInfo", "playerInfo", "adminPanel", "visuals"].forEach(panel => {
          NodeCG.dashboardPanels.panels[panel].dashboardFields.forEach(({id, value}) => {
            const savedValue = savedGameRun[panel][id];
            if (value !== savedValue) {
              if (id === "gameName") {
                gameNameConfirmation = `Warning: game names in field and dropdown are different:\n\nGame Name Field:\n${value}\n\nDropdown:\n${gameName}\n\nAre you sure you want to save this?`;
              }
              fieldsChanged++;
              textChanged += `\n${id}: ${savedValue} -> ${value}`;
            };
          })
      })
    }

    if (gameNameConfirmation && !confirm(gameNameConfirmation)) return;

    text += `update the following ${fieldsChanged} field(s) for\n${gameName}?\n`;
    if( fieldsChanged && confirm(text + textChanged) ) {
      NodeCG.dashboardPanels.panels.adminPanel.saveFields(gameName);
      NodeCG.dashboardPanels.panels.adminPanel.saveFields(gameName);
      NodeCG.dashboardPanels.panels.adminPanel.saveFields(gameName); // NOTE: three are needed to ensure it saves
    };
  }

};

const setReplicant = new SetReplicant();


// future: awful having to put this here since I can't access in bundles/dashboard/dashboard/js/adminPanel.js

class AdminPanel {

  constructor() {
    this.gameNameInput = this.getInput("gameInfo", "gameName");
    this.gameName;
  }

  setRunSearch() {

  };

  gameChecks() {
    // debugger
  };

  setAvatarCheck() {

  };

  setFieldsInfo() {

  };

  setRunSaveLoadButtons() {
    const label = $("<label>", { text: "Default run info for" });

    const loadButton = $("<button>", {
      id: "adminPanelLoadRunInfoButton",
      class: "halfButton",
      text: "Load",
      click: () => {
        this.gameName = $("#gameNameAdmin").val();
        console.log('clicked load for ' + this.gameName);
        setReplicant.loadRunIntoDashboard(this.gameName);
      }
    });

    const saveButton = $("<button>", {
      id: "adminPanelSaveRunInfoButton",
      class: "halfButton",
      text: "Save",
      click: () => {
        this.gameName = $("#gameNameAdmin").val();
        setReplicant.saveRunFromDashboard(this.gameName);
      }
    });

    $("#adminPanelInsertGameInfo").append(label, this.gameNameInput, loadButton, saveButton);
  }

  getInput(fieldGroup, field) {
    const runsReplicant = nodecg.Replicant('runs');
    const fieldValuesReplicant = nodecg.Replicant('fieldValues');
    const { name, namespace } = runsReplicant;
    const { name: fieldName, namespace: fieldNamespace } = fieldValuesReplicant;

    var dropdown = $("<select>", {
      id: field + "Admin",
      class: "inputSelect"
    });

    nodecg.readReplicant(name, namespace, replicantValues => {
      nodecg.readReplicant(fieldName, fieldNamespace, fieldReplicantValues => {
        // var options = Object.keys(replicantValues).map(game => {
        //   return replicantValues[game][fieldGroup][field];
        // });
        // }).sort((a,b) => a.toLowerCase().localeCompare(b.toLowerCase()) ); // todo: remove?

        var options = NodeCG.masterRunList.schedule.order.filter(x => x);
        if (!options.length) options = ['I Wanna Be The Orbit', 'Super Metroid: Ascent', "King Boo's Revenge X", 'Super Mario World Blind Event', 'I Wanna Try A Collab 2', 'Super Mario XP', 'Super Monkey Ball: Hella Holidays', 'E.Y.E. Divine Cybermancy', 'I Wanna Take The Memory', 'I Wanna Be The Pendulum', 'Super Mario: The Lost Dreams', 'Nebulous Thoughts', 'La-Mulana Randomizer', 'Touhou Rock Maiden FC', 'I Wanna Be The Farewell', 'Smol Ame', 'Yoiyami Dreamer', 'Fish Out Of Water', 'Celeste - Spring Collab 2020', 'Momentum Mod Jump Showcase', 'Super Mario Star Road', 'The Colour Relay Race', "Piece's Extravaganza", 'I Wanna Be The Fangame!', 'I Wanna Be Time Characters', "ABuffZucchini's Various Maps", 'I Wanna Be The Permanence', 'I Wanna Be The Justice Guy', 'Banjo-Kazooie Randomizer', 'Full Techno Jackass', 'Piano Medley', 'I Wanna Be The Agent', 'Touhou Rock Maiden FC2', 'I Wanna Be The Angewel', 'Shining Stars 4: Elephant Star Adventure', 'IWBTG Blind Sudoku Event', 'I Wanna Be The Kukulu', "Gaborro's Goobawagawahoo Event", 'I Wanna Rost The Car', 'Pyrite Adventure 2', 'Momentum Mod Surf Showcase', 'untitled needle game', 'How The Gruntch Stole Christmas', 'Bounce Tales 64', 'Celeste Randomizer', 'Avoidance Tournament', 'Suwako-chan Cubic HD', 'Escape From The Jail Definitive Edition', 'Celeste Blind Event', 'I Wanna Be The Sugar', 'I Wanna Be The Guy Remastered', "I Wanna Can't Stop Tournament", 'Make a Good Mega Man Level Remastered', 'YuuYuu Jiteki no Yuukarin', 'IWBTG Blind Adventure Event', '？？？', 'Super Mario 64 Blind Event', 'Ocarina of Time Randomizer', 'Relay Race', "Banjo-Kazooie: Cheato's Challenges", 'I Wanna Arcana Of The Tarot', 'Holo Dungeon', 'SM64 Millionaire', 'Metroid: Spooky Mission 2', 'Monkey Ball Tournament', 'Super Mario Senseless Delirium', 'I Wanna Be The  iDOLM@STER', 'IWBTG Fangame TAS', 'Celeste (Farewell B-Side) TAS', 'Celeste: Into the Jungle TAS', '"Mystery" Finale Game', 'Not Another Needle Game', 'Help Me Remember, Satori-sama!', 'IWBTG Hide and Seek', 'Clone Hero', 'I Wanna Be The Magic Master', "Piece's Extravaganza Bonus", 'I Wanna Kardia', 'Celestio 64', 'Some Drawing-Related Fangame'];
        
        // FM2021 ["Match Fangame", "I Wanna Be The Boshy", "Solace Dreams", "Realm Invasion", "Make a Good 24 Hour Mega Man Level", "Super Sheffy World 2", "Super Metroid: Redesign", "Twitch Does Avoidance", "I Wanna Be The Diverse ver0.95", "I Dun Wanna Be Anything 2", "Super Talking Time Bros. 2.5 The Last Levels", "Celeste Spring Collab 2020", "I Wanna Cruise the 6 Islands", "I Wanna Be the Volatile Presence", "I Wanna Be The Cloudburst", "Another Mario Adventure", "Metroid FreezeFlame 2: Twisted Dimensions", "Touhou Makuka Sai - Fantastic Danmaku Festival", "Avoidance Tournament", "I Wanna Be The Hamster!", "The Super Mario Bros. Super Show 64", "Blind Sudoku Race", "Mission Escape From Bad games", "I Wanna Burnmind", "I Wanna Kill the Last Boss", "Johnny's Nightmare", "I Wanna Kill The Kamilia", "I Don't Wanna Be The Gay", "Blind Needle Race", "Piece's Fangame Funanzapalooza", "I Wanna Cute Jump", "Star Revenge 2 Act 1: To The Moon", "Sonic 3: Angel Island Revisited", "I Wanna CoinStack 1000", "Super Mario Bros. Dimensions", "Maid Made Maze", "I Wanna Be The Justice, Easy Ver.", "I Wanna be The Vandal", "Microtwist", "Engaging Game Design", "I Wanna Duloxetine", "Slicing Apples", "Super Mario 64 Sapphire", "Fish Out Of Water", "Make a Good Mega Man Level: Episode Zero", "Smol Ame", "GuraQuest", "Star Revenge 0: Galaxy of Origins", "Crimson Needle 3", "Super Monkey Ball Gaiden", "Tempest of the Heavens and Earth", "Yoiyami Dancers", "Mega Man Battle Network Chrono X", "TAS Showcase", "I Wanna Run The Marathon", "I Wanna Delete The Huge Bug", "I Wanna Be The Blizzard", "Super Monkey Ball 651", "Super Mario 74", "Blind I Wanna Maker Race", "Blind Adventure Race", "Relay Race", "Mystery Finale Game", "Touhou Danmakufu", "Fangame Baggage", "I Wanna Walk Out In The Morning Dew", "Fangame Feud", "I Wanna Be The Battlegrounds", "Draw Thingy!"];

        // FM2020 ["I Wanna Eclipse", "Super Metroid Ascent", "Star Revenge 2.5: Remnant of Doom", "Chill Needle 2", "Rockman 4 Burst Chaser x Air Sliding", "Fish Out Of Water", "Gensou Skydrift", "I Wanna Be The Neon 3", "I Wanna Be The Salt", "I Wanna KeyPick 100", "Ghost Mechanism", "SM64: Last Impact", "Super Mario Odyssey 64", "Blind I Wanna Maker", "I Wanna Be The Guy", "I Wanna Be The Guy: Gaiden", "NitorInc.", "Make a Good Mega Man Level 2", "Sunlust", "Avoidance Tournament", "Super Metroid Y-Faster 2 Fast", "Nimpize Adventure", "Sonic Chrono Adventure", "Densha de D: Lightning Stage", "I Wanna See The Moon", "I Wanna Kill The Guy", "Piece's Extravaganza", "Mystery Game", "Gm8Emulator TAS Showcase", "Needle", "I Wanna Be The Justice", "I Wanna Whisper In Mirror", "Star Revenge 2: Night of Doom", "Grief Syndrome", "Maid Made Maze", "Metroid Fusion: Oil Spill", "Blind Adventure Race", "I Wanna Be The Co-op", "Blind Needle Race", "I Wanna Be The Strongest Fairy", "Designer L's Wacky Randventure!", "Waluigi's Taco Stand", "Coinflip Tournament", "Fangame Music DJ Set", "I Wanna Be The Platinum", "I Wanna Be The Computer 2", "I Wanna Be The With Friendsβ", "Blind Sudoku Race", "I Want", "I Wanna Be The Emperor", "Mario Party 64", "I Wanna Leave This Hell", "I Wanna Be The Destination", "Super Mario 63", "New Mini Kongkongi's Adventure", "Fangame Music Quiz", "Touhou Luna Nights", "Touhou Danmakufu", "Relay Race", "Mystery Finale Game", "I Wanna Make A Sandwich", "Crimson Needle 3", "Piece's Bonus Extravaganza", "Misuzu to Chiruno no Youkai no Yamadai Bouken Akushongemu", "Super Mario 74 Extreme Edition", "Draw My Guy"];

        // todo: work on this backup
        //
        // console.log("options:", options);

        console.log('fieldReplicantValues', fieldReplicantValues)

        this.gameName = fieldReplicantValues.gameInfo.gameName;

        options.forEach((value, i) => {
          dropdown.append($("<option>", {
            text: `${i+1}) ${value}`,
            value: value
          }));
        })

        this.setDropdownGameName(this.gameName);
      });
    });

    return dropdown;
  };

  setDropdownGameName(gameName = this.gameName) {
    if (gameName !== this.gameName) this.gameName = gameName;
    Array.from(this.gameNameInput[0].options).forEach(option => {
      option.selected = (option.value === this.gameName);
    });
  }

  setStagingSendButton() {

  };

  setPreviewButton() {

  };

  setHardResetButton(runsBackup) {
    const text = "HARD RESET RUNS";
    const warningMessage = [
      'WARNING: This is the HARD RESET BUTTON for run information; please make sure you want to do this.',
      'This will reset the program back to the backup.json info which has all correct info as of 7/13/22 @ 01:00 ET.',
      'Use this if the layouts somehow are outputting completely incorrect information that you can\'t seem to reset.',
    ];
    $("#adminPanelHardResetButton").append( //todo: next
      $("<button>", {
        id: sanitize(text),
        class: "loadButton",
        text,
        click: (e) => {
          e.preventDefault();
          if(confirm(warningMessage.join('\n\n'))) {
            setReplicant.forceSet(runsBackup);
      			// warning: use only when needed as this overwrites the replicant permanently
            location.reload();
            setReplicant.loadRunIntoDashboard(NodeCG.adminPanel.gameName);
            NodeCG.adminPanel.gameNameInput.val(NodeCG.adminPanel.gameName);
            setTimeout(() => $("#adminPanelLoadRunInfoButton").trigger('click'), 0);
          }
        }
      })
    )
  }

  setSaveImage = () => {
    const text = "Save png"
    $("#adminPanelDownloadPNG").append( //todo: next
      $("<button>", {
        id: sanitize(text),
        class: "loadButton",
        click: (e) => {
          e.preventDefault();
          // TODO: duplicated code from dashboardForm.js
          const imageWindow = window.open(`http://localhost:9090/bundles/dashboard/graphics/layout.html?saveImage=true&gameName=${this.gameName}`);
          imageWindow.addEventListener('click', e => {
            if (e.target.id === "saveImageLink") {
              imageWindow.close();
            }
          });
        },
        text,
      })
    )
  };

  setUpdateTwitchInfo() {
    const text = "Update Twitch Info";
    $("#adminPanelUpdateTwitchInfo").append( //todo: next
      $("<button>", {
        id: sanitize(text),
        class: "loadButton",
        click: (e) => {
          e.preventDefault();
          twitchApi.updateTwitchFull(this.gameName)
        }
      }).append(
        $("<img>", {
          class: "twitchIcon",
          src: "/assets/dashboard/baseLayoutLayers/twitchIconPurple.png",
          alt: text
        })
      )
    );
  };

  setLoadLayoutInfo() {
    const text = "Layout window for";
    const temporaryId = "Open temporary url\nwith shown values";
    const permanentId = "Open permanent url\nwith run values";

    $("#loadLayout").append( //todo: next
      $("<label>", {
        id: sanitize(text),
        text: text
      })
    );

    $("#loadLayout").append( //todo: next
      $("<button>", {
        id: sanitize(temporaryId) + "Window",
        class: "loadButton",
        text: temporaryId
      })
    );

    $("#loadLayout").append( //todo: next
      $("<button>", {
        id: sanitize(permanentId) + "Window",
        class: "loadButton",
        text: permanentId
      })
    );

    const replicant = nodecg.Replicant("fieldValues");

    replicant.on("change", (newValue, oldValue) => {
      const temporaryLoadButton = $("#" + sanitize(temporaryId) + "Window"); //todo: next
      const permanentLoadButton = $("#" + sanitize(permanentId) + "Window"); //todo: next
      temporaryLoadButton.off();
      permanentLoadButton.off();

      var labelText = "Cannot load layout until more info is chosen";

      if (newValue && newValue["playerInfo"] && newValue["gameInfo"] ) {
        const numberOfPlayers = newValue["playerInfo"]["numberOfPlayers"];
        const { resolution, gameName } = newValue["gameInfo"];
        const { chromaKeyColor } = newValue["visuals"];
        labelText = text + "<br>" + numberOfPlayers + "P " + resolution + " - " + getGameNameTitle(gameName) + "<br>" +
              "ChromaKey Color: " + chromaKeyColor + " " + colorToHex[chromaKeyColor];

        temporaryLoadButton.on("click", (e) => {
          e.preventDefault();
          if (!!numberOfPlayers && numberOfPlayers !== "N/A" && !!resolution && resolution !== "N/A") {
            var url = "http://localhost:9090/bundles/dashboard/graphics/layout.html";
            window.open(url);
          };
        });

        permanentLoadButton.on("click", (e) => {
          e.preventDefault();
          if (!!numberOfPlayers && numberOfPlayers !== "N/A" && !!resolution && resolution !== "N/A") {
            var url = `http://localhost:9090/bundles/dashboard/graphics/layout.html?gameName=${newValue["gameInfo"].gameName}`;
            window.open(url);
          };
        });
      } else { //todo: remove else statement
        // currentLoadButton.off();
        // defaultLoadButton.off();
      }

      $("#" + sanitize(text)).html(labelText); //todo: next
    });
  };

};

NodeCG.adminPanel = new AdminPanel;
