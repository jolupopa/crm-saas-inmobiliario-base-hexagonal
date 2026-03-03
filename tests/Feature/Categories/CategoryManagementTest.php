<?php

namespace Tests\Feature\Categories;

use App\Modules\Auth\Domain\Models\User;
use App\Modules\Company\Domain\Models\Company;
use App\Modules\Categories\Domain\Models\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use PHPUnit\Framework\Attributes\Test;

class CategoryManagementTest extends TestCase
{
    use RefreshDatabase;

    private User $user;
    private Company $company;

    protected function setUp(): void
    {
        parent::setUp();

        $this->company = Company::factory()->create();
        $this->user = User::factory()->create([
            'company_id' => $this->company->id,
        ]);
    }

    #[Test]
    public function it_can_list_categories_filtered_by_type_property()
    {
        Category::create([
            'company_id' => $this->company->id,
            'name' => 'Departamento',
            'slug' => 'departamento',
            'type' => 'property',
        ]);

        Category::create([
            'company_id' => $this->company->id,
            'name' => 'Proyecto de Viviendas',
            'slug' => 'proyecto-de-viviendas',
            'type' => 'project',
        ]);

        $response = $this->actingAs($this->user)
            ->getJson(route('api.categories.index', ['type' => 'property']));

        $response->assertStatus(200)
            ->assertJsonCount(1)
            ->assertJsonFragment(['name' => 'Departamento'])
            ->assertJsonMissing(['name' => 'Proyecto de Viviendas']);
    }

    #[Test]
    public function it_can_list_categories_filtered_by_type_project()
    {
        Category::create([
            'company_id' => $this->company->id,
            'name' => 'Departamento',
            'slug' => 'departamento',
            'type' => 'property',
        ]);

        Category::create([
            'company_id' => $this->company->id,
            'name' => 'Proyecto de Viviendas',
            'slug' => 'proyecto-de-viviendas',
            'type' => 'project',
        ]);

        $response = $this->actingAs($this->user)
            ->getJson(route('api.categories.index', ['type' => 'project']));

        $response->assertStatus(200)
            ->assertJsonCount(1)
            ->assertJsonFragment(['name' => 'Proyecto de Viviendas'])
            ->assertJsonMissing(['name' => 'Departamento']);
    }
}
