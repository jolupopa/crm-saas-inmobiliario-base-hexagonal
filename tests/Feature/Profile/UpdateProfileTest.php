<?php

use App\Modules\Auth\Domain\Models\User;
use App\Modules\Company\Domain\Models\Company;

test('authenticated user can view their profile', function () {
    $user = User::factory()->create(['company_name' => 'Agencia Test']);

    $response = $this->actingAs($user)->get(route('profile.show'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('Profile::Profile', false)
        ->has('user.data')
        ->where('user.data.email', $user->email)
    );
});

test('authenticated user can update their profile information', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->put(route('profile.update'), [
        'name'         => 'Nuevo Nombre',
        'email'        => 'nuevo@email.com',
        'company_name' => 'Nueva Empresa',
    ]);

    $response->assertRedirect(route('profile.show'));
    $this->assertDatabaseHas('users', [
        'id'           => $user->id,
        'name'         => 'Nuevo Nombre',
        'email'        => 'nuevo@email.com',
        'company_name' => 'Nueva Empresa',
    ]);
});

test('profile update rejects duplicate email from another user', function () {
    $existingUser = User::factory()->create(['email' => 'taken@email.com']);
    $user         = User::factory()->create();

    $response = $this->actingAs($user)->put(route('profile.update'), [
        'name'  => $user->name,
        'email' => 'taken@email.com',
    ]);

    $response->assertSessionHasErrors('email');
});

test('profile update accepts same email for the same user', function () {
    $user = User::factory()->create(['email' => 'same@email.com']);

    $response = $this->actingAs($user)->put(route('profile.update'), [
        'name'  => 'Updated Name',
        'email' => 'same@email.com',
    ]);

    $response->assertRedirect(route('profile.show'));
});

test('unauthenticated user cannot update profile', function () {
    $response = $this->put(route('profile.update'), ['name' => 'Hacker']);

    $response->assertRedirect(route('login'));
});

test('profile response does not expose sensitive data', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get(route('profile.show'));

    $response->assertInertia(fn ($page) => $page
        ->missing('user.data.password')
        ->missing('user.data.two_factor_secret')
    );
});
