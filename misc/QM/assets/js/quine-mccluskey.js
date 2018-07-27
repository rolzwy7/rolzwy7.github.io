app.factory("QuineFactory", function(){
    var factory = {
        checkImplicant: function(implicant, lenght) {
            var implicant = String(implicant);
            // Check for lenght
            if(implicant.length != lenght) return false;
            // Check for allowed characters
            for(var i=0;i<implicant.length;i++) {
                var tmp = "1-0".indexOf(implicant[i]);
                if(tmp == -1)
                    return false;
            }
            return true;
        },
        delDuplArr: function(arr) {
            var ret = [];
            var flag = true;
            for(var i=0;i<arr.length;i++) {
                flag = true;
                for(var j=0;j<ret.length;j++) {
                    if(ret[j] == arr[i])
                        flag = false;
                }
                if(flag) {
                    ret.push(arr[i]);
                }
            }
            return ret;
        },
        delFromArray: function(arr, elem) {
            var ret = arr;
            for(var i=0;i<arr.length;i++) {
                if(arr[i] == elem)
                    ret.pop(i);
            }
            return ret;
        },
        countOnes: function(implicant) {
            var ret = 0;
            for(var i=0;i<implicant.length;i++) {
                if(implicant[i] == "1")
                    ret++;
            }
            return ret;
        },
        getComparisionProduct: function(implicant_1, implicant_2) {
            var different_bits = 0;
            var last_different_pos = 0;
            if(implicant_1.length != implicant_2.length) {
                return false;
                console.log("[!] Critical error in getComparisionProduct, lenghts difference");
            }
            for(var i=0;i<implicant_1.length;i++) {
                if(implicant_1[i] != implicant_2[i]) {
                    last_different_pos = i;
                    different_bits++;
                }
            }
            if(different_bits != 1) {return false;}

            var ret = "";
            for(var i=0;i<implicant_2.length;i++) {
                if(i == last_different_pos)
                    ret += "-";
                else
                    ret += implicant_2[i];
            }
            return ret;

        },
        createSemiArray: function(implicants, bits) {
            // create array with appropriate lenght
            var ret = [];
            var overall_differences = 0;
            var next_semi_array = [];
            var is_finished_yet = true;
            for(var i=0;i<bits+1;i++) {ret.push([])}
            // parsing part
            var implicants = implicants.split(";");
            for(var i=0;i<implicants.length;i++) {
                var idx = this.countOnes(implicants[i]);
                // debug
                console.log(implicants[i],idx);
                ret[idx].push(implicants[i]);
            }
            console.log(ret.length);
            var successful_compa = [];
            for(var main_iterator=0;main_iterator<ret.length;main_iterator++) {
                if(main_iterator == ret.length-1) {break;}
                var array_1 = ret[main_iterator];
                var array_2 = ret[main_iterator+1];
                for(var it_arr_1=0;it_arr_1<array_1.length;it_arr_1++) {
                    for(var it_arr_2=0;it_arr_2<array_2.length;it_arr_2++) {
                        var comparision_product = this.getComparisionProduct(array_1[it_arr_1], array_2[it_arr_2]);
                        // console.log("Comparing:", array_1[it_arr_1], "and",array_2[it_arr_2], "|", comparision_product);
                        if(comparision_product) {
                            successful_compa.push(String(main_iterator)+":"+String(it_arr_1));
                            successful_compa.push(String(main_iterator+1)+":"+String(it_arr_2));
                            successful_compa = this.delDuplArr(successful_compa);
                            next_semi_array.push(comparision_product);
                            is_finished_yet = false;
                        } else {
                            overall_differences++;
                        }

                    }
                }
            }
            // Delete ticks
            for(var i=0;i<successful_compa.length;i++) {
                var tmp = successful_compa[i].split(":");
                ret[Number(tmp[0])].pop(Number(tmp[1]));
            }

            var leftovers = ret;
            for(var i=0;i<leftovers.length;i++) {
                for(var j=0;j<leftovers[i].length;j++) {
                    next_semi_array.push(leftovers[i][j]);
                }
            }

            console.log("leftovers:", leftovers);
            console.log("successful_compa:", successful_compa);
            console.log("Overall:", overall_differences);
            console.log("Next arr:", next_semi_array);
            ret = this.delDuplArr(next_semi_array);

            ret_dict = {
                arr: ret.join(";"),
                finished: is_finished_yet
            }

            return ret_dict;
        },

    };
    return factory;
});

app.service("QuineService", function(QuineFactory, Matrix){

    this.checkIsSolution = function(matrix, row) {
        for(var i=0;i<matrix[0].length;i++) {
            if(matrix[row][i] == 1)
                matrix = Matrix.zeroColumn(matrix, i);
        }
        console.log("Zero'ing row", row, "is a solution");
        if(Matrix.sum(matrix) == 0)
            return true;
        else
            return false;
    };

    this.makeMatrixCopy = function(matrix) {
        var ret = [];
        for(var i=0;i<matrix.length;i++) {
            var tmp = [];
            for(var j=0;j<matrix[0].length;j++)
                tmp.push(0);
            ret.push(tmp);
        }

        for(var i=0;i<matrix.length;i++) {
            for(var j=0;j<matrix[0].length;j++) {
                ret[i][j] = matrix[i][j];
            }
        }
        return ret;
    }

    this.delDuplArr = function(arr) {
        return QuineFactory.delDuplArr(arr);
    };

    this.checkImplicants = function(implicant){
        var implicants = implicant.split(";");
        var lenght = implicants[0].length;
        var implicants_len = implicants.length;
        var tmp;
        // Check for duplicates
        for(var i=0;i<implicants_len;i++) {
            tmp = implicants[i];
            for(var j=0;j<implicants_len;j++)
                if(tmp == implicants[j] && i!=j)
                    return false;
        }
        // Check each implicant
        for(var i=0;i<implicants_len;i++) {
            if(!QuineFactory.checkImplicant(implicants[i], lenght)) {
                return false
            }
        }
        return lenght;
    };

    this.solveSemiArray = function(implicants, bits) {
        var ret = QuineFactory.createSemiArray(implicants, bits);
        return ret;
    };

    // this.getGetParam = function(parameterName) {
    //     var result = null,
    //     tmp = [];
    //     location.search.substr(1).split("&").forEach(function (item) {
    //         tmp = item.split("=");
    //         if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    //     });
    //     return result;
    // };

    this.zeroCrossXs = function(matrix, lonely_x_rows) {
        for(var j=0;j<matrix.length;j++) {
            for(var i=0;i<matrix[0].length;i++) {
                for(var k=0;k<lonely_x_rows.length;k++) {
                    if(matrix[j][i] == 1 && lonely_x_rows[k] == j) {
                        matrix = Matrix.zeroColumn(matrix, i);
                        break
                    }
                }
            }
        }
        console.log("Plox", matrix);
        return matrix;
    };
    this.suggestEgdeSolutions = function(matrix) {
        var tmp_matrix;
        var ret = [];
        console.log("suggest", matrix);
        var rows_left = [];
        var num_of_rows_left = 0;
        var num_of_rows_left_flag;
        for(var j=0;j<matrix.length;j++) {
            num_of_rows_left_flag = true;
            for(var i=0;i<matrix[0].length;i++) {
                if(matrix[j][i] == 1 && num_of_rows_left_flag) {
                    num_of_rows_left_flag = false;
                    num_of_rows_left++;
                    rows_left.push(j);
                }
            }
        }
        console.log("rows left:", rows_left);
        console.log("Checking for nice solution");


        for(var i=0;i<rows_left.length;i++){
            var tmp_matrix = this.makeMatrixCopy(matrix);
            var is_sol = this.checkIsSolution(tmp_matrix, rows_left[i]);
            if(is_sol) {
                console.log("Is sol: ", is_sol);
                ret.push(rows_left[i]);
                return ret;
            }
        }

        return rows_left;

        console.log("End of suggest fun");
    };

});
/*
    Main controller for Quine McCluskey
*/
app.controller("QuineMcCluskey", function($scope, $mdToast, Matrix, ToastFactory, QuineService) {
    // Variables
    var default_implicants = "0000;0001;1000;0101;0110;0111;1110;1111";
    $scope.vars = {
        implicants: default_implicants,
        final_patterns: [],
    };

    // literals
    var alpha = "abcdefghijklmnopqrstuvwxyz";

    // Table for the user
    $scope.table = {
        top_table: [],
        left_table: [],
    };

    $scope.actions = {
        calculate: function() {
            $scope.vars.final_patterns = [];
            $scope.vars.lonely_xs_col_nums = [];
            $scope.vars.lonely_xs_row_nums = [];
            $scope.vars.bits = QuineService.checkImplicants($scope.vars.implicants);
            console.log($scope.vars.bits);
            if($scope.vars.bits == false) {
                $scope.showSimpleToast("Some implicants are incorrect");
            }

            var result;
            var loop_implicants = $scope.vars.implicants;
            do {
                result = QuineService.solveSemiArray(loop_implicants, $scope.vars.bits);
                loop_implicants = result.arr;
                console.log(result);
            } while(!result.finished);
            $scope.table.top_table = $scope.vars.implicants.split(";");
            $scope.table.left_table = result.arr.split(";");
            // Create final matrix
            var final_matrix = [];
            for(var i=0;i<$scope.table.left_table.length;i++) {
                var tmp = [];
                for(var j=0;j<$scope.table.top_table.length;j++)
                    tmp.push(0);
                final_matrix.push(tmp);
            }

            for(var i=0;i<$scope.table.left_table.length;i++)
                for(var j=0;j<$scope.table.top_table.length;j++)
                    if($scope.table_functions.dashComparision($scope.table.left_table[i], $scope.table.top_table[j]))
                        final_matrix[i][j] = 1;
            console.log(final_matrix);
            // Check columns with lonely X
            var tmp_col_sum = 0;
            var last_x_row = 0;
            var last_x_row_flag = true;
            for(var i=0;i<$scope.table.top_table.length;i++) {
                for(var j=0;j<$scope.table.left_table.length;j++) {
                    tmp_col_sum += final_matrix[j][i];
                    if(tmp_col_sum == 1 && last_x_row_flag == true) {
                        last_x_row = j;
                        last_x_row_flag = false;
                    }
                }

                if(tmp_col_sum == 1) {
                    $scope.vars.lonely_xs_col_nums.push(i);
                    $scope.vars.lonely_xs_row_nums.push(last_x_row);
                }
                tmp_col_sum = 0;
                last_x_row = 0;
                last_x_row_flag = true;
            }
            $scope.vars.lonely_xs_col_nums = QuineService.delDuplArr($scope.vars.lonely_xs_col_nums);
            $scope.vars.lonely_xs_row_nums = QuineService.delDuplArr($scope.vars.lonely_xs_row_nums);
            console.log("Lonely Xs col nums:", $scope.vars.lonely_xs_col_nums);
            console.log("Lonely Xs row nums:", $scope.vars.lonely_xs_row_nums);


            // Get final patterns from lonely xs
            for(var i=0;i<$scope.vars.lonely_xs_row_nums.length;i++) {
                $scope.vars.final_patterns.push($scope.table.left_table[$scope.vars.lonely_xs_row_nums[i]]);
            }
            $scope.vars.final_patterns = QuineService.delDuplArr($scope.vars.final_patterns);
            console.log("Final step 1:", $scope.vars.final_patterns);
            final_matrix = QuineService.zeroCrossXs(final_matrix, $scope.vars.lonely_xs_row_nums);

            var nice_solution_result = QuineService.suggestEgdeSolutions(final_matrix);

            for(var i=0;i<nice_solution_result.length;i++) {
                $scope.vars.final_patterns.push(
                    $scope.table.left_table[nice_solution_result[i]]
                );
            }

            console.log($scope.vars.final_patterns);
            var final_eq = "";
            for(var i=0;i<$scope.vars.final_patterns.length;i++) {
                for(var j=0;j<$scope.vars.final_patterns[i].length;j++) {
                    var tmp = $scope.vars.final_patterns[i][j];
                    if(tmp == "0") {final_eq += "!"+alpha[j]}
                    if(tmp == "1") {final_eq += alpha[j]}
                }
                if(i != $scope.vars.final_patterns.length-1) {final_eq += " + ";}
            }

            var math = MathJax.Hub.getAllJax("slopeEq")[0];
            MathJax.Hub.Queue(["Text", math, final_eq]);
        }
    };

    // Table functions
    $scope.table_functions = {
        dashComparision: function(phi_pattern, to_compare) {
            for(var i=0;i<phi_pattern.length;i++) {
                if(phi_pattern[i] == "-") continue;
                if(phi_pattern[i] != to_compare[i]) return false;
            }
            return true;
        },
        isLonelyX: function(row, col) {
            var ret = "";
            for(var i=0;i<$scope.vars.lonely_xs_col_nums.length;i++)
                if(col == $scope.vars.lonely_xs_col_nums[i])
                    ret += "lonely-x-col ";
            for(var i=0;i<$scope.vars.lonely_xs_row_nums.length;i++)
                if(row == $scope.vars.lonely_xs_row_nums[i])
                    ret += "lonely-x-row ";
            return ret;
        },
    };

});
