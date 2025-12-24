<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // Sanitize inputs
    $name    = htmlspecialchars(trim($_POST["name"]));
    $email   = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $phone   = htmlspecialchars(trim($_POST["phone"]));
    $service = htmlspecialchars(trim($_POST["service"]));
    $message = htmlspecialchars(trim($_POST["message"]));

    // Validate
    if (empty($name) || empty($email) || empty($phone) || empty($service) || empty($message)) {
        die("❌ Tous les champs sont obligatoires.");
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("❌ Email invalide.");
    }

    // Destination email
    $to = "contact@lumiatechnologie.com"; 

    // Email subject
    $subject = "Nouvelle demande de contact – LUMIA TECHNOLOGIE";

    // Email body
    $body = "
    Nom : $name
    Email : $email
    Téléphone : $phone
    Service : $service

    Message :
    $message
    ";

    // Headers
    $headers = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Send email
    if (mail($to, $subject, $body, $headers)) {
        echo "✅ Message envoyé avec succès. Merci de nous avoir contactés.";
    } else {
        echo "❌ Erreur lors de l'envoi du message.";
    }
}
?>
