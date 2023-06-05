function adjustCSSRules(selector, props, sheets)
{
    // get stylesheet(s)
    if (!sheets) sheets = [...document.styleSheets];
    else if (sheets.sup){    // sheets is a string
        let absoluteURL = new URL(sheets, document.baseURI).href;
        sheets = [...document.styleSheets].filter(i => i.href == absoluteURL);
        }
    else sheets = [sheets];  // sheets is a stylesheet

    // CSS (& HTML) reduce spaces in selector to one.
    selector = selector.replace(/\s+/g, ' ');
    const findRule = s => [...s.cssRules].reverse().find(i => i.selectorText == selector)
    let rule = sheets.map(findRule).filter(i=>i).pop()

    const propsArr = props.sup
        ? props.split(/\s*;\s*/).map(i => i.split(/\s*:\s*/)) // from string
        : Object.entries(props);                              // from Object

    if (rule) for (let [prop, val] of propsArr){
        // rule.style[prop] = val; is against the spec, and does not support !important.
        rule.style.setProperty(prop, ...val.split(/ *!(?=important)/));
        }
    else {
        sheet = sheets.pop();
        if (!props.sup) props = propsArr.reduce((str, [k, v]) => `${str}; ${k}: ${v}`, '');
        sheet.insertRule(`${selector} { ${props} }`, sheet.cssRules.length);
        }
}

var css_location = '../dist/custom-chatbot-style.css'
if (process.env['MESSAGE_TEXT_COLOR']) { adjustCSSRules('.message-text', 'color: ' + process.env['MESSAGE_TEXT_COLOR'], css_location )}
