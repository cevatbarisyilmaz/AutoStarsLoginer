<?php
header('Access-Control-Allow-Origin: *');
require_once "LIB_parse.php";

$mail = $_POST['mail'];
$password = $_POST['password'];

$imap_stream = imap_open("{mail.bilkent.edu.tr}INBOX", $mail, $password);
$target_mails = imap_search($imap_stream, 'FROM "Bilkent University" SUBJECT "Secure Login Gateway E-Mail Verification Code"', SE_FREE, "UTF-8");

$body = imap_body($imap_stream, $target_mails[count($target_mails) - 1], FT_PEEK);
$body = quoted_printable_decode($body);
$body = imap_utf8($body);
$body = return_between($body, "Verification Code: ", " for your Bilkent University Secure Login Gateway", EXCL);

echo $body;

imap_close($imap_stream); 
?>
