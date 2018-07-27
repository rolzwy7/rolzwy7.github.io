factory_app_point = app

factory_app_point.factory("HashTable", function(){
    var factory = {};
    var debug = true;
    var empty_indicator = "#";

    factory.createHashTable = function(size) {
        var ret = [];
        for(var i=0;i<size;i++) {
            ret.push({
                id:i,
                value:empty_indicator,
                tries: 0,
                visited:false,
                highlighted:false
            });
        }
        if(debug) console.log("createHashTable:", ret);
        return ret;
    };

    factory.linear_probing = function(htable, to_insert) {
       for(var i=0;i<htable.length;i++) {
           var tmp = ((to_insert % htable.length) + 3*i) % htable.length;

           if(htable[tmp].value == empty_indicator) {
               return {iterator: i, position: tmp};
           }
       }
       return {iterator: htable.length-1, position: -1};
    };

    factory.quadratic_probing = function(htable, to_insert) {
        for(var i=0;i<htable.length;i++) {
            var tmp = ( (to_insert % htable.length) + i + (i*i) ) % htable.length;
            if(htable[tmp].value == empty_indicator) {
                return {iterator: i, position: tmp};
            }
        }
        return {iterator: htable.length-1, position: -1};
    };

    factory.double_hashing = function(htable, to_insert) {
        for(var i=0;i<htable.length;i++) {
            var h1 = to_insert % htable.length;
            var h2 = (((to_insert / htable.length) % (htable.length / 2)) * 2) + 1;
            var tmp = (h1 + i * h2) % htable.length;
            tmp = Number(tmp.toFixed(0))
            console.log(tmp);
            if(htable[tmp].value == empty_indicator) {
                return {iterator: i, position: tmp};
            }
        }
        return {iterator: htable.length-1, position: -1};
    };


    factory.addElement = function(htable, to_insert, func) {
        var tmp = func(htable, to_insert);
        var pos = tmp.position;
        if( pos != -1 ) {
            console.log("found for", to_insert);
            htable[pos].value = to_insert;
            htable[pos].tries = tmp.iterator + 1;
            for(var i=0;i<htable.length;i++) {htable[i].highlighted = false;}
            htable[pos].visited = htable[pos].highlighted = true;
        } else {
            console.log("not found for", to_insert);
        }
    };

    return factory;
});
