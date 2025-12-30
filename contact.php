<?php
// Configuration des headers pour JSON
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Gestion des requêtes OPTIONS (CORS preflight)
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

function jsonResponse($success, $message, $data = null) {
    $response = [
        'success' => $success,
        'message' => $message,
        'timestamp' => date('c')
    ];
    if ($data !== null) {
        $response['data'] = $data;
    }
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
    exit();
}

// Vérification de la méthode HTTP
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    jsonResponse(false, "Méthode non autorisée", ['allowed_methods' => ['POST']]);
}

// Fonction de validation robuste
function validateContactData($data) {
    $errors = [];
    
    // Validation du nom
    if (empty($data['name'])) {
        $errors['name'] = "Le nom est obligatoire";
    } elseif (strlen($data['name']) < 2) {
        $errors['name'] = "Le nom doit contenir au moins 2 caractères";
    } elseif (strlen($data['name']) > 255) {
        $errors['name'] = "Le nom ne peut pas dépasser 255 caractères";
    } elseif (!preg_match("/^[a-zA-ZÀ-ÿ\s\-']+$/u", $data['name'])) {
        $errors['name'] = "Le nom contient des caractères invalides";
    }
    
    // Validation de l'email
    if (empty($data['email'])) {
        $errors['email'] = "L'email est obligatoire";
    } elseif (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = "Format d'email invalide";
    } elseif (strlen($data['email']) > 255) {
        $errors['email'] = "L'email ne peut pas dépasser 255 caractères";
    }
    
    // Validation du téléphone (optionnel)
    if (!empty($data['phone'])) {
        if (!preg_match("/^[+]?[\d\s\-()]{8,20}$/", $data['phone'])) {
            $errors['phone'] = "Format de téléphone invalide";
        }
    }
    
    // Validation du service
    $allowedServices = ['UX/UI Design', 'Développement Web', 'Applications Mobiles', 'E-commerce', 'Conseil & Stratégie', 'Formation', 'Autre'];
    $service = isset($data['service']) ? trim($data['service']) : '';
    if ($service === '') {
        $errors['service'] = "Veuillez sélectionner un service";
    } elseif (!in_array($service, $allowedServices, true)) {
    $errors['service'] = "Service invalide";
    }
    
    // Validation du message
    if (empty($data['message'])) {
        $errors['message'] = "Le message est obligatoire";
    } elseif (strlen($data['message']) < 10) {
        $errors['message'] = "Le message doit contenir au moins 10 caractères";
    } elseif (strlen($data['message']) > 2000) {
        $errors['message'] = "Le message ne peut pas dépasser 2000 caractères";
    }
    
    return $errors;
}

// Fonction de sanitisation
function sanitizeContactData($data) {
    return [
        'name' => htmlspecialchars(trim($data['name']), ENT_QUOTES, 'UTF-8'),
        'email' => filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL),
        'phone' => htmlspecialchars(trim($data['phone'] ?? ''), ENT_QUOTES, 'UTF-8'),
        'service' => htmlspecialchars(trim($data['service']), ENT_QUOTES, 'UTF-8'),
        'message' => htmlspecialchars(trim($data['message']), ENT_QUOTES, 'UTF-8'),
        'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
        'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown'
    ];
}

// Fonction de log simple
function logContact($data, $success, $message) {
    $logData = [
        'timestamp' => date('c'),
        'ip' => $data['ip'],
        'email' => $data['email'],
        'success' => $success,
        'message' => $message
    ];
    
    $logFile = 'logs/contacts_' . date('Y-m-d') . '.log';
    $logDir = dirname($logFile);
    
    // Créer le dossier logs s'il n'existe pas
    if (!is_dir($logDir)) {
        mkdir($logDir, 0755, true);
    }
    
    file_put_contents($logFile, json_encode($logData) . "\n", FILE_APPEND | LOCK_EX);
}

// Fonction d'envoi d'email améliorée
function sendContactEmail($data) {
    $to = "contact@lumiatechnologie.com";
    
    // Sujet avec encodage UTF-8
    $subject = "=?UTF-8?B?" . base64_encode("Nouvelle demande de contact – LUMIA TECHNOLOGIE") . "?=";
    
    // Corps de l'email amélioré
    $body = "=== NOUVEAU CONTACT DEPUIS LE SITE WEB ===\n";
    $body .= "Date: " . date('d/m/Y H:i:s') . "\n";
    $body .= "IP: " . $data['ip'] . "\n\n";
    
    $body .= "INFORMATIONS DU CONTACT:\n";
    $body .= "Nom: " . $data['name'] . "\n";
    $body .= "Email: " . $data['email'] . "\n";
    $body .= "Téléphone: " . ($data['phone'] ?: 'Non renseigné') . "\n";
    $body .= "Service souhaité: " . $data['service'] . "\n\n";
    
    $body .= "MESSAGE:\n";
    $body .= str_repeat('-', 50) . "\n";
    $body .= $data['message'] . "\n";
    $body .= str_repeat('-', 50) . "\n\n";
    
    $body .= "=== FIN DU MESSAGE ===\n";
    
    // Headers améliorés
    $headers = [
        "From: LUMIA TECH Contact <noreply@lumiatechnologie.com>",
        "Reply-To: " . $data['email'],
        "X-Mailer: PHP/" . phpversion(),
        "X-Priority: 2",
        "MIME-Version: 1.0",
        "Content-Type: text/plain; charset=UTF-8",
        "Content-Transfer-Encoding: 8bit"
    ];
    
    // Tentative d'envoi
    $mailSent = mail($to, $subject, $body, implode("\r\n", $headers));
    
    // Log de la tentative
    if ($mailSent) {
        error_log("Email envoyé avec succès pour " . $data['email']);
    } else {
        error_log("Échec d'envoi d'email pour " . $data['email']);
    }
    
    return $mailSent;
}

// Traitement principal
try {
    // Récupération et validation des données
    $rawData = json_decode(file_get_contents('php://input'), true);
    
    // Si pas de JSON, essayer les données POST classiques
    if (!$rawData) {
        $rawData = $_POST;
    }
    
    // Vérification des données requises
    if (empty($rawData)) {
        jsonResponse(false, "Aucune donnée reçue");
    }
    
    // Validation des données
    $errors = validateContactData($rawData);
    if (!empty($errors)) {
        jsonResponse(false, "Données invalides", ['errors' => $errors]);
    }
    
    // Sanitisation des données
    $cleanData = sanitizeContactData($rawData);
    
    // Envoi de l'email
    $emailSent = sendContactEmail($cleanData);
    
    if ($emailSent) {
        // Log du succès
        logContact($cleanData, true, "Message envoyé avec succès");
        
        jsonResponse(true, "✅ Votre message a été envoyé avec succès ! Nous vous recontacterons dans les plus brefs délais.");
    } else {
        // Log de l'échec
        logContact($cleanData, false, "Échec d'envoi de l'email");
        
        jsonResponse(false, "❌ Une erreur s'est produite lors de l'envoi. Veuillez réessayer ou nous contacter directement par email.");
    }
    
} catch (Exception $e) {
    // Log de l'erreur
    error_log("Erreur contact: " . $e->getMessage());
    
    jsonResponse(false, "❌ Une erreur technique s'est produite. Veuillez réessayer plus tard.");
}
?>
