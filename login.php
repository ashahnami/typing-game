<?php

    if($_SERVER['REQUEST_METHOD'] == "POST")
    {
        //something was posted
        $user_name = $_POST['user_name'];
        $password = $_POST['password'];

        //read from database
        $query = "select * from users where UserName = '$user_name' limit 1";
        $result = mysqli_query($con, $query);

        if($result)
        {
            if($result && mysqli_num_rows($result) > 0)
            {

                $user_data = mysqli_fetch_assoc($result);
                
                if($user_data['password'] === $password)
                {

                    $_SESSION['user_id'] = $user_data['user_id'];
                    header("Location: index.php");
                    die;
                }
            }
        }
        
        echo "wrong username or password!";
    }else
    {
        echo "wrong username or password!";
    }

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



