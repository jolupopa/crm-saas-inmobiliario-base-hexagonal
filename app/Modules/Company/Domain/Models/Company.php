<?php

namespace App\Modules\Company\Domain\Models;

use App\Core\BaseModel;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Modules\Auth\Domain\Models\User;

class Company extends BaseModel
{
    protected $fillable = [
        'name',
        'email',
        'subscription_plan',
    ];

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }
}
