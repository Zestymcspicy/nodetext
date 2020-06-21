'use strict';

const fs = require('fs');


fs.readFile('data/trumpTweets.json', (err, data) => {
  if (err) throw err;
  let tweets = JSON.parse(data).filter(tweet=> tweet.is_retweet===false && tweet.text.indexOf("http")!==0).map( x => x.text);
  tweets = tweets.map(tweet => {
    let httpIndex = tweet.indexOf('http')
    if(httpIndex!==-1){
      let httpEnd = tweet.indexOf(' ', httpIndex);
      if (httpEnd === -1){
        tweet=`${tweet.substring(0, httpIndex)}`
      } else {
        tweet = `${tweet.substring(0, httpIndex)} ${tweet.substring(httpEnd)}`;
      }
    }
    return tweet;
  })
  tweets=tweets.filter(tweet => tweet.length > 1)
  tweets=tweets.join('\n')
  fs.writeFileSync('tweets.txt', tweets)
});
