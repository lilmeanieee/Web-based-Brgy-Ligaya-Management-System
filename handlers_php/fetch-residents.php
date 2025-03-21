<?php
include 'connect.php'; // Ensure this file connects to your database

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$sql = "SELECT 
            r.resident_id, 
            CONCAT(TRIM(r.last_name), ', ', TRIM(r.first_name), 
                   CASE 
                       WHEN TRIM(r.middle_name) IS NOT NULL AND TRIM(r.middle_name) <> '' 
                       THEN CONCAT(' ', TRIM(r.middle_name)) 
                       ELSE '' 
                   END) AS name, 
            r.gender, 
            CONCAT_WS(', ', 
                NULLIF(TRIM(h.house_lot_id), ''),  
                NULLIF(TRIM(s.street_name), ''),  
                CASE 
                    WHEN a.area_id IS NOT NULL AND a.area_id <> '' 
                    THEN CONCAT('Purok ', TRIM(a.area_id)) 
                    ELSE NULL 
                END,  
                NULLIF(b.barangay_name, ''),  
                NULLIF(c.city_name, '')  
            ) AS address, 
            r.mobile_no, 
            u.status 
        FROM tbl_residents r
        JOIN tbl_address a ON r.address_id = a.address_id
        LEFT JOIN tbl_house_lot_no h ON a.house_lot_id = h.house_lot_id  
        LEFT JOIN tbl_street s ON a.street_id = s.street_id
        LEFT JOIN tbl_barangay b ON a.barangay_id = b.barangay_id
        LEFT JOIN tbl_city_municipality c ON a.city_id = c.city_id
        JOIN tbl_users u ON r.user_id = u.user_id
        ORDER BY TRIM(r.last_name) ASC, TRIM(r.first_name) ASC, TRIM(r.middle_name) ASC";

$result = $conn->query($sql);

if (!$result) {
    echo json_encode(["error" => "SQL Error: " . $conn->error]);
    exit;
}

$residents = [];

while ($row = $result->fetch_assoc()) {
    $row['address'] = trim(preg_replace('/\s+/', ' ', $row['address'] ?? ''));
    $residents[] = $row;
}

echo json_encode($residents, JSON_UNESCAPED_UNICODE);
$conn->close();
