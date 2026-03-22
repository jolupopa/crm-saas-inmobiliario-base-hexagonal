<?php

namespace App\Modules\CRM\Domain\Models;

use App\Core\BaseModel;
use App\Modules\Auth\Domain\Models\User;
use App\Modules\Company\Domain\Models\Company;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Traits\HasModularFactory;

class Lead extends BaseModel
{
    use SoftDeletes, HasFactory, HasModularFactory {
        HasModularFactory::newFactory insteadof HasFactory;
    }

    protected $fillable = [
        'company_id',
        'user_id',
        'pipeline_stage_id',
        'property_id',
        'unit_id',
        'client_name',
        'client_email',
        'client_phone',
        'score',
        'notes',
        'metadata',
    ];

    protected $casts = [
        'score' => 'integer',
        'metadata' => 'array',
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function agent(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function stage(): BelongsTo
    {
        return $this->belongsTo(PipelineStage::class, 'pipeline_stage_id');
    }
}
