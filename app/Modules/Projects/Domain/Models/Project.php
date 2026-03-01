<?php

namespace App\Modules\Projects\Domain\Models;

use App\Core\BaseModel;
use App\Modules\Company\Domain\Models\Company;
use App\Modules\Properties\Domain\Models\Ubigeo;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends BaseModel
{
    use SoftDeletes;

    protected $fillable = [
        'company_id',
        'ubigeo_id',
        'name',
        'description',
        'address',
        'latitude',
        'longitude',
        'status',
        'metadata',
    ];

    protected $casts = [
        'metadata' => 'array',
        'latitude' => 'decimal:7',
        'longitude' => 'decimal:7',
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function ubigeo(): BelongsTo
    {
        return $this->belongsTo(Ubigeo::class, 'ubigeo_id');
    }

    public function units(): HasMany
    {
        return $this->hasMany(Unit::class);
    }
}
