<?php

require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

config(['database.default' => 'sqlite']);
config(['database.connections.sqlite.database' => ':memory:']);

// Run migrations
Artisan::call('migrate:fresh');

$columns = DB::select('PRAGMA table_info(properties)');
foreach ($columns as $column) {
    echo "Column: {$column->name}, Type: {$column->type}, NotNull: {$column->notnull}, Dflt: {$column->dflt_value}\n";
}
