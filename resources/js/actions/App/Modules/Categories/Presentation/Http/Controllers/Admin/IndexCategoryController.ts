import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../../../wayfinder'
/**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Admin\IndexCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Admin/IndexCategoryController.php:17
 * @route '/admin/categorias'
 */
const IndexCategoryController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: IndexCategoryController.url(options),
    method: 'get',
})

IndexCategoryController.definition = {
    methods: ["get","head"],
    url: '/admin/categorias',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Admin\IndexCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Admin/IndexCategoryController.php:17
 * @route '/admin/categorias'
 */
IndexCategoryController.url = (options?: RouteQueryOptions) => {
    return IndexCategoryController.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Admin\IndexCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Admin/IndexCategoryController.php:17
 * @route '/admin/categorias'
 */
IndexCategoryController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: IndexCategoryController.url(options),
    method: 'get',
})
/**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Admin\IndexCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Admin/IndexCategoryController.php:17
 * @route '/admin/categorias'
 */
IndexCategoryController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: IndexCategoryController.url(options),
    method: 'head',
})

    /**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Admin\IndexCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Admin/IndexCategoryController.php:17
 * @route '/admin/categorias'
 */
    const IndexCategoryControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: IndexCategoryController.url(options),
        method: 'get',
    })

            /**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Admin\IndexCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Admin/IndexCategoryController.php:17
 * @route '/admin/categorias'
 */
        IndexCategoryControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: IndexCategoryController.url(options),
            method: 'get',
        })
            /**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Admin\IndexCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Admin/IndexCategoryController.php:17
 * @route '/admin/categorias'
 */
        IndexCategoryControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: IndexCategoryController.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    IndexCategoryController.form = IndexCategoryControllerForm
export default IndexCategoryController