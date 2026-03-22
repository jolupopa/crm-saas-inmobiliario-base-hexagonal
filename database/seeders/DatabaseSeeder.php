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
        $this->call(ACLSeeder::class);

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
        $planBasic = Plan::updateOrCreate(['slug' => 'basic'], [
            'name' => 'Plan Básico',
            'description' => 'Ideal para agentes independientes',
            'price' => 29.90,
            'features' => ['10 propiedades', 'Soporte básico'],
            'is_active' => true
        ]);

        $planPremium = Plan::updateOrCreate(['slug' => 'premium'], [
            'name' => 'Plan Premium',
            'description' => 'Para agencias inmobiliarias',
            'price' => 99.90,
            'features' => ['Propiedades ilimitadas', 'IA Lead Scoring', 'Soporte prioritario'],
            'is_active' => true
        ]);

        // 3. Companies & Users
        $company = Company::where('slug', 'estatemanager-system')->first() ?: Company::create([
            'name' => 'EstateManager System',
            'slug' => 'estatemanager-system',
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

        $admin = User::firstOrCreate([
            'email' => 'admin@demo.com',
        ], [
            'company_id'   => $company->id,
            'name'         => 'Admin Demo',
            'company_name' => 'Real Estate Premium',
            'password'     => Hash::make('password'),
            'avatar_url'   => $downloadAvatar('admin'),
        ]);

        $adminRole = \App\Modules\ACL\Domain\Models\Role::where('slug', 'admin')->first();
        if ($adminRole) {
            $admin->roles()->syncWithoutDetaching([$adminRole->id]);
        }

        // Crear algunos usuarios de equipo
        $team = [
            ['name' => 'Carla Méndez', 'email' => 'carla@demo.com', 'company' => 'Méndez Properties'],
            ['name' => 'Roberto Sánchez', 'email' => 'roberto@demo.com', 'company' => 'Sánchez & Co'],
        ];

        $agentRole = \App\Modules\ACL\Domain\Models\Role::where('slug', 'agent')->first();
        foreach ($team as $index => $member) {
            $user = User::firstOrCreate([
                'email' => $member['email']
            ], [
                'company_id'   => $company->id,
                'name'         => $member['name'],
                'company_name' => $member['company'],
                'password'     => Hash::make('password'),
                'avatar_url'   => $downloadAvatar($index + 1),
            ]);

            if ($agentRole) {
                $user->roles()->syncWithoutDetaching([$agentRole->id]);
            }
        }

        // 4. Amenities
        $amenities = ['Piscina', 'Gimnasio', 'Seguridad 24/7', 'Área de Parrillas', 'Elevador'];
        $amenityModels = [];
        foreach ($amenities as $name) {
            $amenityModels[] = Amenity::firstOrCreate([
                'name' => $name,
                'company_id' => $company->id
            ]);
        }

        // 5. Pipeline Stages
        $stages = ['Captación', 'Contactado', 'Visita Programada', 'Negociación', 'Cerrado'];
        foreach ($stages as $index => $name) {
            PipelineStage::firstOrCreate([
                'company_id' => $company->id,
                'name' => $name,
            ], [
                'order' => $index + 1
            ]);
        }

        $this->call(CategorySeeder::class);
        $this->call(PropertyDemoSeeder::class);
    }
}
