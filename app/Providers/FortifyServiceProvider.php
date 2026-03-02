<?php

namespace App\Providers;

use App\Domains\Auth\Actions\CreateNewUser;
use App\Domains\Auth\Actions\ResetUserPassword;
use App\Domains\Auth\Actions\UpdateUserPassword;
use App\Domains\Auth\Actions\UpdateUserProfileInformation;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;
use Laravel\Fortify\Actions\RedirectIfTwoFactorAuthenticatable;
use Laravel\Fortify\Fortify;

class FortifyServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Fortify::createUsersUsing(CreateNewUser::class);
        Fortify::updateUserProfileInformationUsing(UpdateUserProfileInformation::class);
        Fortify::updateUserPasswordsUsing(UpdateUserPassword::class);
        Fortify::resetUserPasswordsUsing(ResetUserPassword::class);
        Fortify::redirectUserForTwoFactorAuthenticationUsing(RedirectIfTwoFactorAuthenticatable::class);

        RateLimiter::for('login', function (Request $request) {
            $throttleKey = Str::transliterate(Str::lower($request->input(Fortify::username())).'|'.$request->ip());

            return Limit::perMinute(5)->by($throttleKey);
        });

        RateLimiter::for('two-factor', function (Request $request) {
            return Limit::perMinute(5)->by($request->session()->get('login.id'));
        });

        // Configuración Headless para Fortify
        Fortify::loginView(fn() => inertia('Auth::Login'));
        Fortify::registerView(fn() => inertia('Auth::Register'));
        Fortify::requestPasswordResetLinkView(fn() => inertia('Auth::ForgotPassword'));
        Fortify::resetPasswordView(fn($request) => inertia('Auth::ResetPassword', ['token' => $request->route('token'), 'email' => $request->email]));
        Fortify::verifyEmailView(fn() => response()->json(['message' => 'Email verification required'], 401));
        Fortify::confirmPasswordView(fn() => response()->json(['message' => 'Password confirmation required'], 401));

        Fortify::twoFactorChallengeView(fn() => response()->json(['message' => '2FA challenge required'], 401));
    }
}
