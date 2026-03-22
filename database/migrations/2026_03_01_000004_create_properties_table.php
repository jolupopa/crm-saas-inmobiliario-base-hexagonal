<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('company_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('user_id')->constrained()->cascadeOnDelete(); // Agente responsable
            $table->foreignUuid('category_id')->constrained()->cascadeOnDelete();
            
            $table->string('title');
            $table->text('description')->nullable();
            $table->enum('type', ['house', 'apartment', 'commercial', 'land', 'office']);
            $table->enum('operation', ['sale', 'rent']);
            $table->decimal('price', 15, 2);
            $table->string('currency', 3)->default('USD');
            
            $table->decimal('area_total', 10, 2);
            $table->decimal('area_built', 10, 2)->nullable();
            $table->integer('bedrooms')->default(0);
            $table->integer('bathrooms')->default(0);
            $table->integer('parking_spots')->default(0);
            

            
            $table->enum('status', ['draft', 'published', 'archived', 'sold', 'rented'])->default('draft');
            $table->boolean('is_featured')->default(false);
            $table->bigInteger('views_count')->default(0);
            
            $table->json('metadata')->nullable();
            $table->timestamps();
            $table->softDeletes();
            
            $table->index('company_id');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
