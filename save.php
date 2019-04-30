<?php 
    $data = $_POST['data']; 
    $file = generateRandomString();
    header('Content-Type: application/json;charset=utf-8');
    if($data) {
        if (file_put_contents("save/" . $file . ".kml", $data)) {
            $output = array('file' => $file);
            echo json_encode($output);
        }
        else {
            $output = array('error' => 'Write to file error.');
            echo json_encode($output);
        }
    }
    else {
        $output = array('error' => 'unknown error.');
        if (!$data)
            $output['error'] = 'No data.';
            
        echo json_encode($output);
    }
    
    function generateRandomString($length = 16) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, strlen($characters) - 1)];
        }
        return $randomString;
    }
?>