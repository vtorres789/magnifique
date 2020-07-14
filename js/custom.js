// set twitter text
function twitter_text(text) {
	text = text.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&\?\/.=]+/g, function (m) {
		return '<a href="' + m + '" target="_blank">' + m + '</a>';
	});
	// Usernames
	text = text.replace(/@[A-Za-z0-9_]+/g, function (u) {
		return '<a href="http://twitter.com/#!/' + u.replace(/^@/, '') + '" target="_blank">' + u + '</a>';
	});
	// Hashtags
	text = text.replace(/#[A-Za-z0-9_\-]+/g, function (u) {
		return '<a class="hashtags" href="http://twitter.com/#!/search?q=' + u.replace(/^#/, '%23') + '" target="_blank">' + u + '</a>';
	});
	
	return text;
}

var K = function () {
    var a = navigator.userAgent;
    return {
        ie: a.match(/MSIE\s([^;]*)/)
    }
}();
 
var twitter_date = function (a) {
    var b = new Date();
    var c = new Date(a);
    if (K.ie) {
        c = Date.parse(a.replace(/( \+)/, ' UTC$1'))
    }
    var d = b - c;
    var e = 1000,
        minute = e * 60,
        hour = minute * 60,
        day = hour * 24,
        week = day * 7;
    if (isNaN(d) || d < 0) {
        return ""
    }
    if (d < e * 7) {
        return "right now"
    }
    if (d < minute) {
        return Math.floor(d / e) + " seconds ago"
    }
    if (d < minute * 2) {
        return "about 1 minute ago"
    }
    if (d < hour) {
        return Math.floor(d / minute) + " minutes ago"
    }
    if (d < hour * 2) {
        return "about 1 hour ago"
    }
    if (d < day) {
        return Math.floor(d / hour) + " hours ago"
    }
    if (d > day && d < day * 2) {
        return "yesterday"
    }
    if (d < day * 365) {
        return Math.floor(d / day) + " days ago"
    } else {
        return "over a year ago"
    }
};


jQuery(document).ready(function(){
	$(":input[placeholder]").placeholder();
	
	//SUBMIT FORM
	jQuery.validator.addMethod(
		"math", 
		function(value, element, params) { 
			if (value=='')
				return false;
			return this.optional(element) || value == params[0] + params[1]; 
		},
		jQuery.format("Please enter the correct value for {0} + {1}")
	);
	$('#form_contact').validate({
		rules: {
			input_name: {
				minlength: 3,
				required: true
			},
			input_email: {
				required: true,
				email: true
			},
			input_subject: {
				minlength: 3,
				required: true
			},
			input_message: {
				minlength: 10,
				required: true
			},
			input_captcha: {
				math: [3, 4]
			}
		},
		submitHandler: function(form) {
			var a=$('#form_contact').serialize();
			$.ajax({
				type: "POST",
				url: "contact_process.php",
				data:a,
				complete:function(){
				},
				beforeSend: function() {
				
				},
				success: function(data){
					alert(data);
					$('#form_contact').find("input[type=text], textarea").val("");
				},
				error : function() {
				
				}
			});
			return false;
		}
	});
	
	/* Email Subscribe */
	$('#form_subscribe').validate({
		rules: {
			input_email_subscribe: {
				required: true,
				email: true
			}
		},
		submitHandler: function(form) {
			var a=$('#form_subscribe').serialize();
			$.ajax({
				type: "POST",
				url: "subscribe_process.php",
				data:a,
				complete:function(){
				},
				beforeSend: function() {
				
				},
				success: function(data){
					alert(data);
					$('#form_subscribe').find("input[type=text], textarea").val("");
				},
				error : function() {
				
				}
			});
			return false;
		}
	});
	

	
	  
	/* Question Answer */
	jQuery('.ul_questions>li .border-center-contain').click(function(){
		jQuery(this).find('.plus_minus_block').toggleClass('active');
		jQuery(this).parent().find('.answer').toggle();
		jQuery(this).parent().toggleClass('active');
		return false;
	});
	jQuery('.ul_questions .answer_title').click(function(){
		jQuery(this).parent().find('.border-center-contain').trigger('click');
	});
	
	/* Portfolio */
	jQuery('#portfolio_container').on('click','#og-grid>li .mask2 a.info2',function(){
		jQuery('.og-expanded').removeClass('og-expanded');;
		jQuery(this).parentsUntil('li').parent().addClass('og-expanded');
		return false;
	});
	
	jQuery('#portfolio_container').on('click','.og-close',function(){
		jQuery('.og-expanded').removeClass('og-expanded');	
		return false;
	});
	//PORTFOLIO AJAX
	$('.ul_portfolio_cat li').on('click',function() {
		href = $(this).find('a').attr('href');
		
		$.ajax({
			type: "GET",
			url: href,
			cache: false,
			beforeSend: function() {
				$('#portfolio_container').html('');
			},
			success: function(data){
				$('#portfolio_container').html(data);
				

			},
			error : function() {
			
			}
		});
		$('.ul_portfolio_cat').find('.active').removeClass('active');
		$(this).addClass('active');
		return false;
	});
	
	
	/* FOOTER SLIDER */
	$('.ul_our_client').carouFredSel({
				
				width:'100%',
				scroll: 1,
				prev: '.ul_our_client_pager .prev',
				next: '.ul_our_client_pager .next',
				auto: false ,
				items: {
					width: '100',
					visible: {
						min: 1,
						max: 4
					}
				} 
				
			});
			
	
	
	/* Team Popup */
	$('.div_team .div_skill').addClass('bounceIn');
	$('.div_team .div_skill').bind('oanimationend animationend webkitAnimationEnd', function() { 
	  $(this).removeClass('bounceIn');
	});
	$('.div_team .div_team_skill,.div_team .div_team_skill_last').bind('oanimationend animationend webkitAnimationEnd', function() { 
	  $(this).removeClass('animated fadeOutDown');
	});
	jQuery('.div_team .view .info').click(function(){
		
		$('.div_team').removeClass('team_popup');
		$('.div_team .div_skill').removeClass('bounceIn');
		$(this).parentsUntil('.div_team').parent().addClass('team_popup').find('.div_skill').addClass('bounceIn');
		return false;
	});
	jQuery('.team_close').click(function(){
		$('.div_team .div_team_skill,.div_team .div_team_skill_last').addClass('animated fadeOutDown');
		$('.div_team .div_skill').removeClass('bounceIn');
		setTimeout(function(){
			$('.div_team').removeClass('team_popup');
		}, 1000);
		return false;
	});
	
	/* Paralax */
	$('#paralax_1').parallax("50%",0.01);
	$('#paralax_2').parallax("50%", 0.01);
	$('#paralax_3').parallax("50%",0.01);
	
	
	/* TWITTER */
	$.getJSON('twitter/ajax/getFromTwitter.php',{})
	.done(function( json ) {
		$max_tweet = 5;
		$i = 0;
		$.each(json,function(){
			text = this.text;
			time = this.created_at;
			time = twitter_date(time);
			text = twitter_text(text);
			$('<div class="slide">').append('<p>'+text+'</p><span class="quote">'+ time +'</span>').appendTo('#twitter_update_list_container');
			$i++;
			if ($i==$max_tweet) return false;
		});
		$('#twitter_update_list_container').cycle({slides:'>div',autoHeight:'container'});
		
	})
	.fail(function( jqxhr, textStatus, error ) {
		var err = textStatus + ', ' + error;
		console.log( "Request Failed: " + err);
	})
	.always(function() { console.log( "complete" ); });
	
	
	/* HOME SLIDER */
	$( '#home_slider' ).on( 'cycle-before', function( event, opts ) {
		$(this).find('.title').removeClass('animated fadeInLeftBig');
		$(this).find('.sub_title').removeClass('animated fadeInRightBig');
		$(this).find('.sub_paragraph').removeClass('animated fadeInUpBig');
		$(this).find('.title').addClass('animated fadeOutLeftBig');
		$(this).find('.sub_title').addClass('animated fadeOutRightBig');
		$(this).find('.sub_paragraph').addClass('animated fadeOutUpBig');
		
	});
	
	$( '#home_slider' ).on( 'cycle-after', function( event, opts ) {
		$(this).find('.title').removeClass('animated fadeOutLeftBig');
		$(this).find('.sub_title').removeClass('animated fadeOutRightBig');
		$(this).find('.sub_paragraph').removeClass('animated fadeOutUpBig');
		$(this).find('.title').addClass('animated fadeInLeftBig');
		$(this).find('.sub_title').addClass('animated fadeInRightBig');
		$(this).find('.sub_paragraph').addClass('animated fadeInUpBig');
	});
	
	/* MENU START */
	// FOR DESKTOP SCROLL  IN ONE PAGE
	$('#id_menu_desktop ul').onePageNav({
		currentClass: 'current',
		changeHash: true,
		filter: ':not(.external)'
	});
	
	// FIRST SCROLL IF FROM EXTERNAL ANCHOR
	$.scrollTo({ top:0, left:0 });
	$tref = '#' + window.location.hash.replace('#', '');
	if ($tref!='#') {
		$ref  =  jQuery('#' + window.location.hash.replace('#', ''));
		$.scrollTo($ref,1000);
	}
    
	// FOR MOBILE SCROLL IN ONE PAGE
	jQuery('#dl-menu ul li a').bind('click', function() {
		// Get href value from clicked link: "#chair", "#box"...
		var target = jQuery(this).attr('href');
		if ($(this).hasClass('external')) {
			return false;
		}
		// Scroll to it
		target_self = target.substring(target.indexOf("#"));
		$.scrollTo(jQuery(target_self),1000);
	  });
	  
	// MENU DO AJAX IF NOT ONEPAGE
	$('a.external').bind('click', function() {	
		var target = jQuery(this).attr('href');
		if ($(this).hasClass('external')) {
			href = $(this).attr('href');
			if (href!='') {
				$('html').animate({scrollTop:0}, 'slow');
				$('body').append('<div id="BIGLOADER"></div>');
				theUrl =  href;
				$.ajax({
					type: "GET",
					url: theUrl,
					timeout: 1000,
					success: function(){
						window.location.href = theUrl;
					},
					error: function(x, t, m) {
						window.location.href = theUrl;
					}
				});
			}
			return false;
		}
	});
	
	// MOBILE MENU
	$( '#dl-menu' ).dlmenu({
		animationClasses : { classin : 'dl-animate-in-2', classout : 'dl-animate-out-2' }
	});
	
	// STICKY
	jQuery("#id_menu_div").sticky({bottomSpacing:60});
	
	/* MENU ENDS */
	
	
});