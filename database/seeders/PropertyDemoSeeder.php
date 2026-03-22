<?php

namespace Database\Seeders;

use App\Modules\ACL\Domain\Models\Role;
use App\Modules\Auth\Domain\Models\User;
use App\Modules\Categories\Domain\Models\Category;
use App\Modules\Company\Domain\Models\Company;
use App\Modules\Properties\Domain\Models\Amenity;
use App\Modules\Properties\Domain\Models\Property;
use App\Modules\Properties\Domain\Models\Ubigeo;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class PropertyDemoSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Get Core Data
        $company = Company::where('slug', 'estatemanager-system')->first();
        $ownerRole = Role::where('slug', 'owner')->first();
        $agentRole = Role::where('slug', 'agent')->first();
        $categories = Category::where('company_id', $company->id)->where('type', 'property')->get();
        $ubigeos = Ubigeo::limit(20)->get();
        
        // Ensure some amenities exist
        $amenities = [
            'Piscina', 'Gimnasio', 'Seguridad 24/7', 'Área de Parrilla', 
            'Sauna', 'Jardín', 'Elevador', 'Cancha de Tennis', 'Vista al Mar'
        ];
        $amenityModels = [];
        foreach ($amenities as $item) {
            $amenityModels[] = Amenity::firstOrCreate([
                'name' => $item, 
                'company_id' => $company->id
            ], [
                'icon' => 'home'
            ]);
        }

        // 2. Create 5 Owners
        $owners = [];
        for ($i = 1; $i <= 5; $i++) {
            $email = ($i === 1) ? 'usuario@demo.com' : "usuario{$i}@demo.com";
            $user = User::firstOrCreate([
                'email' => $email,
            ], [
                'company_id' => $company->id,
                'name' => "Demo Owner {$i}",
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]);
            
            $roleToSync = ($email === 'usuario@demo.com') ? $agentRole->id : $ownerRole->id;
            $user->roles()->syncWithoutDetaching([$roleToSync]);
            $owners[] = $user;
        }

        // 3. Create 10 Properties per Owner (Total 50)
        $imagePool = [
            public_path('seed-images/apt_1.png'),
            public_path('seed-images/apt_2.png'),
            public_path('seed-images/apt_3.png'),
            public_path('seed-images/house_1.png'),
            public_path('seed-images/house_2.png'),
            public_path('seed-images/house_3.png'),
        ];

        foreach ($owners as $owner) {
            for ($j = 1; $j <= 10; $j++) {
                $category = $categories->random();
                $ubigeo = $ubigeos->random();
                $operation = ($j % 2 === 0) ? 'sale' : 'rent';
                $price = ($operation === 'sale') ? rand(150000, 1000000) : rand(1500, 8000);
                
                $typeMap = [
                    'Departamento' => 'apartment',
                    'Tienda Comercial' => 'commercial',
                    'Terreno Urbano' => 'land',
                    'Terreno Agrícola' => 'land',
                    'Proyecto de Viviendas' => 'house',
                    'Proyecto Comercial' => 'commercial',
                    'Proyecto de Condominio' => 'apartment',
                ];

                $type = $typeMap[$category->name] ?? 'house';
                
                $property = Property::create([
                    'company_id' => $company->id,
                    'user_id' => $owner->id,
                    'category_id' => $category->id,
                    'title' => "{$category->name} Premium en {$ubigeo->district} - #{$j}",
                    'description' => "Excelente oportunidad de {$operation}. Esta propiedad cuenta con acabados de lujo, amplios espacios y una ubicación privilegiada en {$ubigeo->district}, {$ubigeo->province}.",
                    'type' => $type,
                    'operation' => $operation,
                    'price' => $price,
                    'currency' => 'USD',
                    'area_total' => rand(80, 400),
                    'area_built' => rand(70, 350),
                    'bedrooms' => rand(1, 5),
                    'bathrooms' => rand(1, 4),
                    'parking_spots' => rand(0, 3),
                    'status' => 'published',
                    'is_featured' => ($j === 1)
                ]);

                // Create location via relationship
                $property->address()->create([
                    'company_id' => $company->id,
                    'ubigeo_id' => $ubigeo->id,
                    'address' => "Calle Los Alamos " . rand(100, 999),
                    'reference' => 'Cerca al parque principal',
                    'latitude' => -12.046374, // Coordenadas aproximadas de Lima
                    'longitude' => -77.042793,
                ]);


                // Sync 3-5 random amenities
                $property->amenities()->attach(
                    collect($amenityModels)->random(rand(3, 5))->pluck('id')
                );

                // Add 4-6 images (local fallback or placeholder)
                $randomImages = collect($imagePool)->random(rand(4, 6));
                foreach ($randomImages as $imagePath) {
                    try {
                        if (file_exists($imagePath)) {
                            $property->addMedia($imagePath)
                                ->preservingOriginal()
                                ->toMediaCollection('gallery');
                        } else {
                            // Fallback to placeholder if local file is missing
                            $property->addMediaFromUrl("https://loremflickr.com/800/600/modern,house,apartment")
                                ->toMediaCollection('gallery');
                        }
                    } catch (\Exception $e) {
                        \Illuminate\Support\Facades\Log::error("Media Seeding Failed for {$property->id}: " . $e->getMessage());
                    }
                }
            }
        }
    }
}
