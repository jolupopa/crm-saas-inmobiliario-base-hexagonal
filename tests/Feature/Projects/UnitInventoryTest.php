<?php

use App\Modules\Projects\Domain\Models\Project;
use App\Modules\Projects\Domain\Models\Unit;
use App\Modules\Projects\Application\Actions\ChangeUnitStatusAction;
use App\Modules\Company\Domain\Models\Company;
use App\Modules\Properties\Domain\Models\Ubigeo;

test('it can manage unit state transitions', function () {
    $company = Company::factory()->create();
    $ubigeo = Ubigeo::create(['id' => '150101', 'department' => 'L', 'province' => 'L', 'district' => 'D']);
    
    $project = Project::create([
        'company_id' => $company->id,
        'ubigeo_id' => $ubigeo->id,
        'name' => 'Test Project'
    ]);

    $unit = Unit::create([
        'project_id' => $project->id,
        'identifier' => 'Dpto 101',
        'type' => 'apartment',
        'status' => 'available',
        'price' => 150000
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
