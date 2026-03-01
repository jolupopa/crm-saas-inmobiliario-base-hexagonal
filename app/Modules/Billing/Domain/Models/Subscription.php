<?php

namespace App\Modules\Billing\Domain\Models;

use App\Core\BaseModel;
use App\Modules\Auth\Domain\Models\User;
use App\Modules\Company\Domain\Models\Company;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Subscription extends BaseModel
{
    use SoftDeletes;

    protected $fillable = [
        'company_id',
        'user_id',
        'plan_id',
        'starts_at',
        'ends_at',
        'status',
    ];

    protected $casts = [
        'starts_at' => 'datetime',
        'ends_at' => 'datetime',
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function plan(): BelongsTo
    {
        return $this->belongsTo(Plan::class);
    }

    public function isActive(): bool
    {
        return $this->status === 'active' && 
               ($this->ends_at === null || $this->ends_at->isFuture());
    }
}
