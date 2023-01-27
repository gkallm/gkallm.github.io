<?php

$to = "2010144@student.goddardusd.com";
$subject = "New Trade Offer";

$message = "Name: ${first} ${last}";
$message .= "\nPhone Number: ${phone}";
$message .= "\nEmail: ${email}";
$message .= "\nOffered Car: ${year} ${make} ${model}";

mail($to, $subject, $message);