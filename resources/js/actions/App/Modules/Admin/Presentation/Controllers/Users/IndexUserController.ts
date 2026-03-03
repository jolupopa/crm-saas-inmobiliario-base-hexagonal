import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../../wayfinder'
/**
* @see \App\Modules\Admin\Presentation\Controllers\Users\IndexUserController::__invoke
 * @see app/Modules/Admin/Presentation/Controllers/Users/IndexUserController.php:15
 * @route '/admin/usuarios'
 */
const IndexUserController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: IndexUserController.url(options),
    method: 'get',
})

IndexUserController.definition = {
    methods: ["get","head"],
    url: '/admin/usuarios',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Admin\Presentation\Controllers\Users\IndexUserController::__invoke
 * @see app/Modules/Admin/Presentation/Controllers/Users/IndexUserController.php:15
 * @route '/admin/usuarios'
 */
IndexUserController.url = (options?: RouteQueryOptions) => {
    return IndexUserController.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Admin\Presentation\Controllers\Users\IndexUserController::__invoke
 * @see app/Modules/Admin/Presentation/Controllers/Users/IndexUserController.php:15
 * @route '/admin/usuarios'
 */
IndexUserController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: IndexUserController.url(options),
    method: 'get',
})
/**
* @see \App\Modules\Admin\Presentation\Controllers\Users\IndexUserController::__invoke
 * @see app/Modules/Admin/Presentation/Controllers/Users/IndexUserController.php:15
 * @route '/admin/usuarios'
 */
IndexUserController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: IndexUserController.url(options),
    method: 'head',
})

    /**
* @see \App\Modules\Admin\Presentation\Controllers\Users\IndexUserController::__invoke
 * @see app/Modules/Admin/Presentation/Controllers/Users/IndexUserController.php:15
 * @route '/admin/usuarios'
 */
    const IndexUserControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: IndexUserController.url(options),
        method: 'get',
    })

            /**
* @see \App\Modules\Admin\Presentation\Controllers\Users\IndexUserController::__invoke
 * @see app/Modules/Admin/Presentation/Controllers/Users/IndexUserController.php:15
 * @route '/admin/usuarios'
 */
        IndexUserControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: IndexUserController.url(options),
            method: 'get',
        })
            /**
* @see \App\Modules\Admin\Presentation\Controllers\Users\IndexUserController::__invoke
 * @see app/Modules/Admin/Presentation/Controllers/Users/IndexUserController.php:15
 * @route '/admin/usuarios'
 */
        IndexUserControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: IndexUserController.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    IndexUserController.form = IndexUserControllerForm
export default IndexUserController