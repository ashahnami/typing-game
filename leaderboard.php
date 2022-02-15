<!DOCTYPE html>
<html lang="en">
<head>
    <title>Leaderboard</title>

    <style>

        body{
            background-color: #D3D3D3;
            font-family: JetBrains Mono;
        }

        table{
            border-collapse: collapse;
            width: 20%;
            text-align: left;
            background-color: #FFFFFF;
            margin-left: auto;
            margin-right: auto;
            border-radius: 0.3rem;
            font-family: JetBrains Mono;
            box-shadow: 0 10px 20px rgba(0,0,0,.13) /* creates shadow around box */
        }

        th, td{
            padding: 1rem;
            padding-bottom: 2rem;
        }

        .navbar{
            position: static;
            padding-left: 20rem;
        }

    </style>

</head>
<body>

    <div class="navbar">
        <a href="index.php">Return home</button></a> <!-- link to return to home page -->
    </div>

    <table> <!-- creates table with two columns -->
        <tr>
            <th>name</th>
            <th>wpm</th>
        </tr>



    <?php
        session_start();

        require "connection.php";

        if(isset($_SESSION['userID'])) // checks if the userID session variable is set
        {
        
            $id = $_SESSION['userID']; // copies userID session variable to id

            $query = "SELECT UserName,HighScore FROM Users ORDER BY HighScore DESC LIMIT 10"; // selects top 10 users
            $result = mysqli_query($connection,$query);

            if($result-> num_rows > 0){
                while($row = $result-> fetch_assoc()){
                    echo "<tr><td>". $row["UserName"] ."</td><td>". $row["HighScore"]."</td></tr>"; // outputs two columns
                }
                echo "</table>";
            }

        }else{
            header("location: login.php"); // redirects to login page
            die;
        }
    ?>

    </table>
    
</body>
</html>


