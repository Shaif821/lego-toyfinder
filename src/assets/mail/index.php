<?php
header("allow-control-access-origin: *");

$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'];

$headers = "From: " . strip_tags($email) . "\r\n";
$headers .= "Reply-To: ". strip_tags($email) . "\r\n";
$headers .= "CC: susan@example.com\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";



$favoritesList = $data['favorites'];
$favorites = ' ';

for ($i = 0; $i < count($favoritesList); $i++) {
    $favorites .= '<li>' . $favoritesList[$i] . '</li>';
}

$url = $data['url'];

$emailContent = "<div style='display:flex; flex-direction: column; justify-content: center; align-items: center; color: #297fca'>
<h1 style='width: 100%; text-align: left; font-size: 40px; font-weight: 600;'>Wenslijstje</h1>
<p style='width: 100%; text-align: left; font-size: 24px;'>Bedankt voor het aanmaken van jouw wenslijstje.</p>
<p>Mijn lijstje:</p>
<ul>".  $favorites ."</ul>
<br><br>
<p>Je kunt jouw lijstje ook online bekijken via deze unieke link:<br>
". $url . "</p></div>";


mail($email, 'Lego wenslijstje', $emailContent, $headers);
