<?php

namespace App\Modules\Categories\Presentation\Http\Controllers\Api;

use App\Modules\Categories\Application\Actions\DeleteCategoryAction;
use App\Modules\Categories\Domain\Models\Category;
use Illuminate\Http\RedirectResponse;

class DeleteCategoryController
{
    /**
     * @see routes/web.php
     * @route '/api/categories/{category}'
     */
    public function __invoke(Category $category): RedirectResponse
    {
        $action = new DeleteCategoryAction($category);
        $action->execute();

        return redirect()->back()->with('success', 'Categoría eliminada correctamente');
    }
}
