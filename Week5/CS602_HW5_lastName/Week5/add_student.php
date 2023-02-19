<?php
    
    require_once('database.php');

// Get the student form data
$courseID = isset($_POST["course_id"]) ? $_POST["course_id"] : "";
$fName = isset($_POST["first_name"]) ? $_POST["first_name"] : "";
$lName = isset($_POST["last_name"]) ? $_POST["last_name"] : "";
$email = isset($_POST["email"]) ? $_POST["email"] : "";




// Add the student to the database  

$query = "INSERT INTO sk_students (courseID, firstName, lastName, email) VALUES ('$courseID', '$fName', '$lName', '$email')";
$db->exec($query);

    // Display the Student List page
    include('index.php');

?>