<?php

use App\Modules\Company\Domain\Models\Company;
use App\Modules\Properties\Domain\Models\Ubigeo;
use App\Modules\Projects\Domain\Models\Project;
use App\Modules\Projects\Application\Actions\CreateProjectAction;

test('it can create a real estate project', function () {
    $company = Company::factory()->create();
    $ubigeo = Ubigeo::create([
        'id' => '150101',
        'department' => 'Lima',
        'province' => 'Lima',
        'district' => 'Lima',
    ]);

    $data = [
        'company_id' => $company->id,
        'name' => 'Residencial San Isidro',
        'description' => 'Un proyecto exclusivo',
        'status' => 'planned',
    ];

    $action = new CreateProjectAction($data);
    $project = $action->execute();

    // Since action might not handle addresses yet, we manually test the core behaviour
    $project->address()->create([
        'company_id' => $company->id,
        'ubigeo_id' => $ubigeo->id,
        'address' => 'Av. Pezet 123',
    ]);

    expect($project->name)->toBe('Residencial San Isidro');
    expect($project->status)->toBe('planned');
    
    $this->assertDatabaseHas('projects', [
        'id' => $project->id,
        'name' => 'Residencial San Isidro'
    ]);
});
