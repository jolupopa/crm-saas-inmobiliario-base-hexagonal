<?php

use App\Modules\Auth\Domain\Models\User;

test('reset password page is accessible with valid token', function () {
    $user  = User::factory()->create();
    $token = app('auth.password.broker')->createToken($user);

    $response = $this->get(route('password.reset', ['token' => $token]));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page->component('Auth::ResetPassword', false));
});

test('forgot password page is accessible to guests', function () {
    $response = $this->get(route('password.request'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page->component('Auth::ForgotPassword', false));
});
