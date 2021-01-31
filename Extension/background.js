let serverhost = 'http://127.0.0.1:5000/'

chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.name === 'screenshot') {
        chrome.tabs.captureVisibleTab(null, null, function (dataUrl) {
            sendResponse({screenshotUrl: dataUrl});
        });
    } else {
        alert(request.topic);
    }
    return true;
});

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        var url = serverhost + '/translate/get_translation/?topic=' + encodeURIComponent(request.x1) + "," + encodeURIComponent(request.x2) + "," + encodeURIComponent(request.y1) + "," + encodeURIComponent + (request.y2) + "," + encodeURIComponent(request.topic);
        console.log(url);

        fetch(url)
            .then(response => response.json())
            .then(response => sendResponse({farewell: response}))
            .catch(error => console.log(error))

        return true;
    });