<?php

    // database details
    $db_hostname = "eu-cdbr-west-02.cleardb.net";
    $db_username = "b90a7a1ef0fb35";
    $db_password = "6e62399d";
    $db_name = "heroku_596c4064b5db331";

    // creates a connection to the database
    $connection = mysqli_connect($db_hostname,$db_username,$db_password,$db_name);

    // checks the connection
    if($connection->connect_error){
        die("connection failed");
    }
    echo "connection successful";

?>