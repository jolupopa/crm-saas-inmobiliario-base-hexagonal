<?php

use Illuminate\Support\Facades\Route;

// ── Auth Views (guest only) ──────────────────────────────────────────────────
Route::middleware('guest')->group(function () {
    Route::get('/login', fn() => inertia('Auth::Login'))->name('login');
    Route::get('/register', fn() => inertia('Auth::Register'))->name('register');
    Route::get('/forgot-password', fn() => inertia('Auth::ForgotPassword'))->name('password.request');
    Route::get('/reset-password/{token}', \App\Modules\Auth\Presentation\Controllers\ResetPasswordController::class)
        ->name('password.reset');
});

// ── Two Factor Challenge ──────────────────────────────────────────────────────
Route::get('/two-factor-challenge', \App\Modules\Auth\Presentation\Controllers\TwoFactorChallengeController::class)
    ->middleware(['web'])
    ->name('two-factor.login');

Route::get('/', \App\Modules\Public\Presentation\Controllers\HomeController::class)
    ->name('home');

Route::get('/propiedades-publico', \App\Modules\Public\Presentation\Controllers\PublicPropertyController::class)
    ->name('public.properties.index');

Route::get('/propiedad/{property}', \App\Modules\Public\Presentation\Controllers\PublicShowPropertyController::class)
    ->name('public.properties.show');

Route::get('/test-blade', function () {
    return 'Blade is working';
});

Route::post('/companies', \App\Modules\Company\Presentation\Controllers\StoreCompanyController::class)
    ->name('companies.store');

Route::group(['middleware' => ['auth', 'verified']], function () {
    Route::get('/dashboard', \App\Modules\Analytics\Presentation\Controllers\DashboardController::class)
        ->middleware('permission:dashboard.view')
        ->name('dashboard');

    // Propiedades
    Route::get('/propiedades', \App\Modules\Properties\Presentation\Controllers\ListPropertiesController::class)
        ->middleware('permission:properties.manage')
        ->name('properties.index');
    Route::get('/propiedades/crear', \App\Modules\Properties\Presentation\Controllers\CreatePropertyController::class)
        ->middleware('permission:properties.manage')
        ->name('properties.create');
    Route::post('/propiedades', \App\Modules\Properties\Presentation\Controllers\StorePropertyController::class)
        ->middleware('permission:properties.manage')
        ->name('properties.store');
    Route::get('/propiedades/{property}', \App\Modules\Properties\Presentation\Controllers\ShowPropertyController::class)
        ->name('properties.show');
    Route::get('/propiedades/{property}/editar', \App\Modules\Properties\Presentation\Controllers\EditPropertyController::class)
        ->middleware('permission:properties.manage')
        ->name('properties.edit');
    Route::put('/propiedades/{property}', \App\Modules\Properties\Presentation\Controllers\UpdatePropertyController::class)
        ->middleware('permission:properties.manage')
        ->name('properties.update');
    Route::delete('/propiedades/{property}', \App\Modules\Properties\Presentation\Controllers\DeletePropertyController::class)
        ->middleware('permission:properties.manage')
        ->name('properties.destroy');
    Route::delete('/propiedades/{property}/force', \App\Modules\Properties\Presentation\Controllers\ForceDeletePropertyController::class)
        ->name('properties.force-delete')
        ->middleware('role:admin');

    Route::post('/propiedades/consulta', \App\Modules\Properties\Presentation\Controllers\StorePropertyInquiryController::class)
        ->name('properties.inquiry.store');

    Route::get('/api/calendar/events', \App\Modules\Analytics\Presentation\Controllers\DashboardCalendarController::class)
        ->name('api.calendar.events');

    Route::get('/crm/pipeline', \App\Modules\CRM\Presentation\Controllers\PipelineController::class)
        ->middleware('permission:properties.manage')
        ->name('crm.pipeline');

    Route::get('/billing', \App\Modules\Billing\Presentation\Controllers\PricingController::class)
        ->middleware('role:admin,company')
        ->name('billing.index');

    // ── Perfil del usuario autenticado ───────────────────────────────────────
    Route::get('/profile', \App\Modules\Profile\Presentation\Controllers\ShowProfileController::class)
        ->name('profile.show');
    Route::put('/profile', \App\Modules\Profile\Presentation\Controllers\UpdateProfileController::class)
        ->name('profile.update');
    Route::post('/profile/avatar', \App\Modules\Profile\Presentation\Controllers\UpdateAvatarController::class)
        ->name('profile.avatar');

    // Admin Specific
    Route::middleware(['role:admin'])->prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', \App\Modules\Analytics\Presentation\Controllers\AdminDashboardController::class)
            ->name('dashboard');

        Route::post('/users/{user}/quota', \App\Modules\Admin\Presentation\Controllers\Users\UpdateUserQuotaController::class)->name('users.update-quota');
        
        // Users & ACL
        Route::get('/usuarios', \App\Modules\Admin\Presentation\Controllers\Users\IndexUserController::class)
            ->name('users.index');
        Route::get('/usuarios/crear', function() {
            return inertia('Admin::Users/Form', [
                'roles' => \App\Modules\ACL\Domain\Models\Role::all()
            ]);
        })->name('users.create');
        Route::post('/usuarios', \App\Modules\Admin\Presentation\Controllers\Users\StoreUserController::class)
            ->name('users.store');
        Route::get('/usuarios/{user}/editar', function(\App\Modules\Auth\Domain\Models\User $user) {
            return inertia('Admin::Users/Form', [
                'user' => $user->load('roles'),
                'roles' => \App\Modules\ACL\Domain\Models\Role::all()
            ]);
        })->name('users.edit');
        Route::put('/usuarios/{user}', \App\Modules\Admin\Presentation\Controllers\Users\UpdateUserController::class)
            ->name('users.update');
        Route::delete('/usuarios/{user}', \App\Modules\Admin\Presentation\Controllers\Users\DeleteUserController::class)
            ->name('users.destroy');

        // Properties Management
        Route::get('/gestion-propiedades', \App\Modules\Admin\Presentation\Controllers\Properties\AdminPropertyIndexController::class)
            ->name('properties.management.index');
        Route::get('/gestion-propiedades/usuario/{user}', \App\Modules\Admin\Presentation\Controllers\Properties\AdminUserPropertiesController::class)
            ->name('properties.management.user-properties');
        Route::delete('/gestion-propiedades/{property}/force', \App\Modules\Admin\Presentation\Controllers\Properties\AdminPropertyForceDeleteController::class)
            ->name('properties.management.force-delete');

        // ── Gestión ACL (Roles y Permisos) ──────────────────────────────────
        Route::get('/acl', function() {
            return inertia('Admin::Acl', [
                'roles' => \App\Modules\ACL\Domain\Models\Role::with('permissions')->get(),
                'permissions' => \App\Modules\ACL\Domain\Models\Permission::all(),
            ]);
        })->name('acl.index');

        Route::get('/categorias', \App\Modules\Categories\Presentation\Http\Controllers\Admin\IndexCategoryController::class)
            ->name('categories.index');
    });

    // ── Categorías (API) ──────────────────────────────────────────────────────
    Route::group(['prefix' => 'api/categories', 'as' => 'api.categories.'], function () {
        Route::get('/', \App\Modules\Categories\Presentation\Http\Controllers\Api\ListCategoryController::class)
            ->name('index');
        Route::post('/', \App\Modules\Categories\Presentation\Http\Controllers\Api\StoreCategoryController::class)
            ->name('store');
        Route::put('/{category}', \App\Modules\Categories\Presentation\Http\Controllers\Api\UpdateCategoryController::class)
            ->name('update');
        Route::delete('/{category}', \App\Modules\Categories\Presentation\Http\Controllers\Api\DeleteCategoryController::class)
            ->name('destroy');
    });
});
