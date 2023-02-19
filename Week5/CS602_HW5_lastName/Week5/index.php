<?php
require_once('database.php');

// Set the default course ID to display
$courseID = 'cs601';

if (isset($_GET['courseID'])) {
    $courseID = $_GET['courseID'];
}

$cquery = "SELECT * FROM sk_courses WHERE courseID = '$courseID'";
$course = $db->query($cquery)->fetch(); //to make it easy to access the first row of the array containing id and name 

?>

<!DOCTYPE html>
<html>

<!-- the head section -->
<head>
    <title>My Course Manager</title>
    <link rel="stylesheet" type="text/css" href="main.css" />
</head>

<!-- the body section -->
<body>
<header><h1>Course Manager</h1></header>
<main>
    <center><h1>Student List</h1></center>
    <aside>
        <!-- display a list of categories -->
        <h2>Courses</h2>
        <nav>
        <?php
        // Query the database for the list of courses
        $cquery ='SELECT courseID from sk_courses';
        $courses = $db->query($cquery);
        foreach($courses as $c){
            echo '<ul>';
            // Highlight the currently selected course
            if ($c['courseID'] == $courseID) {
                echo '<a href="#">' . $c["courseID"] . '</a>'; //This makes it unclickable
            } else {
                echo '<a href="?courseID=' . $c["courseID"] . '">' . $c["courseID"] . '</a>';
            }
            echo '</ul>';
        }
        ?>
        </nav>          
    </aside>

    <section>
        <!-- display a table of Students -->
        <?php echo '<h2>' . $course['courseID'].' - ' . $course['courseName'] . '</h2>'; ?>
        <table>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>&nbsp;</th>
            </tr>
        <?php
        // Query the database for the list of students for the selected course
        $squery = "SELECT * FROM sk_students WHERE courseID = '$courseID'";
        $students = $db->query($squery);
        foreach ($students as $student) {
            echo '<tr>';
            echo '<td>' . $student['firstName'] . '</td>';
            echo '<td>' . $student['lastName'] . '</td>';
            echo '<td>' . $student['email'] . '</td>';
            echo '<td><a href="delete_student.php?studentID=' . $student['studentID'] . '">Delete</a></td>';
            echo '</tr>';
        }
        ?>
        </table>

        <p><a href="add_student_form.php">Add Student</a></p>
        <p><a href="course_list.php">List Courses</a></p>    
    </section>
</main>

<footer>
    <p>&copy; <?php echo date("Y"); ?> Suresh Kalathur</p>
</footer>
</body>
</html>
