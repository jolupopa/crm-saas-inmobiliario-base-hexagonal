<?php

namespace Tests\Feature\Analytics;

use App\Modules\Auth\Domain\Models\User;
use App\Modules\Company\Domain\Models\Company;
use App\Modules\Properties\Domain\Models\Property;
use App\Modules\CRM\Domain\Models\Lead;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

use App\Modules\ACL\Domain\Models\Role;
use App\Modules\ACL\Domain\Models\Permission;

class DashboardConsistencyTest extends TestCase
{
    use RefreshDatabase;

    public function test_dashboard_stats_match_property_listing_stats_for_agent()
    {
        $company = Company::factory()->create();
        $agent = User::factory()->create(['company_id' => $company->id]);
        
        \App\Modules\Properties\Domain\Models\Ubigeo::firstOrCreate(['id' => '150101'], [
            'department' => 'Lima', 'province' => 'Lima', 'district' => 'Lima'
        ]);

        $agentRole = Role::firstOrCreate(['slug' => 'agent'], ['name' => 'Agent']);
        $viewDashPerm = Permission::firstOrCreate(['slug' => 'dashboard.view'], ['name' => 'View Dashboard']);
        $managePropPerm = Permission::firstOrCreate(['slug' => 'properties.manage'], ['name' => 'Manage Properties']);
        
        $agentRole->permissions()->syncWithoutDetaching([$viewDashPerm->id, $managePropPerm->id]);
        $agent->roles()->syncWithoutDetaching([$agentRole->id]);

        $category = \App\Modules\Categories\Domain\Models\Category::factory()->create(['company_id' => $company->id]);

        // Create 3 properties for this agent
        Property::factory()->count(3)->create([
            'company_id' => $company->id,
            'user_id' => $agent->id,
            'category_id' => $category->id,
            'status' => 'published'
        ]);

        // Create 1 property for another agent in same company
        $otherAgent = User::factory()->create(['company_id' => $company->id]);
        Property::factory()->create([
            'company_id' => $company->id,
            'user_id' => $otherAgent->id,
            'category_id' => $category->id,
        ]);

        // 1. Get Dashboard stats and verify
        $this->actingAs($agent)->get('/dashboard')
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page
                ->where('stats.total_properties', 3)
                ->where('stats.recent_properties.data', function ($data) use ($agent) {
                    $this->assertCount(3, $data);
                    foreach ($data as $prop) {
                        $this->assertEquals($agent->id, Property::find($prop['id'])->user_id);
                    }
                    return true;
                })
            );

        // 2. Get Property Listing stats and verify
        $this->actingAs($agent)->get('/propiedades')
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page
                ->where('stats.total_listings', 3)
            );
    }
}
