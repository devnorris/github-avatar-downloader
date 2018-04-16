// first require the request
var request = require('request');
var secrets = require('./secrets.js');

//console.log('Welcome to the GitHub Avatar Downloader!');

// Creat function to fetch the list of contributors
function getRepoContributors(repoOwner, repoName, cb) {
//
  var options = {
    url:  "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + secrets.GITHUB_TOKEN
    }
  };


    request(options, function(err, res, body) {
    cb(err, body);
  });

}

function printData(err, object) {
  var avatarObject = JSON.parse(object);
  for (var element of avatarObject) {
    console.log(element.avatar_url)
  }
}

getRepoContributors("jquery", "jquery", printData);
  // getRepoContributors("jquery", "jquery", function(err, result) {
  //   console.log("Errors:", err);
  //   console.log("Result:", result);
  // })

