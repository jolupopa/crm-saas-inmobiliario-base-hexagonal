<?php

namespace App\Modules\Properties\Presentation\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Properties\Domain\Models\Property;
use Illuminate\Support\Facades\Auth;

class DeletePropertyController extends Controller
{
    public function __invoke(Property $property)
    {
        $this->authorize('delete', $property);

        $property->delete();

        return back()->with('success', 'Propiedad eliminada con éxito.');
    }
}
