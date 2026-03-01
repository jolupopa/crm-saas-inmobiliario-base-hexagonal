<?php

namespace App\Modules\Billing\Application\Actions;

use App\Core\BaseAction;
use App\Modules\Billing\Domain\Models\Subscription;
use Illuminate\Support\Facades\DB;

class SubscribeToPlanAction extends BaseAction
{
    public function __construct(
        protected string $planId,
        protected ?string $companyId = null,
        protected ?string $userId = null,
        protected int $durationDays = 30
    ) {}

    public function execute(): Subscription
    {
        return DB::transaction(function () {
            // Cancel active subscriptions for this entity
            Subscription::where('status', 'active')
                ->when($this->companyId, fn($q) => $q->where('company_id', $this->companyId))
                ->when($this->userId, fn($q) => $q->where('user_id', $this->userId))
                ->update(['status' => 'canceled']);

            return Subscription::create([
                'company_id' => $this->companyId,
                'user_id' => $this->userId,
                'plan_id' => $this->planId,
                'starts_at' => now(),
                'ends_at' => now()->addDays($this->durationDays),
                'status' => 'active',
            ]);
        });
    }
}
