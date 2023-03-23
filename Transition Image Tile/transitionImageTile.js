
/* (c):cachebust:true */
define('nord/layout/transitionImageTile',
	[
		'jquery',
		'modernizr'
	],
	function ($, Modernizr) {
		

		var
			settings = {
				duration: '400ms', // Setting static animation speed. This should match @duration in transition-image-tile.less.
				easing: 'linear'
			},
			dictionary = {}; // To be populated in the SetupTile function call since some values are dependent on knowing image size. This is here to establish an external reference.

		function findKey(key) {
			/* This will loop until it finds a match between the key and one of the entries in dictionary, then pass that entry back as an object. */
			var obj = {};
			$.each(dictionary, function(i,v) {
				if (key.indexOf(i) >= 0) {
					obj = dictionary[i];
					return false;
				}
			});
			return obj;
		}

		function init() {
			/* Find and apply animations to all that have this class name. */
			$('.type-transition').each(function() {
				new SetupTile($(this));
			});
		}

		var SetupTile = function(container) {
			var
				$container = container,
				$overlay = $container.find('.overlay-image'),
				$storycopy = $container.parent().find('.story-copy a'),
				classes = $overlay.attr('class'),
				height = $overlay.outerHeight(true),
				width = $overlay.outerWidth(true),
				entry = {};

			dictionary = {
				/* This creates the rules for each animation associated with these class names. This is done for ease of adding more without writing a series of IF statements. */
				'transition-slide-up': {
					transition: {
						marginTop: -height
					}
				},
				'transition-slide-right': {
					transition: {
						marginLeft: width
					}
				},
				'transition-slide-down': {
					transition: {
						marginTop: height
					}
				},
				'transition-slide-left': {
					transition: {
						marginLeft: -width
					}
				},
				'transition-fade-out': {
					transition: {
						opacity: 0
					},
					easing: 'linear'
				}
			};

			entry = findKey(classes); // This will represent the entry that matches the class name in dictionary as an object

			$container.width(width).height(height); // Since Story Tiles don't normally have a fixed height and width, this is important to set here for overflow:hidden to display properly.

			function endAnimation() {
				$(this).off();
				$overlay.hide();
			}

			function runTransition() {
				/*jshint validthis:true */
				$(this).off('mouseenter, focus');
				if (Modernizr.csstransitions) {
					$overlay.css(entry.transition);
				} else {
					$overlay.stop().animate(entry.transition, settings.duration, settings.easing, function() { $overlay.trigger('transitionend'); });
				}
			}

			/* Adding two listeners for completion of animation so that transitions such as fade will no longer be blocker the user from interacting with the Story Tile. */
			$overlay.one('oTransitionEnd webkitTransitionEnd msTransitionEnd transitionend', endAnimation);
			/* Applying the proper animation to the current image. */
			$overlay.on('mouseenter', runTransition);
			$storycopy.on('focus', runTransition);
		};

		// self init
		init();
	}
);