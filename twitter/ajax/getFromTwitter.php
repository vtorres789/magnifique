<?php
    /*========================================================================
     * PHP Backend for jQuery TweetMachine. This allows you to interact with
     * various endpoints of the Twitter API using the keys and access tokens
     * from a Twitter app that you created.
     ========================================================================*/

    /*
     * First, include the TwitterOAuth library. v0.2.0-beta2 has been included
     * but you can always download the latest version from:
     * https://github.com/abraham/twitteroauth
     */
    include '../inc/twitteroauth/twitteroauth.php';

    /*  BEGIN SETUP ============================================================

    You can make API calls without authenticating a user account by creating
    an app instead. Then you can create an access token and access token
    secret in the app's settings.

    To do this:
    1) Go to https://dev.twitter.com/apps and create a new application
    2) Choose your new app from the list
    3) Under the Details tab you can see your Consumer key and Consumer
    secret. Copy these into $consumerKey and $consumerSecret
    4) At the bottom of the page, click "Create my access token" under the
    "Your access token" heading. This will generate and Access token and
    Access token secret. Copy these into $accessToken and $accessTokenSecret */

    // NOTE: These keys are provided so the sample.html file can run. Don't use
    // them in a production environment because the rate limit will be lumped
    // in with everyone else testing the plugin
  /*  $consumerKey        = 'rj6LA7K2GzlXckbf8ipJQ';
    $consumerSecret     = 'fbkgO76v89EVuQh4TtMRvCTybWbhC8LVXQCNRAZifTo';
    $accessToken        = '554127650-ijVgdaHhZaVERQSNySO1uK68HakQgTTJq94WDU8l';
    $accessTokenSecret  = 'wYxlm32ZVinexShOxx2nsb6J6COUDDtpfqae1051Wms';
	$twitter_username = 'wpamanuke';
  */
  //your twitter user name
/*
Consumer key rj6LA7K2GzlXckbf8ipJQ
Consumer secret fbkgO76v89EVuQh4TtMRvCTybWbhC8LVXQCNRAZifTo
Access token 554127650-ijVgdaHhZaVERQSNySO1uK68HakQgTTJq94WDU8l
Access token secret wYxlm32ZVinexShOxx2nsb6J6COUDDtpfqae1051Wms
/* END SETUP ==========================================================*/

    /*
     * Get the endpoint that you'd like to access.
     */
    //$endpoint = $_GET['endpoint'];
	$endpoint = 'statuses/user_timeline';

    /*
     * Get the query parameters passed by Javascript. This is passed as an
     * array so we don't have to do any processing.
     */
    //$queryParams = $_GET['queryParams'];
	$queryParams = array('screen_name'=>$twitter_username,'count'>=5,'page'=>1,'include_rts'>='true');

    /*
     * Establish an authenticated connection to Twitter using TwitterOAuth and
     * the keys you've provided above.
     */
    $connection = new TwitterOAuth($consumerKey, $consumerSecret, $accessToken, $accessTokenSecret);

    /*
     * Get the tweets!
     */
    $tweets = $connection->get($endpoint, $queryParams);

    /*
     * If Twitter returned statuses, the request was successful
     */
	echo json_encode($tweets);
	/*
    if ( isset($tweets->statuses) ) {
        echo json_encode($tweets->statuses);
    }
    else { // There was a problem somewhere
        // Return the error Twitter sent so Javascript can parse it and display the error
        echo json_encode($tweets->errors);
    }
	*/
?>
