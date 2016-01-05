;(function($) {
    'use strict';

    $.fn.bootstrapSelectList = function(options) {
        // No suitable elements found
        if ($(this).length === 0) {
            return $(this);
        }

        var opts = $.extend({}, $.fn.bootstrapSelectList.defaults, options || {});

        $(this).each(function(i) {
            var $this = $(this);

            // Set a reference id on the select and hide it
            $this.data('id', i).hide();

            // Get the select's options and texts
            var labels = [];
            var options = [];

            $this.find('option').each(function() {
                labels.push($(this).text());
                options.push($(this).val());
            });

            // Create the wrapper for the buttons
            var $wrapper = $('<div class="bootstrap-select-list"></div>').insertAfter($(this));

            // Add the buttons and bind them to the click event
            for (var count = 0; count < labels.length; count++) {
                var $button = $('<button class="btn btn-default bootstrap-select-list-item" data-select-id="'+i+'" data-value="'+options[count]+'">'+labels[count]+'</button>');

                $wrapper.append($button);

                $button.click(function() {
                    var selectId = $(this).data('select-id');
                    var value = $(this).data('value');

                    var $select = $this.filter(function(){
                        return $(this).data('id') == selectId;
                    });

                    if ($select.length) {
                        $select.val(value).trigger('change');

                        opts.onClick.call({}, $(this));
                    }
                });
            }
        });
    };

    // Default options
    $.fn.bootstrapSelectList.defaults = {
        onClick: function() { return true; }
    };
})(jQuery);