const jsdom = require("jsdom");
const fs = require("fs");
const { JSDOM } = jsdom;

function modifyRule(styleSheet, selector, props) {

    let rule = null;
    if(styleSheet.cssRules) {
        for(var cssrule of styleSheet.cssRules){
            console.log(cssrule.cssText);
            if (cssrule.selectorText == selector) {
                rule = cssrule;
            }
        }
    }

    const propsArr = props.sup
        ? props.split(/\s*;\s*/).map(i => i.split(/\s*:\s*/)) // from string
        : Object.entries(props);                              // from Object

    if (rule) for (let [prop, val] of propsArr){        
        // rule.style[prop] = val; is against the spec, and does not support !important.
        rule.style.setProperty(prop, ...val.split(/ *!(?=important)/));
    }
    else {
        if (!props.sup) {
            props = propsArr.reduce((str, [k, v]) => `${k}: ${v}`, '');
        }
        console.log("Adding rule");
        styleSheet.insertRule(`${selector} { ${props} }`, styleSheet.cssRules.length);
        const css = Array.from(document.styleSheets[document.styleSheets.length - 1].cssRules).map(rule => rule.cssText).join(' ');
        console.log(css);
    }
    return styleSheet;
}

// Reading the current CSS and adding it into an in-memory DOM object for easier manipulation
var css_location = 'dist/custom-chatbot-style.css';
var current_css = fs.readFileSync(css_location,{ encoding: 'utf8' });
const dom = new JSDOM('<body><style>' + current_css + '</style></body>');

document = dom.window.document;
styleSheet = document.styleSheets[document.styleSheets.length - 1];

if (process.env['MESSAGE_TEXT_COLOR']) { 
    modifyRule(styleSheet, '.message-text', { color: process.env['MESSAGE_TEXT_COLOR'] + ' !important'});
}
if (process.env['MESSAGE_FONT']) { 
    modifyRule(styleSheet, '.message-text', { "font-family": process.env['MESSAGE_FONT'] + ' !important'});
}
if (process.env['CHAT_BACKGROUND_COLOR']) { 
    modifyRule(styleSheet, '.message-list-container', { "background-color": process.env['CHAT_BACKGROUND_COLOR'] + ' !important'});
}
if (process.env['TOOLBAR_COLOR']) { 
    modifyRule(styleSheet, '.toolbar.theme--dark', { "background-color": process.env['TOOLBAR_COLOR'] + ' !important'});
}
if (process.env['AGENT_CHAT_BUBBLE']) { 
    modifyRule(styleSheet, '.message-bot .message-bubble', { "background-color": process.env['AGENT_CHAT_BUBBLE'] + ' !important'});
}
if (process.env['CUSTOMER_CHAT_BUBBLE']) { 
    modifyRule(styleSheet, '.message-human .message-bubble', { "background-color": process.env['CUSTOMER_CHAT_BUBBLE'] + ' !important'});
}

//Write the CSS back to the file (formatting will be changed if it had manual inputs but rules/properties should remain)
const css = Array.from(styleSheet.cssRules).map(rule => rule.cssText).join('\r\n\r\n');
console.log(css);
fs.writeFileSync(css_location, css)