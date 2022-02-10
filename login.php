<?php

    

?>



<!DOCTYPE html>
<html lang="en">
<head>
    <title>Log in</title>
</head>
<body>
    <div class="container">
        <!-- collects user input and forwards it to the php file for processing -->
        <form action="authenticate.php" method="post"> 
            <input type="text" name="username" placeholder="Username">
            <input type="password" name="password" placeholder="Password">
            <input type="submit" value="Log in"> <!-- creates submit button -->
        </form>
    </div>
</body>
</html>



