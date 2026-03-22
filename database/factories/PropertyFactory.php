<?php

namespace Database\Factories;

use App\Modules\Properties\Domain\Models\Property;
use App\Modules\Auth\Domain\Models\User;
use App\Modules\Categories\Domain\Models\Category;
use App\Modules\Projects\Domain\Models\Project;
use App\Modules\Company\Domain\Models\Company;
use Illuminate\Database\Eloquent\Factories\Factory;

class PropertyFactory extends Factory
{
    protected $model = Property::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'category_id' => Category::factory(),
            'title' => fake()->sentence(4),
            'description' => fake()->paragraph(),
            'type' => fake()->randomElement(['house', 'apartment', 'commercial', 'land', 'office']),
            'operation' => fake()->randomElement(['sale', 'rent']),
            'price' => fake()->randomFloat(2, 50000, 1000000),
            'currency' => 'USD',
            'area_total' => fake()->randomFloat(2, 50, 500),
            'area_built' => fake()->randomFloat(2, 40, 450),
            'bedrooms' => fake()->numberBetween(1, 5),
            'bathrooms' => fake()->numberBetween(1, 4),
            'parking_spots' => fake()->numberBetween(0, 3),
            'status' => 'published',
            'is_featured' => fake()->boolean(20),
            'metadata' => [],
        ];
    }
}
