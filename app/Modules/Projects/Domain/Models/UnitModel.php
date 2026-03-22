<?php

namespace App\Modules\Projects\Domain\Models;

use App\Core\BaseModel;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class UnitModel extends BaseModel
{
    protected $fillable = [
        'project_id',
        'name',
        'type',
        'area_total',
        'bedrooms',
        'bathrooms',
        'base_price',
    ];

    protected $casts = [
        'area_total' => 'decimal:2',
        'base_price' => 'decimal:2',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function units(): HasMany
    {
        return $this->hasMany(Unit::class);
    }
}
