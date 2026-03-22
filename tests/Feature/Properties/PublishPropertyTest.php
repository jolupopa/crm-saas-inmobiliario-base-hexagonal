<?php

use App\Modules\Auth\Domain\Models\User;
use App\Modules\Company\Domain\Models\Company;
use App\Modules\Properties\Domain\Models\Ubigeo;
use App\Modules\Properties\Domain\Models\Amenity;
use App\Modules\Properties\Application\Actions\PublishPropertyAction;

test('it can publish a property with amenities', function () {
    $company = Company::factory()->create();
    $agent = User::factory()->create(['company_id' => $company->id]);
    
    $ubigeo = Ubigeo::create([
        'id' => '150101',
        'department' => 'Lima',
        'province' => 'Lima',
        'district' => 'Lima',
    ]);

    $category = \App\Modules\Categories\Domain\Models\Category::create([
        'company_id' => $company->id,
        'name' => 'Apartment',
        'slug' => 'apartment',
        'type' => 'property',
    ]);

    $amenity1 = Amenity::create(['name' => 'Piscina', 'company_id' => $company->id]);
    $amenity2 = Amenity::create(['name' => 'Gimnasio', 'company_id' => $company->id]);

    $details = [
        'company_id' => $company->id,
        'user_id' => $agent->id,
        'category_id' => $category->id,
        'ubigeo_id' => $ubigeo->id,
        'title' => 'Lujoso Departamento en Miraflores',
        'type' => 'apartment',
        'operation' => 'sale',
        'price' => 250000,
        'area_total' => 120,
        'address' => 'Av. Larco 123',
    ];

    $action = new PublishPropertyAction($details, [$amenity1->id, $amenity2->id]);
    $property = $action->execute();

    expect($property->title)->toBe('Lujoso Departamento en Miraflores');
    expect($property->status)->toBe('published');
    expect($property->amenities)->toHaveCount(2);
    
    $this->assertDatabaseHas('properties', [
        'id' => $property->id,
        'title' => 'Lujoso Departamento en Miraflores'
    ]);
});
