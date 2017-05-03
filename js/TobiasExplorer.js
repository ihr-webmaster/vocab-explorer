/*
 * BBIH Vocabulary as a HTML tree view
 * TOBIAS Project, IHR Digital, 2017-05
 */

// The synonymn span selector and state variable for visibility
var synSelector = '.usedFor, .relatedTerm, .usedFor-multi';
var synVisible = false;

window.addEvent('domready', function(){
    // Initialise the tree and setup handlers
    $('#tobias-jsTree')
    // As nodes are opened, obey the synonymn visibility state
    // for the entire tree
    .on('before_open.jstree', function (e, data) {
      if (synVisible == false) {
        $(this).find(synSelector).hide();
      } else {
        $(this).find(synSelector).show();
      }

      // Add special multiline class to items with synonymns
      // .jstree-anchor-multiline
      // DO THIS TOMORROW...

    })
    // When nodes are selected, trigger event of the same name on #SKOSConceptMain
    .on('select_node.jstree', function (e, data) {
      $('#skosConceptMain').trigger('select_node.jstree', [ data ]);
    })
    // Create/init the tree
    .jstree({
      'core': {
        'data' : {
          'url' : 'data/bbih-vocabulary-sample.html',  // Get the tree list from here.
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
      // Customise some types of nodes for icons and keep opened state
      'plugins' : [ 'types', 'state' ],
    });


    // Bind jstree event of the same name. Events are triggered from
    // the tree and we get the same event/data params.
    $('#skosConceptMain').on('select_node.jstree', function (e, data) {
      console.log('SKOS select node');
      console.log(data.node);
      $item = data;
      // $('[data-var="concept"]').val();
    });


    // Keep the SKOS markup box and toggle button on screen as you scroll down.
    var $window = $(window),
        $stickyConcept = $('#skosConceptMain'),
        stickyConceptTop = $stickyConcept.offset().top,
        $stickyButton = $('#skosButtonMain'),
        stickyButtonTop = $stickyButton.offset().top;
    $window.scroll(function() {
      $stickyConcept.toggleClass('sticky', $window.scrollTop() > stickyConceptTop);
      $stickyButton.toggleClass('sticky', $window.scrollTop() > stickyButtonTop);
    });

    // Setup toggle synonymns function for button click and keypress
    $('#toggleSyns').click(function() {
      $(synSelector).toggle();
      synVisible = !synVisible;
    });
    $(document).keypress(function(event) {
      console.log(event);
      if (event.charCode == 116)  { // Key press 't'
        $(synSelector).toggle();
        synVisible = !synVisible;
      }
    });

});
