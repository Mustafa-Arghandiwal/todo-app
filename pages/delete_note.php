<?php 
    include("database.php");

    $data = json_decode(file_get_contents("php://input"), true);
    $noteId = $data["id"];
    $query = "DELETE FROM notes WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $noteId);
    if($stmt->execute()) {
        // just adding if there are no notes to show "No notes" message
        $query = "SELECT status FROM notes";
        $result = $conn->query($query);
        $statusArray = $result->fetch_all(MYSQLI_ASSOC);
        $arrayPending = array_filter($statusArray, fn($arr) => $arr["status"] === "pending");
        $arrayCompleted = array_filter($statusArray, fn($arr) => $arr["status"] === "completed");
        $noPending = false;
        $noCompleted = false;
        $noNotes = false;
        if(count($arrayPending) === 0) {
            $noPending = true;
        }
        if(count($arrayCompleted) === 0) {
            $noCompleted = true;
        }
        if($result->num_rows === 0) {
            $noNotes = true;
        }
        echo json_encode(["noPending" => $noPending, "noCompleted" => $noCompleted, "noNotes" => $noNotes]);

    } else {
        echo "Error" . $stmt->error;
    }
?>