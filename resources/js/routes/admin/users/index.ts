import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Modules\Admin\Presentation\Controllers\Users\IndexUserController::__invoke
 * @see app/Modules/Admin/Presentation/Controllers/Users/IndexUserController.php:14
 * @route '/admin/usuarios'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/usuarios',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Admin\Presentation\Controllers\Users\IndexUserController::__invoke
 * @see app/Modules/Admin/Presentation/Controllers/Users/IndexUserController.php:14
 * @route '/admin/usuarios'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Admin\Presentation\Controllers\Users\IndexUserController::__invoke
 * @see app/Modules/Admin/Presentation/Controllers/Users/IndexUserController.php:14
 * @route '/admin/usuarios'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Modules\Admin\Presentation\Controllers\Users\IndexUserController::__invoke
 * @see app/Modules/Admin/Presentation/Controllers/Users/IndexUserController.php:14
 * @route '/admin/usuarios'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Modules\Admin\Presentation\Controllers\Users\IndexUserController::__invoke
 * @see app/Modules/Admin/Presentation/Controllers/Users/IndexUserController.php:14
 * @route '/admin/usuarios'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Modules\Admin\Presentation\Controllers\Users\IndexUserController::__invoke
 * @see app/Modules/Admin/Presentation/Controllers/Users/IndexUserController.php:14
 * @route '/admin/usuarios'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Modules\Admin\Presentation\Controllers\Users\IndexUserController::__invoke
 * @see app/Modules/Admin/Presentation/Controllers/Users/IndexUserController.php:14
 * @route '/admin/usuarios'
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
/**
 * @see routes/web.php:58
 * @route '/admin/usuarios/crear'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/usuarios/crear',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:58
 * @route '/admin/usuarios/crear'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:58
 * @route '/admin/usuarios/crear'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:58
 * @route '/admin/usuarios/crear'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:58
 * @route '/admin/usuarios/crear'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:58
 * @route '/admin/usuarios/crear'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:58
 * @route '/admin/usuarios/crear'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Modules\Admin\Presentation\Controllers\Users\StoreUserController::__invoke
 * @see app/Modules/Admin/Presentation/Controllers/Users/StoreUserController.php:12
 * @route '/admin/usuarios'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/usuarios',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Modules\Admin\Presentation\Controllers\Users\StoreUserController::__invoke
 * @see app/Modules/Admin/Presentation/Controllers/Users/StoreUserController.php:12
 * @route '/admin/usuarios'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Admin\Presentation\Controllers\Users\StoreUserController::__invoke
 * @see app/Modules/Admin/Presentation/Controllers/Users/StoreUserController.php:12
 * @route '/admin/usuarios'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Modules\Admin\Presentation\Controllers\Users\StoreUserController::__invoke
 * @see app/Modules/Admin/Presentation/Controllers/Users/StoreUserController.php:12
 * @route '/admin/usuarios'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Modules\Admin\Presentation\Controllers\Users\StoreUserController::__invoke
 * @see app/Modules/Admin/Presentation/Controllers/Users/StoreUserController.php:12
 * @route '/admin/usuarios'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
 * @see routes/web.php:63
 * @route '/admin/usuarios/{user}/editar'
 */
export const edit = (args: { user: string | { id: string } } | [user: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/usuarios/{user}/editar',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:63
 * @route '/admin/usuarios/{user}/editar'
 */
edit.url = (args: { user: string | { id: string } } | [user: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { user: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    user: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        user: typeof args.user === 'object'
                ? args.user.id
                : args.user,
                }

    return edit.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see routes/web.php:63
 * @route '/admin/usuarios/{user}/editar'
 */
edit.get = (args: { user: string | { id: string } } | [user: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
 * @see routes/web.php:63
 * @route '/admin/usuarios/{user}/editar'
 */
edit.head = (args: { user: string | { id: string } } | [user: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
 * @see routes/web.php:63
 * @route '/admin/usuarios/{user}/editar'
 */
    const editForm = (args: { user: string | { id: string } } | [user: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
 * @see routes/web.php:63
 * @route '/admin/usuarios/{user}/editar'
 */
        editForm.get = (args: { user: string | { id: string } } | [user: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
 * @see routes/web.php:63
 * @route '/admin/usuarios/{user}/editar'
 */
        editForm.head = (args: { user: string | { id: string } } | [user: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Modules\Admin\Presentation\Controllers\Users\UpdateUserController::__invoke
 * @see app/Modules/Admin/Presentation/Controllers/Users/UpdateUserController.php:11
 * @route '/admin/usuarios/{user}'
 */
export const update = (args: { user: string | { id: string } } | [user: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/usuarios/{user}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Modules\Admin\Presentation\Controllers\Users\UpdateUserController::__invoke
 * @see app/Modules/Admin/Presentation/Controllers/Users/UpdateUserController.php:11
 * @route '/admin/usuarios/{user}'
 */
update.url = (args: { user: string | { id: string } } | [user: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { user: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    user: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        user: typeof args.user === 'object'
                ? args.user.id
                : args.user,
                }

    return update.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Admin\Presentation\Controllers\Users\UpdateUserController::__invoke
 * @see app/Modules/Admin/Presentation/Controllers/Users/UpdateUserController.php:11
 * @route '/admin/usuarios/{user}'
 */
update.put = (args: { user: string | { id: string } } | [user: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Modules\Admin\Presentation\Controllers\Users\UpdateUserController::__invoke
 * @see app/Modules/Admin/Presentation/Controllers/Users/UpdateUserController.php:11
 * @route '/admin/usuarios/{user}'
 */
    const updateForm = (args: { user: string | { id: string } } | [user: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Modules\Admin\Presentation\Controllers\Users\UpdateUserController::__invoke
 * @see app/Modules/Admin/Presentation/Controllers/Users/UpdateUserController.php:11
 * @route '/admin/usuarios/{user}'
 */
        updateForm.put = (args: { user: string | { id: string } } | [user: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Modules\Admin\Presentation\Controllers\Users\DeleteUserController::__invoke
 * @see app/Modules/Admin/Presentation/Controllers/Users/DeleteUserController.php:10
 * @route '/admin/usuarios/{user}'
 */
export const destroy = (args: { user: string | { id: string } } | [user: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/usuarios/{user}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Modules\Admin\Presentation\Controllers\Users\DeleteUserController::__invoke
 * @see app/Modules/Admin/Presentation/Controllers/Users/DeleteUserController.php:10
 * @route '/admin/usuarios/{user}'
 */
destroy.url = (args: { user: string | { id: string } } | [user: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { user: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    user: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        user: typeof args.user === 'object'
                ? args.user.id
                : args.user,
                }

    return destroy.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Admin\Presentation\Controllers\Users\DeleteUserController::__invoke
 * @see app/Modules/Admin/Presentation/Controllers/Users/DeleteUserController.php:10
 * @route '/admin/usuarios/{user}'
 */
destroy.delete = (args: { user: string | { id: string } } | [user: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Modules\Admin\Presentation\Controllers\Users\DeleteUserController::__invoke
 * @see app/Modules/Admin/Presentation/Controllers/Users/DeleteUserController.php:10
 * @route '/admin/usuarios/{user}'
 */
    const destroyForm = (args: { user: string | { id: string } } | [user: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Modules\Admin\Presentation\Controllers\Users\DeleteUserController::__invoke
 * @see app/Modules/Admin/Presentation/Controllers/Users/DeleteUserController.php:10
 * @route '/admin/usuarios/{user}'
 */
        destroyForm.delete = (args: { user: string | { id: string } } | [user: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const users = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default users