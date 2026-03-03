<?php

use App\Modules\Auth\Domain\Models\User;

test('authenticated user can enable two factor authentication', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)
        ->withSession(['auth.password_confirmed_at' => time()])
        ->postJson('/user/two-factor-authentication');

    $response->assertSuccessful();
    $this->assertNotNull($user->fresh()->two_factor_secret);
});

test('authenticated user can disable two factor authentication', function () {
    $user = User::factory()->create();

    // Primero habilitamos
    $this->actingAs($user)
        ->withSession(['auth.password_confirmed_at' => time()])
        ->postJson('/user/two-factor-authentication');

    // Luego deshabilitamos
    $response = $this->actingAs($user)
        ->withSession(['auth.password_confirmed_at' => time()])
        ->deleteJson('/user/two-factor-authentication');

    $response->assertSuccessful();
    $this->assertNull($user->fresh()->two_factor_secret);
});

test('two factor challenge page renders on Inertia', function () {
    $response = $this->get(route('two-factor.login'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page->component('Auth::TwoFactorChallenge', false));
});
