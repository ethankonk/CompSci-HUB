<?php
$env = parse_ini_file('../.env');

$servername = "localhost";
$username = $env["USER_NAME"];
$password = $env["PASSWORD"];
$dbname = "konkoloe_upload_file_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT title, description, file_name, id FROM files";
$result = $conn->query($sql);

$data = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($data);
?>