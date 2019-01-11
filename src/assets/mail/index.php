<?php
header("allow-control-access-origin: *");

$data = json_decode(file_get_contents("php://input"), TRUE);
$email = $data['email'];

$headers = "From: " . strip_tags($email) . "\r\n";
$headers .= "Reply-To: ". strip_tags($email) . "\r\n";
$headers .= "CC: susan@example.com\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";



$favorites = $data['favorites'];
$url = $data['url'];

$emailContent = "
<h1>Wenslijtjes</h1>
<p>Bedankt voor het aanmaken van jouw wenslijtje.</p>
<p><b>Mijn lijstje:</b></p>
<ul><li>". implode('</li><li>', $favorites) ."</li></ul>
<br><br>
<p>Je kunt jouw lijstje ook online bekijken via deze unieke link:<br>
". $url ."</p>";


mail($email, 'Lego wenslijstje', $emailContent, $headers);

