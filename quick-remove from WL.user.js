// ==UserScript==
// @name        quick-remove from WL
// @namespace   quickremovefromWL
// @match       https://www.youtube.com/playlist?list=WL
// @grant       none
// @version     1.0
// @author      pploni
// @downloadURL https://github.com/pepeloni-away/quick-remove-from-WL/raw/main/quick-remove%20from%20WL.user.js
// @updateURL   https://github.com/pepeloni-away/quick-remove-from-WL/raw/main/quick-remove%20from%20WL.user.js
// @description remove videos from watch later with only 1 button press
// ==/UserScript==

let styleSheet = document.createElement("style")
styleSheet.innerText = '.rmbtn:hover {fill: white;} .rmbtn {fill: transparent}'
document.head.appendChild(styleSheet)
let btn = '<button class="rmbtn" style="width: 40px; height: 40px;background: transparent;border: 0px;cursor: pointer;"><svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 75%; height: 75%;margin: auto;" class="style-scope yt-icon"><g class="style-scope yt-icon" style=""><path d="M11,17H9V8h2V17z M15,8h-2v9h2V8z M19,4v1h-1v16H6V5H5V4h4V3h6v1H19z M17,5H7v15h10V5z" class="style-scope yt-icon" style=""></path></g></svg></button>'
let YtRemoveBtn, burger





// fix not working for removed videos
function addRemoveButton() {
    // old document.querySelectorAll('ytd-playlist-video-renderer div[id="menu"]')
    for (let i of document.querySelectorAll('.style-scope ytd-playlist-video-renderer [id="menu"] yt-icon-button')) { // doesn't look perfect, whatever
        if (!i.hasBtn) {
            i.insertAdjacentHTML('beforebegin', btn)
            i.hasBtn = true
            //addListener(i)
        }
    }
    
    for (let i of document.querySelectorAll('.rmbtn')) i.parentElement.style.display = 'flex' // fix uncentred elements
    
    for (let i of document.querySelectorAll('.rmbtn')) {
        //if (i.hasLis) return
        i.onclick = function() {
            //console.log(this, this.nextSibling)
            i.hasLis = true
            document.querySelector("tp-yt-iron-dropdown.style-scope.ytd-popup-container").style.visibility = "hidden"
            this.nextSibling.click()
            setTimeout(function() {
                YtRemoveBtn.click()
                document.querySelector("tp-yt-iron-dropdown.style-scope.ytd-popup-container").style.visibility = ""
            },50) // seems to work with very low timemout
        }
    }
        
//         if (!e.parentNode.querySelector('.rmbtn')) {
//             e.insertAdjacentHTML('beforebegin', btn)
//         } //else console.log(e, 'already has rm button')
        
//         if (!e.hasQuickRemove) {
//             addListener(e.parentNode)
//             e.hasQuickRemove = true
//         } //else console.log( e, "already has quickremove")        
    
}
//addRemoveButton()


function addListener(elm) {
    // 24 july 2022: cannot use parentelement, queryselector on a lot of youtube's elements
    
    
    
    //elm.addEventListener('click', function() {
    //            document.querySelector("tp-yt-iron-dropdown.style-scope.ytd-popup-container").style.visibility = "hidden"
    //            this.nextSibling.click()
    //            setTimeout(function() {
    //                YtRemoveBtn.click()
    //                document.querySelector("tp-yt-iron-dropdown.style-scope.ytd-popup-container").style.visibility = ""
    //            },50) // seems to work with very low timemout
    //            
    //        })
}


let waitForLoad, i = 0, run = 0
const wait = setInterval(() => {
    waitForLoad = document.getElementById('contents')
    i++
    //console.log(document.body)
    //document.body.onload = function() {console.log('now')}
    if (waitForLoad) {
        clearInterval(wait)
        
    let test = setInterval(() => {
        if (run > 3) {
            console.error('something changed again, failed to set remove button')
            clearInterval(test)
        }
        run++
        for (let i of Object.values(document.querySelectorAll('ytd-playlist-video-renderer button[aria-label="Action menu"]'))) {
            i.click()
            i.click()
            
            for (let n of (document.querySelectorAll('yt-formatted-string span'))) {
                if (n.innerText === 'Remove from ') {
                    YtRemoveBtn = n
                    break
                }
            }
    
            if (YtRemoveBtn) {
                //console.log(YtRemoveBtn)
                clearInterval(test)
                break
            } else {
                //console.log('nott')
            }
        }
    }, 100)
        new MutationObserver(addRemoveButton).observe(waitForLoad, { childList: true, subtree: true})
        KeyListener()
        let z = 0, pff = setInterval(() => {
            let item = document.querySelector('ytd-playlist-sidebar-primary-info-renderer div[id="menu"]').firstChild
            if (document.querySelector('ytd-playlist-sidebar-primary-info-renderer div[id="menu"]').firstChild) {
                clearInterval(pff)
                refreshList()
            }
            z > 10 ? clearInterval(pff) : null
            z++
        }, 1000)
        //refreshList()
    }
    
    if (!burger) burger = document.querySelector('button[aria-label="Guide"]')       
            if (burger && burger.getAttribute("aria-pressed") == "true") burger.click()
    
    if(i === 100) {
        console.log('no videos in WL or something went wrong')
        clearInterval(wait)
    }
}, 500)

function KeyListener() {
    document.addEventListener('keyup', (evt) => {
        //console.log(evt)
        if (evt.key == 'R' && evt.shiftKey == true) {
            addRemoveButton()
            console.log('new buttons added')
        }
    })
}

function refreshList() {
    
    let t = document.querySelectorAll('#reorder')
    let last = t[t.length - 1]
    
    let space = document.createElement('div')
    let btn = document.createElement('button')
    btn.innerText = 'Refresh'
    btn.className = 'refreshbtn'
    btn.style.border = 'none'
    btn.style.background = 'transparent'
    btn.style.cursor = 'pointer'
    btn.style.marginLeft = '150px'
    btn.style.color = 'white'
    // document.querySelector("button[aria-label='Action menu']").parentElement.parentElement.appendChild(btn) // parentelement no longer works
    //document.querySelector('.style-scope ytd-playlist-sidebar-primary-info-renderer [has-items="1"]').appendChild(space) // appendchild not workin???
    //document.querySelector('.style-scope ytd-playlist-sidebar-primary-info-renderer [has-items="1"]').appendChild(btn)
    document.querySelector('.style-scope ytd-playlist-sidebar-primary-info-renderer [has-items="1"]').insertAdjacentElement('beforeend', btn)
    document.querySelector('.refreshbtn').addEventListener('click', () => {
        let ylvl = scrollY
        re(last)
        setTimeout(()=> {
            if (scrollY !== ylvl) {
                try {scrollTo(0, ylvl + 100); console.log('scrollin back')}
                catch(e) { console.log(e)}
            }
        }, 2000)
        
    })
    
    //re(last)
    function re(element) { 
        // stupid but the only way to refresh without reloading is to simulate dragging a video
        // https://stackoverflow.com/questions/61376278/simulate-a-3-pixel-drag-on-draggable-elem/61547444#61547444
        
        //let element = document.querySelectorAll('#reorder')[105]
    
        // We create 3 mouse events using MouseEvent interface,
        // one for mousedown to initiate the process,
        // one for mousemove to handle to movement
        // and one for mouseup to terminate the process
        
        const mouseDownEvent = new MouseEvent('mousedown', {
          clientX: element.getBoundingClientRect().left,
          clientY: element.getBoundingClientRect().top,
          bubbles: true,
          cancelable: true
        });
        
        const mouseMoveEvent = new MouseEvent('mousemove', {
          clientX: element.getBoundingClientRect().left + 3,
          clientY: element.getBoundingClientRect().top,
          bubbles: true,
          cancelable: true
        });
        
        const mouseUpEvent = new MouseEvent('mouseup', {
          bubbles: true,
          cancelable: true
        });
        
        // Dispatch the mousedown event to the element that has the listener
        element.dispatchEvent(mouseDownEvent);
        
        // For mousemove, the listener may be the parent or even the document
        element.dispatchEvent(mouseMoveEvent);
        
        // Dispatch mouseup to terminate the process
        element.dispatchEvent(mouseUpEvent);
    }
}
