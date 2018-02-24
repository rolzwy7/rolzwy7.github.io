var app = angular.module("GradientDescentApp", ["ngMaterial"])

app.controller("MainController", function($scope, $interval){

    var shuffle = function(array) {
      var tmp, current, top = array.length;
      if(top) while(--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
      }
      return array;
    }

    var getEvenFromZeroRange = function(num) {
        num = Math.floor(num);
        if(num % 2 != 0)
            num += 1
        return Array.from(new Array(num+1), (val,index)=>index-Math.floor(num/2));
    }

    // Data
    $scope.data = {
        xrange: 20,
        points:[{x: 4, y: -7.8}],
        starting_line:getEvenFromZeroRange(20),
        best_fit:getEvenFromZeroRange(20),
        m: 1,
        b: 0,
        learining_rate: 0.005,
        let_loop: false,
    }
    // Create chart
    var ctx = document.getElementById("canvas").getContext("2d");
    var config = {


    type: 'line',
    data: {
        labels: getEvenFromZeroRange($scope.data.xrange),
        datasets: [
        {
            label: "Best Fit Line",
            borderColor: "rgba(245, 0, 87, .3)",
            backgroundColor: "rgba(245, 0, 87, .3)",
            data: $scope.data.best_fit,
            fill: false,
        },
        {
            label: "Initial Line",
            borderColor: "rgba(69, 39, 160, .3)",
            backgroundColor: "rgba(69, 39, 160, .3)",
            data: $scope.data.starting_line,
            fill: false,
        },
        {
            label: "Points",
            borderColor: "#2979FF",
            backgroundColor: "#2979FF",
            type: 'scatter',
            data: $scope.data.points,
            fill: false,
            showLine: false
        }

        ]
        },
        options: {
        responsive: true,
        title:{
            display:true,
            text:'Gradient Descent - Example'
        },
        legend: {
            display: false
        },
        tooltips: {
            enabled: false,
            mode: 'index',
            intersect: false,
        },
        hover: {
            display: false,
            mode: 'nerest',
            intersect: true
        },
        scales: {
            xAxes: [{
                gridLines: {
                    display: true,
                        drawBorder: false
                },
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'X'
                },
                ticks: {
                    min: -10,
                    max: 10,
                    beginAtZero:true
                }
            }],
            yAxes: [{
                gridLines: {
                    display: true,
                        drawBorder: false
                },
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Y'
                },
                ticks: {
                    min: -10,
                    max: 10,
                    beginAtZero:false,
                }
            }]
        }}
    };


    var chart = new Chart(ctx, config);
    // Chart controls
    $scope.functions = {
        changeXrange: function(){
            config.data.labels = getEvenFromZeroRange($scope.data.xrange);
            chart.update();
        },
        updateBestFit: function() {
            var xs = getEvenFromZeroRange($scope.data.xrange);
            // console.log("updateBestFit: ", xs);
            var tmp = 0;
            for(var i=0;i<xs.length;i++) {
                tmp = xs[i];
                xs[i] = ($scope.data.m * xs[i]) + $scope.data.b;
                // console.log(tmp,":", xs[i]);
            }
            config.data.datasets[0].data = xs;
            // console.log("updateBestFit after: ", xs);
            chart.update();
        },
        randomizePoints: function() {
            var xs = getEvenFromZeroRange($scope.data.xrange);
            var ret = [];
            var tmp = 0;
            for(var i=0;i<xs.length;i++) {
                tmp = xs[i];
                xs[i] = Math.random() * 10 - 5;
                // console.log(tmp,":", xs[i]);
                ret.push({x:tmp, y:xs[i]});
            }
            config.data.datasets[2].data = ret;
            chart.update();
        },
        randomizePointsClose: function() {
            var xs = [
                -8,-7,-6,-5,-8,-8,-7,-6,-5,-8,
                8,7,6,5,8,8,7,6,5,8
            ];
            // xs = shuffle(xs);
            var ret = [];
            var tmp = 0;
            for(var i=0;i<xs.length;i++) {
                tmp = xs[i];
                xs[i] = Math.random() * 10 - 3;
                console.log(tmp,":", xs[i]);
                ret.push({x:tmp, y:xs[i]});
            }
            console.log(ret);
            config.data.datasets[2].data = ret;
            chart.update();
        },
        updateChartData: function() {
            this.changeXrange();
            this.updateBestFit();
        },
        addPoint: function() {
            $scope.data.points.push({x:$scope.data.add_x, y:$scope.data.add_y});
            this.updateChartData();
        },
        gradientDescent: function() {
            var data = config.data.datasets[2].data;
            for(var i=0; i < data.length ;i++) {
                var x = data[i].x;
                var y = data[i].y;
                var guess = $scope.data.m * x + $scope.data.b;
                var error = y - guess;
                $scope.data.m = Number($scope.data.m) + error * x * $scope.data.learining_rate;
                $scope.data.b = Number($scope.data.b) + error * $scope.data.learining_rate;
                this.updateChartData();
            }

        },
    };

    $interval(function(){
        if($scope.data.let_loop) {
            $scope.functions.gradientDescent();
        }
    }, 220);

});
