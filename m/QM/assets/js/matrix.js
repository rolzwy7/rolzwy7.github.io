var matrix_app = app;

matrix_app.factory("Matrix", function() {
    var factory = {};
    // copy matrix contents
    factory.copyMatrix = function(matrix) {
        var ret = this.filled(matrix.length, matrix[0].length, 0);
        for(var i=0;i<matrix.length;i++)
            for(var j=0;j<matrix[i].length;j++)
                ret[i][j] = matrix[i][j];
        return ret;
    };
    // Create filled matrix
    factory.filled = function(rows_num, cols_num, fill) {
        var ret = [];
        for(var i=0;i<rows_num;i++) {
            var tmp = [];
            for(var j=0;j<cols_num;j++)
                tmp.push(fill);
            ret.push(tmp);
        }
        return ret;
    };
    // Create eye matrix
    factory.eye = function(num) {
        var ret = this.filled(num, num, 0);
        for(var i=0;i<num;i++)
            ret[i][i] = 1;
        return ret;
    };
    // sum matrix elements
    factory.sum = function(matrix) {
        var ret = 0;
        for(var i=0;i<matrix.length;i++)
            for(var j=0;j<matrix[i].length;j++)
                ret += matrix[i][j];
        return ret;
    };
    // min of matrix
    factory.min = function(matrix) {
        var ret = matrix[0][0];
        for(var i=0;i<matrix.length;i++)
            for(var j=0;j<matrix[i].length;j++)
                if(ret > matrix[i][j]) ret = matrix[i][j];
        return ret;
    };
    // max of matrix
    factory.max = function(matrix) {
        var ret = matrix[0][0];
        for(var i=0;i<matrix.length;i++)
            for(var j=0;j<matrix[i].length;j++)
                if(ret < matrix[i][j]) ret = matrix[i][j];
        return ret;
    };
    // Fill column
    factory.fillColumn = function(matrix, col_num, fill) {
        var ret = this.copyMatrix(matrix);
        for(var i=0;i<matrix.length;i++)
            for(var j=0;j<matrix[i].length;j++)
                if(j === col_num)
                    ret[i][j] = fill;
        return ret
    };
    // Fill row
    factory.fillRow = function(matrix, rows_num, fill) {
        var ret = this.copyMatrix(matrix);
        for(var i=0;i<matrix.length;i++)
            for(var j=0;j<matrix[i].length;j++)
                if(i === rows_num)
                    ret[i][j] = fill;
        return ret
    };
    // Zero column
    factory.zeroColumn = function(matrix, col_num) {
        return this.fillColumn(matrix, col_num, 0);
    };
    // Zero row
    factory.zeroRow = function(matrix, rows_num) {
        return this.fillRow(matrix, rows_num, 0);
    };
    // cross replace on element found
    factory.crossReplace = function(matrix, target, replace) {
        var ret = this.copyMatrix(matrix);
        for(var i=0;i<matrix.length;i++)
            for(var j=0;j<matrix[i].length;j++)
                if(ret[i][j] === target) {
                    ret = this.fillColumn(ret, j, replace);
                    ret = this.fillRow(ret, i, replace);
                }
        return ret;
    };
    // horizontal replace on element found
    factory.horizontalReplace = function(matrix, target, replace) {
        var ret = this.copyMatrix(matrix);
        for(var i=0;i<matrix.length;i++)
            for(var j=0;j<matrix[i].length;j++)
                if(ret[i][j] === target) {
                    ret = this.fillRow(ret, i, replace);
                }
        return ret;
    };
    // vertical replace on element found
    factory.verticalReplace = function(matrix, target, replace) {
        var ret = this.copyMatrix(matrix);
        for(var i=0;i<matrix.length;i++)
            for(var j=0;j<matrix[i].length;j++)
                if(ret[i][j] === target) {
                    ret = this.fillColumn(ret, j, replace);
                }
        return ret;
    };
    // apply function on elements
    // first argument of func need to be reserved for matrix element
    // func must return
    factory.functionApply = function(matrix, func, args=[]) {
        var ret = this.copyMatrix(matrix);
        for(var i=0;i<matrix.length;i++)
            for(var j=0;j<matrix[i].length;j++) {
                var tmp_func;
                if(args.length != 0)
                    tmp_func = "func(ret[i][j], " + args.join(",") + ")";
                else
                    tmp_func = "func(ret[i][j])";
                ret[i][j] = eval(tmp_func);
            }
        return ret;
    };

    return factory;
});
