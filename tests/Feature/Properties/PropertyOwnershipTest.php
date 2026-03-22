<?php

use App\Modules\Auth\Domain\Models\User;
use App\Modules\Properties\Domain\Models\Property;
use App\Modules\Properties\Domain\Models\Ubigeo;
use App\Modules\Categories\Domain\Models\Category;
use App\Modules\ACL\Domain\Models\Role;
use App\Modules\ACL\Domain\Models\Permission;

beforeEach(function () {
    Ubigeo::firstOrCreate(['id' => '150101'], [
        'department' => 'Lima',
        'province' => 'Lima',
        'district' => 'Lima',
    ]);

    // Setup Agent Role and Permissions
    $this->agentRole = Role::firstOrCreate(['slug' => 'agent'], ['name' => 'Agent']);
    $managePermission = Permission::firstOrCreate(['slug' => 'properties.manage'], ['name' => 'Manage Properties']);
    $this->agentRole->permissions()->syncWithoutDetaching([$managePermission->id]);
});

test('agent can only see their own properties in the listing', function () {
    $user1 = User::factory()->create();
    $user1->roles()->attach($this->agentRole);
    
    $user2 = User::factory()->create(['company_id' => $user1->company_id]);
    $user2->roles()->attach($this->agentRole);

    $category = Category::factory()->create(['company_id' => $user1->company_id]);

    // Property for user 1
    Property::factory()->create([
        'company_id' => $user1->company_id,
        'user_id' => $user1->id,
        'category_id' => $category->id,
        'title' => 'User 1 Property'
    ]);

    // Property for user 2
    Property::factory()->create([
        'company_id' => $user1->company_id,
        'user_id' => $user2->id,
        'category_id' => $category->id,
        'title' => 'User 2 Property'
    ]);

    actingAsCompany($user1)
        ->get(route('properties.index'))
        ->assertStatus(200)
        ->assertSee('User 1 Property')
        ->assertDontSee('User 2 Property');
});

test('agent cannot update someone else property', function () {
    $user1 = User::factory()->create();
    $user1->roles()->attach($this->agentRole);
    
    $user2 = User::factory()->create(['company_id' => $user1->company_id]);
    $user2->roles()->attach($this->agentRole);

    $category = Category::factory()->create(['company_id' => $user1->company_id]);

    $propertyOfUser2 = Property::factory()->create([
        'company_id' => $user1->company_id,
        'user_id' => $user2->id,
        'category_id' => $category->id,
    ]);

    actingAsCompany($user1)
        ->put(route('properties.update', $propertyOfUser2), [
            'title' => 'Malicious Update',
            'type' => 'house',
            'operation' => 'sale',
            'price' => 1000,
            'currency' => 'USD',
            'area_total' => 100,
            'address' => [
                'address' => 'Test Address',
                'ubigeo_id' => '150101'
            ]
        ])
        ->assertStatus(403);
});

test('agent cannot delete someone else property', function () {
    $user1 = User::factory()->create();
    $user1->roles()->attach($this->agentRole);
    
    $user2 = User::factory()->create(['company_id' => $user1->company_id]);
    $user2->roles()->attach($this->agentRole);

    $category = Category::factory()->create(['company_id' => $user1->company_id]);

    $propertyOfUser2 = Property::factory()->create([
        'company_id' => $user1->company_id,
        'user_id' => $user2->id,
        'category_id' => $category->id,
    ]);

    actingAsCompany($user1)
        ->delete(route('properties.destroy', $propertyOfUser2))
        ->assertStatus(403);
});

test('admin can see and manage all properties of the company', function () {
    $admin = User::factory()->create();
    $adminRole = Role::firstOrCreate(['slug' => 'admin'], ['name' => 'Admin']);
    $managePermission = Permission::firstOrCreate(['slug' => 'properties.manage'], ['name' => 'Manage Properties']);
    $adminRole->permissions()->syncWithoutDetaching([$managePermission->id]);
    $admin->roles()->attach($adminRole);
    
    $user2 = User::factory()->create(['company_id' => $admin->company_id]);
    $user2->roles()->attach($this->agentRole);

    $category = Category::factory()->create(['company_id' => $admin->company_id]);

    Property::factory()->create([
        'company_id' => $admin->company_id,
        'user_id' => $user2->id,
        'category_id' => $category->id,
        'title' => 'User 2 Property'
    ]);

    actingAsCompany($admin)
        ->get(route('properties.index'))
        ->assertStatus(200)
        ->assertSee('User 2 Property');
});
