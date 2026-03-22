<?php

namespace App\Modules\Properties\Domain\Models;

use App\Core\BaseModel;
use App\Traits\HasCompany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Modules\Projects\Domain\Models\Project;
use App\Modules\Lands\Domain\Models\Land;

use App\Traits\HasModularFactory;

class Amenity extends BaseModel
{
    use HasCompany, HasFactory, HasModularFactory {
        HasModularFactory::newFactory insteadof HasFactory;
    }

    protected $fillable = [
        'company_id',
        'name',
        'icon',
    ];

    public function properties(): MorphToMany
    {
        return $this->morphedByMany(Property::class, 'amenityable')->withoutGlobalScopes();
    }

    public function projects(): MorphToMany
    {
        return $this->morphedByMany(Project::class, 'amenityable');
    }

    public function lands(): MorphToMany
    {
        return $this->morphedByMany(Land::class, 'amenityable');
    }
}
