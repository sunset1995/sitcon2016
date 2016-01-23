require('dom.js');
require('zenscroll.js');

addEvent(Q('#guide-index-arrow img'), 'click', function() {
    zenscroll.to(Q('#page-home .page-content'));
});
