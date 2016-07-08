;(function () {

  'use strict';

  /*
   * jQuery accessible simple (non-modal) tooltip window, using ARIA
   * Website: http://a11y.nicolas-hoffmann.net/simple-tooltip/
   * License MIT: https://github.com/nico3333fr/jquery-accessible-simple-tooltip-aria/blob/master/LICENSE
   */

  function accessibleSimpleTooltipAria(options) {
    var element = $(this);
    options = options || element.data();
    var text = options.simpletooltipText || '';
    var prefix_class = typeof options.simpletooltipPrefixClass !== 'undefined' ? options.simpletooltipPrefixClass + '-' : '';
    var content_id = typeof options.simpletooltipContentId !== 'undefined' ? '#' + options.simpletooltipContentId : '';

    var index_lisible = Math.random().toString(32).slice(2, 12);

    element.attr({'aria-describedby': 'label_simpletooltip_' + index_lisible});

    element.wrap('<span class="' + prefix_class + 'simpletooltip_container"></span>' );

    var html = '<span class="js-simpletooltip ' + prefix_class + 'simpletooltip" id="label_simpletooltip_' + index_lisible + '" role="tooltip" aria-hidden="true">';

    if (text !== '') {
      html += '' + text + '';
    } else {
      var $contentId = $(content_id);
      if ( content_id !== '' && $contentId.length ) {
        html += $contentId.html();
      }
    }
    html += '</span>';

    $(html).insertAfter(element);
  }

  // Bind as a jQuery plugin
  $.fn.accessibleSimpleTooltipAria = accessibleSimpleTooltipAria;

  $(document).ready(function() {

    $('.js-simple-tooltip')
      .each(function () {
        // Call the function with this as the current tooltip
        accessibleSimpleTooltipAria.apply(this);
      });

    // events ------------------
    $('body')
      .on('mouseenter focusin', '.js-simple-tooltip', function (event) {
        var $this = $(this);
        var $tooltip_to_show = $('#' + $this.attr('aria-describedby'));
        $tooltip_to_show.attr( 'aria-hidden', 'false');
      })
      .on('mouseleave focusout', '.js-simple-tooltip', function (event) {
        var $this = $(this);
        var $tooltip_to_show = $('#' + $this.attr('aria-describedby'));
        $tooltip_to_show.attr( 'aria-hidden', 'true');
      })
      .on('keydown', '.js-simple-tooltip', function (event) {
        // close esc key

        var $this = $(this);
        var $tooltip_to_show = $('#' + $this.attr('aria-describedby'));

        if ( event.keyCode == 27 ) { // esc
          $tooltip_to_show.attr( 'aria-hidden', 'true');
        }
    });
  });

})();

