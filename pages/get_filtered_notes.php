<?php 

include("database.php");

$filterVal = $_POST["filter"];

if($filterVal === "all") {
    $query = "SELECT * FROM notes";
    $stmt = $conn->prepare($query);
} else {
    $query = "SELECT * FROM notes WHERE status = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $filterVal);

}

if($stmt->execute()) {
    $result = $stmt->get_result();
    $notes = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($notes);

} else {
    echo ["Error" => $stmt->error];
}


?>