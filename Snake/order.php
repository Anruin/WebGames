<?php
if (strtolower($_SERVER['REQUEST_METHOD']) != 'post'):
	die('unsupported');
endif;

$name = filter_var($_POST['name'], FILTER_VALIDATE_REGEXP, ['options'=>['regexp'=>'/^[А-Яа-яЁёA-Za-z0-9 .\-]+$/iu']]);
$email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
$phone = filter_var($_POST['phone'], FILTER_VALIDATE_REGEXP, ['options'=>['regexp'=>'/^[0-9 .\-+]+$/i']]);
$promo = filter_var($_POST['promo'], FILTER_VALIDATE_REGEXP, ['options'=>['regexp'=>'/^[А-Яа-яЁёA-Za-z0-9 .\-]+$/iu']]);
$subscribe = (array_key_exists('subscribe', $_POST) ? filter_var($_POST['subscribe'], FILTER_VALIDATE_BOOLEAN) : 0);

if ($name === FALSE || $email === FALSE || $phone === FALSE):
	$status = 'invalid';
else:
	$subscribe_str = $subscribe ? 'Да' : 'Нет';
	$destination_mail = 'jonybang@mail.ru';
	$theme = 'Web Games Order';
	$message = "Имя: {$name}\nПочта: {$email}\nТелефон: {$phone}\nПромо-код: {$promo}\nПодписка: {$subscribe_str}";
	$status = mail($destination_mail, $theme, $message) ? 'success' : 'error';
endif;

$invalid = array();
if (!$name) $invalid[] = 'name';
if (!$email) $invalid[] = 'email';
if (!$phone) $invalid[] = 'phone';

$data = array(
	'status' => $status,
	'invalid' => $invalid
);

header('Content-Type: application/json');
echo json_encode($data);
