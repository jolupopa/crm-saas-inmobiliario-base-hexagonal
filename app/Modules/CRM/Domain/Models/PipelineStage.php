<?php

namespace App\Modules\CRM\Domain\Models;

use App\Core\BaseModel;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Traits\HasModularFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class PipelineStage extends BaseModel
{
    use SoftDeletes, HasFactory, HasModularFactory {
        HasModularFactory::newFactory insteadof HasFactory;
    }

    protected $fillable = [
        'company_id',
        'name',
        'order',
        'settings',
    ];

    protected $casts = [
        'settings' => 'array',
        'order' => 'integer',
    ];

    public function leads(): HasMany
    {
        return $this->hasMany(Lead::class);
    }
}
