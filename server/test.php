<?php
$name = isset($_POST['name']) ? htmlspecialchars($_POST['name']) : '';
$city = isset($_POST['url']) ? htmlspecialchars($_POST['url']) : '';
echo '网站名: ' . $name;
echo "\n";
echo 'URL 地址: ' .$city;
?>