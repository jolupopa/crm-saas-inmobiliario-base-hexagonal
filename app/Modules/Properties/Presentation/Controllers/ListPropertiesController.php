<?php

namespace App\Modules\Properties\Presentation\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Properties\Application\Actions\ListPropertiesAction;
use App\Modules\Properties\Presentation\Resources\PropertyResource;
use App\Modules\Categories\Domain\Models\Category;
use App\Modules\Properties\Domain\Models\Amenity;
use App\Modules\Properties\Domain\Models\Property;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ListPropertiesController extends Controller
{
    public function __invoke(Request $request)
    {
        $user = Auth::user();
        $isPrivileged = $user->isPrivileged();

        $filters = $request->only(['search', 'type', 'operation', 'min_price', 'max_price', 'bedrooms', 'bathrooms', 'category_id', 'amenities', 'user_id']);
        $filters['company_id'] = $user->company_id;

        if ($isPrivileged) {
            $filters['include_trashed'] = true;
        } else {
            // Strictly enforce personal CRUD for all other roles
            $filters['user_id'] = $user->id;
        }

        $properties = (new ListPropertiesAction($filters))->execute();

        // Stats calculation
        $baseQuery = Property::where('company_id', $user->company_id);
        if (!$isPrivileged) {
            $baseQuery->where('user_id', $user->id);
        }

        $stats = [
            'total_listings' => (clone $baseQuery)->count(),
            'active_views' => (clone $baseQuery)->sum('views_count'),
            'pending_deals' => (clone $baseQuery)->where('status', 'draft')->count(),
            'total_sales' => (clone $baseQuery)->whereIn('status', ['sold', 'rented'])->sum('price'),
        ];

        // Quota info for user or admin
        $quotaInfo = [
            'limit' => $user->property_limit,
            'current' => Property::where('user_id', $user->id)->count(),
        ];

        return Inertia::render('Properties::Index', [
            'properties' => PropertyResource::collection($properties),
            'stats' => $stats,
            'quotaInfo' => $quotaInfo,
            'isAdmin' => $isPrivileged,
            'filters' => $filters,
            'categories' => Category::where('company_id', $user->company_id)->where('type', 'property')->get(['id', 'name']),
            'amenities' => Amenity::all(['id', 'name', 'icon']),
        ]);
    }
}
