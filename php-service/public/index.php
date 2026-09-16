<?php
/**
 * AutoFlow AI - PHP Legacy Integration Service
 * Handles legacy system data processing, customer record management,
 * and data transformation between modern and legacy formats.
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-API-Key');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Configuration
$config = [
    'api_key' => getenv('PHP_SERVICE_API_KEY') ?: 'default-php-key',
    'db_host' => getenv('DB_HOST') ?: 'localhost',
    'db_name' => getenv('DB_NAME') ?: 'autoflow_legacy',
    'environment' => getenv('APP_ENV') ?: 'development',
];

// Simple router
$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = rtrim($path, '/');

// Route matching
switch (true) {
    case $path === '/api/php/health' && $method === 'GET':
        handleHealth();
        break;
    case $path === '/api/php/process' && $method === 'POST':
        handleProcess();
        break;
    case $path === '/api/php/customers' && $method === 'GET':
        handleGetCustomers();
        break;
    case $path === '/api/php/customers' && $method === 'POST':
        handleCreateCustomer();
        break;
    case preg_match('#^/api/php/customers/(\w+)$#', $path, $matches) && $method === 'GET':
        handleGetCustomer($matches[1]);
        break;
    case preg_match('#^/api/php/customers/(\w+)$#', $path, $matches) && $method === 'PUT':
        handleUpdateCustomer($matches[1]);
        break;
    case $path === '/api/php/transform' && $method === 'POST':
        handleTransform();
        break;
    case $path === '/api/php/legacy-sync' && $method === 'POST':
        handleLegacySync();
        break;
    default:
        sendResponse(404, ['error' => 'Endpoint not found', 'path' => $path]);
}

// ============ HANDLERS ============

function handleHealth() {
    sendResponse(200, [
        'status' => 'healthy',
        'service' => 'php-service',
        'version' => '1.0.0',
        'php_version' => phpversion(),
        'environment' => $GLOBALS['config']['environment'],
        'timestamp' => date('c')
    ]);
}

function handleProcess() {
    $input = getJsonInput();
    
    if (!$input) {
        sendResponse(400, ['error' => 'Invalid JSON input']);
        return;
    }
    
    // Validate required fields
    $required = ['customer_id', 'action'];
    foreach ($required as $field) {
        if (!isset($input[$field])) {
            sendResponse(422, ['error' => "Missing required field: $field"]);
            return;
        }
    }
    
    $action = $input['action'];
    $customerId = $input['customer_id'];
    $data = $input['data'] ?? [];
    
    switch ($action) {
        case 'lookup':
            $result = lookupCustomer($customerId);
            break;
        case 'update':
            $result = updateCustomerRecord($customerId, $data);
            break;
        case 'sync':
            $result = syncCustomerData($customerId, $data);
            break;
        case 'export':
            $result = exportCustomerFormat($customerId);
            break;
        default:
            sendResponse(400, ['error' => "Unknown action: $action"]);
            return;
    }
    
    sendResponse(200, [
        'status' => 'processed',
        'action' => $action,
        'customer_id' => $customerId,
        'result' => $result,
        'processed_at' => date('c')
    ]);
}

function handleGetCustomers() {
    // Simulated customer database
    $customers = getMockCustomers();
    
    $page = intval($_GET['page'] ?? 1);
    $limit = intval($_GET['limit'] ?? 10);
    $offset = ($page - 1) * $limit;
    
    $paginated = array_slice($customers, $offset, $limit);
    
    sendResponse(200, [
        'data' => $paginated,
        'pagination' => [
            'page' => $page,
            'limit' => $limit,
            'total' => count($customers),
            'pages' => ceil(count($customers) / $limit)
        ]
    ]);
}

function handleCreateCustomer() {
    $input = getJsonInput();
    
    if (!$input || !isset($input['name']) || !isset($input['email'])) {
        sendResponse(422, ['error' => 'name and email are required']);
        return;
    }
    
    // Simulate creating customer in legacy system
    $customer = [
        'id' => 'CUST_' . strtoupper(substr(md5(time() . rand()), 0, 8)),
        'name' => sanitize($input['name']),
        'email' => strtolower(trim($input['email'])),
        'phone' => $input['phone'] ?? null,
        'company' => $input['company'] ?? null,
        'status' => 'active',
        'created_at' => date('c'),
        'legacy_system' => 'php_crm_v2',
        'synced' => false
    ];
    
    sendResponse(201, [
        'status' => 'created',
        'customer' => $customer
    ]);
}

function handleGetCustomer($id) {
    $customers = getMockCustomers();
    $customer = null;
    
    foreach ($customers as $c) {
        if ($c['id'] === $id) {
            $customer = $c;
            break;
        }
    }
    
    if (!$customer) {
        sendResponse(404, ['error' => 'Customer not found', 'id' => $id]);
        return;
    }
    
    sendResponse(200, ['customer' => $customer]);
}

function handleUpdateCustomer($id) {
    $input = getJsonInput();
    
    if (!$input) {
        sendResponse(400, ['error' => 'Invalid input']);
        return;
    }
    
    // Simulate update
    sendResponse(200, [
        'status' => 'updated',
        'customer_id' => $id,
        'updated_fields' => array_keys($input),
        'updated_at' => date('c')
    ]);
}

function handleTransform() {
    $input = getJsonInput();
    
    if (!$input) {
        sendResponse(400, ['error' => 'Invalid JSON input']);
        return;
    }
    
    $format = $input['format'] ?? 'json_to_xml';
    $data = $input['data'] ?? [];
    
    switch ($format) {
        case 'json_to_xml':
            $result = jsonToXml($data);
            break;
        case 'xml_to_json':
            $result = $data; // Would parse XML in production
            break;
        case 'csv_to_json':
            $result = csvToJson($data);
            break;
        case 'legacy_to_modern':
            $result = legacyToModernFormat($data);
            break;
        case 'modern_to_legacy':
            $result = modernToLegacyFormat($data);
            break;
        default:
            sendResponse(400, ['error' => "Unknown format: $format"]);
            return;
    }
    
    sendResponse(200, [
        'status' => 'transformed',
        'format' => $format,
        'result' => $result
    ]);
}

function handleLegacySync() {
    $input = getJsonInput();
    
    if (!$input || !isset($input['records'])) {
        sendResponse(422, ['error' => 'records array is required']);
        return;
    }
    
    $records = $input['records'];
    $results = [];
    
    foreach ($records as $record) {
        // Simulate processing each record
        $results[] = [
            'id' => $record['id'] ?? 'unknown',
            'status' => 'synced',
            'legacy_id' => 'LEG_' . strtoupper(substr(md5(json_encode($record)), 0, 6)),
            'synced_at' => date('c')
        ];
    }
    
    sendResponse(200, [
        'status' => 'synced',
        'total' => count($records),
        'successful' => count($results),
        'failed' => 0,
        'results' => $results
    ]);
}

// ============ HELPERS ============

function getJsonInput() {
    $raw = file_get_contents('php://input');
    return json_decode($raw, true);
}

function sendResponse($statusCode, $data) {
    http_response_code($statusCode);
    echo json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    exit();
}

function sanitize($input) {
    return htmlspecialchars(strip_tags(trim($input)), ENT_QUOTES, 'UTF-8');
}

function getMockCustomers() {
    return [
        ['id' => 'CUST_A1B2C3', 'name' => 'Acme Corporation', 'email' => 'contact@acme.com', 'company' => 'Acme Corp', 'status' => 'active', 'tier' => 'enterprise', 'created_at' => '2024-01-15T10:00:00Z'],
        ['id' => 'CUST_D4E5F6', 'name' => 'TechStart Inc', 'email' => 'hello@techstart.io', 'company' => 'TechStart', 'status' => 'active', 'tier' => 'mid-market', 'created_at' => '2024-02-01T14:00:00Z'],
        ['id' => 'CUST_G7H8I9', 'name' => 'Global Solutions', 'email' => 'info@globalsolutions.com', 'company' => 'Global Solutions Ltd', 'status' => 'active', 'tier' => 'enterprise', 'created_at' => '2024-02-15T09:00:00Z'],
        ['id' => 'CUST_J0K1L2', 'name' => 'Small Biz Co', 'email' => 'admin@smallbiz.com', 'company' => 'Small Biz Co', 'status' => 'inactive', 'tier' => 'smb', 'created_at' => '2024-03-01T11:00:00Z'],
        ['id' => 'CUST_M3N4O5', 'name' => 'DataFlow Systems', 'email' => 'support@dataflow.dev', 'company' => 'DataFlow', 'status' => 'active', 'tier' => 'mid-market', 'created_at' => '2024-03-10T16:00:00Z'],
    ];
}

function lookupCustomer($id) {
    $customers = getMockCustomers();
    foreach ($customers as $c) {
        if ($c['id'] === $id) return $c;
    }
    return null;
}

function updateCustomerRecord($id, $data) {
    return [
        'customer_id' => $id,
        'updated' => true,
        'fields_updated' => array_keys($data),
        'timestamp' => date('c')
    ];
}

function syncCustomerData($id, $data) {
    return [
        'customer_id' => $id,
        'synced' => true,
        'source' => 'autoflow_modern',
        'target' => 'php_legacy_crm',
        'timestamp' => date('c')
    ];
}

function exportCustomerFormat($id) {
    return [
        'customer_id' => $id,
        'format' => 'legacy_xml',
        'exported' => true,
        'data' => "<customer><id>$id</id><exported>" . date('c') . "</exported></customer>"
    ];
}

function jsonToXml($data) {
    $xml = '<?xml version="1.0" encoding="UTF-8"?>';
    $xml .= '<root>';
    foreach ($data as $key => $value) {
        if (is_array($value)) {
            $xml .= "<$key>" . jsonToXml($value) . "</$key>";
        } else {
            $xml .= "<$key>" . htmlspecialchars($value) . "</$key>";
        }
    }
    $xml .= '</root>';
    return $xml;
}

function csvToJson($data) {
    // Simple CSV string to JSON conversion
    if (is_string($data) && isset($data['csv'])) {
        $lines = explode("\n", $data['csv']);
        $headers = str_getcsv(array_shift($lines));
        $result = [];
        foreach ($lines as $line) {
            $values = str_getcsv($line);
            $result[] = array_combine($headers, $values);
        }
        return $result;
    }
    return $data;
}

function legacyToModernFormat($data) {
    // Convert legacy CRM format to modern API format
    return [
        'id' => $data['legacy_id'] ?? $data['id'] ?? null,
        'full_name' => ($data['first_name'] ?? '') . ' ' . ($data['last_name'] ?? ''),
        'contact_email' => $data['email_addr'] ?? $data['email'] ?? null,
        'organization' => $data['company_name'] ?? $data['company'] ?? null,
        'metadata' => [
            'source_system' => 'legacy_crm',
            'migrated_at' => date('c'),
            'original_id' => $data['legacy_id'] ?? null
        ]
    ];
}

function modernToLegacyFormat($data) {
    // Convert modern API format to legacy CRM format
    $nameParts = explode(' ', $data['full_name'] ?? $data['name'] ?? '');
    return [
        'legacy_id' => $data['id'] ?? null,
        'first_name' => $nameParts[0] ?? '',
        'last_name' => implode(' ', array_slice($nameParts, 1)),
        'email_addr' => $data['contact_email'] ?? $data['email'] ?? null,
        'company_name' => $data['organization'] ?? $data['company'] ?? null,
        'record_type' => 'CUSTOMER',
        'status_flag' => 'A'
    ];
}
