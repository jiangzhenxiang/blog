# angular-directive 双向通信bug

指令
```js
angular.module("myApp.directive").directive("smsDepart", [function () {
    return {
        restrict: "E",
        scope: {
            depart: "=depart"
        },
        controller: ['$scope', function($scope) {
            // ...
            $scope.depart = 'depart2';
        }],
        templateUrl: 'modules/directive/smsDepartment/smsDepartment.html'
```

引用
```html
    <sms-depart depart="depart"></sms-depart>
```
```js
    $scope.depart = 'depart';
```

这样写的时候，`$scope.depart = 'depart';`能传递给指令，但在指令中修改$scope.depart的值后，引用文件的值为发送变化；

修改如下后，成功

引用
```html
    <sms-depart depart="data.depart"></sms-depart>
```
```js
    $scope.data.depart = 'depart';
```



