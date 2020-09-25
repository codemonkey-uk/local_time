function saveOptions(e) 
{
    document.querySelector("#loaded_msg").innerText = "Saving";
    var v = document.querySelector("#local_zone_str_checkbox").checked;
    var local_zone_str_enabled = v;
    browser.storage.local.set({local_zone_str_enabled}).then(savedOption);
}

function savedOption() 
{
    document.querySelector("#loaded_msg").innerText = "Saved";
}

function gotOptions(item)
{
   document.querySelector("#local_zone_str_checkbox").checked = item.local_zone_str_enabled;
   document.querySelector("#loaded_msg").innerText = "Loaded: "+ item.local_zone_str_enabled;
}

function onError(error)
{
   document.querySelector("#loaded_msg").innerText = "Error loading: "+ error;
}

function restoreOptions() 
{
    var localZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    document.querySelector("#local_zone_str").innerText = localZone;

    browser.storage.local.get('local_zone_str_enabled')
        .then(gotOptions);
    document.querySelector("#loaded_msg").innerText = "Loading...";
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("#local_zone_str_checkbox").addEventListener("change", saveOptions);
