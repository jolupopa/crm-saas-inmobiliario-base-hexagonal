<?php

namespace Tests\Feature\Public;

use App\Modules\Auth\Domain\Models\User;
use App\Modules\Company\Domain\Models\Company;
use App\Modules\Properties\Domain\Models\Property;
use App\Modules\Categories\Domain\Models\Category;
use App\Modules\Properties\Domain\Models\Ubigeo;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class PublicPropertyDetailTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->company = Company::factory()->create();
        $this->user = User::factory()->create(['company_id' => $this->company->id]);
        
        $this->ubigeo = Ubigeo::create([
            'id' => '150101',
            'department' => 'Lima',
            'province' => 'Lima',
            'district' => 'Lima',
        ]);

        $this->category = Category::create([
            'company_id' => $this->company->id,
            'name' => 'Luxury Villa',
            'slug' => 'luxury-villa',
            'type' => 'property'
        ]);
    }

    #[Test]
    public function any_user_can_view_a_published_property_detail()
    {
        $property = Property::factory()->create([
            'company_id' => $this->company->id,
            'user_id' => $this->user->id,
            'category_id' => $this->category->id,
            'status' => 'published',
            'views_count' => 5
        ]);

        $property->address()->create([
            'company_id' => $this->company->id,
            'ubigeo_id' => $this->ubigeo->id,
            'address' => 'Av. Siempre Viva 123',
            'latitude' => -12.046374,
            'longitude' => -77.042793,
        ]);

        $response = $this->get(route('public.properties.show', $property->id));
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Public::PropertyShow', false)
            ->has('property.data')
            ->where('property.data.id', $property->id)
            ->has('related.data')
        );

        $this->assertEquals(6, $property->refresh()->views_count);
    }

    #[Test]
    public function users_cannot_view_draft_properties_publicly()
    {
        $property = Property::factory()->create([
            'company_id' => $this->company->id,
            'user_id' => $this->user->id,
            'status' => 'draft'
        ]);

        $response = $this->get(route('public.properties.show', $property->id));

        $response->assertStatus(404);
    }
}
