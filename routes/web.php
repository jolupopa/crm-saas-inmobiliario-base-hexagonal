<?php

use Illuminate\Support\Facades\Route;

// ── Auth Views (guest only) ──────────────────────────────────────────────────
Route::middleware('guest')->group(function () {
    Route::get('/login', fn() => inertia('Auth::Login'))->name('login');
    Route::get('/register', fn() => inertia('Auth::Register'))->name('register');
    Route::get('/forgot-password', fn() => inertia('Auth::ForgotPassword'))->name('password.request');
});

// ── Public ───────────────────────────────────────────────────────────────────
Route::get('/', \App\Modules\Public\Presentation\Controllers\HomeController::class)
    ->name('home');


Route::get('/test-blade', function () {
    return 'Blade is working';
});

Route::post('/companies', \App\Modules\Company\Presentation\Controllers\StoreCompanyController::class)
    ->name('companies.store');

Route::group(['middleware' => ['auth', 'verified']], function () {
    Route::get('/dashboard', \App\Modules\Analytics\Presentation\Controllers\DashboardController::class)
        ->name('dashboard');

    Route::get('/propiedades', \App\Modules\Properties\Presentation\Controllers\ListPropertiesController::class)
        ->name('properties.index');

    Route::get('/propiedades/crear', \App\Modules\Properties\Presentation\Controllers\CreatePropertyController::class)
        ->name('properties.create');

    Route::get('/crm/pipeline', \App\Modules\CRM\Presentation\Controllers\PipelineController::class)
        ->name('crm.pipeline');

    Route::get('/billing', \App\Modules\Billing\Presentation\Controllers\PricingController::class)
        ->name('billing.index');

    // Admin / Usuarios
    Route::group(['prefix' => 'admin', 'as' => 'admin.'], function () {
        Route::get('/usuarios', \App\Modules\Admin\Presentation\Controllers\Users\IndexUserController::class)
            ->name('users.index');
        Route::get('/usuarios/crear', function() {
            return inertia('Admin::Users/Form');
        })->name('users.create');
        Route::post('/usuarios', \App\Modules\Admin\Presentation\Controllers\Users\StoreUserController::class)
            ->name('users.store');
        Route::get('/usuarios/{user}/editar', function(\App\Modules\Auth\Domain\Models\User $user) {
            return inertia('Admin::Users/Form', ['user' => $user]);
        })->name('users.edit');
        Route::put('/usuarios/{user}', \App\Modules\Admin\Presentation\Controllers\Users\UpdateUserController::class)
            ->name('users.update');
        Route::delete('/usuarios/{user}', \App\Modules\Admin\Presentation\Controllers\Users\DeleteUserController::class)
            ->name('users.destroy');
    });
});

