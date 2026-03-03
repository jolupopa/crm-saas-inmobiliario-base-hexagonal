<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Modules\Company\Domain\Models\Company;
use App\Modules\Auth\Domain\Models\User;
use App\Modules\Properties\Domain\Models\Ubigeo;
use App\Modules\Properties\Domain\Models\Property;
use App\Modules\Properties\Domain\Models\Amenity;
use App\Modules\Billing\Domain\Models\Plan;
use App\Modules\CRM\Domain\Models\PipelineStage;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Ubigeos (Sample for Lima)
        Ubigeo::updateOrCreate(['id' => '150101'], [
            'department' => 'Lima',
            'province' => 'Lima',
            'district' => 'Lima',
        ]);
        Ubigeo::updateOrCreate(['id' => '150122'], [
            'department' => 'Lima',
            'province' => 'Lima',
            'district' => 'Miraflores',
        ]);

        // 2. Plans
        $planBasic = Plan::create([
            'name' => 'Plan Básico',
            'slug' => 'basic',
            'description' => 'Ideal para agentes independientes',
            'price' => 29.90,
            'features' => ['10 propiedades', 'Soporte básico'],
            'is_active' => true
        ]);

        $planPremium = Plan::create([
            'name' => 'Plan Premium',
            'slug' => 'premium',
            'description' => 'Para agencias inmobiliarias',
            'price' => 99.90,
            'features' => ['Propiedades ilimitadas', 'IA Lead Scoring', 'Soporte prioritario'],
            'is_active' => true
        ]);

        // 3. Companies & Users
        $company = Company::create([
            'name' => 'Inmobiliaria Demo',
            'slug' => 'inmobiliaria-demo',
            'settings' => ['theme' => 'dark']
        ]);

        // Asegurar directorio de avatares
        $avatarPath = storage_path('app/public/avatars');
        if (!file_exists($avatarPath)) {
            mkdir($avatarPath, 0755, true);
        }

        // Función para descargar avatar de prueba
        $downloadAvatar = function($id) use ($avatarPath) {
            $filename = "avatar_{$id}.jpg";
            $target = "{$avatarPath}/{$filename}";
            if (!file_exists($target)) {
                $content = @file_get_contents("https://i.pravatar.cc/300?u={$id}");
                if ($content) {
                    file_put_contents($target, $content);
                    return "avatars/{$filename}";
                }
            }
            return null;
        };

        $admin = User::create([
            'company_id'   => $company->id,
            'name'         => 'Admin Demo',
            'company_name' => 'Real Estate Premium',
            'email'        => 'admin@demo.com',
            'password'     => Hash::make('password'),
            'avatar_url'   => $downloadAvatar('admin'),
        ]);

        // Crear algunos usuarios de equipo
        $team = [
            ['name' => 'Carla Méndez', 'email' => 'carla@demo.com', 'company' => 'Méndez Properties'],
            ['name' => 'Roberto Sánchez', 'email' => 'roberto@demo.com', 'company' => 'Sánchez & Co'],
        ];

        foreach ($team as $index => $member) {
            User::create([
                'company_id'   => $company->id,
                'name'         => $member['name'],
                'company_name' => $member['company'],
                'email'        => $member['email'],
                'password'     => Hash::make('password'),
                'avatar_url'   => $downloadAvatar($index + 1),
            ]);
        }

        // 4. Amenities
        $amenities = ['Piscina', 'Gimnasio', 'Seguridad 24/7', 'Área de Parrillas', 'Elevador'];
        $amenityModels = [];
        foreach ($amenities as $name) {
            $amenityModels[] = Amenity::create(['name' => $name]);
        }

        // 5. Pipeline Stages
        $stages = ['Captación', 'Contactado', 'Visita Programada', 'Negociación', 'Cerrado'];
        foreach ($stages as $index => $name) {
            PipelineStage::create([
                'company_id' => $company->id,
                'name' => $name,
                'order' => $index + 1
            ]);
        }

        // 6. Properties
        for ($i = 1; $i <= 5; $i++) {
            $property = Property::create([
                'company_id' => $company->id,
                'user_id' => $admin->id,
                'ubigeo_id' => '150122',
                'title' => "Departamento de Lujo en Miraflores #$i",
                'description' => 'Increíble vista al mar y acabados de lujo.',
                'type' => 'apartment',
                'operation' => 'sale',
                'price' => 250000 + ($i * 10000),
                'currency' => 'USD',
                'area_total' => 120,
                'bedrooms' => 3,
                'bathrooms' => 2,
                'address' => "Av. Larco $i",
                'status' => 'published',
            ]);

            $property->amenities()->attach([$amenityModels[0]->id, $amenityModels[2]->id]);
        }
    }
}
