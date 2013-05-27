// background script of the plugin

;(function () {
    'use strict';

    /**
     * Copy text into the clipboard using Google Chrome extension API
     * @param {String} text Text to copy
     */
    function copyToClipboard( text ){
        var copyDiv = document.createElement('div'),
            status;

        copyDiv.contentEditable = true;
        document.body.appendChild(copyDiv);
        copyDiv.innerHTML = text;
        copyDiv.unselectable = 'off';
        copyDiv.focus();
        document.execCommand('selectAll');
        status = document.execCommand('copy', false, null);
        document.body.removeChild(copyDiv);

        return status;
    }

    chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
        if ( request.copy ) {
            sendResponse(
                copyToClipboard( request.copy )
            );
        }
    });

}(jQuery));
