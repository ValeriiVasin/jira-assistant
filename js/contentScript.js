// here will be content script of the plugin

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
        toolbarGroup = $('<ul />', { 'class': 'toolbar-group' }).append(toolbarItem);

    copyButton.on('click', function (e) {
        // handler for the click
        e.preventDefault();
    });

    $('#opsbar-opsbar-transitions').after(toolbarGroup);
}

// contents scripts are inserted after DOM is ready
// that's why we could use it right there
createCopyButton();
