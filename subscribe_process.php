<?php
	//print_r($_POST);
	
	// wait a second to simulate a some latency
usleep(500000);
$to = "your.email@gmail.com"; // set your email here
$email = "";
$subject = "FORM CONTACT ";


if (isset($_POST['input_email']))
	$email = $_POST['input_email'];


	$date1=date("F d,Y h:i:s a");
	$body="
	  	<table width='450' border='1px' bordercolor='#B6B6B6' align='center'  cellspacing='0' cellpadding='0' style='border:1px solid #B6B6B6; border-collapse:collapse; background-color:#FFF; margin-top:16px; margin-bottom:10px;'>
             <tr>
			 <td colspan='2' style='text-align:center; background-color:#619FCE; font-family:Arial, Helvetica, sans-serif; font-size:14px; color:#fff; font-weight:bold; padding:6px;''>VCARD CONTACT FORM:&nbsp;&nbsp;&nbsp;[&nbsp;$date1&nbsp;]</td>
			 </tr>
			 
			 <tr>
                 <td width='150' align='left' valign='top' style='font-family:Arial, Helvetica, sans-serif; font-size:12px; color:#6D6D6D; font-weight:bold; background-color:#ECF7FF; padding:6px;'>Email:</td>
                 <td width='300' align='left' valign='top' style='font-family:Arial, Helvetica, sans-serif; font-size:12px; color:#000; font-weight:normal; padding:6px;'>$email</td>
             </tr>
			 
			
			
             </table>";
			
//$from=$firstNameField;
       $sub="Vcard Contact Form - ".$date1;
	   $name=$email."< ".$email." >";
	  
	$msg = '';
	if (@mail($to,$sub,$body,"Content-Type: text/html; charset=iso-8859-1"))
		{
			$msg = 'You have been subscribed';
			//echo '<div class="alert success pngfix">'. $msg .'</div>';
		}
		else{
			$msg = 'Failed to sent email';
			//echo '<div class="alert error pngfix">'. $msg .'</div>';
		}
	echo $msg;
?>