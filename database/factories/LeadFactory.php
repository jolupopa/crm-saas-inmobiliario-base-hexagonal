<?php

namespace Database\Factories;

use App\Modules\CRM\Domain\Models\Lead;
use App\Modules\CRM\Domain\Models\PipelineStage;
use App\Modules\Auth\Domain\Models\User;
use App\Modules\Company\Domain\Models\Company;
use Illuminate\Database\Eloquent\Factories\Factory;

class LeadFactory extends Factory
{
    protected $model = Lead::class;

    public function definition(): array
    {
        return [
            'company_id' => Company::factory(),
            'user_id' => User::factory(),
            'pipeline_stage_id' => PipelineStage::factory(),
            'client_name' => fake()->name(),
            'client_email' => fake()->safeEmail(),
            'client_phone' => fake()->phoneNumber(),
            'score' => fake()->numberBetween(0, 100),
            'notes' => fake()->paragraph(),
            'metadata' => [],
        ];
    }
}
