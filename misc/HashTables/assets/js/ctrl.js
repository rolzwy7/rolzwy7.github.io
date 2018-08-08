ctrl_app_point = app

ctrl_app_point.controller("MainCtrl", function($scope, HashTable){

    $scope.collision_handling_types = [
        {id: 0, label: "Adresowanie liniowe"  , func: HashTable.linear_probing, restruct_ava:true},
        {id: 1, label: "Adresowanie kwdratowe", func: HashTable.quadratic_probing, restruct_ava:false},
        {id: 2, label: "Podwójne mieszanie"   , func: HashTable.double_hashing, restruct_ava:false}
    ];

    $scope.load_factors = [
        {id: 0, label: "0.6", value: 0.6},
        {id: 1, label: "0.7", value: 0.7},
        {id: 2, label: "0.8", value: 0.8},
        {id: 3, label: "0.9", value: 0.9}
    ];

    $scope.options = {
        title: "Tablice mieszające",
        size: 16,
        restruct: false,
        collision_handling: $scope.collision_handling_types[0],
        load_factor: $scope.load_factors[0]
    };


    $scope.to_insert_tmp = 65;
    $scope.hash_table = HashTable.createHashTable(16);

    $scope.add_element = function(to_insert) {
        HashTable.addElement($scope.hash_table, to_insert, $scope.options.collision_handling.func);
    };
    $scope.reset_hash_table = function(to_insert) {
        $scope.hash_table = HashTable.createHashTable(16);
    };

});
