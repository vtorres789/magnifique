
jQuery(document).ready(function(){	
	//FORM COMMENT 
	$(":input[placeholder]").placeholder();
	
	//COMMENT SUBMIT FORM
	
	$('#form_comment').validate({
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
			var a=$('#form_comment').serialize();
			$.ajax({
				type: "POST",
				url: "single_comment_process.php",
				data:a,
				complete:function(){
				},
				beforeSend: function() {
				
				},
				success: function(data){
					alert(data);
					$('#form_comment').find("input[type=text], textarea").val("");
				},
				error : function() {
				
				}
			});
			return false;
		}
	});
	
	/* TWITTER */
	$.getJSON('twitter/ajax/getFromTwitter.php',{})
	.done(function( json ) {
		$max_tweet = 3;
		$i = 0;
		$('#ul_twitter_left').append('<ul class="ul_twitter_left"></ul>');
		$.each(json,function(){
			text = this.text;
			src_url = this.user.profile_image_url;
			twitter_name = this.user.name;
			twitter_screen_name = this.user.screen_name;
			time = this.created_at;
			time = twitter_date(time);
			text = twitter_text(text);
			$('.ul_twitter_left').append('<li><div class="twitter_header">' 
											+ '<a href="http://twitter.com'+ twitter_name +'" title="">' + 
											'<img alt ="" src="'+ src_url +'">' + 
											'<span class="twitter_name">' + twitter_name + "</span>" +
											'<span class="twitter_screen_name">@' + twitter_screen_name + "</span>" + "</a>" +
										'</div>'+
										'<div class="twitter_content">'
											  + text + 
											'<div class="twitter_time">' 
											  + time +
											'</div>' +
										'</div>' +
										'</li>');
			$i++;
			if ($i==$max_tweet) return false;
		});
		
	})
	.fail(function( jqxhr, textStatus, error ) {
		var err = textStatus + ', ' + error;
		console.log( "Request Failed: " + err);
	})
	.always(function() { console.log( "complete" ); });
});