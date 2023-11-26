<?php
$env = parse_ini_file('../.env');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Database connection
    $servername = "localhost";
    $username = $env["USER_NAME"];
    $password = $env["PASSWORD"];
    $dbname = "konkoloe_upload_file_db";

    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Get form data
    $title = $_POST['title'];
    $description = $_POST['description'];

    // File upload
    $file_name = $_FILES['file']['name'];
    $file_temp = $_FILES['file']['tmp_name'];
    $file_type = $_FILES['file']['type'];

    // Check if the file is a PDF
    if ($file_type == 'application/pdf') {
        // Insert data into the database
        $sql = "INSERT INTO files (title, description, file_name) VALUES ('$title', '$description', '$file_name')";
        if ($conn->query($sql) === TRUE) {
            // Move the uploaded file to a specific folder
            $upload_folder = 'uploads/';
            move_uploaded_file($file_temp, $upload_folder . $file_name);

            // Redirect back to the original page
            header('Location: ' . $_SERVER['HTTP_REFERER']);
            exit();
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    } else {
        echo "Only PDF files are allowed.";
    }

    // Close database connection
    $conn->close();
}
?>
