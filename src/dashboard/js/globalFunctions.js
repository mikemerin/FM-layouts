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
    "!": ""
  };
  str = str.trim().toString().toLowerCase().replace(/[#:\-\.'!]/g, (matched) => replace[matched]);
  str = str.replace(/ {1,}/g, " ");
  return str.replace(/\s([\w|\d])/g, ($1) => $1[1].toUpperCase());
};

const sanitizeFilename = (str) => {
  var replace = {
    "#": "number",
    ":": " -"
  };
  return str.replace(/[#:]/g, (matched) => replace[matched]);
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
  const url = "https://oengus.io/api/marathon/fm2020/schedule";
  fetch(url).then(resp => resp.json()).then(res => {
    NodeCG.masterRunList.schedule.order = res.lines.map(({gameName}) => gameName );

    NodeCG.masterRunList.replicant = nodecg.Replicant("runs");
    const { name, namespace } = NodeCG.masterRunList.replicant;
    nodecg.readReplicant(name, namespace, replicantValues => {
      NodeCG.masterRunList.replicantValues = replicantValues;
      NodeCG.dashboardPanels.panels["masterRunList"].updateMasterRunFields(true);
      // console.log("replicantValuesMasterRunList:", NodeCG.masterRunList.replicantValues);
    })
  })


};

class SetReplicant {

  constructor() {
    this.runsReplicant = nodecg.Replicant("runs");
    this.fieldValuesreplicant = nodecg.Replicant("fieldValues");
    this.stagingFieldReplicant = nodecg.Replicant("stagingField");
    this.outputReplicant()
  }

  altNames = () => {
    const alts = {
      "Misuzu to Chiruno no Youkai no Yamadai Bouken Akushongemu": ""
    }
  }

  outputReplicant = () => {
    const {name, namespace} = this.runsReplicant;
    nodecg.readReplicant(name, namespace, replicantValues => {
      console.log(sanitize("Misuzu to Chiruno no Youkai no Yamadai Bouken Akushongemu"))
    })
  }

  forceSet = () => {
    this.runsReplicant.value = {
      "iWannaBeTheSalt": {
        "gameInfo": {
          "gameName": "I Wanna Be the Salt",
          "resolution": "4:3",
          "createdBy": "ヨーヨー",
          "genres": "100F",
          "otherGenres": "N/A"
        },
        "playerInfo": {
          "numberOfPlayers": "2",
          "player1_twitchHandle": "Joshua_boring",
          "player1_displayName": "Joshua",
          "player1_camera": false,
          "player1_pb": "0:30:57",
          "player2_twitchHandle": "Hyo_ka",
          "player2_displayName": "hyoka",
          "player2_camera": false,
          "player2_pb": "0:31:21",
          "player3_twitchHandle": "",
          "player3_displayName": "",
          "player3_camera": false,
          "player3_pb": "",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": ""
        },
        "runInfo": {
          "category": "100%",
          "estimate": "0:45:00",
          "runType": "Race",
          "worldRecord": "0:30:57",
          "wrHolder": "Joshua_boring"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      },
      "iWannaWhisperInMirror": {
        "gameInfo": {
          "gameName": "I Wanna Whisper In Mirror",
          "resolution": "1:1",
          "createdBy": "repsihw rorrim",
          "genres": "100F; Adventure",
          "otherGenres": "N/A"
        },
        "playerInfo": {
          "numberOfPlayers": "1",
          "player1_twitchHandle": "Joshua_boring",
          "player1_displayName": "Joshua",
          "player1_camera": false,
          "player1_pb": "0:07:00",
          "player2_twitchHandle": "",
          "player2_displayName": "",
          "player2_camera": false,
          "player2_pb": "",
          "player3_twitchHandle": "",
          "player3_displayName": "",
          "player3_camera": false,
          "player3_pb": "",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": ""
        },
        "runInfo": {
          "category": "any%",
          "estimate": "0:15:00",
          "runType": "Solo Run",
          "worldRecord": "0:07:00",
          "wrHolder": "Joshua_boring"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      },
      "newMiniKongkongisAdventure": {
        "gameInfo": {
          "gameName": "New Mini Kongkongi's Adventure",
          "resolution": "4:3",
          "createdBy": "Mr.J",
          "genres": "100F",
          "otherGenres": "N/A"
        },
        "playerInfo": {
          "numberOfPlayers": "2",
          "player1_twitchHandle": "Cosmoing",
          "player1_displayName": "Cosmo",
          "player1_camera": false,
          "player1_pb": "0:06:57",
          "player2_twitchHandle": "MostlyTyste",
          "player2_displayName": "Tyste",
          "player2_camera": false,
          "player2_pb": "0:06:45",
          "player3_twitchHandle": "",
          "player3_displayName": "",
          "player3_camera": false,
          "player3_pb": "",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": ""
        },
        "runInfo": {
          "category": "any%",
          "estimate": "0:10:00",
          "runType": "Race",
          "worldRecord": "0:06:45",
          "wrHolder": "MostlyTyste"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      },
      "iWannaBeTheDestination": {
        "gameInfo": {
          "gameName": "I Wanna Be the Destination",
          "resolution": "4:3",
          "createdBy": "Carnival",
          "genres": "100F; Adventure; Avoidance; Gimmick",
          "otherGenres": "N/A"
        },
        "playerInfo": {
          "numberOfPlayers": "3",
          "player1_twitchHandle": "Naloas",
          "player1_displayName": "Naloa",
          "player1_camera": false,
          "player1_pb": "0:57:15",
          "player2_twitchHandle": "あお",
          "player2_displayName": "あお",
          "player2_camera": false,
          "player2_pb": "0:52:43",
          "player3_twitchHandle": "Subfusc_moose",
          "player3_displayName": "Moose",
          "player3_camera": false,
          "player3_pb": "1:11:40",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": ""
        },
        "runInfo": {
          "category": "any%",
          "estimate": "1:30:00",
          "runType": "Race",
          "worldRecord": "0:52:43",
          "wrHolder": "あお"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      },
      "iWannaBeTheNeon3": {
        "gameInfo": {
          "gameName": "I wanna be the Neon 3",
          "resolution": "608",
          "createdBy": "Thenader2",
          "genres": "100F; Adventure",
          "otherGenres": "N/A"
        },
        "playerInfo": {
          "numberOfPlayers": "1",
          "player1_twitchHandle": "ChatranP",
          "player1_displayName": "Chatran",
          "player1_camera": false,
          "player1_pb": "0:55:42",
          "player2_twitchHandle": "",
          "player2_displayName": "",
          "player2_camera": false,
          "player2_pb": "",
          "player3_twitchHandle": "",
          "player3_displayName": "",
          "player3_camera": false,
          "player3_pb": "",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": ""
        },
        "runInfo": {
          "category": "any%",
          "estimate": "1:00:00",
          "runType": "Solo Run",
          "worldRecord": "0:55:42",
          "wrHolder": "Chatran"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      },
      "iWannaSeeTheMoon": {
        "gameInfo": {
          "gameName": "I Wanna See the Moon",
          "resolution": "4:3",
          "createdBy": "aqua",
          "genres": "100F; Adventure; Avoidance; Gimmick",
          "otherGenres": "N/A"
        },
        "playerInfo": {
          "numberOfPlayers": "1",
          "player1_twitchHandle": "Skulldude_",
          "player1_displayName": "Skulldude",
          "player1_camera": false,
          "player1_pb": "1:28:18",
          "player2_twitchHandle": "",
          "player2_displayName": "",
          "player2_camera": false,
          "player2_pb": "",
          "player3_twitchHandle": "",
          "player3_displayName": "",
          "player3_camera": false,
          "player3_pb": "",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": "Chatran, Thenadertwo"
        },
        "runInfo": {
          "category": "any%",
          "estimate": "1:50:00",
          "runType": "Solo Run",
          "worldRecord": "1:09:12",
          "wrHolder": "Zurai"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      },
      "iWannaBeTheEmperor": {
        "gameInfo": {
          "gameName": "I Wanna Be the Emperor",
          "resolution": "608",
          "createdBy": "クライン",
          "genres": "100F; Adventure",
          "otherGenres": "N/A"
        },
        "playerInfo": {
          "numberOfPlayers": "1",
          "player1_twitchHandle": "Tehninza",
          "player1_displayName": "Tehninza",
          "player1_camera": false,
          "player1_pb": "1:43:01",
          "player2_twitchHandle": "",
          "player2_displayName": "",
          "player2_camera": false,
          "player2_pb": "",
          "player3_twitchHandle": "",
          "player3_displayName": "",
          "player3_camera": false,
          "player3_pb": "",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": "bummerman222"
        },
        "runInfo": {
          "category": "any%",
          "estimate": "2:45:00",
          "runType": "Solo Run",
          "worldRecord": "1:43:01",
          "wrHolder": "Tehninza"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      },
      "iWannaBeTheJustice": {
        "gameInfo": {
          "gameName": "I Wanna Be the Justice",
          "resolution": "4:3",
          "createdBy": "Carnival",
          "genres": "100F; Adventure",
          "otherGenres": "N/A"
        },
        "playerInfo": {
          "numberOfPlayers": "1",
          "player1_twitchHandle": "Hyo_ka",
          "player1_displayName": "hyoka",
          "player1_camera": false,
          "player1_pb": "1:22:15",
          "player2_twitchHandle": "",
          "player2_displayName": "",
          "player2_camera": false,
          "player2_pb": "",
          "player3_twitchHandle": "",
          "player3_displayName": "",
          "player3_camera": false,
          "player3_pb": "",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": ""
        },
        "runInfo": {
          "category": "any%",
          "estimate": "1:35:00",
          "runType": "Solo Run",
          "worldRecord": "1:22:15",
          "wrHolder": "Hyo_ka"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      },
      "iWannaKillTheGuy": {
        "gameInfo": {
          "gameName": "I Wanna Kill the Guy",
          "resolution": "4:3",
          "createdBy": "Thenewgeezer",
          "genres": "100F; Adventure",
          "otherGenres": "N/A"
        },
        "playerInfo": {
          "numberOfPlayers": "1",
          "player1_twitchHandle": "letcreate123",
          "player1_displayName": "letcreate123",
          "player1_camera": false,
          "player1_pb": "N/A",
          "player2_twitchHandle": "",
          "player2_displayName": "",
          "player2_camera": false,
          "player2_pb": "",
          "player3_twitchHandle": "",
          "player3_displayName": "",
          "player3_camera": false,
          "player3_pb": "",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": ""
        },
        "runInfo": {
          "category": "DJ Sray Showcase",
          "estimate": "0:04:00",
          "runType": "Solo Run",
          "worldRecord": "N/A",
          "wrHolder": "N/A"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      },
      "needle": {
        "gameInfo": {
          "gameName": "Needle",
          "resolution": "608",
          "createdBy": "Multiple People",
          "genres": "100F",
          "otherGenres": "N/A"
        },
        "playerInfo": {
          "numberOfPlayers": "1",
          "player1_twitchHandle": "Gemilous",
          "player1_displayName": "Gemi",
          "player1_camera": false,
          "player1_pb": "N/A",
          "player2_twitchHandle": "",
          "player2_displayName": "",
          "player2_camera": false,
          "player2_pb": "",
          "player3_twitchHandle": "",
          "player3_displayName": "",
          "player3_camera": false,
          "player3_pb": "",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": ""
        },
        "runInfo": {
          "category": "any%",
          "estimate": "2:00:00",
          "runType": "Solo Run",
          "worldRecord": "N/A",
          "wrHolder": "N/A"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      },
      "iWannaBeTheGuyGaiden": {
        "gameInfo": {
          "gameName": "I Wanna Be the Guy: Gaiden",
          "resolution": "4:3",
          "createdBy": "Kayin",
          "genres": "100F; Adventure; Avoidance",
          "otherGenres": "N/A"
        },
        "playerInfo": {
          "numberOfPlayers": "1",
          "player1_twitchHandle": "Yagamoth",
          "player1_displayName": "Yaga",
          "player1_camera": false,
          "player1_pb": "0:04:10",
          "player2_twitchHandle": "",
          "player2_displayName": "",
          "player2_camera": false,
          "player2_pb": "",
          "player3_twitchHandle": "",
          "player3_displayName": "",
          "player3_camera": false,
          "player3_pb": "",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": ""
        },
        "runInfo": {
          "category": "any%",
          "estimate": "0:10:00",
          "runType": "Solo Run",
          "worldRecord": "0:04:10",
          "wrHolder": "Yagamoth"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      },
      "iWannaLeaveThisHell": {
        "gameInfo": {
          "gameName": "I Wanna Leave This Hell",
          "resolution": "4:3",
          "createdBy": "RandomChaos_",
          "genres": "100F; Adventure",
          "otherGenres": "N/A"
        },
        "playerInfo": {
          "numberOfPlayers": "1",
          "player1_twitchHandle": "CeleCele",
          "player1_displayName": "CeleCele",
          "player1_camera": false,
          "player1_pb": "0:47:40",
          "player2_twitchHandle": "",
          "player2_displayName": "",
          "player2_camera": false,
          "player2_pb": "",
          "player3_twitchHandle": "",
          "player3_displayName": "",
          "player3_camera": false,
          "player3_pb": "",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": ""
        },
        "runInfo": {
          "category": "any%",
          "estimate": "1:00:00",
          "runType": "Solo Run",
          "worldRecord": "0:47:40",
          "wrHolder": "CeleCele"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      },
      "iWannaKeypick100": {
        "gameInfo": {
          "gameName": "I Wanna KeyPick 100",
          "resolution": "608",
          "createdBy": "ねころねこ",
          "genres": "100F",
          "otherGenres": "Puzzle"
        },
        "playerInfo": {
          "numberOfPlayers": "1",
          "player1_twitchHandle": "amnjkb",
          "player1_displayName": "amnjkb",
          "player1_camera": false,
          "player1_pb": "1:17:14",
          "player2_twitchHandle": "",
          "player2_displayName": "",
          "player2_camera": false,
          "player2_pb": "",
          "player3_twitchHandle": "",
          "player3_displayName": "",
          "player3_camera": false,
          "player3_pb": "",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": ""
        },
        "runInfo": {
          "category": "100%",
          "estimate": "1:45:00",
          "runType": "Solo Run",
          "worldRecord": "N/A",
          "wrHolder": "N/A"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      },
      "iWannaBeTheGuy": {
        "gameInfo": {
          "gameName": "I Wanna Be the Guy",
          "resolution": "4:3",
          "createdBy": "Kayin",
          "genres": "100F; Adventure; Avoidance",
          "otherGenres": "N/A"
        },
        "playerInfo": {
          "numberOfPlayers": "1",
          "player1_twitchHandle": "Bogandemon",
          "player1_displayName": "Bogandemon",
          "player1_camera": false,
          "player1_pb": "0:27:59",
          "player2_twitchHandle": "",
          "player2_displayName": "",
          "player2_camera": false,
          "player2_pb": "",
          "player3_twitchHandle": "",
          "player3_displayName": "",
          "player3_camera": false,
          "player3_pb": "",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": ""
        },
        "runInfo": {
          "category": "any% glitchless",
          "estimate": "0:35:00",
          "runType": "Solo Run",
          "worldRecord": "0:27:59",
          "wrHolder": "Bogandemon"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      },
      "mysteryGame": {
        "gameInfo": {
          "gameName": "Mystery Game",
          "resolution": "608",
          "createdBy": "kurath",
          "genres": "N/A",
          "otherGenres": "Blind"
        },
        "playerInfo": {
          "numberOfPlayers": "1",
          "player1_twitchHandle": "kurath",
          "player1_displayName": "kurath",
          "player1_camera": false,
          "player1_pb": "N/A",
          "player2_twitchHandle": "",
          "player2_displayName": "",
          "player2_camera": false,
          "player2_pb": "",
          "player3_twitchHandle": "",
          "player3_displayName": "",
          "player3_camera": false,
          "player3_pb": "",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": ""
        },
        "runInfo": {
          "category": "blind%",
          "estimate": "1:00:00",
          "runType": "Solo Run",
          "worldRecord": "N/A",
          "wrHolder": "N/A"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      },
      "gm8emulatorTasShowcase": {
        "gameInfo": {
          "gameName": "Gm8Emulator",
          "resolution": "16:9",
          "createdBy": "Adamcake, viri, Floogle, renex",
          "genres": "N/A",
          "otherGenres": "Creative"
        },
        "playerInfo": {
          "numberOfPlayers": "1",
          "player1_twitchHandle": "Adamcake",
          "player1_displayName": "Adam",
          "player1_camera": false,
          "player1_pb": "N/A",
          "player2_twitchHandle": "",
          "player2_displayName": "",
          "player2_camera": false,
          "player2_pb": "",
          "player3_twitchHandle": "",
          "player3_displayName": "",
          "player3_camera": false,
          "player3_pb": "",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": ""
        },
        "runInfo": {
          "category": "any%",
          "estimate": "0:45:00",
          "runType": "TAS",
          "worldRecord": "N/A",
          "wrHolder": "N/A"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      },
      "iWannaEclipse": {
        "gameInfo": {
          "gameName": "I Wanna Eclipse",
          "resolution": "608",
          "createdBy": "Gwiz609",
          "genres": "100F; Adventure; Avoidance; Gimmick; Medley",
          "otherGenres": "N/A"
        },
        "playerInfo": {
          "numberOfPlayers": "1",
          "player1_twitchHandle": "d0ppller",
          "player1_displayName": "Doppler",
          "player1_camera": false,
          "player1_pb": "0:56:13",
          "player2_twitchHandle": "",
          "player2_displayName": "",
          "player2_camera": false,
          "player2_pb": "",
          "player3_twitchHandle": "",
          "player3_displayName": "",
          "player3_camera": false,
          "player3_pb": "",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": ""
        },
        "runInfo": {
          "category": "true end%",
          "estimate": "1:10:00",
          "runType": "Solo Run",
          "worldRecord": "0:48:23",
          "wrHolder": "Wolfiexe"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      },
      "chillNeedle2": {
        "gameInfo": {
          "gameName": "Chill Needle 2",
          "resolution": "608",
          "createdBy": "arzztt",
          "genres": "100F; Adventure; Avoidance",
          "otherGenres": "N/A"
        },
        "playerInfo": {
          "numberOfPlayers": "1",
          "player1_twitchHandle": "Draconical879",
          "player1_displayName": "Draco",
          "player1_camera": false,
          "player1_pb": "0:34:10",
          "player2_twitchHandle": "",
          "player2_displayName": "",
          "player2_camera": false,
          "player2_pb": "",
          "player3_twitchHandle": "",
          "player3_displayName": "",
          "player3_camera": false,
          "player3_pb": "",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": "arzztt, draco"
        },
        "runInfo": {
          "category": "moleYo%",
          "estimate": "0:40:00",
          "runType": "Solo Run",
          "worldRecord": "0:34:10",
          "wrHolder": "Draconical"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      },
      "iWannaBeTheStrongestFairy": {
        "gameInfo": {
          "gameName": "I Wanna Be The Strongest Fairy",
          "resolution": "4:3",
          "createdBy": "Chalenged",
          "genres": "100F; Adventure",
          "otherGenres": "N/A"
        },
        "playerInfo": {
          "numberOfPlayers": "1",
          "player1_twitchHandle": "jmacpegasus",
          "player1_displayName": "jmacpegasus",
          "player1_camera": true,
          "player1_pb": "0:05:52",
          "player2_twitchHandle": "",
          "player2_displayName": "",
          "player2_camera": false,
          "player2_pb": "",
          "player3_twitchHandle": "",
          "player3_displayName": "",
          "player3_camera": false,
          "player3_pb": "",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": ""
        },
        "runInfo": {
          "category": "any%",
          "estimate": "0:10:00",
          "runType": "Solo Run",
          "worldRecord": "0:04:57",
          "wrHolder": "tommi_iw"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      },
      "iWannaBeTheCoop": {
        "gameInfo": {
          "gameName": "I Wanna Be The Co-op",
          "resolution": "16:9",
          "createdBy": "Nemega",
          "genres": "100F; Adventure",
          "otherGenres": "N/A"
        },
        "playerInfo": {
          "numberOfPlayers": "1",
          "player1_twitchHandle": "igorbsv with Marfrus",
          "player1_displayName": "igorbsv with Marfrus",
          "player1_camera": false,
          "player1_pb": "0:40:24",
          "player2_twitchHandle": "",
          "player2_displayName": "",
          "player2_camera": false,
          "player2_pb": "",
          "player3_twitchHandle": "",
          "player3_displayName": "",
          "player3_camera": false,
          "player3_pb": "",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": "Redire"
        },
        "runInfo": {
          "category": "Unlock Mario, hard%",
          "estimate": "0:45:00",
          "runType": "Co-op Run",
          "worldRecord": "0:40:24",
          "wrHolder": "igorbsv with Marfrus"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      },
      "fangameMusicQuiz": {
        "gameInfo": {
          "gameName": "Fangame Music Quiz",
          "resolution": "4:3",
          "createdBy": "kurath",
          "genres": "N/A",
          "otherGenres": "Quiz Show"
        },
        "playerInfo": {
          "numberOfPlayers": "1",
          "player1_twitchHandle": "kurath",
          "player1_displayName": "kurath",
          "player1_camera": false,
          "player1_pb": "N/A",
          "player2_twitchHandle": "",
          "player2_displayName": "",
          "player2_camera": false,
          "player2_pb": "",
          "player3_twitchHandle": "",
          "player3_displayName": "",
          "player3_camera": false,
          "player3_pb": "",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": ""
        },
        "runInfo": {
          "category": "skulldude%",
          "estimate": "1:00:00",
          "runType": "Solo Run",
          "worldRecord": "N/A",
          "wrHolder": "N/A"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      },
      "fangameMusicDjSet": {
        "gameInfo": {
          "gameName": "Fangame Music DJ Set",
          "resolution": "16:9",
          "createdBy": "Racic",
          "genres": "N/A",
          "otherGenres": "Creative"
        },
        "playerInfo": {
          "numberOfPlayers": "1",
          "player1_twitchHandle": "Racic",
          "player1_displayName": "Racic",
          "player1_camera": true,
          "player1_pb": "N/A",
          "player2_twitchHandle": "",
          "player2_displayName": "",
          "player2_camera": false,
          "player2_pb": "",
          "player3_twitchHandle": "",
          "player3_displayName": "",
          "player3_camera": false,
          "player3_pb": "",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": ""
        },
        "runInfo": {
          "category": "100% Fangame Bangers",
          "estimate": "1:00:00",
          "runType": "Solo Run",
          "worldRecord": "N/A",
          "wrHolder": "N/A"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      },
      "ghostMechanism": {
        "gameInfo": {
          "gameName": "Ghost Mechanism",
          "resolution": "608",
          "createdBy": "princeoflight612",
          "genres": "100F; Adventure",
          "otherGenres": "N/A"
        },
        "playerInfo": {
          "numberOfPlayers": "1",
          "player1_twitchHandle": "princeoflight612",
          "player1_displayName": "princeoflight612",
          "player1_camera": false,
          "player1_pb": "N/A",
          "player2_twitchHandle": "",
          "player2_displayName": "",
          "player2_camera": false,
          "player2_pb": "",
          "player3_twitchHandle": "",
          "player3_displayName": "",
          "player3_camera": false,
          "player3_pb": "",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": ""
        },
        "runInfo": {
          "category": "showcase%",
          "estimate": "0:30:00",
          "runType": "Solo Run",
          "worldRecord": "N/A",
          "wrHolder": "N/A"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      },
      "starRevenge2NightOfDoom": {
        "gameInfo": {
          "gameName": "Star Revenge 2: Night of Doom",
          "resolution": "4:3",
          "createdBy": "BroDute",
          "genres": "N/A",
          "otherGenres": "Mario"
        },
        "playerInfo": {
          "numberOfPlayers": "1",
          "player1_twitchHandle": "StanFuzz",
          "player1_displayName": "Stan",
          "player1_camera": false,
          "player1_pb": "3:34:56",
          "player2_twitchHandle": "",
          "player2_displayName": "",
          "player2_camera": false,
          "player2_pb": "",
          "player3_twitchHandle": "",
          "player3_displayName": "",
          "player3_camera": false,
          "player3_pb": "",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": ""
        },
        "runInfo": {
          "category": "90 Star",
          "estimate": "4:30:00",
          "runType": "Solo Run",
          "worldRecord": "3:34:56",
          "wrHolder": "StanSM64"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      },
      "marioParty64": {
        "gameInfo": {
          "gameName": "Mario Party 64",
          "resolution": "4:3",
          "createdBy": "MrComit",
          "genres": "N/A",
          "otherGenres": "Mario"
        },
        "playerInfo": {
          "numberOfPlayers": "1",
          "player1_twitchHandle": "QuillsTTV",
          "player1_displayName": "Quills",
          "player1_camera": true,
          "player1_pb": "0:33:00",
          "player2_twitchHandle": "",
          "player2_displayName": "",
          "player2_camera": false,
          "player2_pb": "",
          "player3_twitchHandle": "",
          "player3_displayName": "",
          "player3_camera": false,
          "player3_pb": "",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": ""
        },
        "runInfo": {
          "category": "35 Star",
          "estimate": "0:42:00",
          "runType": "Solo Run",
          "worldRecord": "0:32:51",
          "wrHolder": "Cavin856"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      },
      "superMarioOdyssey64": {
        "gameInfo": {
          "gameName": "Super Mario Odyssey 64",
          "resolution": "4:3",
          "createdBy": "Kaze Emanuar",
          "genres": "N/A",
          "otherGenres": "Mario"
        },
        "playerInfo": {
          "numberOfPlayers": "1",
          "player1_twitchHandle": "CallMeAlibaba",
          "player1_displayName": "Alibaba",
          "player1_camera": false,
          "player1_pb": "0:12:20",
          "player2_twitchHandle": "",
          "player2_displayName": "",
          "player2_camera": false,
          "player2_pb": "",
          "player3_twitchHandle": "",
          "player3_displayName": "",
          "player3_camera": false,
          "player3_pb": "",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": ""
        },
        "runInfo": {
          "category": "31 Moons",
          "estimate": "0:15:00",
          "runType": "Solo Run",
          "worldRecord": "0:10:57",
          "wrHolder": "Kongtastic"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      },
      "starRevenge25RemnantOfDoom": {
        "gameInfo": {
          "gameName": "Star Revenge 2.5: Remnant of Doom",
          "resolution": "4:3",
          "createdBy": "BroDute",
          "genres": "N/A",
          "otherGenres": "Mario"
        },
        "playerInfo": {
          "numberOfPlayers": "1",
          "player1_twitchHandle": "InfiniteVoid316",
          "player1_displayName": "InfiniteVoid316",
          "player1_camera": true,
          "player1_pb": "1:12:45",
          "player2_twitchHandle": "",
          "player2_displayName": "",
          "player2_camera": false,
          "player2_pb": "",
          "player3_twitchHandle": "",
          "player3_displayName": "",
          "player3_camera": false,
          "player3_pb": "",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": ""
        },
        "runInfo": {
          "category": "66 Star (v1.2)",
          "estimate": "1:25:00",
          "runType": "Solo Run",
          "worldRecord": "1:12:45",
          "wrHolder": "InfiniteVoid316"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      },
      "sm64LastImpact": {
        "gameInfo": {
          "gameName": "SM64: Last Impact",
          "resolution": "4:3",
          "createdBy": "Kaze Emanuar",
          "genres": "N/A",
          "otherGenres": "Mario"
        },
        "playerInfo": {
          "numberOfPlayers": "1",
          "player1_twitchHandle": "Mushie64",
          "player1_displayName": "Mushie64",
          "player1_camera": false,
          "player1_pb": "1:37:28",
          "player2_twitchHandle": "",
          "player2_displayName": "",
          "player2_camera": false,
          "player2_pb": "",
          "player3_twitchHandle": "",
          "player3_displayName": "",
          "player3_camera": false,
          "player3_pb": "",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": "KazeSM64"
        },
        "runInfo": {
          "category": "80 Star",
          "estimate": "2:00:00",
          "runType": "Solo Run",
          "worldRecord": "1:25:41",
          "wrHolder": "katze789"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      },
      "gensouSkydrift": {
        "gameInfo": {
          "gameName": "Gensou Skydrift",
          "resolution": "16:9",
          "createdBy": "illuCalab",
          "genres": "Adventure",
          "otherGenres": "Touhou"
        },
        "playerInfo": {
          "numberOfPlayers": "1",
          "player1_twitchHandle": "Kradfiz",
          "player1_displayName": "Kradfiz",
          "player1_camera": true,
          "player1_pb": "0:45:59",
          "player2_twitchHandle": "",
          "player2_displayName": "",
          "player2_camera": false,
          "player2_pb": "",
          "player3_twitchHandle": "",
          "player3_displayName": "",
          "player3_camera": false,
          "player3_pb": "",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": ""
        },
        "runInfo": {
          "category": "Campaign 100%",
          "estimate": "0:50:00",
          "runType": "Solo Run",
          "worldRecord": "0:45:29",
          "wrHolder": "sinohara2"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      },
      "maidMadeMaze": {
        "gameInfo": {
          "gameName": "Maid Made Maze",
          "resolution": "16:9",
          "createdBy": "Top Arts Plan",
          "genres": "N/A",
          "otherGenres": "Touhou"
        },
        "playerInfo": {
          "numberOfPlayers": "1",
          "player1_twitchHandle": "UnPigeonVoyageur",
          "player1_displayName": "UnPigeonVoyageur",
          "player1_camera": false,
          "player1_pb": "0:32:25",
          "player2_twitchHandle": "",
          "player2_displayName": "",
          "player2_camera": false,
          "player2_pb": "",
          "player3_twitchHandle": "",
          "player3_displayName": "",
          "player3_camera": false,
          "player3_pb": "",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": ""
        },
        "runInfo": {
          "category": "any%",
          "estimate": "0:45:00",
          "runType": "Solo Run",
          "worldRecord": "0:32:25",
          "wrHolder": "UnPigeonVoyageur"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      },
      "touhouLunaNights": {
        "gameInfo": {
          "gameName": "Touhou Luna Nights",
          "resolution": "16:9",
          "createdBy": "Team Ladybug",
          "genres": "N/A",
          "otherGenres": "Touhou"
        },
        "playerInfo": {
          "numberOfPlayers": "1",
          "player1_twitchHandle": "Sean_AB",
          "player1_displayName": "Sean_AB",
          "player1_camera": false,
          "player1_pb": "0:13:52",
          "player2_twitchHandle": "",
          "player2_displayName": "",
          "player2_camera": false,
          "player2_pb": "",
          "player3_twitchHandle": "",
          "player3_displayName": "",
          "player3_camera": false,
          "player3_pb": "",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": ""
        },
        "runInfo": {
          "category": "any%",
          "estimate": "0:17:00",
          "runType": "Solo Run",
          "worldRecord": "0:13:52",
          "wrHolder": "sean_ab"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      },
      "touhouDanmakufu": {
        "gameInfo": {
          "gameName": "Touhou Danmakufu",
          "resolution": "4:3",
          "createdBy": "mkm",
          "genres": "N/A",
          "otherGenres": "Touhou"
        },
        "playerInfo": {
          "numberOfPlayers": "1",
          "player1_twitchHandle": "Naro",
          "player1_displayName": "Naro",
          "player1_camera": false,
          "player1_pb": "",
          "player2_twitchHandle": "",
          "player2_displayName": "",
          "player2_camera": false,
          "player2_pb": "",
          "player3_twitchHandle": "",
          "player3_displayName": "",
          "player3_camera": false,
          "player3_pb": "",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": ""
        },
        "runInfo": {
          "category": "showcase%",
          "estimate": "0:45:00",
          "runType": "Solo Run",
          "worldRecord": "N/A",
          "wrHolder": "N/A"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      },
      "nitorinc": {
        "gameInfo": {
          "gameName": "NitorInc.",
          "resolution": "4:3",
          "createdBy": "NitorInc. Collab",
          "genres": "N/A",
          "otherGenres": "Touhou"
        },
        "playerInfo": {
          "numberOfPlayers": "1",
          "player1_twitchHandle": "Naro",
          "player1_displayName": "Naro",
          "player1_camera": false,
          "player1_pb": "",
          "player2_twitchHandle": "",
          "player2_displayName": "",
          "player2_camera": false,
          "player2_pb": "",
          "player3_twitchHandle": "",
          "player3_displayName": "",
          "player3_camera": false,
          "player3_pb": "",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": ""
        },
        "runInfo": {
          "category": "showcase%",
          "estimate": "0:30:00",
          "runType": "Solo Run",
          "worldRecord": "N/A",
          "wrHolder": "N/A"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      },
      "superMetroidAscent": {
        "gameInfo": {
          "gameName": "Super Metroid Ascent",
          "resolution": "4:3",
          "createdBy": "Benox50",
          "genres": "N/A",
          "otherGenres": "Metroid"
        },
        "playerInfo": {
          "numberOfPlayers": "1",
          "player1_twitchHandle": "LinkaMeister",
          "player1_displayName": "LinkaMeister",
          "player1_camera": true,
          "player1_pb": "1:13:41",
          "player2_twitchHandle": "",
          "player2_displayName": "",
          "player2_camera": false,
          "player2_pb": "",
          "player3_twitchHandle": "",
          "player3_displayName": "",
          "player3_camera": false,
          "player3_pb": "",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": ""
        },
        "runInfo": {
          "category": "100%",
          "estimate": "1:22:00",
          "runType": "Solo Run",
          "worldRecord": "1:13:41",
          "wrHolder": "LinkaMeister"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      },
      "metroidFusionOilSpill": {
        "gameInfo": {
          "gameName": "Metroid Fusion: Oil Spill",
          "resolution": "4:3",
          "createdBy": "Spedimus",
          "genres": "N/A",
          "otherGenres": "Metroid"
        },
        "playerInfo": {
          "numberOfPlayers": "1",
          "player1_twitchHandle": "HerculesBenchpress",
          "player1_displayName": "HerculesBenchpress",
          "player1_camera": true,
          "player1_pb": "0:35:05",
          "player2_twitchHandle": "",
          "player2_displayName": "",
          "player2_camera": false,
          "player2_pb": "",
          "player3_twitchHandle": "",
          "player3_displayName": "",
          "player3_camera": false,
          "player3_pb": "",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": ""
        },
        "runInfo": {
          "category": "any%",
          "estimate": "0:45:00",
          "runType": "Solo Run",
          "worldRecord": "18:18 By Herculesbenchpress"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      },
      "superMetroidYfaster2Fast": {
        "gameInfo": {
          "gameName": "Super Metroid: Y-Faster 2 Fast",
          "resolution": "4:3",
          "createdBy": "Metaquarius",
          "genres": "N/A",
          "otherGenres": "Metroid"
        },
        "playerInfo": {
          "numberOfPlayers": "1",
          "player1_twitchHandle": "Sapphron",
          "player1_displayName": "Sapphron",
          "player1_camera": false,
          "player1_pb": "1:08:41",
          "player2_twitchHandle": "",
          "player2_displayName": "",
          "player2_camera": false,
          "player2_pb": "",
          "player3_twitchHandle": "",
          "player3_displayName": "",
          "player3_camera": false,
          "player3_pb": "",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": "MrGuyAverage"
        },
        "runInfo": {
          "category": "101%",
          "estimate": "1:10:00",
          "runType": "Solo Run",
          "worldRecord": "1:08:41",
          "wrHolder": "Sapphron"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      },
      "makeAGoodMegaManLevel2": {
        "gameInfo": {
          "gameName": "Make a Good Mega Man Level 2",
          "resolution": "8:7",
          "createdBy": "Multiple People",
          "genres": "N/A",
          "otherGenres": "Mega Man"
        },
        "playerInfo": {
          "numberOfPlayers": "2",
          "player1_twitchHandle": "Taprus",
          "player1_displayName": "Taprus",
          "player1_camera": false,
          "player1_pb": "2:13:08",
          "player2_twitchHandle": "TimeLink",
          "player2_displayName": "TimeLink",
          "player2_camera": false,
          "player2_pb": "2:34:37",
          "player3_twitchHandle": "",
          "player3_displayName": "",
          "player3_camera": false,
          "player3_pb": "",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": "Snoruntpyro, Taprus, TimeLink"
        },
        "runInfo": {
          "category": "any% no skip teleporters",
          "estimate": "2:30:00",
          "runType": "Race",
          "worldRecord": "2:13:08",
          "wrHolder": "Taprus"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      },
      "rockman4BurstChaserXAirSliding": {
        "gameInfo": {
          "gameName": "Rockman 4 Burst Chaser X Air Sliding",
          "resolution": "4:3",
          "createdBy": "Tsukikuro",
          "genres": "N/A",
          "otherGenres": "Mega Man"
        },
        "playerInfo": {
          "numberOfPlayers": "1",
          "player1_twitchHandle": "tpasalt",
          "player1_displayName": "tpasalt",
          "player1_camera": false,
          "player1_pb": "27:13",
          "player2_twitchHandle": "",
          "player2_displayName": "",
          "player2_camera": false,
          "player2_pb": "",
          "player3_twitchHandle": "",
          "player3_displayName": "",
          "player3_camera": false,
          "player3_pb": "",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": ""
        },
        "runInfo": {
          "category": "any%",
          "estimate": "0:35:00",
          "runType": "Solo Run",
          "worldRecord": "25:20"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      },
      "sunlust": {
        "gameInfo": {
          "gameName": "Sunlust",
          "resolution": "16:9",
          "createdBy": "Ribbiks and dannebubinga",
          "genres": "N/A",
          "otherGenres": "Doom"
        },
        "playerInfo": {
          "numberOfPlayers": "2",
          "player1_twitchHandle": "Draconical879",
          "player1_displayName": "Draco",
          "player1_camera": false,
          "player1_pb": "1:29:04",
          "player2_twitchHandle": "M0bilD",
          "player2_displayName": "M0bilD",
          "player2_camera": false,
          "player2_pb": "1:29:04",
          "player3_twitchHandle": "",
          "player3_displayName": "",
          "player3_camera": false,
          "player3_pb": "",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": ""
        },
        "runInfo": {
          "category": "any%",
          "estimate": "1:30:00",
          "runType": "Co-op Run",
          "worldRecord": "1:29:04"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      },
      "superMario63": {
        "gameInfo": {
          "gameName": "Super Mario 63",
          "resolution": "3:2",
          "createdBy": "Runouw",
          "genres": "N/A",
          "otherGenres": "Mario"
        },
        "playerInfo": {
          "numberOfPlayers": "2",
          "player1_twitchHandle": "theGaming100",
          "player1_displayName": "theGaming100",
          "player1_camera": false,
          "player1_pb": "0:55:15",
          "player2_twitchHandle": "Vertic03",
          "player2_displayName": "Vertic",
          "player2_camera": false,
          "player2_pb": "0:53:21",
          "player3_twitchHandle": "",
          "player3_displayName": "",
          "player3_camera": false,
          "player3_pb": "",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": "Lieutenant Boo, AprilSR"
        },
        "runInfo": {
          "category": "100%",
          "estimate": "1:05:00",
          "runType": "Race",
          "worldRecord": "0:53:21",
          "wrHolder": "Vertic"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      },
      "sonicChronoAdventure": {
        "gameInfo": {
          "gameName": "Sonic Chrono Adventure",
          "resolution": "600",
          "createdBy": "LakeFeperd",
          "genres": "100F",
          "otherGenres": "Sonic"
        },
        "playerInfo": {
          "numberOfPlayers": "1",
          "player1_twitchHandle": "TheGreenViper8",
          "player1_displayName": "TheGreenViper8",
          "player1_camera": false,
          "player1_pb": "1:20:49",
          "player2_twitchHandle": "",
          "player2_displayName": "",
          "player2_camera": false,
          "player2_pb": "",
          "player3_twitchHandle": "",
          "player3_displayName": "",
          "player3_camera": false,
          "player3_pb": "",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": ""
        },
        "runInfo": {
          "category": "any%",
          "estimate": "1:40:00",
          "runType": "Solo Run",
          "worldRecord": "1:20:49",
          "wrHolder": "TheGreenViper8"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      },
      "denshaDeDLightningStage": {
        "gameInfo": {
          "gameName": "Densha de D: Lightning Stage",
          "resolution": "16:9",
          "createdBy": "Jinushi",
          "genres": "N/A",
          "otherGenres": "Initial D"
        },
        "playerInfo": {
          "numberOfPlayers": "1",
          "player1_twitchHandle": "AEtienne",
          "player1_displayName": "AEtienne",
          "player1_camera": false,
          "player1_pb": "0:21:50",
          "player2_twitchHandle": "",
          "player2_displayName": "",
          "player2_camera": false,
          "player2_pb": "",
          "player3_twitchHandle": "",
          "player3_displayName": "",
          "player3_camera": false,
          "player3_pb": "",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": ""
        },
        "runInfo": {
          "category": "any% glitchless",
          "estimate": "0:27:00",
          "runType": "Solo Run",
          "worldRecord": "0:21:50",
          "wrHolder": "AEtienne"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      },
      "nimpizeAdventure": {
        "gameInfo": {
          "gameName": "Nimpize Adventure",
          "resolution": "4:3",
          "createdBy": "Ostrealava02",
          "genres": "N/A",
          "otherGenres": "Zelda"
        },
        "playerInfo": {
          "numberOfPlayers": "1",
          "player1_twitchHandle": "StoneBadLuck",
          "player1_displayName": "StoneBadLuck",
          "player1_camera": false,
          "player1_pb": "0:14:37",
          "player2_twitchHandle": "",
          "player2_displayName": "",
          "player2_camera": false,
          "player2_pb": "",
          "player3_twitchHandle": "",
          "player3_displayName": "",
          "player3_camera": false,
          "player3_pb": "",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": ""
        },
        "runInfo": {
          "category": "Starfox%",
          "estimate": "0:20:00",
          "runType": "Solo Run",
          "worldRecord": "0:13:16",
          "wrHolder": "ChefBear"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      },
      "griefSyndrome": {
        "gameInfo": {
          "gameName": "Grief Syndrome",
          "resolution": "4:3",
          "createdBy": "Tasofro",
          "genres": "N/A",
          "otherGenres": "Anime"
        },
        "playerInfo": {
          "numberOfPlayers": "1",
          "player1_twitchHandle": "FroobMcguffin",
          "player1_displayName": "FroobMcguffin",
          "player1_camera": false,
          "player1_pb": "0:26:41",
          "player2_twitchHandle": "",
          "player2_displayName": "",
          "player2_camera": false,
          "player2_pb": "",
          "player3_twitchHandle": "",
          "player3_displayName": "",
          "player3_camera": false,
          "player3_pb": "",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": ""
        },
        "runInfo": {
          "category": "all characters%",
          "estimate": "0:32:00",
          "runType": "Solo Run",
          "worldRecord": "0:26:41",
          "wrHolder": "FroobMcGuffin"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      },
      "iWant": {
        "gameInfo": {
          "gameName": "I Want",
          "resolution": "608",
          "createdBy": "PieceOfCheese87, egg",
          "genres": "100F; Adventure; Avoidance; Gimmick",
          "otherGenres": "N/A"
        },
        "playerInfo": {
          "numberOfPlayers": "2",
          "player1_twitchHandle": "Cosmoing",
          "player1_displayName": "Cosmo",
          "player1_camera": false,
          "player1_pb": "0:42:44",
          "player2_twitchHandle": "CeleCele",
          "player2_displayName": "CeleCele",
          "player2_camera": false,
          "player2_pb": "0:48:35",
          "player3_twitchHandle": "",
          "player3_displayName": "",
          "player3_camera": false,
          "player3_pb": "",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": ""
        },
        "runInfo": {
          "category": "any%",
          "estimate": "1:00:00",
          "runType": "Race",
          "worldRecord": "0:42:44",
          "wrHolder": "Cosmoing"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      },
      "iWannaBeTheWithFriendsβ": {
        "gameInfo": {
          "gameName": "I wanna be the with friendsβ",
          "resolution": "4:3",
          "createdBy": "にひみ",
          "genres": "100F; Adventure; Avoidance",
          "otherGenres": "N/A"
        },
        "playerInfo": {
          "numberOfPlayers": "1",
          "player1_twitchHandle": "ChatranP",
          "player1_displayName": "Chatran",
          "player1_camera": false,
          "player1_pb": "0:13:43",
          "player2_twitchHandle": "",
          "player2_displayName": "",
          "player2_camera": false,
          "player2_pb": "",
          "player3_twitchHandle": "",
          "player3_displayName": "",
          "player3_camera": false,
          "player3_pb": "",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": ""
        },
        "runInfo": {
          "category": "any%",
          "estimate": "0:15:00",
          "runType": "Solo Run",
          "worldRecord": "0:13:43",
          "wrHolder": "Chatran"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      },
      "designerLsWackyRandventure": {
        "gameInfo": {
          "gameName": "Designer L's Wacky Randventure!",
          "resolution": "608",
          "createdBy": "Designer L",
          "genres": "100F; Adventure; Avoidance; Gimmick",
          "otherGenres": "N/A"
        },
        "playerInfo": {
          "numberOfPlayers": "2",
          "player1_twitchHandle": "Tehninza",
          "player1_displayName": "Tehninza",
          "player1_camera": false,
          "player1_pb": "0:21:41",
          "player2_twitchHandle": "Mastermaxify",
          "player2_displayName": "Mastermaxify",
          "player2_camera": false,
          "player2_pb": "0:19:49",
          "player3_twitchHandle": "",
          "player3_displayName": "",
          "player3_camera": false,
          "player3_pb": "",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": ""
        },
        "runInfo": {
          "category": "any%",
          "estimate": "0:30:00",
          "runType": "Race",
          "worldRecord": "0:19:49",
          "wrHolder": "Mastermaxify"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      },
      "iWannaBeThePlatinum": {
        "gameInfo": {
          "gameName": "I Wanna Be the Platinum",
          "resolution": "608",
          "createdBy": "supaguy",
          "genres": "100F; Adventure; Avoidance",
          "otherGenres": "N/A"
        },
        "playerInfo": {
          "numberOfPlayers": "3",
          "player1_twitchHandle": "TheRandomErik",
          "player1_displayName": "RandomErik",
          "player1_camera": false,
          "player1_pb": "0:34:39",
          "player2_twitchHandle": "Skulldude_",
          "player2_displayName": "Skulldude",
          "player2_camera": false,
          "player2_pb": "N/A",
          "player3_twitchHandle": "Arzztt",
          "player3_displayName": "Arzztt",
          "player3_camera": false,
          "player3_pb": "N/A",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": ""
        },
        "runInfo": {
          "category": "any%",
          "estimate": "0:45:00",
          "runType": "Race",
          "worldRecord": "0:34:39",
          "wrHolder": "RandomErik"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      },
      "iWannaBeTheComputer2": {
        "gameInfo": {
          "gameName": "I Wanna Be the Computer 2!",
          "resolution": "4:3",
          "createdBy": "Captain GraMMa",
          "genres": "100F; Adventure",
          "otherGenres": "N/A"
        },
        "playerInfo": {
          "numberOfPlayers": "1",
          "player1_twitchHandle": "TheRandomErik",
          "player1_displayName": "RandomErik",
          "player1_camera": false,
          "player1_pb": "0:20:50",
          "player2_twitchHandle": "",
          "player2_displayName": "",
          "player2_camera": false,
          "player2_pb": "",
          "player3_twitchHandle": "",
          "player3_displayName": "",
          "player3_camera": false,
          "player3_pb": "",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": ""
        },
        "runInfo": {
          "category": "100%",
          "estimate": "0:30:00",
          "runType": "Solo Run",
          "worldRecord": "0:20:50",
          "wrHolder": "RandomErik"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      },
      "waluigisTacoStand": {
        "gameInfo": {
          "gameName": "Waluigi's Taco Stand",
          "resolution": "4:3",
          "createdBy": "Kaze Emanuar",
          "genres": "N/A",
          "otherGenres": "WAAAAGH"
        },
        "playerInfo": {
          "numberOfPlayers": "1",
          "player1_twitchHandle": "tpasalt",
          "player1_displayName": "tpasalt",
          "player1_camera": false,
          "player1_pb": "11:34",
          "player2_twitchHandle": "",
          "player2_displayName": "",
          "player2_camera": false,
          "player2_pb": "",
          "player3_twitchHandle": "",
          "player3_displayName": "",
          "player3_camera": false,
          "player3_pb": "",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": ""
        },
        "runInfo": {
          "category": "15 tacos",
          "estimate": "0:15:00",
          "runType": "Solo Run",
          "worldRecord": "0:08:50",
          "wrHolder": "JohnIsAGuy"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      },
      "crimsonNeedle3": {
        "gameInfo": {
          "gameName": "Crimson Needle 3",
          "resolution": "608",
          "createdBy": "Kalemandu, PlasmaNapkin, Zero-G",
          "genres": "100F; Adventure; Avoidance",
          "otherGenres": "N/A"
        },
        "playerInfo": {
          "numberOfPlayers": "2",
          "player1_twitchHandle": "bummerman222",
          "player1_displayName": "bummerman222",
          "player1_camera": false,
          "player1_pb": "3:20:30",
          "player2_twitchHandle": "Thenadertwo",
          "player2_displayName": "Nader",
          "player2_camera": false,
          "player2_pb": "3:39:32",
          "player3_twitchHandle": "",
          "player3_displayName": "",
          "player3_camera": false,
          "player3_pb": "",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": ""
        },
        "runInfo": {
          "category": "100%",
          "estimate": "4:00:00",
          "runType": "Race",
          "worldRecord": "3:20:30",
          "wrHolder": "bummerman222"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      },
      "drawMyGuy": {
        "gameInfo": {
          "gameName": "Draw My Guy",
          "resolution": "608",
          "createdBy": "PieceOfCheese87",
          "genres": "N/A",
          "otherGenres": "Creative"
        },
        "playerInfo": {
          "numberOfPlayers": "1",
          "player1_twitchHandle": "Wolsk",
          "player1_displayName": "Wolsk",
          "player1_camera": true,
          "player1_pb": "N/A",
          "player2_twitchHandle": "",
          "player2_displayName": "",
          "player2_camera": false,
          "player2_pb": "",
          "player3_twitchHandle": "",
          "player3_displayName": "",
          "player3_camera": false,
          "player3_pb": "",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": ""
        },
        "runInfo": {
          "category": "draw%",
          "estimate": "1:30:00",
          "runType": "Solo Run",
          "worldRecord": "N/A",
          "wrHolder": "N/A"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      },
      "superMario74ExtremeEdition": {
        "gameInfo": {
          "gameName": "Super Mario 74 Extreme Edition",
          "resolution": "16:9",
          "createdBy": "Lugmillord",
          "genres": "N/A",
          "otherGenres": "Mario"
        },
        "playerInfo": {
          "numberOfPlayers": "1",
          "player1_twitchHandle": "KingToad64",
          "player1_displayName": "KingToad64",
          "player1_camera": false,
          "player1_pb": "0:44:26",
          "player2_twitchHandle": "",
          "player2_displayName": "",
          "player2_camera": false,
          "player2_pb": "",
          "player3_twitchHandle": "",
          "player3_displayName": "",
          "player3_camera": false,
          "player3_pb": "",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": "SheepSquared"
        },
        "runInfo": {
          "category": "50 Star",
          "estimate": "0:50:00",
          "runType": "Solo Run",
          "worldRecord": "0:31:08",
          "wrHolder": "CartoonBuffoon"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      },
      "misuzuToChirunoNoYoukaiNoYamadaiBoukenAkushongemu": {
        "gameInfo": {
          "gameName": "美鈴とチルノの妖怪の山大冒険",
          "resolution": "4:3",
          "createdBy": "Yuuyuutei",
          "genres": "",
          "otherGenres": "Touhou"
        },
        "playerInfo": {
          "numberOfPlayers": "1",
          "player1_twitchHandle": "UnPigeonVoyageur",
          "player1_displayName": "UnPigeonVoyageur",
          "player1_camera": false,
          "player1_pb": "0:24:39",
          "player2_twitchHandle": "",
          "player2_displayName": "",
          "player2_camera": false,
          "player2_pb": "",
          "player3_twitchHandle": "",
          "player3_displayName": "",
          "player3_camera": false,
          "player3_pb": "",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": ""
        },
        "runInfo": {
          "category": "any%",
          "estimate": "0:28:00",
          "runType": "Solo Run",
          "worldRecord": "0:24:39",
          "wrHolder": "UnPigeonVoyageur"
        },
        "adminPanel": {
          "backgroundOpacity": ""
        }
      },
      "iWannaMakeASandwich": {
        "gameInfo": {
          "gameName": "I Wanna Make A Sandwich",
          "resolution": "4:3",
          "createdBy": "PieceOfCheese87, Thenewgeezer",
          "genres": "100F; Adventure",
          "otherGenres": "N/A"
        },
        "playerInfo": {
          "numberOfPlayers": "1",
          "player1_twitchHandle": "KrakkaCafe",
          "player1_displayName": "Krakka",
          "player1_camera": false,
          "player1_pb": "2:55:00",
          "player2_twitchHandle": "",
          "player2_displayName": "",
          "player2_camera": false,
          "player2_pb": "",
          "player3_twitchHandle": "",
          "player3_displayName": "",
          "player3_camera": false,
          "player3_pb": "",
          "player4_twitchHandle": "",
          "player4_displayName": "",
          "player4_camera": false,
          "player4_pb": "",
          "commentators": ""
        },
        "runInfo": {
          "category": "99.5% + All Horses + Crown/Cookies",
          "estimate": "3:20:00",
          "runType": "Solo Run",
          "worldRecord": "N/A",
          "wrHolder": "N/A"
        },
        "adminPanel": {
          "backgroundOpacity": ".3"
        }
      }
    }

  };

  loadRunIntoDashboard = (gameName) => {
    NodeCG.dashboardPanels.replicantValues = this.fieldValuesreplicant.value = this.runsReplicant.value[gameName];
    ["gameInfo", "runInfo", "playerInfo", "adminPanel"].forEach(panel => {
      NodeCG.dashboardPanels.panels[panel].loadValues(true);
    })
  };

  saveRunFromDashboard = (gameName) => {
    this;

    let text = "Are you sure you want to";
    if (gameName === "Create New Run") {
      text += `make a new run for ${gameName}?`;
      // todo: check if on the schedule or not
    } else {
      const savedGameRun = this.runsReplicant.value[gameName];
      text += `update the following values for ${gameName}?`;
      debugger
    }

    var th = $("<tr>").append($("<th>"));
    var before = $("<tr>").append($("<th>", {text: before}));
    var after = $("<tr>").append($("<th>", {text: after}));


    ["gameInfo", "runInfo", "playerInfo", "adminPanel"].forEach(panel => {
        NodeCG.dashboardPanels.panels[panel].dashboardFields.forEach(({id, value}) => {
          th.append($("<th>", {text: id}));
          after.append($("<td>", {text: value}));
        })
    });

    const table = $("<table>").append(th, before, after);
    //
    // const modal = $("<div>", {
    //   id: "confirmModal",
    //   class: "modal"
    // }).append(table);

    const confirmation = confirm(text)
    debugger
    //confirm, show before/after
    // this.runsReplicant.value[gameName].gameInfo = this.fieldValuesreplicant.value;
  }

};

const setReplicant = new SetReplicant();
