<?php

use App\Modules\Auth\Domain\Models\User;
use App\Modules\Properties\Domain\Models\Property;
use App\Modules\Properties\Domain\Models\Listing;
use App\Modules\Properties\Domain\Models\Amenity;
use App\Modules\Categories\Domain\Models\Category;

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->category = Category::factory()->create(['company_id' => $this->user->company_id]);
    
    // Ensure the user has the required permission for these tests
    $permission = \App\Modules\ACL\Domain\Models\Permission::firstOrCreate([
        'slug' => 'properties.manage'
    ], [
        'name' => 'Manage Properties'
    ]);
    
    if (! $this->user->permissions->contains($permission->id)) {
        $this->user->permissions()->attach($permission->id);
        $this->user->unsetRelation('permissions'); // Refresh relation
    }
});

test('can create a property with initial listing and address', function () {
    $amenities = Amenity::factory()->count(2)->create(['company_id' => $this->user->company_id]);
    
    $data = [
        'title' => 'Penthouse de Lujo',
        'description' => 'Vista al mar increíble',
        'type' => 'apartment',
        'operation' => 'sale',
        'price' => 150000.00,
        'currency' => 'USD',
        'area_total' => 200,
        'area_built' => 180,
        'bedrooms' => 3,
        'bathrooms' => 2,
        'parking_spots' => 2,
        'user_id' => $this->user->id,
        'category_id' => $this->category->id,
        'status' => 'published',
        'amenities' => $amenities->pluck('id')->toArray(),
        'address' => [
            'address' => 'Av. Larco 123',
            'ubigeo_id' => '150101',
            'reference' => 'Frente al parque',
        ]
    ];

    // Ensure Ubigeo exists
    \Illuminate\Support\Facades\DB::table('ubigeos')->insertOrIgnore([
        'id' => '150101',
        'department' => 'Lima',
        'province' => 'Lima',
        'district' => 'Lima',
    ]);

    $response = actingAsCompany($this->user)
        ->post(route('properties.store'), $data);

    $response->assertRedirect();

    $property = Property::where('title', 'Penthouse de Lujo')->first();

    if ($property && !$property->address) {
        if (session('errors')) {
            dump("Validation Errors:", session('errors')->getMessages());
        }
        dump("Property found:", $property->toArray());
        dump("Locations in DB:", \Illuminate\Support\Facades\DB::table('property_locations')->get()->toArray());
    }

    expect($property)->not->toBeNull();
    expect($property->refresh()->address)->not->toBeNull();
    expect($property->address->address)->toBe('Av. Larco 123');

    // Verify initial listing
    $listing = Listing::where('listable_id', $property->id)->first();
    expect($listing)->not->toBeNull()
        ->and((float) $listing->price)->toBe(150000.00)
        ->and($listing->status)->toBe('active');
    
    // Verify amenities
    expect($property->amenities)->toHaveCount(2);
});

test('guest cannot create property', function () {
    $this->post(route('properties.store'), [])
        ->assertRedirect('/login');
});
