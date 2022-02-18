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
         position: static; /* positions the return button */
         padding-bottom: 50rem;
      }

      a{
         font-size:18px; /* sets hyperlink font size */
      }


   </style>


</head>
<body>


<?php
   $id = $_SESSION['userID']; // retrieves the current user's userID
   
   $query = "SELECT Date_d,Score FROM tests WHERE UserID ='$id'";
   $result = mysqli_query($connection, $query);

   $datas = array(); // creates an empty array

   if(mysqli_num_rows($result) > 0){
      while($row = mysqli_fetch_assoc($result)){
         $datas[] = $row;
      }
   }

   $b = array(); // creates an empty array

   foreach($datas as $a){ // iterates through the array
      $c = array(); // creates an empty array
      array_push($c, $a['Date_d'],floatval($a['Score'])); // adds the two values to an array
      array_push($b, $c); // adds this array into another array
   }



   $data = json_encode($b);


   $schema = file_get_contents('schema.json');



   $fusionTable = new FusionTable($schema, $data);
   $timeSeries = new TimeSeries($fusionTable);

   $timeSeries->AddAttribute('chart', '{}');
   $timeSeries->AddAttribute('caption', '{"text":"WPM"}'); // sets the caption of the graph
   $timeSeries->AddAttribute('subcaption', '{"text":"Average WPM per day"}'); // sets the subcaption of the graph
   $timeSeries->AddAttribute('yaxis', '[{"plot":{"value":"WPM"},"title":"WPM"}]'); // sets the y-axis label
   




   $Chart = new FusionCharts( // creates a chart object
      "timeseries",
      "WPM CHART" ,
      "1000", // width
      "700", // height
      "chart",
      "json",
      $timeSeries
   );




   $Chart->render(); // renders the chart

?>

   <div class="navbar">
      <a href="index.php">Return home</button></a> <!-- link to return to home page -->
      <h1>Statistics</h1> <!-- adds heading to page --> 
    </div>
      
   <div id="chart">WPM chart</div>

</body>
</html>