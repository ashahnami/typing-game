<?php

$wpm = $_POST['wpm'];
echo $wpm;

?>




<!-- php

session_start();

$id = $_SESSION['userID'];

require 'connection.php';

$wpm=$_POST['wpm'];
$sql = "INSERT INTO Users('HighScore') VALUES ('$wpm') WHERE UserID = '$id'";

if (mysqli_query($connection, $sql)) {
    echo json_encode(array("statusCode"=>200));
} 
else {
    echo json_encode(array("statusCode"=>201));
}
mysqli_close($connection);

  -->