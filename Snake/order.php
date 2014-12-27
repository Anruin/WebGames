<?php
if (strtolower($_SERVER['REQUEST_METHOD']) != 'post'):
	die('unsupported');
endif;
$options1 = array(
		'options' => array(
				'regexp' => '/^[А-Яа-яЁёA-Za-z0-9 .\-]+$/iu'
		)
);
//$name = filter_var($_POST['name'], FILTER_VALIDATE_REGEXP, $options1);
$name = $_POST['name'];
$email = $_POST['email'];
//$email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
$phone = $_POST['phone'];
//$subscribe = (array_key_exists('subscribe', $_POST) ? filter_var($_POST['subscribe'], FILTER_VALIDATE_BOOLEAN) : 0);
$subscribe = $_POST['subscribe'];
if ($name === FALSE || $email === FALSE || $phone === FALSE):
	$status = 'invalid';
else:
	$subscribe_str = $subscribe ? 'Да' : 'Нет';
	$destination_mail = 'hello@verstak.ru';
	$theme = 'Web Games Order';
	$message = "Имя: {$name}\nПочта: {$email}\nПоздравление: {$phone}\nПодписка: {$subscribe_str}";
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
