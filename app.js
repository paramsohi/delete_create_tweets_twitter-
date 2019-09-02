const Twitter = require('twitter');
const config = require('./config.js');
const T = new Twitter(config);

// Set up your search parameters
  //screen_name: 'param_sohi',

// Set up your search parameters
const params = {
  q: 'hugs',
  count: 50,
  result_type: 'latest',
  lang: 'en'
}

//Call function you need 

create_tweet();

function create_tweet(){
  const params2 = {
    status: 'Hello from node js @param_sohi',
  }  
    T.post('statuses/update', params2, (err, data, response) => {
    // If there is no error, proceed
    if(err){
      return console.log(err);
    }
  });
}

function Favourite_tweet(){
 // Initiate your search using the above paramaters
  T.get('search/tweets', params, (err, data, response) => {
    // If there is no error, proceed
    if(err){
      return console.log(err);
    }

    // Loop through the returned tweets
    const tweetsId = data.statuses
      .map(tweet => ({ id: tweet.id_str }));

    tweetsId.map(tweetId => {
      T.post('favorites/create', tweetId, (err, response) => {
        if(err){
          return console.log(err[0].message);
        }

        const username = response.user.screen_name;
        const favoritedTweetId = response.id_str;
        console.log(`Favorited: https://twitter.com/${username}/status/${favoritedTweetId}`);

      });
    });
  })  
}

//Delete or unretweet all tweets

function Delete_unretweet_tweets(){
  T.get('statuses/user_timeline', params, (err, data, response) => {
    // If there is no error, proceed
    if(err){
      return console.log(err);
    }
  console.log(data);
    // Loop through the returned tweets
    const tweetsId = data.map(tweet => ({ id: tweet.id_str }));
      console.log(tweetsId);
  let x =1;
    tweetsId.map(tweetId => {
       T.post('statuses/unretweet', tweetId, (err, response) => {
         if(err){
           return console.log(err[0].message);
         }

         const username = response.user.screen_name;
         console.log(`unretweeted  id=`+tweetId+`---`+x+ `: https://twitter.com/${username}`);
         x++;
       });
       T.post('statuses/destroy', tweetId, (err, response) => {
         if(err){
           return console.log(err[0].message);
         }

         const username = response.user.screen_name;
         console.log(`deleted  id=`+tweetId+`---`+x+ `: https://twitter.com/${username}`);
         x++;
       });     
    });
  });  
}