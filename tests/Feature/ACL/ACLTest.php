<?php

use App\Modules\Auth\Domain\Models\User;
use App\Modules\ACL\Domain\Models\Role;
use App\Modules\ACL\Domain\Models\Permission;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('a user can be assigned a role', function () {
    $user = User::factory()->create();
    $role = Role::create([
        'name' => 'Administrator',
        'slug' => 'admin',
    ]);

    $user->roles()->attach($role);

    expect($user->fresh()->hasRole('admin'))->toBeTrue();
});

test('a user can have permissions through roles', function () {
    $user = User::factory()->create();
    $role = Role::create([
        'name' => 'Agent',
        'slug' => 'agent',
    ]);
    
    $permission = Permission::create([
        'name' => 'Create Property',
        'slug' => 'property.create',
    ]);

    $role->permissions()->attach($permission);
    $user->roles()->attach($role);

    expect($user->fresh()->hasPermission('property.create'))->toBeTrue();
    expect($user->fresh()->hasPermission('property.delete'))->toBeFalse();
});

test('a user can have direct permissions without roles', function () {
    $user = User::factory()->create();
    $permission = Permission::create([
        'name' => 'Edit Billing',
        'slug' => 'billing.edit',
    ]);

    $user->permissions()->attach($permission);

    expect($user->fresh()->hasPermission('billing.edit'))->toBeTrue();
});

test('superadmin bypasses all permission checks', function () {
    $user = User::factory()->create(['email' => 'superusuario@demo.com']);
    
    expect($user->hasPermission('any.crazy.permission'))->toBeTrue();
});

test('multiple roles can be checked at once', function () {
    $user = User::factory()->create();
    $roleAdmin = Role::create(['name' => 'Admin', 'slug' => 'admin']);
    $roleAgent = Role::create(['name' => 'Agent', 'slug' => 'agent']);

    $user->roles()->attach($roleAgent);

    expect($user->hasRole(['admin', 'agent']))->toBeTrue();
});
