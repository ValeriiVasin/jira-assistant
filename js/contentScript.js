// here will be content script of the plugin

;(function ($) {
    'use strict';

    // title of the task
    var title = $('.issue-header-content').find('p').text();

    if (!title) {
        return;
    }

    /**
     * @todo Research, how we could normally insert our group into the page
     */
    function createCopyButton() {
        var copyButton = $('<a />', {
                href: '#',
                title: 'Copy task title into the clipboard',
                html: '<span class="icon copy-icon"></span><span class="trigger-text"> Copy Task Title</span>',
                'class': 'toolbar-trigger'
            }),

            toolbarItem = $('<li />', { 'class': 'toolbar-item toolbar-item-copy' }).append(copyButton),

            copiedItem = $('<span />', {
                    text: 'copied',
                    'class': 'toolbar-item-copy-message'
                })
                .appendTo(toolbarItem),

            toolbarGroup = $('<ul />', { 'class': 'toolbar-group' }).append(toolbarItem);

        copyButton.on('click', function (e) {
            copy(function () {
                copiedItem.fadeIn(70).delay(400).fadeOut(50);
            });
            e.preventDefault();
        });

        $('#opsbar-opsbar-transitions').after(toolbarGroup);
    }

    function copy(callback) {
        chrome.extension.sendMessage({ copy: title }, function (response) {
            if (response) {
                callback();
            }
        });
    }

    // contents scripts are inserted after DOM is ready
    // that's why we could use it right there
    createCopyButton();

    // messages listener
    chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {

        // background scriptslogger
        if ( request.log ) {
            console.log.apply(console, request.log);
        }
    });

}(jQuery));
