chrome.runtime.onMessage.addListener(function(request) {
    if(request.message === "takeScreenshot") {
        chrome.extension.sendMessage({name: 'screenshot'}, function(response) {
        let data = response.screenshotUrl;
        let canvas = document.createElement('canvas');
        let img = new Image();
        img.onload = function() {
            canvas.width = $(window).width();
            canvas.height = $(window).height()
            canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);

            var $canvas = $(canvas);
            $canvas.data('scrollLeft', $(document.body).scrollLeft());
            $canvas.data('scrollTop', $(document.body).scrollTop());

            callback($canvas);
        }
        img.src = data;
        document.body.appendChild(img);
        let temp = document.createTextNode(data);
        document.body.appendChild(temp);
    });
    }
})

function renderPreview ($element, $screenshotCanvas) {
    var previewCanvas = document.createElement('canvas');
    previewCanvas.width = $element.width();
    previewCanvas.height = $element.height();

    var prevTop = $element.offset().top - $screenshotCanvas.data('scrollTop');
    var prevLeft = $element.offset().left - $screenshotCanvas.data('scrollLeft');

    var ctx = previewCanvas.getContext("2d");
    ctx.drawImage($screenshotCanvas[0], prevLeft, prevTop,
                                        $element.width(), $element.height(),
                                        0, 0,
                                        $element.width(), $element.height());

    return $(previewCanvas).css({ border:'1px solid black' });
}