<?php

namespace App\Modules\ACL\Domain\Traits;

use App\Modules\ACL\Domain\Models\Permission;
use App\Modules\ACL\Domain\Models\Role;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

trait HasACL
{
    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class, 'role_user');
    }

    public function permissions(): BelongsToMany
    {
        return $this->belongsToMany(Permission::class, 'permission_user');
    }

    /**
     * Verifica si el usuario tiene un rol específico.
     */
    public function hasRole(string|array $roles): bool
    {
        // Superusuario bypass
        if ($this->email === 'superusuario@demo.com') {
            return true;
        }

        if (is_string($roles)) {
            return $this->roles->contains('slug', $roles);
        }

        if (is_array($roles)) {
            return !! collect($roles)->intersect($this->roles->pluck('slug'))->count();
        }

        return false;
    }

    /**
     * Verifica si el usuario tiene un permiso específico (vía rol o directo).
     */
    public function hasPermission(string $permission): bool
    {
        // Superusuario bypass
        if ($this->email === 'superusuario@demo.com') {
            return true;
        }

        // Vía direct permissions
        if ($this->permissions->contains('slug', $permission)) {
            return true;
        }

        // Vía roles
        foreach ($this->roles as $role) {
            if ($role->permissions->contains('slug', $permission)) {
                return true;
            }
        }

        return false;
    }
    /**
     * Verifica si el usuario es privilegiado (Admin o Company).
     */
    public function isPrivileged(): bool
    {
        return $this->hasRole(['admin', 'company']) || $this->email === 'superusuario@demo.com';
    }
}
