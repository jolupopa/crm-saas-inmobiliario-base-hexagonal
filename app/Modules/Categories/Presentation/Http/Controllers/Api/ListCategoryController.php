<?php

namespace App\Modules\Categories\Presentation\Http\Controllers\Api;

use App\Modules\Categories\Application\Actions\ListCategoriesAction;
use App\Modules\Categories\Presentation\Http\Resources\CategoryResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ListCategoryController
{
    /**
     * @see routes/web.php
     * @route '/api/categories'
     */
    public function __invoke(Request $request): JsonResponse
    {
        $type = $request->query('type', 'property');
        $companyId = $request->user()->company_id;

        $action = new ListCategoriesAction($companyId, $type);
        $categories = $action->execute();

        return response()->json(CategoryResource::collection($categories));
    }
}
