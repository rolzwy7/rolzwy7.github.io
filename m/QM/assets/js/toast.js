app.factory("ToastFactory", function($mdToast){
    var factory = {};
    factory.last = {
        bottom: false,
        top: true,
        left: false,
        right: true
    };

    factory.toastPosition = angular.extend({},this.last);

    factory.getToastPosition = function() {
        this.sanitizePosition();
        return Object.keys(this.toastPosition)
        .filter(function(pos) { return this.toastPosition[pos]; })
        .join(' ');
    };

    factory.sanitizePosition = function() {
        var current = this.toastPosition;
        if ( current.bottom && this.last.top ) current.top = false;
        if ( current.top && this.last.bottom ) current.bottom = false;
        if ( current.right && this.last.left ) current.left = false;
        if ( current.left && this.last.right ) current.right = false;
        this.last = angular.extend({},current);
    };

    factory.showSimpleToast = function(text) {
        var pinTo = this.getToastPosition();
        $mdToast.show(
            $mdToast.simple()
            .textContent(text)
            .position(pinTo)
            .hideDelay(3000)
        );
    };
    return factory;
});
