<?php

namespace App\Modules\Categories\Presentation\Http\Controllers\Admin;

use App\Modules\Categories\Application\Actions\ListCategoriesAction;
use App\Modules\Categories\Presentation\Http\Resources\CategoryResource;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class IndexCategoryController
{
    /**
     * @see routes/web.php
     * @route '/admin/categorias'
     */
    public function __invoke(Request $request): Response
    {
        $type = $request->query('type', 'property');
        $companyId = $request->user()->company_id;
        
        $action = new ListCategoriesAction($companyId, $type);
        $categories = $action->execute();

        return Inertia::render('Admin::Categories/Index', [
            'categories' => CategoryResource::collection($categories),
            'type' => $type
        ]);
    }
}
