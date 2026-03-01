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
        'identifier',
        'type',
        'status',
        'price',
        'currency',
        'area_total',
        'floor',
        'metadata',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'area_total' => 'decimal:2',
        'metadata' => 'array',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function isAvailable(): bool
    {
        return $this->status === 'available';
    }
}
