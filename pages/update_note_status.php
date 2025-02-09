
<?php
    include("database.php");

    $data = json_decode(file_get_contents("php://input"), true);
    // echo json_encode($data)
    $noteId = $data["noteId"];
    $changeTo = $data["changeTo"];
    $newStatus = $changeTo ? "completed" : "pending";
    $query = "UPDATE notes SET status = ? WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("si", $newStatus, $noteId);

    if($stmt->execute()) {
        echo json_encode(["noteId" => $noteId, "currStatus" => $newStatus]);

    } else {
        echo json_encode(["Error" => $stmt->error]);
    }



?>