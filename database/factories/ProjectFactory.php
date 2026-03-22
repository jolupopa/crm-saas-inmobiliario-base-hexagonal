<?php

namespace Database\Factories;

use App\Modules\Projects\Domain\Models\Project;
use App\Modules\Company\Domain\Models\Company;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProjectFactory extends Factory
{
    protected $model = Project::class;

    public function definition(): array
    {
        return [
            'company_id' => Company::factory(),
            'name' => fake()->sentence(3),
            'description' => fake()->paragraph(),
            'status' => 'planned',
            'metadata' => [],
        ];
    }
}
