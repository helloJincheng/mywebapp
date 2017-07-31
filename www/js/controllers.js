angular.module('starter.controllers', [])

  .controller('DashCtrl', function ($scope, $http, $timeout) {
      $scope.banners = [
        {src: 'img/adam.jpg'},
        {src: 'img/ben.png'},
        {src: 'img/max.png'},
        {src: 'img/mike.png'},
      ];
      $scope.goods = [[
        {title: '天猫', src: 'img/good.jpg'},
        {title: '聚划算', src: 'img/good.jpg'},
        {title: '天猫国际', src: 'img/good.jpg'},
        {title: '外卖', src: 'img/good.jpg'},
        {title: '天猫超市', src: 'img/good.jpg'}
      ], [
        {title: '充值中心', src: 'img/good.jpg'},
        {title: '飞猪旅行', src: 'img/good.jpg'},
        {title: '领金币', src: 'img/good.jpg'},
        {title: '拍卖', src: 'img/good.jpg'},
        {title: '分类', src: 'img/good.jpg'}
      ]];
      $scope.news = [
        {
          title: '建军90周年阅兵，习近平检阅部队并发表重要讲话',
          description: '在今天上午的9点，朱日和训练基地举行了庆祝中国人民解放军建军90周年阅兵，习近平检阅部队并发表重要讲话。',
          img: 'img/xidada.jpg',
          time: '2017 - 7 - 30',
        }, {
          title: '建军90周年阅兵，习近平检阅部队并发表重要讲话',
          description: '在今天上午的9点，朱日和训练基地举行了庆祝中国人民解放军建军90周年阅兵，习近平检阅部队并发表重要讲话。',
          img: 'img/xidada.jpg',
          time: '2017 - 7 - 30',
        }, {
          title: '建军90周年阅兵，习近平检阅部队并发表重要讲话',
          description: '在今天上午的9点，朱日和训练基地举行了庆祝中国人民解放军建军90周年阅兵，习近平检阅部队并发表重要讲话。',
          img: 'img/xidada.jpg',
          time: '2017 - 7 - 30',
        }
      ];

      function useItems(items) {
        $scope.news = $scope.news.concat(items);
        console.log($scope.news);
      }

      $scope.hasmore = false;
      $scope.loadMore = function () {
        $scope.items = [];
        $http.get('js/text.json')
          .success(function (items) {
            if (items.length == 0) {
              $scope.hasmore = true;
              return;
            }
            useItems(items);
            timer = $timeout(function () {
              $scope.$broadcast('scroll.infiniteScrollComplete');
            }, 2000);
          })
      }
    }
  )

  .controller('ChatsCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function ($scope, $ionicActionSheet, $timeout, $ionicBackdrop, $http) {
    $scope.settings = {
      enableFriends: true
    };
    $scope.show = function () {
      var hideSheet = $ionicActionSheet.show({
        buttons: [
          {text: '<b>分享</b> 他'},
          {text: '移除'}
        ],
        destructiveText: 'Delect',
        titleText: '请确认',
        cancelText: '取消',
        cancel: function () {

        },
        buttonClicked: function (index) {
          return true;
        }
      });
      $timeout(function () {
        hideSheet()
      }, 3000);
    }
    $scope.action = function () {
      $ionicBackdrop.retain();
      $timeout(function () {
        $ionicBackdrop.release();
      }, 1000)
    }
    $scope.doRefresh = function () {
      $scope.$broadcast('scroll.refreshComplete');
    }
    $scope.devList = [
      {text: 'html5', checked: true},
      {text: 'css3', checked: false},
      {text: 'javascript', checked: false}
    ];
    $scope.serveList = [
      {text: "奥特曼", value: 'aoteman'},
      {text: "喜洋洋", value: 'xiyangyang'},
      {text: "灰太狼", value: 'huitailang'}
    ];
    $scope.settingsList = [
      {text: "手电筒", checked: true},
      {text: "设置", checked: false},
      {text: "省电", checked: true},
    ]
  });
