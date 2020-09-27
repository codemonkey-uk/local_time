function saveOptions(e) 
{
    var v = document.querySelector("#local_zone_str_checkbox").checked;
    var r = document.querySelector('input[name="time_format"]:checked');
    var tv = r ? r.value : "browser";

    var settings = {
        "local_zone_str_enabled": v,
        "time_format": tv
    };
    console.log("Saving Settings: "+JSON.stringify(settings));
    browser.storage.local.set({settings}).then(savedOption);
}

function savedOption() 
{
    console.log("Settings Saved.");
}

function gotOptions(item)
{
    if (item)
    {
        var settings = item.settings;
        if (settings)
        {
            console.log("Loaded Setting: "+JSON.stringify(settings));
            document.querySelector("#local_zone_str_checkbox").checked = settings.local_zone_str_enabled;
            var node = document.querySelector('#time_format_'+settings.time_format);
            if (node)
                node.checked = true;
            else 
                console.log("time_format setting not recognised: "+settings.time_format);
        }
    }
}

function onError(error)
{
    console.log("Error Loading Setting: "+error);
}

function restoreOptions() 
{
    var localZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    document.querySelector("#local_zone_str").innerText = localZone;

    var currentdate = new Date();
    var h = currentdate.getHours();
    var m = currentdate.getMinutes();
    document.getElementById("time_format_hhmm24h_example").innerText = hhmm24h(h,m);
    if (toLocaleTimeStringSupportsLocales()==false)
    {
        document.getElementById("time_format_browser").disabled = true;
        document.getElementById("time_format_browser_example").innerText = "unavailable";
    }
    else
    {
        document.getElementById("time_format_browser_example").innerText = browserLocalizedTime(h,m);
    }
    
    browser.storage.local.get('settings')
        .then(gotOptions);
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("#local_zone_str_checkbox").addEventListener("change", saveOptions);
var radios = document.querySelectorAll('input[type=radio][name="time_format"]');
radios.forEach(radio => radio.addEventListener('change', saveOptions));



