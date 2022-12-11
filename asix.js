document.addEventListener('DOMContentLoaded', asix);



function asix(){
    const createStyle = document.createElement('style');
    document.head.append(createStyle)
    createStyle.classList.add('asix-style')

    const styleElem = document.head.querySelector('.asix-style')
    const allElements = document.body.querySelectorAll('*');

    let cdn = "https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js";
    
    for (let i = 1; i < 2; i++) {
        const createScript = document.createElement('script');
        document.body.append(createScript)
        createScript.setAttribute("src", cdn)
        cdn = "https://scientechh.github.io/cdn/asix-codes.js";
    }


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

                if(elem.hasAttribute('ax-media')){
                    media(elem, elemClass, styleElem)
                }else if(elem.hasAttribute('ax-box')){
                    boxmodel(elem, elemClass, styleElem, keyCode)
                }else{
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

                    codeString = `[data-classax='${elemClass}']{${codeAll}}`
                    styleElem.innerHTML += codeString
                }
            }
        }
    }
    saveFile(styleElem)
}

function media(element, elementClass, styleElem){
    let elem = element.getAttribute(`ax-media`);
    let elemArr = elem.split("/");
    let fristElem = elemArr[0].slice(1,-1);
    let codes = ""

    codes = `\n @media screen and (${fristElem}){
        [data-classax='${elementClass}']{
            ${[elemArr.slice(1)]}
        }
    }`


    styleElem.innerHTML += codes
}

function boxmodel(element, elementClass, styleElem, keyCode){
    let elem = element.getAttribute(`ax-box`);
    let elemArr = elem.split("/");
    let codeStyle = "";
    let codes = "";
    console.log(elemArr);

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

function saveFile(styleElem) {
    let myFile = new File([styleElem.innerHTML], "asix-style.css", {type: "text/plain;charset=utf-8"});

    let style = `position: fixed;top: 10px;right: 10px;padding: 10px 15px;z-index: 99999999;border: none;border-radius: 50px;background-color: #008cff;color: #fff;font-weight: 600;cursor: pointer;             
    `

    document.body.innerHTML += `
        <button type="button" style="${style}" class="asix-download-btn">Download Code</button>
    `;

    document.querySelector(".asix-download-btn").onclick = function(){
        saveAs(myFile)
    }
}
