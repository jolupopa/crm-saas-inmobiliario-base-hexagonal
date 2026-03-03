import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Modules\Profile\Presentation\Controllers\UpdateAvatarController::__invoke
 * @see app/Modules/Profile/Presentation/Controllers/UpdateAvatarController.php:11
 * @route '/profile/avatar'
 */
const UpdateAvatarController = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: UpdateAvatarController.url(options),
    method: 'post',
})

UpdateAvatarController.definition = {
    methods: ["post"],
    url: '/profile/avatar',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Modules\Profile\Presentation\Controllers\UpdateAvatarController::__invoke
 * @see app/Modules/Profile/Presentation/Controllers/UpdateAvatarController.php:11
 * @route '/profile/avatar'
 */
UpdateAvatarController.url = (options?: RouteQueryOptions) => {
    return UpdateAvatarController.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Profile\Presentation\Controllers\UpdateAvatarController::__invoke
 * @see app/Modules/Profile/Presentation/Controllers/UpdateAvatarController.php:11
 * @route '/profile/avatar'
 */
UpdateAvatarController.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: UpdateAvatarController.url(options),
    method: 'post',
})

    /**
* @see \App\Modules\Profile\Presentation\Controllers\UpdateAvatarController::__invoke
 * @see app/Modules/Profile/Presentation/Controllers/UpdateAvatarController.php:11
 * @route '/profile/avatar'
 */
    const UpdateAvatarControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: UpdateAvatarController.url(options),
        method: 'post',
    })

            /**
* @see \App\Modules\Profile\Presentation\Controllers\UpdateAvatarController::__invoke
 * @see app/Modules/Profile/Presentation/Controllers/UpdateAvatarController.php:11
 * @route '/profile/avatar'
 */
        UpdateAvatarControllerForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: UpdateAvatarController.url(options),
            method: 'post',
        })
    
    UpdateAvatarController.form = UpdateAvatarControllerForm
export default UpdateAvatarController