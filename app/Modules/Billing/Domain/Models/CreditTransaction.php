<?php

namespace App\Modules\Billing\Domain\Models;

use App\Core\BaseModel;
use App\Modules\Auth\Domain\Models\User;
use App\Modules\Company\Domain\Models\Company;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CreditTransaction extends BaseModel
{
    protected $fillable = [
        'company_id',
        'user_id',
        'type',
        'amount',
        'balance_after',
        'description',
        'metadata',
    ];

    protected $casts = [
        'metadata' => 'array',
        'amount' => 'integer',
        'balance_after' => 'integer',
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
