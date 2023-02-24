<?php
require_once('database.php');
$studentID = isset($_GET['studentID']) ? $_GET['studentID'] : null;

if ($studentID === null) {
  header('Location: index.php');
  exit;
}

$query = "DELETE FROM sk_students WHERE studentID = :studentID";
$stmt = $db->prepare($query);
$stmt->bindParam(':studentID', $studentID);
$stmt->execute();

header('Location: index.php');
exit;
