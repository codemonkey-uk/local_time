function saveOptions(e) 
{
    var v = document.querySelector("#local_zone_str_checkbox").checked;
    var r = document.querySelector('input[name="time_format"]:checked');
    var tv = r ? r.value : "browser";
    var f1 = document.querySelector("#feature_annotations_checkbox").checked;
    var f2 = document.querySelector("#feature_tooltips_checkbox").checked;    
    var settings = {
        "local_zone_str_enabled": v,
        "time_format": tv,
        "feature_annotations": f1,
        "feature_tooltips": f2
    };
    console.log("Saving Settings: "+JSON.stringify(settings));
    browser.storage.local.set({settings}).then(savedOption);
}

function savedOption() 
{
    console.log("Settings Saved.");
}

function updatePage(settings)
{
    document.querySelector("#local_zone_str_checkbox").checked = settings.local_zone_str_enabled;
    document.querySelector("#feature_annotations_checkbox").checked = settings.feature_annotations;
    document.querySelector("#feature_tooltips_checkbox").checked = settings.feature_tooltips;
    var node = document.querySelector('#time_format_'+settings.time_format);
    if (node)
    {
        node.checked = true;
    }
    else 
    {
        console.log("time_format setting not recognised: "+settings.time_format);
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
        .then(gotOptions)
        .then(updatePage);
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelectorAll('input[type=checkbox]')
    .forEach(checkbox => checkbox.addEventListener('change', saveOptions));
document.querySelectorAll('input[type=radio]')
    .forEach(radio => radio.addEventListener('change', saveOptions));



