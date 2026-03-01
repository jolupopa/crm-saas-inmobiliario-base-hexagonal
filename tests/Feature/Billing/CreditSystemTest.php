<?php

use App\Modules\Auth\Domain\Models\User;
use App\Modules\Company\Domain\Models\Company;
use App\Modules\Billing\Domain\Models\CreditTransaction;
use App\Modules\Billing\Application\Actions\AddCreditsAction;
use App\Modules\Billing\Application\Actions\ConsumeCreditsAction;

test('it can buy and consume credits', function () {
    $company = Company::factory()->create();
    $user = User::factory()->create(['company_id' => $company->id]);

    // 1. Add Credits
    $addAction = new AddCreditsAction($company->id, $user->id, 100, 'purchase', 'Pack de 100');
    $addAction->execute();

    $this->assertDatabaseHas('credit_transactions', [
        'company_id' => $company->id,
        'amount' => 100,
        'balance_after' => 100
    ]);

    // 2. Consume Credits
    $consumeAction = new ConsumeCreditsAction($company->id, $user->id, 10, 'Publicación de anuncio');
    $consumeAction->execute();

    $this->assertDatabaseHas('credit_transactions', [
        'company_id' => $company->id,
        'amount' => -10,
        'balance_after' => 90
    ]);
});

test('it throws exception on insufficient balance', function () {
    $company = Company::factory()->create();
    $user = User::factory()->create(['company_id' => $company->id]);

    $consumeAction = new ConsumeCreditsAction($company->id, $user->id, 50);
    
    expect(fn() => $consumeAction->execute())->toThrow(RuntimeException::class, 'Insufficient credits.');
});
