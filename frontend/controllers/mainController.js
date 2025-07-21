angular.module('energyApp').controller('MainController', function($scope, $http) {
  $scope.device = '';
  $scope.energyUsed = '';
  $scope.energyData = [];

  // Load existing data from server
  function loadData() {
    $http.get('http://localhost:5000/api/energy')
      .then(function(response) {
        $scope.energyData = response.data;
      })
      .catch(function(error) {
        console.error("Error loading data:", error);
      });
  }

  // Add new entry
  $scope.addEntry = function() {
    if (!$scope.device || !$scope.energyUsed) return;

    const entry = {
      device: $scope.device,
      energyUsed: parseFloat($scope.energyUsed)
    };

    $http.post('http://localhost:5000/api/energy', entry)
      .then(function(response) {
        alert(entry.energyUsed > 10 ? "🚨 High Usage!" : "✅ Entry Added");
        $scope.device = '';
        $scope.energyUsed = '';
        loadData();
      })
      .catch(function(error) {
        console.error("Error adding entry:", error);
      });
  };

  loadData();
});
