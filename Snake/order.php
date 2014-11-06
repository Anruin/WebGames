<?php
if ($_SERVER['REQUEST_METHOD'] != 'post'):
	die('unsupported');
endif;

$name = filter_var($_POST['name'], FILTER_VALIDATE_REGEXP, '/^[А-Яа-яЁёA-Za-z0-9 .\-]+$/iu');
$email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
$phone = filter_var($_POST['phone'], FILTER_VALIDATE_REGEXP, '/^[0-9 .\-]+$/i');
$promo = filter_var($_POST['promo'], FILTER_VALIDATE_REGEXP, '/^[А-Яа-яЁёA-Za-z0-9 .\-]+$/iu');
$subscribe = filter_var($_POST['subscribe'], FILTER_VALIDATE_BOOLEAN);

if ($name === FALSE || $email === FALSE || $phone === FALSE || $promo === FALSE || $subscribe === FALSE):
	$status = 'Validation error';
else:
	$subscribe_str = $subscribe ? 'Да' : 'Нет';
	$destination_mail = 'info@verstak.ru';
	$theme = 'Web Games Order';
	$message = "Имя: {$name}\nПочта: {$email}\nТелефон: {$phone}\nПромо-код: {$promo}\nПодписка: {$subscribe_str}";
	$status = mail($destination_mail, $theme, $message) ? 'success' : 'fail';
endif;

$domain = isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : isset($_SERVER['SERVER_NAME']) ? $_SERVER['SERVER_NAME'] : '/';
header("Location: {$domain}?status={$status}");