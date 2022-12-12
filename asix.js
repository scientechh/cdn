document.addEventListener('DOMContentLoaded', asix);

let codeObject = {
    flex : {
        "fd-row": "flex-direction: row;",
        "fd-column": "flex-direction: column;",
        "fd-rr": "flex-direction: row-reverse;",
        "fd-cr": "flex-direction: column-reverse;",

        "jc-center": "justify-content: center;",
        "jc-start": "justify-content: start;",
        "jc-end": "justify-content: end;",
        "jc-sb": "justify-content: space-between;",
        "jc-se": "justify-content: space-evenly;",
        "jc-sa": "justify-content: space-around;",
        "jc-stretch": "justify-content: stretch;",

        "ai-center": "align-items: center;",
        "ai-start": "align-items: start;",
        "ai-end": "align-items: end;",
        "ai-fe": "align-items: flex-end;",
        "ai-fs": "align-items: flex-start;",
        "ai-baseline": "align-items: baseline;",
        "ai-stretch": "align-items: stretch;",

        "ac-center": "align-content: center;",
        "ac-start": "align-content: start;",
        "ac-end": "align-content: end;",
        "ac-sb": "align-content: space-between;",
        "ac-se": "align-content: space-evenly;",
        "ac-sa": "align-content: space-around;",
        "ac-stretch": "align-content: stretch;"
    },

    box : {
        "mg": "margin:",
        "ml": "margin-left:",
        "mr": "margin-right:",
        "mt": "margin-top:",
        "mb": "margin-bottom:",

        "pg": "padding:",
        "pl": "padding-left:",
        "pr": "padding-right:",
        "pt": "padding-top:",
        "pb": "padding-bottom:",

        "bg": "border:",
        "bl": "border-left:",
        "br": "border-right:",
        "bt": "border-top:",
        "bb": "border-bottom:"
    },

    fonts : {
        "fsize": "font-size:",
        "size-small": "font-size: 15px;",
        "size-normal": "font-size: 25px;",
        "size-big": "font-size: 35px;",

        "family": "font-family",

        "style-italic": "font-style: italic;", 
        "style-oblique": "font-style: oblique;", 
        "style-normal": "font-style: italic;", 

        "weight-italic": "font-weight: normal;", 
        "weight-bold": "font-weight: bold;", 
        "weight-bolder": "font-weight: bolder;", 
        "weight-lighter": "font-weight: lighter;", 
    },

    position : {
        "abs": "position: absolute;",
        "rel": "position: relative;",
        "static": "position: static;",
        "fixed": "position: fixed;",
        "sticky": "position: sticky;",

        "r": "right:",
        "l": "left:",
        "t": "top:",
        "b": "bottom:",

        "i": "z-index:"
    },

    text : {
        "ta-center": "text-align: center;",
        "ta-start": "text-align: start;",
        "ta-end": "text-align: end;",
        "ta-right": "text-align: right;",
        "ta-left": "text-align: left;",
        "ta-justify": "text-align: justify;",

        "td-none": "text-decoration: none;",
        "td-underline": "text-decoration: underline;",

        "tt-upper": "text-transform: uppercase;",
        "tt-lower": "text-transform: lowercase;",
        "tt-capital": "text-transform: capitalize;"
    },

    display : {
        "dn": "display: none;",
        "db": "display: block;",
        "di": "display: inline;",
        "dib": "display: inline-block;"
    },

    // media : {
    //     "fs": "font-size:", 
    //     "c": "color:", 
    //     "w": "width:", 
    //     "h": "height:", 
    // }
}

function asix(){
    const createStyle = document.createElement('style');
    document.head.append(createStyle)
    createStyle.classList.add('asix-style')

    const styleElem = document.head.querySelector('.asix-style')
    const allElements = document.body.querySelectorAll('*');

    const createScript = document.createElement('script');
    document.body.append(createScript)
    createScript.setAttribute("src", "https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js")


    let elemClass = ""
    let count = 0;

    for (const elem of allElements) {
        let codeString = "";
        for (const keyCode in codeObject) {
            if (elem.hasAttribute(`ax-${keyCode}`)) {
                let codeAll = "";

                if (elem.hasAttribute("data-classax")) {
                    elemClass = elem.getAttribute("data-classax")
                }else{
                    count++
                    elem.setAttribute("data-classax", `${keyCode}${count}`)
                    elemClass = elem.getAttribute("data-classax")
                }

                if (elem.hasAttribute("ax-flex")) {
                    codeAll += `display: flex;`
                }


                let htmlCode = elem.getAttribute(`ax-${keyCode}`)
                    let htmlCodeArr = htmlCode.split("/");
                    for (const iterator of htmlCodeArr) {
                        for (const key in codeObject[keyCode]) {
                            if (keyCode === "position") {
                                if (iterator == key) {
                                    codeAll += codeObject[keyCode][key]
                                }else if(iterator.slice(0,1) == key){
                                    let b = iterator.slice(1);
                                    codeAll += codeObject[keyCode][key] + b + ";"
                                }
                            }else if (keyCode === "fonts") {
                                if (iterator == key) {
                                    codeAll += codeObject[keyCode][key]
                                }else if(iterator.slice(0,5) == key){
                                    let b = iterator.slice(5);
                                    codeAll += codeObject[keyCode][key] + b + ";"
                                }
                            }else if (iterator == key) {
                                codeAll += codeObject[keyCode][key]
                            }
                            
                        }
                    }

                    if(elem.hasAttribute('ax-media')){
                        media(elem, elemClass, styleElem)
                    }else if(elem.hasAttribute('ax-box')){
                        boxmodel(elem, elemClass, styleElem, keyCode)
                    }
                    
                    codeString = `[data-classax='${elemClass}']{${codeAll}}`
                    styleElem.innerHTML += codeString
            }
        }
    }
    let myFile = new File([styleElem.innerHTML], "asix-style.css", {type: "text/plain;charset=utf-8"});

    if (location.href.slice(-4) == 'down') {
        let style = `position: fixed;top: 10px;right: 10px;padding: 10px 15px;z-index: 99999999;border: none;border-radius: 50px;background-color: #008cff;color: #fff;font-weight: 600;
                cursor: pointer;             
        `

        document.body.innerHTML += `
            <button type="button" style="${style}" class="asix-download-btn">Download Code</button>
        `;

        document.querySelector(".asix-download-btn").onclick = function(){
            saveAs(myFile)
            location.href = location.href.slice(0,-5)
        }
    }
}

function media(element, elementClass, styleElem){
    let elem = element.getAttribute(`ax-media`);
    let elemArr = elem.split("/");
    let fristElem = elemArr[0].slice(1,-1);
    let codeArr = elemArr.slice(1)
    let codes = ""

    let a = ""

    for (const iterator of codeArr) {
        for (const value of Object.values(codeObject)) {
            for (const key in value) {
                console.log(iterator);
                
                if (iterator == key) {
                    a += value[key]
                }else if(iterator.slice(0,5) == key){
                    a += value[key] + iterator.slice(5) + ";"
                }else if(iterator.slice(0,1) == key){
                    a += value[key] + iterator.slice(1) + ";"
                }
            }
        }
    }

    console.log(a);

    codes = `\n @media screen and (${fristElem}){
        [data-classax='${elementClass}']{
            ${a}
        }
    }`

    styleElem.innerHTML += codes
}

function boxmodel(element, elementClass, styleElem, keyCode){
    let elem = element.getAttribute(`ax-box`);
    let elemArr = elem.split("/");
    let codeStyle = "";
    let codes = "";

    for (const el of elemArr) {
        for (const key in codeObject[keyCode]) {
            if (el.slice(0,2) == key) {  
                codeStyle += codeObject[keyCode][key] + el.slice(2) + ";"
            }
        }
    }

    codes = `\n [data-classax='${elementClass}']{
        ${codeStyle}
    }`


    styleElem.innerHTML += codes
}

