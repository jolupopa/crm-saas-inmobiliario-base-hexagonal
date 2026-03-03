<?php

use App\Modules\Auth\Domain\Models\User;
use App\Modules\Company\Domain\Models\Company;
use App\Modules\Properties\Domain\Models\Ubigeo;
use App\Modules\Properties\Application\Actions\PublishPropertyAction;
use App\Modules\Properties\Domain\Services\GeocodingServiceInterface;

test('it uses geocoding service when coordinates are missing', function () {
    $company = Company::factory()->create();
    $agent = User::factory()->create(['company_id' => $company->id]);
    
    $ubigeo = Ubigeo::create([
        'id' => '150101',
        'department' => 'Lima',
        'province' => 'Lima',
        'district' => 'Lima',
    ]);

    $details = [
        'company_id' => $company->id,
        'user_id' => $agent->id,
        'ubigeo_id' => $ubigeo->id,
        'title' => 'Dpto con Geocoding',
        'type' => 'apartment',
        'operation' => 'sale',
        'price' => 200000,
        'area_total' => 100,
        'address' => 'Miraflores, Lima',
    ];

    $mockGeocoder = Mockery::mock(GeocodingServiceInterface::class);
    $mockGeocoder->shouldReceive('geocode')
        ->once()
        ->with('Miraflores, Lima', '150101')
        ->andReturn(['latitude' => -12.1223, 'longitude' => -77.0305]);

    $action = new PublishPropertyAction($details, [], $mockGeocoder);
    $property = $action->execute();

    expect($property->latitude)->toBe(-12.1223);
    expect($property->longitude)->toBe(-77.0305);
});
