// background.js
import './browser-polyfill.js';

// chrome / firefox compatibility 
if (typeof browser.action === "undefined")
    browser.action = browser.browserAction;


// this is just so we can trigger a full pass from the browser button
// depends on polyfill for cross-browser compatibility

function statusString(status)
{
    if (status==1)
        return "On Everywhere";
    else if (status==2)
        return "On Temporarily";
    else if (status==3)
        return "On for Selected Text";
    else // status == 4 
        return "Off";
}

function statusIcon(status)
{
    if (status==1)
        return "button.png";
    else if (status==2)
        return "button-temp.png";
    else if (status==3)
        return "button-partial.png";
    else // status == 4 
        return "button-grey.png";
}

function onError(error) 
{
    console.log("Error: "+JSON.stringify(error));
    browser.action.setTitle(
        {title :"Localise: Unresponsive, try reloading."}
    );
    browser.action.setIcon(
        {path: statusIcon(0)}
    ).catch(
        ()=>{console.log("Error setting error icon");}
    );
}

function messageContentScript(tab_id, message)
{
    browser.tabs.sendMessage(
        tab_id,
        {greeting: message}
    ).then(response => {
        browser.action.setTitle(
            {title :"Localise: " + statusString(response.response)}
        );
        browser.action.setIcon(
            {tabId: tab_id, path: statusIcon(response.response)}
        ).catch(onError);
    }).catch(onError);
}

browser.action.onClicked.addListener((tab) => {
    messageContentScript(tab.id, "toggle");
});

browser.tabs.onActivated.addListener((activeInfo) => {
    messageContentScript(activeInfo.tabId, "check");
});

browser.tabs.onUpdated.addListener((tabId) => {
    messageContentScript(tabId, "check");
});
