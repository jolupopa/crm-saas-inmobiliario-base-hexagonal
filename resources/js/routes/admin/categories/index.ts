import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Admin\IndexCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Admin/IndexCategoryController.php:17
 * @route '/admin/categorias'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/categorias',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Admin\IndexCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Admin/IndexCategoryController.php:17
 * @route '/admin/categorias'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Admin\IndexCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Admin/IndexCategoryController.php:17
 * @route '/admin/categorias'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Admin\IndexCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Admin/IndexCategoryController.php:17
 * @route '/admin/categorias'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Admin\IndexCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Admin/IndexCategoryController.php:17
 * @route '/admin/categorias'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Admin\IndexCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Admin/IndexCategoryController.php:17
 * @route '/admin/categorias'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Admin\IndexCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Admin/IndexCategoryController.php:17
 * @route '/admin/categorias'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
const categories = {
    index: Object.assign(index, index),
}

export default categories