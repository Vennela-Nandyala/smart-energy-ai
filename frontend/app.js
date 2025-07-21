angular.module('energyApp', [])
  .controller('energyCtrl', function($scope, $http) {
    $scope.entry = {};
    $scope.entries = [];

    // GET all energy entries
    const loadEntries = () => {
      $http.get('http://localhost:5000/api/energy')
        .then(res => {
          $scope.entries = res.data;
        })
        .catch(err => {
          console.error("Error fetching data", err);
        });
    };

    // POST a new energy usage entry
    $scope.addEntry = () => {
      if (!$scope.entry.device || !$scope.entry.usage) {
        alert("Please fill in both fields");
        return;
      }
       console.log("➡️ Sending to backend:", $scope.entry);

      $http.post('http://localhost:5000/api/energy', $scope.entry)
        .then(res => {
            if ($scope.entry.usage > 10) {
              alert("🚨 High Usage Alert: This device is consuming a lot of energy!");
            } else {
              alert("✅ Entry added successfully!");
            }
          $scope.entry = {};
          loadEntries();
        })
        .catch(err => {
          console.error("Error adding entry", err);
        });
    };

    loadEntries(); // Load on start
  });
