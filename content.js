var utc_offsets = {
    "ACDT": "+10:30",
    "ACST": "+09:30",
    "ACT": "-05",
    "ACWST": "+08:45",
    "ADT": "-03",
    "AEDT": "+11",
    "AEST": "+10",
    "AFT": "+04:30",
    "AKDT": "-08",
    "AKST": "-09",
    "ALMT": "+06",
    "AMST": "-03",
    "ANAT": "+12",
    "AQTT": "+05",
    "ART": "-03",
    "AST": "+03",
    "AST": "-04",
    "AWST": "+08",
    "AZOST": "00",
    "AZOT": "-01",
    "AZT": "+04",
    "BDT": "+08",
    "BIOT": "+06",
    "BIT": "-12",
    "BOT": "-04",
    "BRST": "-02",
    "BRT": "-03",
    "BST": "+01",
    "BTT": "+06",
    "CAT": "+02",
    "CCT": "+06:30",
    "CDT": "-05",
    "CEST": "+02",
    "CET": "+01",
    "CHADT": "+13:45",
    "CHAST": "+12:45",
    "CHOT": "+08",
    "CHOST": "+09",
    "CHST": "+10",
    "CHUT": "+10",
    "CIST": "-08",
    "WITA": "+08",
    "CKT": "-10",
    "CLST": "-03",
    "CLT": "-04",
    "COST": "-04",
    "COT": "-05",
    "CST": "-06",
    "CST": "+08",
    "CST": "-05",
    "CT": "-06/UTC-05",
    "CVT": "-01",
    "CWST": "+08:45",
    "CXT": "+07",
    "DAVT": "+07",
    "DDUT": "+10",
    "DFT": "+01",
    "EASST": "-05",
    "EAST": "-06",
    "EAT": "+03",
    "ECT": "-04",
    "ECT": "-05",
    "EDT": "-04",
    "EEST": "+03",
    "EET": "+02",
    "EGST": "00",
    "EGT": "-01",
    "WIT": "+09",
    "ET": "-05",
    "EST": "-05",
    "FET": "+03",
    "FJT": "+12",
    "FKST": "-03",
    "FKT": "-04",
    "FNT": "-02",
    "GALT": "-06",
    "GAMT": "-09",
    "GET": "+04",
    "GFT": "-03",
    "GILT": "+12",
    "GIT": "-09",
    "GMT": "00",
    "GST": "-02",
    "GST": "+04",
    "GYT": "-04",
    "HDT": "-09",
    "HAEC": "+02",
    "HST": "-10",
    "HKT": "+08",
    "HMT": "+05",
    "HOVST": "+08",
    "HOVT": "+07",
    "ICT": "+07",
    "IDLW": "-12",
    "IDT": "+03",
    "IOT": "+03",
    "IRDT": "+04:30",
    "IRKT": "+08",
    "IRST": "+03:30",
    "IST": "+05:30",
    "JST": "+09",
    "KALT": "+02",
    "KGT": "+06",
    "KOST": "+11",
    "KRAT": "+07",
    "KST": "+09",
    "LHST": "+10:30",
    "LHST": "+11",
    "LINT": "+14",
    "MAGT": "+12",
    "MART": "-09:30",
    "MAWT": "+05",
    "MDT": "-06",
    "MET": "+01",
    "MEST": "+02",
    "MHT": "+12",
    "MIST": "+11",
    "MIT": "-09:30",
    "MMT": "+06:30",
    "MSK": "+03",
    "MST": "+08",
    "MST": "-07",
    "MUT": "+04",
    "MVT": "+05",
    "MYT": "+08",
    "NCT": "+11",
    "NDT": "-02:30",
    "NFT": "+11",
    "NOVT": "+07",
    "NPT": "+05:45",
    "NST": "-03:30",
    "NT": "-03:30",
    "NUT": "-11",
    "NZDT": "+13",
    "NZST": "+12",
    "OMST": "+06",
    "ORAT": "+05",
    "PDT": "-07",
    "PET": "-05",
    "PETT": "+12",
    "PGT": "+10",
    "PHOT": "+13",
    "PHT": "+08",
    "PKT": "+05",
    "PMDT": "-02",
    "PMST": "-03",
    "PONT": "+11",
    "PST": "-08",
    "PST": "+08",
    "PYST": "-03",
    "PYT": "-04",
    "RET": "+04",
    "ROTT": "-03",
    "SAKT": "+11",
    "SAMT": "+04",
    "SAST": "+02",
    "SBT": "+11",
    "SCT": "+04",
    "SDT": "-10",
    "SGT": "+08",
    "SLST": "+05:30",
    "SRET": "+11",
    "SRT": "-03",
    "SST": "-11",
    "SST": "+08",
    "SYOT": "+03",
    "TAHT": "-10",
    "THA": "+07",
    "TFT": "+05",
    "TJT": "+05",
    "TKT": "+13",
    "TLT": "+09",
    "TMT": "+05",
    "TRT": "+03",
    "TOT": "+13",
    "TVT": "+12",
    "ULAST": "+09",
    "ULAT": "+08",
    "UTC": "00",
    "UYST": "-02",
    "UYT": "-03",
    "UZT": "+05",
    "VET": "-04",
    "VLAT": "+10",
    "VOLT": "+04",
    "VOST": "+06",
    "VUT": "+11",
    "WAKT": "+12",
    "WAST": "+02",
    "WAT": "+01",
    "WEST": "+01",
    "WET": "00",
    "WIB": "+07",
    "WGST": "-02",
    "WGT": "-03",
    "WST": "+08",
    "YAKT": "+09",
    "YEKT": "+05"
};

const offset_regex = /([+-])(\d{1,2})(?::?(\d\d))?/;
var popup_div = null;

// inserts ins_string into mains_string at pos,
// IF the string at pos is not already a match
function insert_if(main_string, ins_string, pos) 
{
   if(typeof(pos) == "undefined") {
    pos = 0;
  }
   if(typeof(ins_string) == "undefined") {
    ins_string = '';
  }
  // prevent double-insertion
  if (main_string.slice(pos).startsWith(ins_string)==false)
      return main_string.slice(0, pos) + ins_string + main_string.slice(pos);
  else
    return main_string;
}

function localTime2Text(hour, minute)
{
    var localZone = settings.local_zone_str_enabled ? " " + Intl.DateTimeFormat().resolvedOptions().timeZone : "";
    if (toLocaleTimeStringSupportsLocales() && settings.time_format=="browser")
    {
        return browserLocalizedTime(hour, minute) + localZone;
    }
    return hhmm24h(hour, minute) + localZone;
}

function processText (text, fn) 
{
    var regex = /\b(\d{1,2})(?:[:h\.]?(\d\d))?(?:[:m\.]?(\d\d))?\s*([aApP]\.?[mM]\.?)?\s*\(?([A-Z]{2,5})([+-]\d{1,2}:?\d{0,2})?\)?/g;
    while(found = regex.exec(text))
    {
        var hour = parseInt(found[1]);
        var minute = found[2] ? parseInt(found[2]) : 0;
        var second = found[3] ? parseInt(found[3]) : 0;
        
        var ampm = found[4];
        if (ampm && ampm.toUpperCase().charAt()==="P")
            hour += 12;
        
        var zone = found[5];
        if (utc_offsets[zone])
        {
            var zone_offsets = utc_offsets[zone].match(offset_regex);
            if (zone_offsets)
            {
                var d = (zone_offsets[1]=='-') ? 1 : -1;
                hour += parseInt(zone_offsets[2])*d;
                if (zone_offsets[3])
                    minute += parseInt(zone_offsets[3])*d;
            }
            
            // offset on the named time zone
            if (found[6])
            {
                var offset = found[6].match(offset_regex);
                if (offset)
                {
                    d = (offset[1]=='-') ? 1 : -1;
                    hour += parseInt(offset[2])*d;
                    if (offset[3])
                    {
                        minute += parseInt(offset[3])*d;
                    }
                }
            }
            
            var localOffset = new Date().getTimezoneOffset();
            hour -= Math.floor(localOffset/60);
            minute -= localOffset%60;
            
            // roll minutes back into the hour
            while(minute<0)
            {
                minute+=60;
                hour-=1;
            }
            while(minute>=60)
            {
                minute-=60;
                hour+=1;
            }
            var d=0;
            while(hour<0)
            {
                hour+=24;
            }
            while(hour>=24)
            {
                hour-=24;
            }
            
            fn( localTime2Text(hour, minute), found );
        }
    }
}

function childOfId(node,id)
{
    do {
        if (node.id==id)
            return true;
        node = node.parentNode;
    } while(node);
    return false;
}

function replaceText (node) 
{
  // dont process own pop up
  if (childOfId(node,"local_time_popup")) return;
  
  if (node.nodeType === Node.TEXT_NODE) {
  
    // Skip textarea nodes 
    if (node.parentNode && node.parentNode.nodeName === 'TEXTAREA') return;

    var text = node.nodeValue;
    var updatedText = text;
    processText(text, function (result, found) {
            updatedText = insert_if(
                updatedText,
                " (" + result + ")",
                found.index + found[0].length + (updatedText.length-text.length)
            )
        }
    );
    if (updatedText!=text)
    {
        node.textContent = updatedText;
    }
  }
  else {
    // This node contains more than just text, call replaceText() on each
    // of its children.
    for (let i = 0; i < node.childNodes.length; i++) {
      replaceText(node.childNodes[i]);
    }    
  }
}

// Now monitor the DOM for additions and substitute emoji into new nodes.
// @see https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver.
const observer = new MutationObserver((mutations) => {
  var updateSelection = false;
  mutations.forEach((mutation) => {
    if (childOfId(mutation.target,"local_time_popup")==false)
        updateSelection = true;
    if (settings.feature_annotations)
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
        replaceText(document.body,{characterData: true});

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

function begin()
{
    restoreOptions();
}

begin();