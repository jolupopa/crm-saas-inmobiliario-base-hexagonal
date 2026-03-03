<?php

namespace Database\Seeders;

use App\Modules\Categories\Domain\Models\Category;
use App\Modules\Company\Domain\Models\Company;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $companies = Company::all();

        if ($companies->isEmpty()) {
            return;
        }

        $propertyCategories = [
            'Departamento',
            'Tienda Comercial',
            'Terreno Urbano',
            'Terreno Agrícola',
        ];

        $projectCategories = [
            'Proyecto de Viviendas',
            'Proyecto Comercial',
            'Proyecto de Condominio',
        ];

        foreach ($companies as $company) {
            foreach ($propertyCategories as $name) {
                Category::updateOrCreate([
                    'company_id' => $company->id,
                    'slug' => Str::slug($name),
                    'type' => 'property',
                ], [
                    'name' => $name,
                ]);
            }

            foreach ($projectCategories as $name) {
                Category::updateOrCreate([
                    'company_id' => $company->id,
                    'slug' => Str::slug($name),
                    'type' => 'project',
                ], [
                    'name' => $name,
                ]);
            }
        }
    }
}
