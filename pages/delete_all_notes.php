<?php 
include("database.php");


$filter = $_POST["filter"];

if($filter === "all") {
    $query = "DELETE FROM notes";
    $stmt = $conn->prepare($query);
    
} else {
    $query = "DELETE FROM notes WHERE status = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $filter);

}

if($stmt->execute()) {
    echo json_encode(["filterDeleted" => $filter, "success" => true]);
    
} else {
    echo json_encode(["Error" => $stmt->error]);
}


?>