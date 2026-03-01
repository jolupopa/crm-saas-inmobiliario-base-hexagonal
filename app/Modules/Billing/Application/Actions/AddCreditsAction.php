<?php

namespace App\Modules\Billing\Application\Actions;

use App\Core\BaseAction;
use App\Modules\Billing\Domain\Models\CreditTransaction;
use Illuminate\Support\Facades\DB;

class AddCreditsAction extends BaseAction
{
    public function __construct(
        protected string $companyId,
        protected string $userId,
        protected int $amount,
        protected string $type = 'purchase',
        protected ?string $description = null,
        protected array $metadata = []
    ) {}

    public function execute(): CreditTransaction
    {
        return DB::transaction(function () {
            $lastTransaction = CreditTransaction::where('company_id', $this->companyId)
                ->latest()
                ->first();

            $currentBalance = $lastTransaction ? $lastTransaction->balance_after : 0;
            $newBalance = $currentBalance + $this->amount;

            return CreditTransaction::create([
                'company_id' => $this->companyId,
                'user_id' => $this->userId,
                'type' => $this->type,
                'amount' => $this->amount,
                'balance_after' => $newBalance,
                'description' => $this->description,
                'metadata' => $this->metadata,
            ]);
        });
    }
}
