<?php

namespace App\Modules\CRM\Presentation\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\CRM\Domain\Models\PipelineStage;
use App\Modules\CRM\Domain\Models\Lead;
use App\Modules\CRM\Presentation\Resources\PipelineStageResource;
use App\Modules\CRM\Presentation\Resources\LeadResource;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class PipelineController extends Controller
{
    public function __invoke()
    {
        $user = Auth::user();
        $companyId = $user->company_id;
        $isPrivileged = $user->isPrivileged();
        
        $stages = PipelineStage::where('company_id', $companyId)
            ->orderBy('order')
            ->get();
            
        $leadQuery = Lead::where('company_id', $companyId);

        if (!$isPrivileged) {
            $leadQuery->where('user_id', $user->id);
        }

        $leads = $leadQuery->get();

        return Inertia::render('CRM::Pipeline', [
            'stages' => PipelineStageResource::collection($stages),
            'leads' => LeadResource::collection($leads),
        ]);
    }
}
