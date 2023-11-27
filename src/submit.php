<?php
$env = parse_ini_file('../.env');

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $toEmail = $env["EMAIL"];
    $subject = "Contact Form Submission";

    // Get form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // Construct the email body
    $emailBody = "Name: $name\n";
    $emailBody .= "Email: $email\n\n";
    $emailBody .= "Message:\n$message";

    // Set additional headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Attempt to send the email
    if (mail($toEmail, $subject, $emailBody, $headers)) {
        // Email sent successfully
        echo json_encode(['success' => true, 'message' => 'Message sent successfully.']);
    } else {
        // Failed to send email
        echo json_encode(['success' => false, 'message' => 'Error sending message. Please try again.']);
    }

    exit();
} else {
    // Invalid request method
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
    exit();
}
?>