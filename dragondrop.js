/*
 * Dragondrop v1.2.6
 * Based on http://dev7studios.com/dropit
 *
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

/* global jQuery, $, define, console */


'use strict';

(function(factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module depending on jQuery.
        define(['jquery'], factory);
    } else {
        // No AMD. Register plugin with global jQuery object.
        factory(jQuery);
    }
}(function($) {
    $.fn.dragonDrop = function(options) {
        return this.each(function() {
            if (!$.data(this, 'dragonDrop')) {
                $.data(this, 'dragonDrop', new DragonDrop(this, options));
            }
        });
    };
}));

function DragonDrop(element, options) {
    this.settings = $.extend({}, this.defaults, options);
    this.element = element;
    this.init();
}

DragonDrop.prototype = {
    defaults: {
        context: null, //optionally pass in a context to work with oyher than the whole dom
        action: 'click', // The open action for the trigger
        openClass: 'is-open',
        position: 'below',
        afterLoad: function() {}, // Triggers when plugin has loaded
        beforeShow: function() {}, // Triggers before submenu is shown
        afterShow: function() {}, // Triggers after submenu is shown
        beforeHide: function() {}, // Triggers before submenu is hidden
        afterHide: function() {}, // Triggers before submenu is hidden
        menuClicked: function() {},
        debug: false
    },

    init: function() {
        var plugin = this;

        if (!plugin.settings.context) plugin.settings.context = $('body');

        plugin.$trigger = $(plugin.element);
        plugin.$menuElement = plugin.settings.context.find('#' + plugin.$trigger.data('dropdown'));
        plugin.$trigger.addClass('dragonDrop');
        plugin.$menuElement.addClass('dragonDrop-submenu');
        // add click listeners
        plugin.listen();
    },

    listen: function() {
        var plugin = this;

        // Open on click
        plugin.$trigger.on(plugin.settings.action, plugin.$trigger, function(e) {
            e.stopPropagation();
            // Close click menus if clicked again
            if (plugin.settings.action === 'click' && plugin.$trigger.hasClass(plugin.settings.openClass)) {
                plugin.log('closing because submenu is open on click of trigger');
                plugin.close();
            } else {
                plugin.closeAll(); // close all open dragondrops before opening the new one?
                plugin.open();
            }
        });

        plugin.$menuElement.off('click.dragonDrop')
            .on('click.dragonDrop', plugin.$menuElement, function(e) {
                plugin.settings.menuClicked.call(plugin.$trigger, plugin.$menuElement, e);
                plugin.close();
                // plugin.log(e.target);
                //plugin.log(plugin.$trigger);
            });

        // Close if outside click
        $(document).off('click.dragonDrop')
            .on('click.dragonDrop', function() {
                plugin.closeAll();
            });

        // If hover
        if (plugin.settings.action === 'mouseenter') {
            plugin.$trigger.on('mouseleave', function() {
                plugin.close();
            });
        }

        plugin.settings.afterLoad.call(this);
    },

    open: function() {
        this.log('opening');
        // Open this menu
        var plugin = this;
        plugin.settings.beforeShow.call(this);
        plugin.$trigger.addClass(plugin.settings.openClass);
        plugin.$menuElement.addClass(plugin.settings.openClass);
        plugin.position();
        plugin.settings.afterShow.call(this);

    },

    close: function() {
        this.log('closing');
        var plugin = this;
        plugin.settings.beforeHide.call(this);
        plugin.$trigger.removeClass(plugin.settings.openClass);
        plugin.$menuElement.removeClass(plugin.settings.openClass);
        plugin.settings.afterHide.call(this);
    },

    closeAll: function() {
        // Hide ALL open menus
        this.log('closing ALL');
        var plugin = this;
        plugin.settings.beforeHide.call(this);
        $('.dragonDrop').removeClass(plugin.settings.openClass); // should find a better way to do this
        $('.dragonDrop-submenu').removeClass(plugin.settings.openClass);
        plugin.settings.afterHide.call(this);
    },

    position: function() {

        var plugin = this,
            $window = $(window),
            triggerOff = plugin.$trigger.offset(),
            menuWidth = plugin.$menuElement.outerWidth();

        // if putting the menu below the trigger would cause an overhang
        if (triggerOff.left + menuWidth > $window.width()) {
            plugin.log('overhang detected!');
            var overhang = triggerOff.left + menuWidth - $window.width();

            plugin.$menuElement.offset({
                left: triggerOff.left - overhang,
                top: triggerOff.top,
            });

        } else {
            plugin.$menuElement.offset({
                left: triggerOff.left,
                top: triggerOff.top,
            });
        }

        switch (plugin.settings.position) {
            case 'below':
                plugin.$menuElement.offset({
                    top: plugin.$menuElement.offset().top + plugin.$trigger.outerHeight()
                });
                break;
            case 'rightOf':
                plugin.$menuElement.offset({
                    left: plugin.$menuElement.offset().left + plugin.$trigger.outerWidth()
                });
                break;
            case 'leftOf':
                plugin.$menuElement.offset({
                    left: plugin.$menuElement.offset().left - plugin.$menuElement.outerWidth()
                });
                break;
            case 'over':
                plugin.$menuElement.offset({
                    top: plugin.$menuElement.offset().top - (plugin.$menuElement.outerHeight() / 2)
                });
                break;
        }

    },

    log: function(s) {
        if (this.settings.debug) {
            console.log(s);
        }
    }
};
