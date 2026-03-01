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
        'ubigeo_id' => $ubigeo->id,
        'name' => 'Residencial San Isidro',
        'description' => 'Un proyecto exclusivo',
        'address' => 'Av. Pezet 123',
        'status' => 'under_construction',
    ];

    $action = new CreateProjectAction($data);
    $project = $action->execute();

    expect($project->name)->toBe('Residencial San Isidro');
    expect($project->status)->toBe('under_construction');
    
    $this->assertDatabaseHas('projects', [
        'id' => $project->id,
        'name' => 'Residencial San Isidro'
    ]);
});
