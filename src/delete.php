<?php
// delete.php
$env = parse_ini_file('../.env');

$servername = "localhost";
$username = $env["USER_NAME"];
$password = $env["PASSWORD"];
$dbname = "konkoloe_upload_file_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the item ID from the query string
$itemId = $_GET['id'];

// SQL to delete the item with the given ID
$sql = "DELETE FROM files WHERE id = $itemId";

$response = array();

if ($conn->query($sql) === TRUE) {
    $response['success'] = true;
} else {
    $response['success'] = false;
    $response['error'] = "Error deleting record: " . $conn->error;
}

// Close the database connection
$conn->close();

// Return the response as JSON
header('Content-Type: application/json');
echo json_encode($response);
?>