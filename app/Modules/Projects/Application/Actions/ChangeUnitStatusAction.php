<?php

namespace App\Modules\Projects\Application\Actions;

use App\Core\BaseAction;
use App\Modules\Projects\Domain\Models\Unit;
use RuntimeException;

class ChangeUnitStatusAction extends BaseAction
{
    public function __construct(
        protected string $unitId,
        protected string $newStatus,
        protected array $metadata = []
    ) {}

    public function execute(): Unit
    {
        $unit = Unit::findOrFail($this->unitId);

        // Basic validation of state transitions can be added here
        $allowedStatuses = ['available', 'reserved', 'sold', 'blocked'];
        if (!in_array($this->newStatus, $allowedStatuses)) {
            throw new RuntimeException("Invalid unit status: {$this->newStatus}");
        }

        $unit->update([
            'status' => $this->newStatus,
            'metadata' => array_merge($unit->metadata ?? [], $this->metadata)
        ]);

        return $unit;
    }
}
