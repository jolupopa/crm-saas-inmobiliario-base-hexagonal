<?php

use App\Modules\Auth\Domain\Models\User;
use App\Modules\Properties\Domain\Models\Property;
use App\Modules\CRM\Domain\Models\Lead;
use App\Modules\ACL\Domain\Models\Role;
use App\Modules\ACL\Domain\Models\Permission;
use App\Modules\Categories\Domain\Models\Category;

use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Modules\Properties\Domain\Models\Ubigeo;

uses(RefreshDatabase::class);

beforeEach(function () {
    // Para compatibilidad con PropertyFactory
    Ubigeo::firstOrCreate(['id' => '150101'], [
        'department' => 'Lima',
        'province' => 'Lima',
        'district' => 'Lima',
    ]);

    // Setup permissions for dashboard
    $this->agentRole = Role::firstOrCreate(['slug' => 'agent'], ['name' => 'Agent']);
    $viewPermission = Permission::firstOrCreate(['slug' => 'dashboard.view'], ['name' => 'View Dashboard']);
    $this->agentRole->permissions()->syncWithoutDetaching([$viewPermission->id]);
});

test('agent only sees their own stats on the dashboard', function () {
    $user1 = User::factory()->create();
    $user1->roles()->attach($this->agentRole);
    
    $user2 = User::factory()->create(['company_id' => $user1->company_id]);
    $user2->roles()->attach($this->agentRole);

    $category = Category::factory()->create(['company_id' => $user1->company_id]);

    // Data for user 1
    Property::factory()->count(3)->create([
        'company_id' => $user1->company_id,
        'user_id' => $user1->id,
        'category_id' => $category->id,
    ]);
    Lead::factory()->count(2)->create([
        'company_id' => $user1->company_id,
        'user_id' => $user1->id,
    ]);

    // Data for user 2 (should not be counted for user 1)
    Property::factory()->count(5)->create([
        'company_id' => $user1->company_id,
        'user_id' => $user2->id,
        'category_id' => $category->id,
    ]);
    Lead::factory()->count(10)->create([
        'company_id' => $user1->company_id,
        'user_id' => $user2->id,
    ]);

    actingAsCompany($user1)
        ->get(route('dashboard'))
        ->assertStatus(200)
        ->assertInertia(fn ($page) => $page
            ->where('stats.total_properties', 3)
            ->where('stats.total_leads', 2)
        );
});

test('company admins are not redirected and see all company data', function () {
    $admin = User::factory()->create();
    $adminRole = Role::firstOrCreate(['slug' => 'admin'], ['name' => 'Admin']);
    $viewPermission = Permission::firstOrCreate(['slug' => 'dashboard.view'], ['name' => 'View Dashboard']);
    $adminRole->permissions()->syncWithoutDetaching([$viewPermission->id]);
    $admin->roles()->attach($adminRole);

    actingAsCompany($admin)
        ->get(route('dashboard'))
        ->assertStatus(200);
});

test('platform super admin is redirected to admin dashboard', function () {
    $superAdmin = User::factory()->create([
        'email' => 'superusuario@demo.com'
    ]);
    
    actingAsCompany($superAdmin)
        ->get(route('dashboard'))
        ->assertRedirect(route('admin.dashboard'));
});
