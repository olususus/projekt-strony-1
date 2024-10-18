<?php
header('Content-Type: application/json');

// Odbierz dane z JSON
$data = json_decode(file_get_contents("php://input"), true);

// Sprawdź, czy dane są poprawne
if (!$data || !isset($data['name']) || !isset($data['email']) || !isset($data['address']) || !isset($data['phone'])) {
    echo json_encode(["success" => false, "message" => "Brak wymaganych danych"]);
    exit;
}

// Połączenie z bazą danych
$servername = "mysql7.serv00.com";
$username = "m5236_shop_db";
$password = "Olek2009#";
$dbname = "m5236_shop_db";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Błąd połączenia z bazą danych"]);
    exit;
}

// Wstawienie zamówienia
$name = $data['name'];
$email = $data['email'];
$address = $data['address'];
$phone = $data['phone'];
$deliveryMethod = $data['deliveryMethod'];
$totalPrice = $data['totalPrice'];

$sql = "INSERT INTO orders (name, email, address, phone, delivery_method, total_price) 
        VALUES ('$name', '$email', '$address', '$phone', '$deliveryMethod', '$totalPrice')";

if ($conn->query($sql) === TRUE) {
    $orderId = $conn->insert_id;

    // Wstawienie produktów do 'order_items'
    foreach ($data['items'] as $item) {
        $productName = $item['name'];
        $productPrice = $item['price'];
        $sql_item = "INSERT INTO order_items (order_id, product_name, product_price) 
                     VALUES ('$orderId', '$productName', '$productPrice')";
        $conn->query($sql_item);
    }

    echo json_encode(["success" => true, "message" => "Zamówienie zapisane pomyślnie"]);
} else {
    echo json_encode(["success" => false, "message" => "Błąd zapisu zamówienia"]);
}

$conn->close();
?>
