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
        $companyId = Auth::user()->company_id;
        
        $stages = PipelineStage::where('company_id', $companyId)
            ->orderBy('order')
            ->get();
            
        $leads = Lead::where('company_id', $companyId)
            ->get();

        return Inertia::render('CRM::Pipeline', [
            'stages' => PipelineStageResource::collection($stages),
            'leads' => LeadResource::collection($leads),
        ]);
    }
}
