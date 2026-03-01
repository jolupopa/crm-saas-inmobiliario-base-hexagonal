<?php

use App\Modules\Company\Domain\Models\Company;
use App\Modules\Billing\Domain\Models\Plan;
use App\Modules\Billing\Domain\Models\Subscription;
use App\Modules\Billing\Application\Actions\SubscribeToPlanAction;

test('it can subscribe a company to a plan', function () {
    $company = Company::factory()->create();
    $plan = Plan::create([
        'name' => 'Pro Plan',
        'slug' => 'pro-plan',
        'price' => 49.90,
        'currency' => 'USD',
        'type' => 'company'
    ]);

    $action = new SubscribeToPlanAction($plan->id, companyId: $company->id);
    $subscription = $action->execute();

    expect($subscription->status)->toBe('active');
    expect($subscription->plan_id)->toBe($plan->id);
    
    $this->assertDatabaseHas('subscriptions', [
        'company_id' => $company->id,
        'plan_id' => $plan->id,
        'status' => 'active'
    ]);
});

test('it cancels previous subscriptions when subscribing to new plan', function () {
    $company = Company::factory()->create();
    $plan1 = Plan::create(['name' => 'Plan 1', 'slug' => 'p1', 'price' => 10, 'type' => 'company']);
    $plan2 = Plan::create(['name' => 'Plan 2', 'slug' => 'p2', 'price' => 20, 'type' => 'company']);

    // First subscription
    (new SubscribeToPlanAction($plan1->id, companyId: $company->id))->execute();
    
    // Second subscription
    (new SubscribeToPlanAction($plan2->id, companyId: $company->id))->execute();

    $this->assertDatabaseHas('subscriptions', [
        'plan_id' => $plan1->id,
        'status' => 'canceled'
    ]);

    $this->assertDatabaseHas('subscriptions', [
        'plan_id' => $plan2->id,
        'status' => 'active'
    ]);
});
