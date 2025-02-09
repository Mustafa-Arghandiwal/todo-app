
<?php
    include("database.php");


    $data = json_decode(file_get_contents("php://input"), true);

    if($_SERVER["REQUEST_METHOD"] == "POST") {
        $noteToAdd = $data["to-be-added-note"];
        
        $query = "INSERT INTO notes (title) VALUES (?)";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("s", $noteToAdd);
        if($stmt->execute()) {
            $noteId = $conn->insert_id;

            $query = "SELECT * FROM notes WHERE id = $noteId";
            $result = $conn->query($query);
            $row = $result->fetch_assoc();
            




            echo json_encode($row);
        } else {
            echo "Error" . $stmt->error;
        }

        


    }




?>