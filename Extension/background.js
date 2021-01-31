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

// chrome.runtime.onMessage.addListener(
//     function (request, sender, sendResponse) {
//         var url = serverhost + '/translate/get_translation/?topic=' + encodeURIComponent(request.topic);
//         console.log(url);
//
//         //var url = "http://127.0.0.1:8000/wiki/get_wiki_summary/?topic=%22COVID19%22"
//         fetch(url)
//             .then(response => response.json())
//             .then(response => sendResponse({farewell: response}))
//             .catch(error => console.log(error))
//
//         return true;
//     });