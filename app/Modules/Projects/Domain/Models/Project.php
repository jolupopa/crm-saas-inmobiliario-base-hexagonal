<?php

namespace App\Modules\Projects\Domain\Models;

use App\Core\BaseModel;
use App\Traits\HasCompany;
use App\Modules\Properties\Domain\Models\Address;
use App\Modules\Properties\Domain\Models\Listing;
use App\Modules\Properties\Domain\Models\Amenity;
use App\Modules\Properties\Domain\Models\Property;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

use App\Traits\HasModularFactory;

class Project extends BaseModel implements HasMedia
{
    use HasCompany, InteractsWithMedia, HasFactory, HasModularFactory {
        HasModularFactory::newFactory insteadof HasFactory;
    }

    protected $fillable = [
        'company_id',
        'name',
        'description',
        'status',
        'metadata',
    ];

    protected $casts = [
        'metadata' => 'array',
    ];

    public function address(): MorphOne
    {
        return $this->morphOne(Address::class, 'addressable');
    }

    public function listings(): MorphMany
    {
        return $this->morphMany(Listing::class, 'listable');
    }

    public function amenities(): MorphToMany
    {
        return $this->morphToMany(Amenity::class, 'amenityable', 'amenityables');
    }

    public function unitModels(): HasMany
    {
        return $this->hasMany(UnitModel::class);
    }

    public function units(): HasMany
    {
        return $this->hasMany(Unit::class);
    }
}
