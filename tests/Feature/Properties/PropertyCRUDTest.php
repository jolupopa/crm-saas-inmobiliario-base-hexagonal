<?php

use App\Modules\Auth\Domain\Models\User;
use App\Modules\Company\Domain\Models\Company;
use App\Modules\Properties\Domain\Models\Property;
use App\Modules\Properties\Domain\Models\Ubigeo;
use App\Modules\Categories\Domain\Models\Category;
use App\Modules\Properties\Domain\Models\Amenity;
use App\Modules\ACL\Domain\Models\Role;
use App\Modules\ACL\Domain\Models\Permission;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->company = Company::factory()->create();
    $this->user = User::factory()->create([
        'company_id' => $this->company->id,
        'property_limit' => 10
    ]);
    
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

    $this->ubigeo = Ubigeo::create([
        'id' => '150101',
        'department' => 'Lima',
        'province' => 'Lima',
        'district' => 'Lima',
    ]);

    $this->category = Category::create([
        'company_id' => $this->company->id,
        'name' => 'Departamento',
        'slug' => 'departamento',
        'type' => 'property'
    ]);
});

test('authenticated user can list their company properties', function () {
    Property::factory()->count(3)->create([
        'company_id' => $this->company->id,
        'user_id' => $this->user->id
    ]);
    Property::factory()->create(['company_id' => Company::factory()->create()->id]);

    $response = $this->actingAs($this->user)
        ->get(route('properties.index'));

    $response->assertStatus(200);
    // Note: We skip component existence check due to module namespacing in tests
    $response->assertInertia(fn ($page) => $page
        ->component('Properties::Index', false)
        ->has('properties.data', 3)
    );
});

test('user cannot see properties from another company', function () {
    $otherCompany = Company::factory()->create();
    $otherProperty = Property::factory()->create(['company_id' => $otherCompany->id]);

    $response = $this->actingAs($this->user)
        ->get(route('properties.show', $otherProperty));

    $response->assertStatus(403);
});

test('user can create a property', function () {
    Storage::fake('public');
    $amenity = Amenity::create(['name' => 'Piscina', 'company_id' => $this->company->id]);

    $data = [
        'title' => 'Nuevo Departamento',
        'description' => 'Hermosa vista',
        'type' => 'apartment',
        'operation' => 'sale',
        'price' => 150000,
        'currency' => 'USD',
        'area_total' => 90,
        'user_id' => $this->user->id,
        'category_id' => $this->category->id,
        'status' => 'published',
        'address' => [
            'address' => 'Av. Test 123',
            'ubigeo_id' => $this->ubigeo->id,
        ],
        'amenities' => [$amenity->id],
        'images' => [UploadedFile::fake()->image('prop.jpg')]
    ];

    $response = actingAsCompany($this->user)
        ->post(route('properties.store'), $data);

    $response->assertRedirect(); // Controller redirects back
    $this->assertDatabaseHas('properties', ['title' => 'Nuevo Departamento', 'company_id' => $this->company->id]);
});

test('user can update their property', function () {
    $property = Property::factory()->create([
        'company_id' => $this->company->id,
        'user_id' => $this->user->id
    ]);

    $data = [
        'title' => 'Titulo Actualizado',
        'description' => 'Nueva desc',
        'type' => 'house',
        'operation' => 'rent',
        'price' => 2000,
        'currency' => 'USD',
        'area_total' => 120,
        'address' => [
            'address' => 'Nueva Direccion 456',
            'ubigeo_id' => $this->ubigeo->id,
        ],
    ];

    $response = actingAsCompany($this->user)
        ->put(route('properties.update', $property), $data);

    $response->assertRedirect(route('properties.show', $property));
    $this->assertDatabaseHas('properties', ['id' => $property->id, 'title' => 'Titulo Actualizado']);
});

test('user can delete their property', function () {
    $property = Property::factory()->create([
        'company_id' => $this->company->id,
        'user_id' => $this->user->id
    ]);

    $response = actingAsCompany($this->user)
        ->delete(route('properties.destroy', $property));

    $response->assertRedirect();
    $this->assertSoftDeleted('properties', ['id' => $property->id]);
});
