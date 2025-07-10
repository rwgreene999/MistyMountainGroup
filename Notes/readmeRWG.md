# notes

### the sendmail.php is not added to this project.  But it resembles the send mail listed below.

##### sendmail.php

    <?php
    $to = "youremail@yoursite.com";  
    $subject = "Message from your website";

    // Get and sanitize form inputs
    $name = htmlspecialchars($_POST['name'] ?? '');
    $email = htmlspecialchars($_POST['email'] ?? '');
    $message = htmlspecialchars($_POST['message'] ?? '');

    // Build the email content
    $body = "Name: $name\nEmail: $email\n\nMessage:\n$message";

    // Proper headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Optional: sendmail envelope sender (some hosts require this)
    $parameters = "-f$email";

    // Send the email
    $mail_sent = mail($to, $subject, $body, $headers, $parameters);

    // Show result
    echo $mail_sent ? "Email sent successfully." : "Failed to send email.";
    ?>

