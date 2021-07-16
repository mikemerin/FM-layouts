// Note: change to the correct date
const start = new Date('July 15, 2021 15:00:00');
const startTimeET = "(3PM ET)";
const marathonName = "FM2021";

function timeLeft(seconds) {
  var days        = Math.floor(seconds/24/60/60);
  var hoursLeft   = Math.floor((seconds) - (days*86400));
  var hours       = Math.floor(hoursLeft/3600);
  var minutesLeft = Math.floor((hoursLeft) - (hours*3600));
  var minutes     = Math.floor(minutesLeft/60);
  var remainingSeconds = seconds % 60;
  function pad(n) {
    return (n < 10 ? "0" + n : n);
  }
    let msg = `${marathonName} Starts `;

    const d = days + "D ";
    const h = hours + "H ";
    const m = minutes + " Minutes";

    if (days > 0) {
        msg += d + (hours ? h : "");
    } else if (hours) {
        msg += h + m;
    } else if (minutes) {
        msg += m;
    } else {
        return null;
    }

    return msg + ` ${startTimeEt} !schedule #FangameMarathon`;
}

lastOutput = ''

outputTimeLeft = () => {
    let diff = start - new Date();
    let seconds = Math.floor(diff / 1000);
    let output = timeLeft(seconds);
    if (output) {
        if (output !== lastOutput) {
            lastOutput = output;
            console.log(output)
            twitchapi.updateChannel(output);
        }
        return true;
    } else {
        return false;
    }
}

var interval = setInterval(function() {
    const output = outputTimeLeft();
    if (!output) {
        twitchapi.updateChannel(`${marathonName} Starts NOW !schedule`);
        clearInterval(interval)
        return;
    }
}, 60000);

outputTimeLeft();
