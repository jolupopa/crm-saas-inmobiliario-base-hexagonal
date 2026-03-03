import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Modules\Profile\Presentation\Controllers\ShowProfileController::__invoke
 * @see app/Modules/Profile/Presentation/Controllers/ShowProfileController.php:12
 * @route '/profile'
 */
const ShowProfileController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ShowProfileController.url(options),
    method: 'get',
})

ShowProfileController.definition = {
    methods: ["get","head"],
    url: '/profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Profile\Presentation\Controllers\ShowProfileController::__invoke
 * @see app/Modules/Profile/Presentation/Controllers/ShowProfileController.php:12
 * @route '/profile'
 */
ShowProfileController.url = (options?: RouteQueryOptions) => {
    return ShowProfileController.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Profile\Presentation\Controllers\ShowProfileController::__invoke
 * @see app/Modules/Profile/Presentation/Controllers/ShowProfileController.php:12
 * @route '/profile'
 */
ShowProfileController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ShowProfileController.url(options),
    method: 'get',
})
/**
* @see \App\Modules\Profile\Presentation\Controllers\ShowProfileController::__invoke
 * @see app/Modules/Profile/Presentation/Controllers/ShowProfileController.php:12
 * @route '/profile'
 */
ShowProfileController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ShowProfileController.url(options),
    method: 'head',
})

    /**
* @see \App\Modules\Profile\Presentation\Controllers\ShowProfileController::__invoke
 * @see app/Modules/Profile/Presentation/Controllers/ShowProfileController.php:12
 * @route '/profile'
 */
    const ShowProfileControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ShowProfileController.url(options),
        method: 'get',
    })

            /**
* @see \App\Modules\Profile\Presentation\Controllers\ShowProfileController::__invoke
 * @see app/Modules/Profile/Presentation/Controllers/ShowProfileController.php:12
 * @route '/profile'
 */
        ShowProfileControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ShowProfileController.url(options),
            method: 'get',
        })
            /**
* @see \App\Modules\Profile\Presentation\Controllers\ShowProfileController::__invoke
 * @see app/Modules/Profile/Presentation/Controllers/ShowProfileController.php:12
 * @route '/profile'
 */
        ShowProfileControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ShowProfileController.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ShowProfileController.form = ShowProfileControllerForm
export default ShowProfileController