import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../../../wayfinder'
/**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Api\StoreCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Api/StoreCategoryController.php:15
 * @route '/api/categories'
 */
const StoreCategoryController = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: StoreCategoryController.url(options),
    method: 'post',
})

StoreCategoryController.definition = {
    methods: ["post"],
    url: '/api/categories',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Api\StoreCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Api/StoreCategoryController.php:15
 * @route '/api/categories'
 */
StoreCategoryController.url = (options?: RouteQueryOptions) => {
    return StoreCategoryController.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Api\StoreCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Api/StoreCategoryController.php:15
 * @route '/api/categories'
 */
StoreCategoryController.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: StoreCategoryController.url(options),
    method: 'post',
})

    /**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Api\StoreCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Api/StoreCategoryController.php:15
 * @route '/api/categories'
 */
    const StoreCategoryControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: StoreCategoryController.url(options),
        method: 'post',
    })

            /**
* @see \App\Modules\Categories\Presentation\Http\Controllers\Api\StoreCategoryController::__invoke
 * @see app/Modules/Categories/Presentation/Http/Controllers/Api/StoreCategoryController.php:15
 * @route '/api/categories'
 */
        StoreCategoryControllerForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: StoreCategoryController.url(options),
            method: 'post',
        })
    
    StoreCategoryController.form = StoreCategoryControllerForm
export default StoreCategoryController