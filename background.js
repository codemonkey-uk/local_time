// background.js

// this is just so we can trigger a full pass from the browser button
// depends on polyfill for cross-browser compatibility

function onError(error) 
{
    console.log("error: "+JSON.stringify(error));
    browser.browserAction.setTitle(
        {title :"Localise: Unresponsive, try reloading."}
    );
}

function messageContentScript(tab_id, message)
{
    console.log("send '"+message+"' to "+JSON.stringify(tab_id));
    browser.tabs.sendMessage(
        tab_id,
        {greeting: message}
    ).then(response => {
        console.log("received: "+JSON.stringify(response));
        browser.browserAction.setTitle(
            {title :"Localise: " + response.response}
        );
    }).catch(onError);
}

browser.browserAction.onClicked.addListener((tab) => {
    console.log("action: toggle");
    messageContentScript(tab.id, "toggle");
});

browser.tabs.onActivated.addListener((activeInfo) => {
    console.log("changed tab");
    messageContentScript(activeInfo.tabId, "check");
});

browser.tabs.onUpdated.addListener((tabId) => {
    console.log("updated tab");
    messageContentScript(tabId, "check");
});
