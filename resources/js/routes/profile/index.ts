import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Modules\Profile\Presentation\Controllers\ShowProfileController::__invoke
 * @see app/Modules/Profile/Presentation/Controllers/ShowProfileController.php:12
 * @route '/profile'
 */
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Profile\Presentation\Controllers\ShowProfileController::__invoke
 * @see app/Modules/Profile/Presentation/Controllers/ShowProfileController.php:12
 * @route '/profile'
 */
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Profile\Presentation\Controllers\ShowProfileController::__invoke
 * @see app/Modules/Profile/Presentation/Controllers/ShowProfileController.php:12
 * @route '/profile'
 */
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})
/**
* @see \App\Modules\Profile\Presentation\Controllers\ShowProfileController::__invoke
 * @see app/Modules/Profile/Presentation/Controllers/ShowProfileController.php:12
 * @route '/profile'
 */
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

    /**
* @see \App\Modules\Profile\Presentation\Controllers\ShowProfileController::__invoke
 * @see app/Modules/Profile/Presentation/Controllers/ShowProfileController.php:12
 * @route '/profile'
 */
    const showForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(options),
        method: 'get',
    })

            /**
* @see \App\Modules\Profile\Presentation\Controllers\ShowProfileController::__invoke
 * @see app/Modules/Profile/Presentation/Controllers/ShowProfileController.php:12
 * @route '/profile'
 */
        showForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(options),
            method: 'get',
        })
            /**
* @see \App\Modules\Profile\Presentation\Controllers\ShowProfileController::__invoke
 * @see app/Modules/Profile/Presentation/Controllers/ShowProfileController.php:12
 * @route '/profile'
 */
        showForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Modules\Profile\Presentation\Controllers\UpdateProfileController::__invoke
 * @see app/Modules/Profile/Presentation/Controllers/UpdateProfileController.php:12
 * @route '/profile'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/profile',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Modules\Profile\Presentation\Controllers\UpdateProfileController::__invoke
 * @see app/Modules/Profile/Presentation/Controllers/UpdateProfileController.php:12
 * @route '/profile'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Profile\Presentation\Controllers\UpdateProfileController::__invoke
 * @see app/Modules/Profile/Presentation/Controllers/UpdateProfileController.php:12
 * @route '/profile'
 */
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

    /**
* @see \App\Modules\Profile\Presentation\Controllers\UpdateProfileController::__invoke
 * @see app/Modules/Profile/Presentation/Controllers/UpdateProfileController.php:12
 * @route '/profile'
 */
    const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url({
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
        updateForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Modules\Profile\Presentation\Controllers\UpdateAvatarController::__invoke
 * @see app/Modules/Profile/Presentation/Controllers/UpdateAvatarController.php:11
 * @route '/profile/avatar'
 */
export const avatar = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: avatar.url(options),
    method: 'post',
})

avatar.definition = {
    methods: ["post"],
    url: '/profile/avatar',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Modules\Profile\Presentation\Controllers\UpdateAvatarController::__invoke
 * @see app/Modules/Profile/Presentation/Controllers/UpdateAvatarController.php:11
 * @route '/profile/avatar'
 */
avatar.url = (options?: RouteQueryOptions) => {
    return avatar.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Profile\Presentation\Controllers\UpdateAvatarController::__invoke
 * @see app/Modules/Profile/Presentation/Controllers/UpdateAvatarController.php:11
 * @route '/profile/avatar'
 */
avatar.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: avatar.url(options),
    method: 'post',
})

    /**
* @see \App\Modules\Profile\Presentation\Controllers\UpdateAvatarController::__invoke
 * @see app/Modules/Profile/Presentation/Controllers/UpdateAvatarController.php:11
 * @route '/profile/avatar'
 */
    const avatarForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: avatar.url(options),
        method: 'post',
    })

            /**
* @see \App\Modules\Profile\Presentation\Controllers\UpdateAvatarController::__invoke
 * @see app/Modules/Profile/Presentation/Controllers/UpdateAvatarController.php:11
 * @route '/profile/avatar'
 */
        avatarForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: avatar.url(options),
            method: 'post',
        })
    
    avatar.form = avatarForm
const profile = {
    show: Object.assign(show, show),
update: Object.assign(update, update),
avatar: Object.assign(avatar, avatar),
}

export default profile