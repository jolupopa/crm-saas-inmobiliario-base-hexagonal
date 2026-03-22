<?php

use App\Modules\Auth\Domain\Models\User;
use App\Modules\Properties\Domain\Models\Property;
use App\Modules\Properties\Domain\Models\Ubigeo;
use App\Modules\Categories\Domain\Models\Category;

beforeEach(function () {
    Ubigeo::firstOrCreate([
        'id' => '150101'
    ], [
        'department' => 'Lima',
        'province' => 'Lima',
        'district' => 'Lima',
    ]);
});

test('user cannot see properties from other company', function () {
    $user1 = User::factory()->create();
    $user2 = User::factory()->create();
    
    $category = Category::factory()->create(['company_id' => $user2->company_id]);
    $property = Property::factory()->create([
        'company_id' => $user2->company_id,
        'user_id' => $user2->id,
        'category_id' => $category->id,
    ]);

    actingAsCompany($user1)
        ->get(route('properties.show', $property->id))
        ->assertStatus(403);
});

test('property is automatically assigned to user company', function () {
    $user = User::factory()->create();
    $category = \App\Modules\Categories\Domain\Models\Category::factory()->create([
        'company_id' => $user->company_id
    ]);
    
    actingAsCompany($user);
    
    $property = new Property([
        'title' => 'Test',
        'price' => 100,
        'type' => 'house',
        'operation' => 'sale',
        'area_total' => 100,
        'category_id' => $category->id,
        // user_id and company_id are omitted to test automatic assignment
    ]);
    
    $property->save();

    expect($property->company_id)->toBe($user->company_id);
    expect($property->user_id)->toBe($user->id);
});
