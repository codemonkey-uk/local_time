// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString
function toLocaleTimeStringSupportsLocales() 
{
    try {
        new Date().toLocaleTimeString('i');
    } catch (e) {
        return e.name === 'RangeError';
    }
    return false;
}

function pad0(num) 
{
    var s = num+"";
    while (s.length < 2) s = "0" + s;
    return s;
}

function hhmm24h(hour, minute)
{
    return pad0(hour)+":"+pad0(minute);
}

function browserLocalizedTime(hour, minute)
{
    const d = new Date();
    d.setHours(hour,minute,0);
    return d.toLocaleTimeString(navigator.language, {
        hour: '2-digit',
        minute:'2-digit'
    }) 
}