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


function DragonDrop(element, options){
	var this.settings 		= $.extend({}, this.defaults, options),
	this.$el 			= $(element),
	this.$menuElement 	= $('#' + this.$el.data('dropdown') );

	this.init();
}


DragonDrop.prototype = {
	defaults : {	
		action		: 'click', // The open action for the trigger
		triggerEl	: '[data-dropdown]', // The trigger element
		openClass	: 'is-open',
		afterLoad	: function(){}, // Triggers when plugin has loaded
		beforeShow	: function(){}, // Triggers before submenu is shown
		afterShow	: function(){}, // Triggers after submenu is shown
		beforeHide	: function(){}, // Triggers before submenu is hidden
		afterHide	: function(){} // Triggers before submenu is hidden
	},

	init : function(){
		var plugin = this;
		plugin.$el.addClass('dragonDrop');
		plugin.$menuElement.addClass('dragonDrop-submenu');

		// Open on click
		plugin.$el.on(plugin.settings.action, function(){
			// Close click menus if clicked again
			if(plugin.settings.action == 'click' && plugin.$el.hasClass(plugin.settings.openClass)){
				plugin.settings.beforeHide.call(this);
				plugin.$el.removeClass(plugin.settings.openClass);
				plugin.$menuElement.removeClass(plugin.settings.openClass);
				plugin.settings.afterHide.call(this);
				return false;
			}

			// Hide ALL open menus
			plugin.settings.beforeHide.call(this);
			$('.dragonDrop').removeClass(plugin.settings.openClass);  // should find a better way to do this
			$('.dragonDrop-submenu').removeClass(plugin.settings.openClass);
			plugin.settings.afterHide.call(this);

			// Open this menu
			plugin.settings.beforeShow.call(this);
			plugin.$el.addClass(plugin.settings.openClass);
			plugin.$menuElement.addClass(plugin.settings.openClass);
			plugin.settings.afterShow.call(this);

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
				}
			}


			(function ($) {
				'use strict';

				$.fn.dragonDrop = function(method) {
					var methods = {

						init : function(options) {	
							return this.each(function() {
						// var $el = $(this).addClass('dragonDrop'),
						// settings = $.extend({}, $.fn.dragonDrop.defaults, options),
						// $menuElement = $('#' + $el.data('dropdown') );
						// $menuElement.addClass('dragonDrop-submenu');

					// // Open on click
					// $el.on(settings.action,  $el, function(){
					// 	// Close click menus if clicked again
					// 	if(settings.action == 'click' && $el.hasClass(settings.openClass)){
					// 		settings.beforeHide.call(this);
					// 		$el.removeClass(settings.openClass);
					// 		$menuElement.removeClass(settings.openClass);
					// 		settings.afterHide.call(this);
					// 		return false;
					// 	}

					// 	// Hide ALL open menus
					// 	settings.beforeHide.call(this);
					// 	$('.dragonDrop').removeClass(settings.openClass);
					// 	$('.dragonDrop-submenu').removeClass(settings.openClass);
					// 	settings.afterHide.call(this);

					// 	// Open this menu
					// 	settings.beforeShow.call(this);
					// 	$el.addClass(settings.openClass);
					// 	$menuElement.addClass(settings.openClass);

					// 	settings.afterShow.call(this);

					// 	return false;
					// });

					// // Close if outside click
					// $(document).on('click', function(){
					// 	settings.beforeHide.call(this);
					// 	$('.dragonDrop').removeClass(settings.openClass);
					// 	$menuElement.removeClass(settings.openClass);
					// 	settings.afterHide.call(this);
					// });

					// // If hover
					// if(settings.action == 'mouseenter'){
					// 	$el.on('mouseleave', function(){
					// 		settings.beforeHide.call(this);
					// 		$('.dragonDrop').removeClass(settings.openClass);
					// 		$menuElement.removeClass(settings.openClass);
					// 		settings.afterHide.call(this);
					// 	});
					// }

					// settings.afterLoad.call(this);
				});
},

keepOnCanvas : function(){ 
	var _plugin = this,
					_left = _plugin.bubbleElement.offset().left, // where the righthand side of the bubble is
					_wwidth = $window.width();

					_plugin.bubbleElement
					.css('right', 'auto')
					.css('white-space', 'inherit');
					// uhoh, we have overhang on the rhs
					if( _left + _plugin.bubbleElement.outerWidth() > _wwidth ){

						_plugin.bubbleElement
						.css('right', _plugin.bubbleElement.offset().left -  _wwidth )
						.css('white-space' , 'normal');
					}
					//seriously!? on the left hand side too? ah geez, that's just GREAT...
					if( _left < 0 ){
						_plugin.bubbleElement
						.css( 'left',  ( _wwidth + _left ) * -1  )
						.css( 'white-space' , 'normal' ); 
					};

					_plugin.positionBubble();

				}//if

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
