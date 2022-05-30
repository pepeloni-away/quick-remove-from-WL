// ==UserScript==
// @name        quick-remove from WL
// @namespace   quickremovefromWL
// @match       https://www.youtube.com/playlist?list=WL
// @grant       none
// @version     1.0
// @author      pploni
// @description remove videos from watch later with only 1 button press
// ==/UserScript==

let styleSheet = document.createElement("style")
styleSheet.innerText = '.rmbtn:hover {fill: white;} .rmbtn {fill: transparent}'
document.head.appendChild(styleSheet)
let btn = '<button class="rmbtn" style="width: 40px; height: 40px;background: transparent;border: 0px;cursor: pointer;"><svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 75%; height: 75%;margin: auto;" class="style-scope yt-icon"><g class="style-scope yt-icon" style=""><path d="M11,17H9V8h2V17z M15,8h-2v9h2V8z M19,4v1h-1v16H6V5H5V4h4V3h6v1H19z M17,5H7v15h10V5z" class="style-scope yt-icon" style=""></path></g></svg></button>'
let YtRemoveBtn, init, burger

function addRemoveButton() {
    document.querySelectorAll('ytd-playlist-video-renderer div[id="menu"]').forEach(e => {
        if (!init) {
            e.parentNode.querySelector('button[id="button"]').click()
            e.parentNode.querySelector('button[id="button"]').click()
            YtRemoveBtn = Array.from(document.querySelectorAll('yt-formatted-string span')).find(el => el.textContent === 'Remove from ')
            //console.log(YtRemoveBtn)
            if (!burger) burger = document.querySelector('div[id="start"] button[aria-label="Guide"]')            
            if (burger && burger.getAttribute("aria-pressed") == "true") burger.click()            
            if (YtRemoveBtn && burger) init = true            
        }
        
        if (!e.parentNode.querySelector('.rmbtn')) {
            e.insertAdjacentHTML('beforebegin', btn)
        } //else console.log(e, 'already has rm button')
        
        if (!e.hasQuickRemove) {
            addListener(e.parentNode)
            e.hasQuickRemove = true
        } //else console.log( e, "already has quickremove")        
    })
}
addRemoveButton()


function addListener(elm) {
    elm.querySelector('.rmbtn').addEventListener('click', function() {
                document.querySelector("tp-yt-iron-dropdown.style-scope.ytd-popup-container").style.visibility = "hidden"
                this.parentElement.querySelector('button[id="button"]').click()
                setTimeout(function() {
                    YtRemoveBtn.click()
                    document.querySelector("tp-yt-iron-dropdown.style-scope.ytd-popup-container").style.visibility = ""
                },250)
                
            })
}


let waitForLoad, i = 0
const wait = setInterval(() => {
    waitForLoad = document.getElementById('contents')
    i++
    if (waitForLoad) {
        clearInterval(wait)
        new MutationObserver(function(){addRemoveButton(); }).observe(waitForLoad, { childList: true, subtree: true});
    }
    
    if(i === 100) {
        console.log('no videos in WL or something went wrong')
        clearInterval(wait)
    }
} , 111);

