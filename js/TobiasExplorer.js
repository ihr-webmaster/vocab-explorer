/*
 * BBIH Vocabulary as a HTML tree view
 * TOBIAS Project, IHR Digital, 2016-07
 */
window.addEvent('domready', function(){
    var synSelector = '.usedFor, .relatedTerm, .usedFor-multi';
    $(synSelector).hide();

    // Setup toggle function for button click and keypress
    $('#toggleSyns').click(function() {
        $(synSelector).toggle();
    });
    $(document).keypress(function(event) {
      if (event.keyCode == 116)  // Key press 't'
        $(synSelector).toggle();
    });

    // Initialise the tree
    // $.jstree.defaults.core.themes.variant = "large";
    $('#tobias-jsTree').jstree({
      'core': {
        'data' : {
          'url' : 'tobias-jsTree.html',  // Get the <ul> from this location.
        },
      },
      'types' : {
        'default' : {
          'icon' : '',
        },
        'usedFor' : {
          'icon' : 'glyphicon glyphicon-ok',
        },
      },
      'plugins' : [ 'types' ],
    });
});