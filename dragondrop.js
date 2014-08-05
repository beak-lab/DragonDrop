/*
 * Dragondrop v0.0.0
 * Based on http://dev7studios.com/dropit
 *
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

/* global jQuery, $, define, console */


'use strict';

(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module depending on jQuery.
		define(['jquery'], factory);
	} else {
		// No AMD. Register plugin with global jQuery object.
		factory(jQuery);
	}
}(function ($) {
	$.fn.dragonDrop = function(options) {
		return this.each(function() {
			new DragonDrop( this, options );
		});
	};
}));


function DragonDrop(element, options){
	this.settings 		= $.extend({}, this.defaults, options);
	this.$trigger 			= $(element);
	this.$menuElement 	= $('#' + this.$trigger.data('dropdown') );
	
	this.init();
}


DragonDrop.prototype = {
	defaults : {	
		action		: 'click', // The open action for the trigger
		openClass	: 'is-open',
		afterLoad	: function(){}, // Triggers when plugin has loaded
		beforeShow	: function(){}, // Triggers before submenu is shown
		afterShow	: function(){}, // Triggers after submenu is shown
		beforeHide	: function(){}, // Triggers before submenu is hidden
		afterHide	: function(){}, // Triggers before submenu is hidden
		debug		: false
	},

	init : function(){
		var plugin = this;
		this.$window = $(window);
		plugin.$trigger.addClass('dragonDrop');
		plugin.$menuElement.addClass('dragonDrop-submenu');
		// add click listeners
		plugin.listen();
	},

	listen : function(){
		var plugin = this;
		
		// Open on click
		plugin.$trigger.on(plugin.settings.action, plugin.$trigger, function(e){
			e.stopPropagation();
			// Close click menus if clicked again
			if(plugin.settings.action === 'click' && plugin.$trigger.hasClass(plugin.settings.openClass)){
				plugin.close();
			}else{
				plugin.open();
			}
		});

		// Close if outside click
		$(document).off('click.dragonDrop')
			.on('click.dragonDrop', function(){
				plugin.closeAll();
			});

		// If hover
		if(plugin.settings.action === 'mouseenter'){
			plugin.$trigger.on('mouseleave', function(){
				plugin.close();
			});
		}

		plugin.settings.afterLoad.call(this);
	},

	open: function(){
		this.log('opening');
		// Open this menu
		var plugin = this;
		plugin.settings.beforeShow.call(this);
		plugin.$trigger.addClass(plugin.settings.openClass);
		plugin.$menuElement.addClass(plugin.settings.openClass);
		plugin.position();
		plugin.settings.afterShow.call(this);
	},

	close: function(){
		this.log('closing');
		var plugin = this;
		plugin.settings.beforeHide.call(this);
		plugin.$trigger.removeClass(plugin.settings.openClass);
		plugin.$menuElement.removeClass(plugin.settings.openClass);
		plugin.settings.afterHide.call(this);
	},

	closeAll: function(){
		// Hide ALL open menus
		this.log('closing ALL');
		var plugin = this;
		plugin.settings.beforeHide.call(this);
		$('.dragonDrop').removeClass(plugin.settings.openClass);  // should find a better way to do this
		$('.dragonDrop-submenu').removeClass(plugin.settings.openClass);
		plugin.settings.afterHide.call(this);
	},

	position : function(){ 

		var plugin 		= this,
		triggerOff 		= plugin.$trigger.offset(),
		triggerPos 		= plugin.$trigger.position(),
		menuWidth		= plugin.$menuElement.outerWidth();

		plugin.log(plugin.$window.width());

		this.$menuElement.css({
			top: triggerPos.top + plugin.$trigger.outerHeight(),
		});
		// if putting the menu below the trigger would cause an overhang
		if( triggerOff.left + menuWidth > plugin.$window.width() ){
			plugin.log('overhang detected!'); 
			var overhang = triggerOff.left + menuWidth - plugin.$window.width();

			this.$menuElement.css({
				left: triggerPos.left - overhang
			});

		}else{
			this.$menuElement.css({
				left: triggerPos.left
			});
		}

	},
	log: function(s){
		if (this.settings.debug) {
			console.log(s);
		}
	}
};