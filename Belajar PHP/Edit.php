<?php
include 'login/connect.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit</title>
</head>
<body>
    <h1>UPDATE DATA SISWA</h1>
    <?php
    include 'login/connect.php';
    $query = mysqli_query($connect, "SELECT * FROM data");
    while ($data = mysqli_fetch_Array ($query)) {
        ?>

        <form action="Edit.php" method = "POST">
            <input type="text" name="Nama" value="<?php echo $data['Nama']; ?>">
            <input type="text" name="Kelas" value="<?php echo $data['Kelas']; ?>">
            <input type="text" name="Absen" value="<?php echo $data['Absen']; ?>">
            <button type="submit" name="update">Update</button>
        </form> <?php } ?>
    }
</body>
</html>