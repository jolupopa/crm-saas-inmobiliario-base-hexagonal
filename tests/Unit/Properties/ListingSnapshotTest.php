<?php

use App\Modules\Properties\Application\Actions\CreateOrUpdateListingAction;
use App\Modules\Properties\Domain\Models\Property;
use App\Modules\Properties\Domain\Models\Listing;
use App\Modules\Auth\Domain\Models\User;

test('action accumulates price history in json', function () {
    \App\Modules\Properties\Domain\Models\Ubigeo::firstOrCreate(['id' => '150101'], [
        'department' => 'Lima',
        'province' => 'Lima',
        'district' => 'Lima',
    ]);

    $user = User::factory()->create();
    $category = \App\Modules\Categories\Domain\Models\Category::factory()->create(['company_id' => $user->company_id]);
    $property = Property::factory()->create([
        'company_id' => $user->company_id,
        'user_id' => $user->id,
        'category_id' => $category->id,
    ]);
    
    $action = app(CreateOrUpdateListingAction::class);

    // Initial Listing
    $this->actingAs($user);
    $action->execute($property, [
        'price' => 1000,
        'currency' => 'USD',
        'description' => 'Initial',
        'status' => 'active'
    ]);

    // Update Price
    $action->execute($property, [
        'price' => 1200,
        'currency' => 'USD',
        'description' => 'Updated',
        'status' => 'active'
    ]);

    $latestListing = Listing::where('listable_id', $property->id)->where('status', 'active')->first();
    
    expect($latestListing->price_history)->toHaveCount(1);
    expect($latestListing->price_history[0]['price'])->toEqual(1000);
});
