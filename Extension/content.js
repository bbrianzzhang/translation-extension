let x1 = 0;
let x2 = 0;
let y1 = 0;
let y2 = 0;
let start = {};
let end = {};
let selectionMode = false;
let isSelecting = false;

chrome.runtime.onMessage.addListener(function (request) {
    if (request.message === "takeScreenshot") {
        selectionMode = true;
    }
    return Promise.resolve("temp");
})

document.addEventListener('mousedown', e => {
    if (!selectionMode) {
        return;
    }
    x1 = e.offsetX;
    y1 = e.offsetY;
    isSelecting = true;
    $('#selection').css({
        left: start.x,
        top: start.y
    });
})

document.addEventListener('mousemove', e => {
    if (!isSelecting || !selectionMode) {
        return;
    }

    x2 = e.offsetX;
    y2 = e.offsetY;

    $('#selection').css({
        left: start.x < end.x ? start.x : end.x,
        top: start.y < end.y ? start.y : end.y,
        width: Math.abs(start.x - end.x),
        height: Math.abs(start.y - end.y)
    });
})

document.addEventListener('mouseup', e => {
    if (!selectionMode) {
        return;
    }
    isSelecting = false;
    selectionMode = false;
    x2 = e.offsetX;
    y2 = e.offsetY;

    chrome.extension.sendMessage({name: 'screenshot'}, function (response) {
            let data = response.screenshotUrl;
            let img = new Image();
            img.src = data;
            document.body.appendChild(img);
            let canvas=document.createElement('canvas');
            let ctx = canvas.getContext('2d');
            ctx.drawImage(img, x1, y1, x2-x1, y2-y1, 0, 0, x2-x1, y2-y1);
            document.body.appendChild(canvas);
            let newSource = canvas.toDataURL('image/jpeg');
            let cropped = new Image();
            document.body.appendChild(cropped);
            let temp = document.createTextNode(newSource);
            document.body.appendChild(temp);

            // if (newSource) {
            //     chrome.runtime.sendMessage(
            //         {topic: newSource},
            //         function (response) {
            //             let result = response.farewell;
            //             alert(result.summary);
            //             var notifOptions = {
            //                 type: "basic",
            //                 iconUrl: "icon48.png",
            //                 title: "Image",
            //                 message: result.summary
            //             };
            //             chrome.notifications.create('Image', notifOptions);
            //         });
            // }
        });
})
