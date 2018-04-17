// first require the request
var request = require('request');
var secrets = require('./secrets.js');
var fs = require('fs');

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
      var avatarObject = JSON.parse(body);
        for (var element of avatarObject) {
          var picture = printData(err, element);
          cb(picture, ('./avatars/' + element.id + '.jpeg'));
    }
});

}



function photo(url, filePath) {
  request.get(url)
  .pipe(fs.createWriteStream(filePath))
  .on('finish', function() {
    console.log("Download complete!");
    console.log("_______________________________");
  });
}

function printData(err, object) {
    return object.avatar_url;
 }


//photo("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")

getRepoContributors("jquery", "jquery", photo);
  // getRepoContributors("jquery", "jquery", function(err, result) {














