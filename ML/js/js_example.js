var app = angular.module("GradientDescentApp", ["ngMaterial"])

app.controller("MainController", function($scope, $interval, $timeout){

    $scope.adjustSliderValue = function(element) {
        console.log(element.sliderValue/1000.0);
        $scope.data.learining_rate = element.sliderValue/1000.0;
    };

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
        learining_rate: 0.001,
        let_loop: false,
        overall_loops: 15,
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
            var cost = 0;
            for(var i=0; i < data.length ;i++) {
                var x = data[i].x;
                var y = data[i].y;
                var guess = $scope.data.m * x + $scope.data.b;
                var error = y - guess;
                cost += Math.pow(error, 2);
                $scope.data.m = Number($scope.data.m) + error * x * $scope.data.learining_rate;
                $scope.data.b = Number($scope.data.b) + error * $scope.data.learining_rate;
                this.updateChartData();
            }
            console.log(cost/data.length);

            // if($scope.data.overall_loops % 6 == 0) {
            //     var new_eq = "";
            //     if($scope.data.b < 0)
            //         new_eq = "f(x) = " + String($scope.data.m) + "x - " + String(Math.abs($scope.data.b));
            //     else
            //         new_eq = "f(x) = " + String($scope.data.m) + "x + " + String(Math.abs($scope.data.b));
            //
            //     $scope.data.eq_refresh_mod += 1;
            //     console.log(new_eq);
            //     var math = MathJax.Hub.getAllJax("slopeEq")[0];
            //     MathJax.Hub.Queue(["Text", math, new_eq]);
            // }

            $scope.data.overall_loops += 1;
        },
    };

    $scope.functions.randomizePoints();
    $interval(function(){
        if($scope.data.let_loop) {
            $scope.functions.gradientDescent();
        }
    }, 250);

});
