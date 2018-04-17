// first require the request

var owner = process.argv[2];
var repo = process.argv[3];
var request = require('request');
var secrets = require('./secrets.js');
var fs = require('fs');

// // Creat function to fetch the list of contributors
function getRepoContributors(repoOwner, repoName, cb) {
  if (!owner || !repo) {
    console.log("Wrong iput!")
    return null;
  }

  var options = {
    url:  "https://api.github.com/repos/" + owner + "/" + repo + "/contributors",
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

getRepoContributors(owner, repo, photo);
// getRepoContributors("jquery", "jquery", function(err, result) {














