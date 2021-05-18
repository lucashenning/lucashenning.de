var captionLength = 0;
var caption = '';

$(document).ready(function() {
	// navigation click actions	
	$('.scroll-link').on('click', function(event){
		event.preventDefault();
		var sectionID = $(this).attr("data-id");
		scrollToID('#' + sectionID, 1000);
	});
	// scroll to top action
	$('.scroll-top').on('click', function(event) {
		event.preventDefault();
		$('html, body').animate({scrollTop:0}, 'slow'); 	
		$('.navbar').each().removeClass("active");
	});
	// mobile nav toggle
	$('#nav-toggle').on('click', function (event) {
		event.preventDefault();
		$('#main-nav').toggleClass("open");
	});
	
	
	// parallax
	if( ! /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|MSIE|Opera Mini/i.test(navigator.userAgent) && !isIE() ) {
		$.stellar({
		  // Refreshes parallax content on window load and resize
		  responsive: true,
		  horizontalScrolling: false,
		  verticalScrolling: true
		});
	}
	
	// send form
	var options = {
		target:    '#result',
		dataType:  'json',        // 'xml', 'script', or 'json' (expected server response type) 
        //clearForm: true,     // clear all form fields after successful submit 
        //resetForm: true,        // reset the form after successful submit 
		beforeSubmit: function() {
			$('#submit_btn').button('loading');
			$("#contact_form :input").attr("disabled", true);
			$('#result').hide();
			$('#result').removeClass();
			return true;
		},
		success: function(data) {
			$('#result').html = data.result;
			if(data.hasError) {
				$('#result').addClass("alert alert-warning");
			} else {
				$('#result').addClass("alert alert-success");
				$('#contact_form').fadeOut('slow');
			}
			$('#submit_btn').button('reset');
			$("#contact_form :input").attr("disabled", false);
			$('#result').html("Thanks for reaching out. I'll get back to you shortly.");
			$('#result').fadeIn('slow');
		},
		error: function(data) {
			$('#result').html('There was an issue with the form submission. Please Try again.');
			$('#result').addClass("alert alert-danger");
			$('#result').fadeIn('slow');
			$('#submit_btn').button('reset');
			$("#contact_form :input").attr("disabled", false);
		},
	};
	
	$('#contact_form').submit(function() { 
        $(this).ajaxSubmit(options); 
        return false; 
    });
	
	
	// setInterval ('cursorAnimation()', 800);
	// captionEl = $('#caption');
	// caption = "echo emoclew | rev";
	// type(function() {
	// 	caption = "echo &ltscript&gtwindow.scrollBy(0, 100); // scroll down&lt/scriptf&gt";
	// 	type(function() {
	// 		caption = "for real, please scroll down ...";
	// 		type(function() {});
	// 	});
	// });
	
	if(isIE()) {
		fixScrollBuginIE();
	}
});


function scrollHomeText() {
	$('#home-text').removeAttr('data-stellar-ratio');
	if ($('#home').height() > 500) {
		$('#home-text').attr('data-stellar-ratio', '0.55');
	}
	if ($('#home').height() > 750) {
		$('#home-text').attr('data-stellar-ratio', '0.5');
	}
	if ($('#home').height() > 800) {
		$('#home-text').attr('data-stellar-ratio', '0.4');
	}
	if ($('#home').height() > 850) {
		$('#home-text').attr('data-stellar-ratio', '0.35');
	}
	if ($('#home').height() > 900) {
		$('#home-text').attr('data-stellar-ratio', '0.3');
	}
	$.stellar({
		  responsive: true,
		  horizontalScrolling: false,
		  verticalScrolling: true
	});
}

// scroll function
function scrollToID(id, speed){
	var offSet = 50;
	var targetOffset = $(id).offset().top - offSet;
	var mainNav = $('#main-nav');
	$('html,body').animate({scrollTop:targetOffset}, speed);
	if (mainNav.hasClass("open")) {
		mainNav.css("height", "1px").removeClass("in").addClass("collapse");
		mainNav.removeClass("open");
	}
}



if (typeof console === "undefined") {
    console = {
        log: function() { }
    };
}

 // Google Maps
function initialize() {
	var map_canvas = document.getElementById('googlemaps');
	
	var gstyle = [{"featureType":"administrative","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"simplified"}]},{"featureType":"road","stylers":[{"visibility":"simplified"}]},{"featureType":"water","stylers":[{"visibility":"simplified"}]},{"featureType":"transit","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"visibility":"off"}]},{"featureType":"road.local","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"road.arterial","stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"color":"#5f94ff"},{"lightness":26},{"gamma":5.86}]},{},{"featureType":"road.highway","stylers":[{"weight":0.6},{"saturation":-85},{"lightness":61}]},{"featureType":"road"},{},{"featureType":"landscape","stylers":[{"hue":"#0066ff"},{"saturation":74},{"lightness":100}]}];
	
	var map_options = {
	  // @25.7909901,-80.1950131 = MIAMI
	  center: new google.maps.LatLng(25.7909901,-80.1950131),
	  styles: gstyle,
	  zoom: 12,
	  mapTypeId: google.maps.MapTypeId.ROADMAP,
	  disableDefaultUI: true,
	  disableDoubleClickZoom: true,
	  draggable: false,
	  scrollwheel: false,
		mapTypeControl: false,
		mapTypeControlOptions: {
			style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
			position: google.maps.ControlPosition.BOTTOM_CENTER
		},
		panControl: true,
		panControlOptions: {
			position: google.maps.ControlPosition.RIGHT_BOTTOM
		},
		zoomControl: true,
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.SMALL,
			position: google.maps.ControlPosition.LEFT_BOTTOM
		},
		scaleControl: false,
		streetViewControl: false,
		streetViewControlOptions: {
			position: google.maps.ControlPosition.BOTTOM_CENTER
		}
	}
	var map = new google.maps.Map(map_canvas, map_options)
	
	var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<div id="bodyContent">'+
      '<b>Lucas Henning</b><br>' +
      '1600 NE 1st Ave<br>'+
      'Miami, FL 33132'+
      '</div>'+
      '</div>';
	var infowindow = new google.maps.InfoWindow({
		content: contentString
	});
	
	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(25.7909901,-80.1950131),
		map: map,
		title:"Miami, FL"
	});
	
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(map,marker);
	});

	
}
google.maps.event.addDomListener(window, 'load', initialize);

function type(callback) {
    captionEl.html(caption.substr(0, captionLength++));
    if(captionLength < caption.length+1) {
        setTimeout(function () {
			type(callback);
		}, 50);
    } else {
		captionLength = caption.length;
		setTimeout(function () {
			erase(callback);
		}, 2000);
    }
}

function erase(callback) {
    captionEl.html(caption.substr(0, captionLength--));
    if(captionLength >= 0) {
		setTimeout(function () {
			erase(callback);
		}, 100);
    } else {
		callback()
	}
}

function cursorAnimation() {
    $('#cursor').animate({
        opacity: 0
    }, 'fast', 'swing').animate({
        opacity: 1
    }, 'fast', 'swing');
}

function isIE() { return ((navigator.appName == 'Microsoft Internet Explorer') || ((navigator.appName == 'Netscape') && (new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null))); }

function fixScrollBuginIE() {
	$('body').on("mousewheel", function () {
		event.preventDefault();

		var wheelDelta = event.wheelDelta;

		var currentScrollPosition = window.pageYOffset;
		window.scrollTo(0, currentScrollPosition - wheelDelta);
	});

	$('body').keydown(function (e) {
		e.preventDefault(); // prevent the default action (scroll / move caret)
		var currentScrollPosition = window.pageYOffset;

		switch (e.which) {

			case 38: // up
				window.scrollTo(0, currentScrollPosition - 120);
				break;

			case 40: // down
				window.scrollTo(0, currentScrollPosition + 120);
				break;

			default: return; // exit this handler for other keys
		} 
	});
}
