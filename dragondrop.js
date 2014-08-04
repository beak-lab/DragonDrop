/*
 * Dragondrop v0.0.0
 * Based on http://dev7studios.com/dropit
 *
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */


(function (f) {
	/* global jQuery, define */
	'use strict';
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module depending on jQuery.
		define(['jquery'], f);
	} else {
		// No AMD. Register plugin with global jQuery object.
		f(jQuery);
	}
}

(function ($) {
	'use strict';

	$.fn.dragonDrop = function(method) {
		var methods = {

			init : function(options) {	
				return this.each(function() {
						var $el = $(this).addClass('dragonDrop'),
						settings = $.extend({}, $.fn.dragonDrop.defaults, options),
						$menuElement = $('#' + $el.data('dropdown') );
						$menuElement.addClass('dragonDrop-submenu');

					// Open on click
					$el.on(settings.action,  $el, function(){
						// Close click menus if clicked again
						if(settings.action == 'click' && $el.hasClass(settings.openClass)){
							settings.beforeHide.call(this);
							$el.removeClass(settings.openClass);
							$menuElement.removeClass(settings.openClass);
							settings.afterHide.call(this);
							return false;
						}

						// Hide ALL open menus
						settings.beforeHide.call(this);
						$('.dragonDrop').removeClass(settings.openClass);
						$('.dragonDrop-submenu').removeClass(settings.openClass);
						settings.afterHide.call(this);

						// Open this menu
						settings.beforeShow.call(this);
						$el.addClass(settings.openClass);
						$menuElement.addClass(settings.openClass);

						settings.afterShow.call(this);

						return false;
					});

					// Close if outside click
					$(document).on('click', function(){
						settings.beforeHide.call(this);
						$('.dragonDrop').removeClass(settings.openClass);
						$menuElement.removeClass(settings.openClass);
						settings.afterHide.call(this);
					});

					// If hover
					if(settings.action == 'mouseenter'){
						$el.on('mouseleave', function(){
							settings.beforeHide.call(this);
							$('.dragonDrop').removeClass(settings.openClass);
							$menuElement.removeClass(settings.openClass);
							settings.afterHide.call(this);
						});
					}

					settings.afterLoad.call(this);
				});
			},

			// register: function(){
			// 	$(window).trigger('dragonDropRegister' [this.$el]);
			// }

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
		action		: 'click', // The open action for the trigger
		triggerEl	: '[data-dropdown]', // The trigger element
		openClass	: 'is-open',
		afterLoad	: function(){}, // Triggers when plugin has loaded
		beforeShow	: function(){}, // Triggers before submenu is shown
		afterShow	: function(){}, // Triggers after submenu is shown
		beforeHide	: function(){}, // Triggers before submenu is hidden
		afterHide	: function(){} // Triggers before submenu is hidden
	};


}));
