<?php

namespace App\Modules\Properties\Domain\Models;

use App\Core\BaseModel;
use App\Traits\HasCompany;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use Illuminate\Database\Eloquent\Factories\HasFactory;

use App\Traits\HasModularFactory;

class Address extends BaseModel
{
    use HasCompany, HasFactory, HasModularFactory {
        HasModularFactory::newFactory insteadof HasFactory;
    }

    protected $table = 'property_locations';

    protected $fillable = [
        'company_id',
        'addressable_type',
        'addressable_id',
        'ubigeo_id',
        'address',
        'reference',
        'latitude',
        'longitude',
    ];

    public function addressable(): MorphTo
    {
        return $this->morphTo();
    }

    public function ubigeo(): BelongsTo
    {
        return $this->belongsTo(Ubigeo::class, 'ubigeo_id');
    }
}
