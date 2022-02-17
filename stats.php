<?php
   session_start();
   require("connection.php");
   include("fusioncharts.php");
?>

<!DOCTYPE html>
<html lang="en">
<head>
   <title>Stats</title>
   <script type="text/javascript" src="https://cdn.fusioncharts.com/fusioncharts/latest/fusioncharts.js"></script>
   
   <style>

      * {
         margin: 0; /* page cannot be vertically scrolled */
         box-sizing: border-box; 
         font-family: JetBrains Mono; /* sets all font families to JetBrains Mono */
      }

      body{
         display: flex;
         align-items: center; /* aligns items towards the center */
         justify-content: center;
         background-color: #D3D3D3; /* sets background colour */
         min-height: 80vh; /* moves elements downwards towards center */
      }

      .navbar{
         position: static;
         padding-bottom: 50rem;
      }

      a{
         font-size:18px; /* sets hyperlink font size */
      }

   </style>


</head>
<body>

<?php
   $id = $_SESSION['userID'];
   // $query = "SELECT Date_d,Score FROM tests WHERE UserID ='$id'";
   $query = "SELECT Date_d,Score FROM tests";


   $result = mysqli_query($connection, $query);

   $datas = array();

   if(mysqli_num_rows($result) > 0){
      while($row = mysqli_fetch_assoc($result)){
         $datas[] = $row;
      }
   }

   $b = array();

   foreach($datas as $a){
      $test = array();
      array_push($test, $a['Date_d'],floatval($a['Score']));
      array_push($b, $test);
   }

   // print_r(json_encode($b));
   // file_put_contents('stats.json',json_encode($b));




   $data = file_get_contents('stats.json');
   $schema = file_get_contents('schema.json');

   $fusionTable = new FusionTable($schema, $data);
   $timeSeries = new TimeSeries($fusionTable);

   $timeSeries->AddAttribute('chart', '{}');
   $timeSeries->AddAttribute('caption', '{"text":"WPM"}');
   $timeSeries->AddAttribute('subcaption', '{"text":"Average WPM per day"}');
   $timeSeries->AddAttribute('yaxis', '[{"plot":{"value":"WPM"},"title":"WPM"}]');
   

   // chart object
   $Chart = new FusionCharts(
      "timeseries",
      "MyFirstChart" ,
      "1000",
      "700",
      "chart-container",
      "json",
      $timeSeries
   );

   // Render the chart
   $Chart->render();

?>

   <div class="navbar">
        <a href="index.php">Return home</button></a> <!-- link to return to home page -->
    </div>
      
   <div id="chart-container">Chart will render here!</div>

</body>
</html>