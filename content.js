var annotations_local_enable = false;

// Now monitor the DOM for additions and substitute emoji into new nodes.
// @see https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver.
const observer = new MutationObserver((mutations) => {
  var updateSelection = false;
  mutations.forEach((mutation) => {
    if (childOfId(mutation.target,"local_time_popup")==false)
        updateSelection = true;
    if (settings.feature_annotations || annotations_local_enable)
    {
        if (mutation.addedNodes && mutation.addedNodes.length > 0) {
          // This DOM change was new nodes being added. Run our substitution
          // algorithm on each newly added node.
          for (let i = 0; i < mutation.addedNodes.length; i++) {
            const newNode = mutation.addedNodes[i];
            replaceText(newNode);
          }
        }
        else if (mutation.type==='characterData')
        {
           replaceText(mutation.target);
        }
    }    
  });
  if (updateSelection) checkSelection();
});

function checkSelection(e)
{
    if (settings.feature_tooltips==false) return;
    
    var selection = window.getSelection();
    if (selection.isCollapsed)
    {
        if (popup_div) popup_div.style.display = 'none';
        return;
    }
    
    // selection starts or ends on the pop up, abort
    if (childOfId(selection.anchorNode,"local_time_popup")) return;
    if (childOfId(selection.focusNode,"local_time_popup")) return;
    
    var selectionTxt = selection.toString();
    var list = document.createElement("ul");
    processText(selectionTxt, function (result, found) {
        var node = document.createElement("li");
        node.textContent = found[0]+ " → " + result;
        list.appendChild(node);
    });
    
    if (!popup_div)
    {
        var popup_div_inner = document.createElement("div");    
        popup_div = document.createElement("div");
        popup_div.id = "local_time_popup";
        popup_div.style.zIndex = 999; // TODO: make top, check pages zIndex range
        popup_div.appendChild(popup_div_inner);
        document.body.appendChild(popup_div);
    }
    
    if (list.childElementCount > 0)
    {
        // (outer) div > (inner) div > ul
        while (popup_div.lastChild.hasChildNodes())
            popup_div.lastChild.removeChild(popup_div.lastChild.lastChild);
        popup_div.lastChild.appendChild(list);
        
        var getRange = selection.getRangeAt(0); 
        var getRect = getRange.getBoundingClientRect();
        var w = Math.round(getRect.width);
        if (w<200) w=200;
        var l = Math.round(getRect.left + getRect.width/2 - w/2);
        if (l<0) l=0;
        popup_div.style.width = w + "px";
        popup_div.style.top = (6+getRect.bottom) + "px";
        popup_div.style.left = l + "px";
        popup_div.style.display = 'block';
    }
    else
    {
        popup_div.style.display = 'none';
    }
}

function processContent()
{
    if (settings.feature_annotations)
        replaceAllText();

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    window.addEventListener('mouseup', checkSelection );
}

function restoreOptions() 
{
    browser.storage.local.get('settings')
        .then(gotOptions)
        .then(processContent)
        .catch(processContent);
}

function modeString(settings)
{
    if (settings.feature_annotations)
        return "On Everywhere";
    else if (annotations_local_enable)
        return "On Temporarily";
    else if (settings.feature_tooltips)
        return "On for Selected Text";
    else 
        return "Off";
}

function begin()
{
    restoreOptions();
    
    // listen for background script and trigger full replace 
    browser.runtime.onMessage.addListener(request => {
        if (request.greeting=="toggle")
        {
            annotations_local_enable = !annotations_local_enable;
        }
        
        if (annotations_local_enable)
            replaceAllText();

        return Promise.resolve({
            response: modeString(settings)
        });
    });
}

begin();