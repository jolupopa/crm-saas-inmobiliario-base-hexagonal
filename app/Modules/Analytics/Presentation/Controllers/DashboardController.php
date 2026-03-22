<?php

namespace App\Modules\Analytics\Presentation\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Properties\Domain\Models\Property;
use App\Modules\CRM\Domain\Models\Lead;
use App\Modules\Properties\Presentation\Resources\PropertyResource;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function __invoke()
    {
        $user = Auth::user();

        // Solo el superusuario del sistema va al dashboard administrativo global
        if ($user->email === 'superusuario@demo.com') {
            return redirect()->route('admin.dashboard');
        }

        $companyId = $user->company_id;
        $isPrivileged = $user->isPrivileged();

        // Si es admin o company, ve todo lo de la empresa. Si no, solo lo suyo.
        $propertyQuery = Property::where('company_id', $companyId);
        $leadQuery = Lead::where('company_id', $companyId);

        if (!$isPrivileged) {
            $propertyQuery->where('user_id', $user->id);
            $leadQuery->where('user_id', $user->id);
        }

        $recentProperties = (clone $propertyQuery)
            ->with(['address', 'user', 'category'])
            ->latest()
            ->limit(5)
            ->get();

        return Inertia::render('Analytics::Dashboard', [
            'stats' => [
                'total_properties' => (int) (clone $propertyQuery)->count(),
                'total_leads' => (int) (clone $leadQuery)->count(),
                'avg_lead_score' => (int) (clone $leadQuery)->avg('score'),
                'recent_properties' => PropertyResource::collection($recentProperties),
            ]
        ]);
    }
}
