function generateTimestamps(){
    var date = document.querySelector('input[type="datetime-local"]');

    document.getElementById("short-time").innerHTML = "";
    document.getElementById("long-time").innerHTML = "";
    document.getElementById("short-date").innerHTML = "";
    document.getElementById("long-date").innerHTML = "";
    document.getElementById("short-date-time").innerHTML = "";
    document.getElementById("long-date-time").innerHTML = "";
    document.getElementById("relative-time").innerHTML = "";

    if(date.value == ''){
        if (document.getElementsByClassName("error").length == 1) {
            return;
        }
        var p = document.createElement("p");
        var text = document.createTextNode("Please enter a date");
        p.className += "error";
        p.appendChild(text);
        document.body.appendChild(p);
        return;
    }
    try {document.getElementsByClassName("error")[0].remove();} catch(err){ }
    document.getElementsByClassName("simple-container")[0].setAttribute("style", "display: block;");
    var baseDate = new Date(date.value);

    var locale = getLang();

    document.getElementById("short-time").innerHTML = baseDate.toLocaleString(locale, { hour: 'numeric', minute: 'numeric', hour12: true });
    document.getElementById("long-time").innerHTML = baseDate.toLocaleTimeString(locale);
    document.getElementById("short-date").innerHTML = baseDate.toLocaleDateString(locale);
    document.getElementById("long-date").innerHTML = baseDate.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
    document.getElementById("short-date-time").innerHTML = baseDate.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' }) + " " + baseDate.toLocaleString(locale, { hour: 'numeric', minute: 'numeric', hour12: true });
    document.getElementById("long-date-time").innerHTML = baseDate.toLocaleDateString(locale, { day: 'numeric', month: 'long', weekday: 'long', year: 'numeric' }) + " " + baseDate.toLocaleString(locale, { hour: 'numeric', minute: 'numeric', hour12: true });
    document.getElementById("relative-time").innerHTML = getRelativeTime();
}

function getRelativeTime(){
    var msPerMinute = 60 * 1000; var msPerHour = msPerMinute * 60; var msPerDay = msPerHour * 24; var msPerMonth = msPerDay * 30; var msPerYear = msPerDay * 365;

    var current = new Date();
    var dateObject = document.querySelector('input[type="datetime-local"]');
    var date = new Date(dateObject.value);
    var previous = date.getTime();

    let elapsed = current - previous;

    if (elapsed < 0 ){
        elapsed = elapsed * -1;
        if (elapsed < msPerMinute) {
            if(elapsed/1000 == 1){ return "in 1 second"; }
            return 'in ' + Math.round(elapsed/1000) + ' seconds';   
       }

       else if (elapsed < msPerHour) {
            if(elapsed/msPerMinute == 1){ return "in 1 minute"; }
            return 'in ' + Math.round(elapsed/msPerMinute) + ' minutes';   
       }

       else if (elapsed < msPerDay ) {
            if(elapsed/msPerHour == 1){ return "in 1 hour"; }
            return 'in ' + Math.round(elapsed/msPerHour ) + ' hours';   
       }

       else if (elapsed < msPerMonth) {
            if(elapsed/msPerDay == 1){ return "in 1 day"; }
           return 'in ' + Math.round(elapsed/msPerDay) + ' days';   
       }

       else if (elapsed < msPerYear) {
            if(elapsed/msPerMonth == 1){ return "in 1 month"; }
           return 'in ' + Math.round(elapsed/msPerMonth) + ' months';   
       }

       else {
            if(elapsed/msPerYear == 1){ return "in 1 year"; }
           return 'in ' + Math.round(elapsed/msPerYear) + ' years';   
       }
    } else {
        if (elapsed < msPerMinute) {
             if(elapsed/1000 == 1){ return "1 second ago"; }
             return Math.round(elapsed/1000) + ' seconds ago';   
        }

        else if (elapsed < msPerHour) {
             if(elapsed/msPerMinute == 1){ return "1 minute ago"; }
             return Math.round(elapsed/msPerMinute) + ' minutes ago';   
        }

        else if (elapsed < msPerDay ) {
             if(elapsed/msPerHour == 1){ return "1 hour ago"; }
             return Math.round(elapsed/msPerHour ) + ' hours ago';   
        }

        else if (elapsed < msPerMonth) {
             if(elapsed/msPerDay == 1){ return "1 day ago"; }
            return Math.round(elapsed/msPerDay) + ' days ago';   
        }

        else if (elapsed < msPerYear) {
             if(elapsed/msPerMonth == 1){ return "1 month ago"; }
            return Math.round(elapsed/msPerMonth) + ' months ago';   
        }

        else {
             if(elapsed/msPerYear == 1){ return "1 year ago"; }
            return Math.round(elapsed/msPerYear) + ' years ago';   
        }
    }
}

function getLang() {
    if (navigator.languages != undefined){
      return navigator.languages[0]; 
    } else {
        return "en-US";
    }
}

function copyText(flag){
    var date = document.querySelector('input[type="datetime-local"]');
    var baseDate = new Date(date.value);
    var unixEpoch = baseDate.getTime();
    var unix = unixEpoch / 1000;
    var discordTimestamp = `<t:${unix}:${flag}>`
    navigator.clipboard.writeText(discordTimestamp);
}