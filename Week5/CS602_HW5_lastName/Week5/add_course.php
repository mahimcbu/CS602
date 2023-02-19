<?php
    require_once('database.php');

// Get the course form data
$courseID = $_POST['course_id'];
$courseName = $_POST['course_name'];


    // Add the course to the database  
$query = "INSERT INTO sk_courses (courseID, courseName) VALUES ('$courseID', '$courseName')";
$db->exec($query);
   
   
    // Display the Course List page
    include('course_list.php');

?>