<?php

use App\Modules\Projects\Domain\Models\Project;
use App\Modules\Projects\Domain\Models\Unit;
use App\Modules\Projects\Application\Actions\ChangeUnitStatusAction;
use App\Modules\Company\Domain\Models\Company;
use App\Modules\Properties\Domain\Models\Ubigeo;

test('it can manage unit state transitions', function () {
    $company = Company::factory()->create();
    $ubigeo = Ubigeo::create(['id' => '150101', 'department' => 'L', 'province' => 'L', 'district' => 'D']);
    
    $project = tap(Project::create([
        'company_id' => $company->id,
        'name' => 'Test Project'
    ]), function ($project) use ($ubigeo) {
        $project->address()->create([
            'company_id' => $project->company_id,
            'ubigeo_id' => $ubigeo->id,
            'address' => 'Test Address',
            'latitude' => 0.0,
            'longitude' => 0.0,
        ]);
    });

    $unitModel = \App\Modules\Projects\Domain\Models\UnitModel::create([
        'project_id' => $project->id,
        'name' => 'Modelo Base',
        'type' => 'apartment',
        'area_total' => 120.00,
        'bedrooms' => 3,
        'bathrooms' => 2,
        'base_price' => 150000
    ]);

    $unit = Unit::create([
        'project_id' => $project->id,
        'unit_model_id' => $unitModel->id,
        'identifier' => 'Dpto 101',
        'status' => 'available',
    ]);

    // 1. Reserve Unit
    $action = new ChangeUnitStatusAction($unit->id, 'reserved', ['reserved_by' => 'Client A']);
    $updatedUnit = $action->execute();

    expect($updatedUnit->status)->toBe('reserved');
    expect($updatedUnit->metadata['reserved_by'])->toBe('Client A');

    // 2. Mark as Sold
    $action = new ChangeUnitStatusAction($unit->id, 'sold');
    $finalUnit = $action->execute();

    expect($finalUnit->status)->toBe('sold');
});
