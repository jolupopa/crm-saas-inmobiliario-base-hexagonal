<?php

require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Modules\Auth\Domain\Models\User;
use App\Modules\Company\Domain\Models\Company;
use App\Modules\Properties\Domain\Models\Property;
use App\Modules\Categories\Domain\Models\Category;
use App\Modules\Properties\Domain\Models\Ubigeo;
use App\Modules\Properties\Domain\Models\Address;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;

config(['database.default' => 'sqlite']);
config(['database.connections.sqlite.database' => ':memory:']);

Artisan::call('migrate:fresh');

$company = Company::factory()->create();
$user = User::factory()->create(['company_id' => $company->id]);
$category = Category::create([
    'company_id' => $company->id,
    'name' => 'Luxury Villa',
    'slug' => 'luxury-villa',
    'type' => 'property'
]);

Ubigeo::create([
    'id' => '150101',
    'department' => 'Lima',
    'province' => 'Lima',
    'district' => 'Lima',
]);

$data = [
    'title' => 'Penthouse de Lujo',
    'description' => 'Vista al mar increíble',
    'category_id' => $category->id,
    'user_id' => $user->id,
    'company_id' => $company->id,
    'type' => 'apartment',
    'operation' => 'sale',
    'price' => 150000.00,
    'currency' => 'USD',
    'area_total' => 200,
    'area_built' => 180,
    'bedrooms' => 3,
    'bathrooms' => 2,
    'parking_spots' => 2,
    'status' => 'published',
    'address' => [
        'address' => 'Av. Larco 123',
        'ubigeo_id' => '150101',
        'reference' => 'Frente al parque',
    ]
];

try {
    echo "Creating...\n";
    $property = Property::create($data);
    $property->address()->create(array_merge($data['address'], ['company_id' => $company->id]));
    
    echo "Starting Query Log...\n";
    DB::enableQueryLog();
    
    echo "Loading Fresh Property...\n";
    $freshProperty = Property::find($property->id);
    
    echo "Accessing Relationship...\n";
    $addr = $freshProperty->address;
    echo "Address Result: " . ($addr ? 'FOUND' : 'NULL') . "\n";
    
    echo "\nQuery Log:\n";
    foreach (DB::getQueryLog() as $log) {
        echo "Query: " . $log['query'] . "\n";
        echo "Bindings: " . json_encode($log['bindings']) . "\n";
        echo "---\n";
    }

} catch (\Exception $e) {
    echo "FAILED: " . $e->getMessage() . "\n";
}
