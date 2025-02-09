<?php 

include("database.php");

$data = json_decode(file_get_contents("php://input"), true);
$searchWord = $data["searchWord"];
$filter = $data["filter"];

if($filter === "all") {
    $query = "SELECT * FROM notes WHERE title like CONCAT('%', ?, '%')";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $searchWord);
} else {
    $query = "SELECT * FROM notes WHERE title like CONCAT('%', ?, '%') AND status = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ss", $searchWord, $filter);

}

if($stmt->execute()) {
    $result = $stmt->get_result();
    $notes = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($notes);
} else {
    echo json_encode(["Error" => $stmt->error]);
}






?>