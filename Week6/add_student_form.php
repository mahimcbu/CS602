<?php
require('database.php');


?>
<!DOCTYPE html>
<html>

<!-- the head section -->
<head>
    <title>My Course Manager</title>
    <link rel="stylesheet" type="text/css" href="main.css">
</head>

<!-- the body section -->
<body>
    <header><h1>Course Manager</h1></header>

    <main>
        <h1>Add Student</h1>
        <form action="add_student.php" method="post"
              id="add_student_form">

            <label>Course:</label>
            <select name="course_id">
            <?php 
                // Get all courses
                $query = "SELECT * FROM sk_courses ORDER BY courseID";
                $courses = $db->query($query);

                // Loop through the courses and add each to the dropdown list
                foreach ($courses as $course) {
                    echo '<option value="' . $course['courseID'] . '">' .$course['courseID'].'-'. $course['courseName'] . '</option>';
                }
            ?>
            </select>
            
            <br><label>First Name:</label>
            <input type="text" name="first_name"><br>

            <label>Last Name:</label>
            <input type="text" name="last_name"><br>

            <label>Email:</label>
            <input type="email" name="email"><br>


            <label>&nbsp;</label>
            <input type="submit" value="Add Student"><br>
        </form>
        <p><a href="index.php">View Student List</a></p>
    </main>

    <footer>
        <p>&copy; <?php echo date("Y"); ?> Suresh Kalathur.</p>
    </footer>
</body>
</html>