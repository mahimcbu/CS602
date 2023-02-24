<?php
require_once('database.php');

if (isset($_GET["format"]) && $_GET["format"] === 'json'){
    $format = $_GET["format"];
}else{
    $format = "json";
}
if (isset($_GET["action"]) && ($_GET['action'] == 'courses' || $_GET['action'] == 'students')){
    $action = $_GET["action"];
}else{
    $responseError = array('error' => 'Invalid action parameter');
    header('Content-type: application/json');
    $response = json_encode($responseError);
    echo $response;
    exit;
}

if ($action === 'courses'){
    $cquery = "SELECT * FROM sk_courses";
    $courses = $db->query($cquery);
    $coursesArray = $courses->fetchAll(PDO::FETCH_ASSOC); //pdo object to associative array
    header('Content-type: application/json');
    $responseCourses = json_encode($coursesArray);
    echo $responseCourses;
}else if($action === 'students'){
    if (isset($_GET['course']) && preg_match('/^[a-zA-Z0-9]+$/', $_GET['course'])) { //checking alphanumeric too
        $courseID = $_GET['course'];
    } else {
        // Return an error message if course parameter is not set or invalid
        $response = array('error' => 'Invalid course parameter');
        header('Content-type: application/json');
        $response = json_encode($response);
        echo $response;
        exit;
    }

    $squery = $db->prepare('SELECT * FROM sk_students WHERE courseID = ?');
    $squery->execute(array($courseID));
    $students = $squery->fetchAll(PDO::FETCH_ASSOC);
    
    header('Content-type: application/json');
    $response = json_encode($students);
    echo $response;
}


?>