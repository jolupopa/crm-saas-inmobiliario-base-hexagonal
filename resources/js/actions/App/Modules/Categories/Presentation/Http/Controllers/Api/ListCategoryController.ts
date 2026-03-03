import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../../../wayfinder'
/**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Api\ListCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Api/ListCategoryController.php:16
 * @route '/api/categories'
 */
const ListCategoryController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListCategoryController.url(options),
    method: 'get',
})

ListCategoryController.definition = {
    methods: ["get","head"],
    url: '/api/categories',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Api\ListCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Api/ListCategoryController.php:16
 * @route '/api/categories'
 */
ListCategoryController.url = (options?: RouteQueryOptions) => {
    return ListCategoryController.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Api\ListCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Api/ListCategoryController.php:16
 * @route '/api/categories'
 */
ListCategoryController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListCategoryController.url(options),
    method: 'get',
})
/**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Api\ListCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Api/ListCategoryController.php:16
 * @route '/api/categories'
 */
ListCategoryController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ListCategoryController.url(options),
    method: 'head',
})

    /**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Api\ListCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Api/ListCategoryController.php:16
 * @route '/api/categories'
 */
    const ListCategoryControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ListCategoryController.url(options),
        method: 'get',
    })

            /**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Api\ListCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Api/ListCategoryController.php:16
 * @route '/api/categories'
 */
        ListCategoryControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ListCategoryController.url(options),
            method: 'get',
        })
            /**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Api\ListCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Api/ListCategoryController.php:16
 * @route '/api/categories'
 */
        ListCategoryControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ListCategoryController.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ListCategoryController.form = ListCategoryControllerForm
export default ListCategoryController