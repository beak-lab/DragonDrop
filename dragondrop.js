/*
 * Dragondrop v0.0.0
 * Based on http://dev7studios.com/dropit
 *
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

;(function (f) {
if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module depending on jQuery.
    define(['jquery'], f);
} else {
    // No AMD. Register plugin with global jQuery object.
    f(jQuery);
}
}(function ($) {
    $.fn.dragonDrop = function(method) {

        var methods = {

            init : function(options) {
                this.dragonDrop.settings = $.extend({}, this.dragonDrop.defaults, options);
                return this.each(function() {
                    var $el = $(this).addClass('dragonDrop'),
                        el = this,
                        settings = $.fn.dragonDrop.settings;
                        $menuElement = $el.find(settings.submenuEl).addClass('dragonDrop-submenu').hide(),
                        $triggerElement = $el.find(settings.triggerEl).addClass('dragonDrop-trigger');


                    // Open on click
                    $el.on(settings.action,  $triggerElement, function(){
                        // Close click menus if clicked again
                           

                        if(settings.action == 'click' && $el.hasClass('dragonDrop-open')){
                            settings.beforeHide.call(this);
                            $el.removeClass('dragonDrop-open');
                            $menuElement.hide();
                            settings.afterHide.call(this);
                            return false;
                        }

                        // Hide ALL open menus
                        settings.beforeHide.call(this);
                        $('.dragonDrop-open').removeClass('dragonDrop-open').find('.dragonDrop-submenu').hide();
                        settings.afterHide.call(this);

                        // Open this menu
                        settings.beforeShow.call(this);
                        $el.addClass('dragonDrop-open');
                        $menuElement.show();
                        settings.afterShow.call(this);

                        return false;
                    });

                    // Close if outside click
                    $(document).on('click', function(){
                        settings.beforeHide.call(this);
                        $('.dragonDrop-open').removeClass('dragonDrop-open')
                        $menuElement.hide();
                        settings.afterHide.call(this);
                    });

                    // If hover
                    if(settings.action == 'mouseenter'){
                        $el.on('mouseleave', function(){
                            console.log( 'mouseleave' );
                            settings.beforeHide.call(this);
                            $el.removeClass('dragonDrop-open');
                            $menuElement.hide();
                            settings.afterHide.call(this);
                        });
                    }

                    settings.afterLoad.call(this);
                });
            }

        };

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error( 'Method "' +  method + '" does not exist in dragonDrop plugin!');
        }

    };

    $.fn.dragonDrop.defaults = {
        action: 'click', // The open action for the trigger
        submenuEl: '[data-menu-content]', // The submenu element
        triggerEl: '[data-menu-trigger]', // The trigger element
        afterLoad: function(){}, // Triggers when plugin has loaded
        beforeShow: function(){}, // Triggers before submenu is shown
        afterShow: function(){}, // Triggers after submenu is shown
        beforeHide: function(){}, // Triggers before submenu is hidden
        afterHide: function(){} // Triggers before submenu is hidden
    };

    $.fn.dragonDrop.settings = {};

}));
