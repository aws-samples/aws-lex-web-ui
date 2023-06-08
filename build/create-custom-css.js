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

var css_location = '../dist/custom-chatbot-style.css';
var current_css = fs.readFileSync(css_location,{ encoding: 'utf8' });
const dom = new JSDOM('<body><style>' + current_css + '</style></body>');

document = dom.window.document;
styleSheet = document.styleSheets[document.styleSheets.length - 1];

//styleSheet = modifyRule(styleSheet, '.toolbar.theme--dark', { "background-color": '#2b2b2b !important'})
//styleSheet = modifyRule(styleSheet, '.message-button', { color: 'red !important'})
//styleSheet = modifyRule(styleSheet, '.message-button', { display: 'none'})

if (process.env['MESSAGE_TEXT_COLOR']) { 
    modifyRule(styleSheet, '.message-text', { color: + process.env['MESSAGE_TEXT_COLOR']});
}

const css = Array.from(styleSheet.cssRules).map(rule => rule.cssText).join('\r\n\r\n');
console.log(css);

fs.writeFileSync(css_location, css)