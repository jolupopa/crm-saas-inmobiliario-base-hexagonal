<?php

namespace App\Modules\Projects\Application\Actions;

use App\Core\BaseAction;
use App\Modules\Projects\Domain\Models\Project;

class CreateProjectAction extends BaseAction
{
    public function __construct(
        protected array $data
    ) {}

    public function execute(): Project
    {
        $project = Project::create([
            'company_id' => $this->data['company_id'],
            'name' => $this->data['name'],
            'description' => $this->data['description'] ?? null,
            'status' => $this->data['status'] ?? 'planned',
            'metadata' => $this->data['metadata'] ?? [],
        ]);

        if (isset($this->data['ubigeo_id'])) {
            $project->address()->create([
                'company_id' => $this->data['company_id'],
                'ubigeo_id' => $this->data['ubigeo_id'],
                'address' => $this->data['address'] ?? null,
                'latitude' => $this->data['latitude'] ?? null,
                'longitude' => $this->data['longitude'] ?? null,
            ]);
        }

        return $project;
    }
}
