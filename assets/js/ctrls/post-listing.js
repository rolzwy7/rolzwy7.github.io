app.controller("PostListing", function($scope, $http){
  // name
    var name_arg = window.location.href;
    name_arg = name_arg.split("name=")[1];
    if(!(name_arg === undefined)) {
      name_arg = name_arg.split("&")[0];
      name_arg = name_arg.split("#")[0];
    }
    // by
    var by_arg = window.location.href;
    by_arg = by_arg.split("by=")[1];
    if(!(by_arg === undefined)) {
      by_arg = by_arg.split("&")[0];
      by_arg = by_arg.split("#")[0];
    }
    $scope.posts = {
        data: [],
        success: false,
        name: name_arg,
        by: by_arg
    }
    $scope.filter_response_data = function(data) {
      var ret = [];
      for(var i=0;i<data.length;++i) {
        for(var j=0;j<data[i].categories.length;++j) {
          // by category
            if($scope.posts.by == "category" && (data[i].categories[j] == $scope.posts.name)) {
              ret.push(data[i]);
              break;
            }
            if($scope.posts.by == "tag" && (data[i].tags[j] == $scope.posts.name)) {
              ret.push(data[i]);
              break;
            }
        }
      }
      return ret;
    };
    $http({
    method: "GET",
    url: "/json/posts.json"
    }).then(function success(response) {
        $scope.posts.data = response.data;
        $scope.posts.success = true;
    }, function error(response) {
        $scope.posts.success = false;
    });
    $scope.make_embed = function(yt_video_id) {
      return "https://www.youtube.com/embed/" + yt_video_id;
    };
    $scope.get_yt_thumbnail_by_id = function(yt_video_id) {
      return "http://img.youtube.com/vi/" + yt_video_id + "/sddefault.jpg"
    };
});
