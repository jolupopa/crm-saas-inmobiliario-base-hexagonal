import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Modules\Profile\Presentation\Controllers\UpdateProfileController::__invoke
 * @see app/Modules/Profile/Presentation/Controllers/UpdateProfileController.php:12
 * @route '/profile'
 */
const UpdateProfileController = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: UpdateProfileController.url(options),
    method: 'put',
})

UpdateProfileController.definition = {
    methods: ["put"],
    url: '/profile',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Modules\Profile\Presentation\Controllers\UpdateProfileController::__invoke
 * @see app/Modules/Profile/Presentation/Controllers/UpdateProfileController.php:12
 * @route '/profile'
 */
UpdateProfileController.url = (options?: RouteQueryOptions) => {
    return UpdateProfileController.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Profile\Presentation\Controllers\UpdateProfileController::__invoke
 * @see app/Modules/Profile/Presentation/Controllers/UpdateProfileController.php:12
 * @route '/profile'
 */
UpdateProfileController.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: UpdateProfileController.url(options),
    method: 'put',
})

    /**
* @see \App\Modules\Profile\Presentation\Controllers\UpdateProfileController::__invoke
 * @see app/Modules/Profile/Presentation/Controllers/UpdateProfileController.php:12
 * @route '/profile'
 */
    const UpdateProfileControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: UpdateProfileController.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Modules\Profile\Presentation\Controllers\UpdateProfileController::__invoke
 * @see app/Modules/Profile/Presentation/Controllers/UpdateProfileController.php:12
 * @route '/profile'
 */
        UpdateProfileControllerForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: UpdateProfileController.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    UpdateProfileController.form = UpdateProfileControllerForm
export default UpdateProfileController