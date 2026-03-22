<?php

namespace App\Modules\Public\Presentation\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Properties\Domain\Models\Property;
use App\Modules\Public\Presentation\Resources\PublicPropertyResource;
use Inertia\Inertia;
use Inertia\Response;

class PublicShowPropertyController extends Controller
{
    public function __invoke(Property $property): Response
    {
        // Solo permitir ver propiedades publicadas en la web pública
        if ($property->status !== 'published') {
            abort(404);
        }

        $property->load(['address.ubigeo', 'amenities', 'listings', 'user', 'category', 'media']);

        // Incrementar contador de vistas de forma asíncrona o directa
        $property->increment('views_count');

        // Buscar propiedades relacionadas (misma categoría, excluyendo la actual)
        $related = Property::query()
            ->where('status', 'published')
            ->where('category_id', $property->category_id)
            ->where('id', '!=', $property->id)
            ->with(['address', 'media'])
            ->latest()
            ->take(3)
            ->get();

        return Inertia::render('Public::PropertyShow', [
            'property' => new PublicPropertyResource($property),
            'related' => PublicPropertyResource::collection($related),
        ]);
    }
}
