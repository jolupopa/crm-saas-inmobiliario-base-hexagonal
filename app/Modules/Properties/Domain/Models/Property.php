<?php

namespace App\Modules\Properties\Domain\Models;

use App\Core\BaseModel;
use App\Traits\HasCompany;
use App\Modules\Auth\Domain\Models\User;
use App\Modules\Projects\Domain\Models\Project;
use App\Modules\Categories\Domain\Models\Category;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Builder;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

use App\Traits\HasModularFactory;

class Property extends BaseModel implements HasMedia
{
    use HasCompany, InteractsWithMedia, HasFactory, HasModularFactory {
        HasModularFactory::newFactory insteadof HasFactory;
    }

    protected $fillable = [
        'company_id',
        'user_id',
        'project_id',
        'category_id',
        'title',
        'description',
        'type',
        'operation',
        'price',
        'currency',
        'area_total',
        'area_built',
        'bedrooms',
        'bathrooms',
        'parking_spots',
        'status',
        'is_featured',
        'metadata',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'area_total' => 'decimal:2',
        'area_built' => 'decimal:2',
        'metadata' => 'array',
        'is_featured' => 'boolean',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function address(): MorphOne
    {
        return $this->morphOne(Address::class, 'addressable');
    }

    public function listings(): MorphMany
    {
        return $this->morphMany(Listing::class, 'listable');
    }

    public function amenities(): MorphToMany
    {
        return $this->morphToMany(Amenity::class, 'amenityable', 'amenityables');
    }

    public function activeListing()
    {
        return $this->listings()->where('status', 'active')->latest()->first();
    }

    public function scopeSearch(Builder $query, ?string $search): void
    {
        if (blank($search)) {
            return;
        }

        $query->where(function ($q) use ($search) {
            $q->where('title', 'ilike', '%' . $search . '%')
              ->orWhere('description', 'ilike', '%' . $search . '%');
        });
    }

    public function scopeFilter(Builder $query, array $filters): void
    {
        $query->when($filters['type'] ?? null, function ($query, $type) {
            $query->where('type', $type);
        })->when($filters['operation'] ?? null, function ($query, $operation) {
            $query->where('operation', $operation);
        })->when($filters['category_id'] ?? null, function ($query, $category) {
            $query->where('category_id', $category);
        })->when($filters['bedrooms'] ?? null, function ($query, $bedrooms) {
            $query->where('bedrooms', '>=', $bedrooms);
        })->when($filters['bathrooms'] ?? null, function ($query, $bathrooms) {
            $query->where('bathrooms', '>=', $bathrooms);
        })->when($filters['min_price'] ?? null, function ($query, $minPrice) {
            $query->where('price', '>=', $minPrice);
        })->when($filters['max_price'] ?? null, function ($query, $maxPrice) {
            $query->where('price', '<=', $maxPrice);
        });
    }

    public function scopeWithAmenities(Builder $query, array $amenities): void
    {
        if (empty($amenities)) {
            return;
        }

        foreach ($amenities as $amenityId) {
            $query->whereHas('amenities', function ($q) use ($amenityId) {
                $q->where('amenities.id', $amenityId);
            });
        }
    }
}
