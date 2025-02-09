

<?php 
    include("database.php");

    $data = json_decode(file_get_contents("php://input"), true);
    $noteId = $data["id"];
    $newTitle = $data["newTitle"];
    $query = "UPDATE notes SET title = ? WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("si", $newTitle, $noteId);

    if($stmt->execute()) {
        $query = "SELECT * FROM notes WHERE id = $noteId";
        $result = $conn->query($query);
        $row = $result->fetch_assoc();
        echo json_encode($row);
    } else {
        echo "Error:" . $stmt->error;
    }
?>