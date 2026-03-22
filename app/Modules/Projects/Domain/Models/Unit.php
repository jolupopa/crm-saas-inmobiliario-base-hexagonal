<?php

namespace App\Modules\Projects\Domain\Models;

use App\Core\BaseModel;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Unit extends BaseModel
{
    use SoftDeletes;

    protected $fillable = [
        'project_id',
        'unit_model_id',
        'identifier',
        'status',
        'floor',
        'metadata',
    ];

    protected $casts = [
        'metadata' => 'array',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function unitModel(): BelongsTo
    {
        return $this->belongsTo(UnitModel::class);
    }

    public function isAvailable(): bool
    {
        return $this->status === 'available';
    }
}
