<?php
    // form is processed here
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Register</title>

</head>
<body>
    <div class="container">
        <form method="post"> 

            <!-- first name field  -->
            <input type="text" name="fname" placeholder="First name" required>

            <!-- username field -->
            <input type="text" name="username" placeholder="Username" required>

            <!-- password field -->
            <input type="password" name="password" placeholder="Password" required>
            
            <input type="submit" value="Register"> <!-- creates submit button -->
        </form>
    </div>
</body>
</html>








<!--  

first name field with mininum length of 1 character and max. length 20
<input type="text" name="fname" placeholder="First name" id="fname" minLength="1" maxlength="20" required>

username field with min length of 5 and max length of 20
<input type="text" name="username" placeholder="Username" minLength="5" maxLength="20" required title="Username must be at least 5 characters long">

password field with several validation checks
<input type="password" name="password" placeholder="Password" pattern="(?=.*[a-z])(?=.*[A-Z]).{7,64}" 
    title="Password must contain be at least 7 characters long and one uppercase and lower letter" required>
 -->
