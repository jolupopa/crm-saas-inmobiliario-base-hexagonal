<?php

namespace Database\Factories;

use App\Modules\CRM\Domain\Models\PipelineStage;
use App\Modules\Company\Domain\Models\Company;
use Illuminate\Database\Eloquent\Factories\Factory;

class PipelineStageFactory extends Factory
{
    protected $model = PipelineStage::class;

    public function definition(): array
    {
        return [
            'company_id' => Company::factory(),
            'name' => fake()->word(),
            'order' => fake()->numberBetween(1, 10),
            'settings' => [],
        ];
    }
}
