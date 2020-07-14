<?php
	$cat = 1;
	$page = 1;
	if (isset($_GET['cat']))
		$cat = $_GET['cat'];
	switch ($cat) {
		case 0:
			require_once('portfolio_0.php');
			break;
		case 1:
			require_once('portfolio_1.php');
			break;
		case 2:
			require_once('portfolio_2.php');
			break;
		case 3:
			require_once('portfolio_3.php');
			break;
		case 4:
			require_once('portfolio_4.php');
			break;
		default:
			require_once('portfolio_2.php');
			break;
		
	}
?>