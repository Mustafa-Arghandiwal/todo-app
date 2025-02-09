<?php 
    $db_server = "sql102.infinityfree.com";
    $db_user = "if0_38254617";
    $db_name = "if0_38254617_todo_list_db";
    $db_pass = "G2sXvv1vyLQ7He";

    $conn = new mysqli($db_server, $db_user, $db_pass, $db_name);

    if($conn->connect_error) {
        die("Connection failed: {$conn->connect_error}");
    }

   

?>