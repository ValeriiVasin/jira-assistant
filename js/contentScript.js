// here will be content script of the plugin

;(function () {
    'use strict';

    // title of the task
    var title = document.querySelector('.issue-header-content p').innerText;

    if ( !title ) {
        return;
    }

    /**
     * @todo Research, how we could normally insert our group into the page
     */
    function createCopyButton() {
        var copyButton = document.createElement('a'),
            toolbarItem = document.createElement('li'),
            copiedItem = document.createElement('span'),
            toolbarGroup = document.createElement('ul'),
            lastToolbarGroup = document.getElementById('opsbar-opsbar-transitions');

        copyButton.href = 'javascript:void(0);';
        copyButton.title = 'Copy task title into the clipboard';
        copyButton.innerHTML = '<span class="icon copy-icon"></span><span class="trigger-text"> Copy Task Title</span>';
        copyButton.className = 'toolbar-trigger';

        toolbarItem.className = 'toolbar-item toolbar-item-copy';
        toolbarItem.appendChild( copyButton );

        copiedItem.innerText = 'copied';
        copiedItem.className = 'toolbar-item-copy-message';

        toolbarItem.appendChild( copiedItem );

        toolbarGroup.className = 'toolbar-group';
        toolbarGroup.appendChild( toolbarItem );

        copyButton.addEventListener('click', function () {
            copyToClipboard(function () {
                copiedItem.classList.add('toolbar-item-copy-message__visible');
                setTimeout(function () {
                    copiedItem.classList.remove('toolbar-item-copy-message__visible');
                }, 450);
            });
        });

        // insert created toolbar after last one
        lastToolbarGroup.parentNode
            .insertBefore(toolbarGroup, lastToolbarGroup.nextSibling);
    }

    function copyToClipboard(callback) {
        chrome.extension.sendMessage({ copy: title }, function (response) {
            if ( response ) {
                callback();
            }
        });
    }

    // contents scripts are inserted after DOM is ready
    // that's why we could use it right there
    createCopyButton();
}());
