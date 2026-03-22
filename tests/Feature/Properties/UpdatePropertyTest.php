<?php

use App\Modules\Auth\Domain\Models\User;
use App\Modules\Properties\Domain\Models\Property;
use App\Modules\Properties\Domain\Models\Listing;

use App\Modules\Properties\Domain\Models\Ubigeo;
use App\Modules\Categories\Domain\Models\Category;
use App\Modules\ACL\Domain\Models\Role;
use App\Modules\ACL\Domain\Models\Permission;

beforeEach(function () {
    Ubigeo::firstOrCreate([
        'id' => '150101'
    ], [
        'department' => 'Lima',
        'province' => 'Lima',
        'district' => 'Lima',
    ]);

    $this->user = User::factory()->create();
    
    // Setup ACL
    $permission = Permission::firstOrCreate([
        'slug' => 'properties.manage'
    ], [
        'name' => 'Manage Properties'
    ]);
    
    $role = Role::firstOrCreate([
        'slug' => 'agent'
    ], [
        'name' => 'Agent'
    ]);
    
    if (!$role->permissions->contains($permission->id)) {
        $role->permissions()->attach($permission);
    }
    
    $this->user->roles()->syncWithoutDetaching([$role->id]);

    $this->category = Category::factory()->create(['company_id' => $this->user->company_id]);

    $this->property = Property::factory()->create([
        'company_id' => $this->user->company_id,
        'user_id' => $this->user->id,
        'category_id' => $this->category->id,
        'price' => 100000,
        'status' => 'published'
    ]);

    // Create initial active listing
    Listing::factory()->create([
        'company_id' => $this->user->company_id,
        'listable_id' => $this->property->id,
        'listable_type' => Property::class,
        'price' => 100000,
        'status' => 'active'
    ]);
});

test('updating price creates a new listing snapshot', function () {
    $data = [
        'title' => 'Titulo Actualizado',
        'description' => $this->property->description,
        'type' => $this->property->type,
        'operation' => $this->property->operation,
        'price' => 120000,
        'currency' => $this->property->currency,
        'area_total' => $this->property->area_total,
        'address' => [
            'address' => 'Nueva Direccion',
            'ubigeo_id' => '150101',
        ],
    ];

    actingAsCompany($this->user)
        ->put(route('properties.update', $this->property->id), $data)
        ->assertRedirect();

    $this->property->refresh();
    expect((float) $this->property->price)->toBe(120000.0);

    // Verify snapshots
    $listings = Listing::where('listable_id', $this->property->id)->get();
    
    expect($listings)->toHaveCount(2);
    
    $oldListing = $listings->where('price', 100000)->first();
    $newListing = $listings->where('price', 120000)->first();

    expect($oldListing->status)->not->toBe('active')
        ->and($oldListing->ends_at)->not->toBeNull()
        ->and($newListing->status)->toBe('active')
        ->and($newListing->ends_at)->toBeNull();
});

test('updating non-critical fields does not create new listing', function () {
    $data = [
        'title' => $this->property->title,
        'description' => $this->property->description,
        'type' => $this->property->type,
        'operation' => $this->property->operation,
        'price' => $this->property->price,
        'currency' => $this->property->currency,
        'area_total' => $this->property->area_total,
        'bedrooms' => 10,
        'address' => [
            'address' => 'Misma Direccion',
            'ubigeo_id' => '150101',
        ],
    ];

    actingAsCompany($this->user)
        ->put(route('properties.update', $this->property->id), $data)
        ->assertRedirect();

    expect(Listing::where('listable_id', $this->property->id)->count())->toBe(1);
});
