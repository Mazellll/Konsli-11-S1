<?php

$server = "localhost";
$user = "root";
$password = "";
$database = "absen";

$connect = mysqli_connect ($server, $user, $password, $database);
if (!$connect) {
    die ("Koneksi Gagal : ".mysqli_connect_error());
}
?>