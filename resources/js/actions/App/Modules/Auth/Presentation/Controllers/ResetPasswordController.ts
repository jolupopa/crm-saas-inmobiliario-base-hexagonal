import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Modules\Auth\Presentation\Controllers\ResetPasswordController::__invoke
 * @see app/Modules/Auth/Presentation/Controllers/ResetPasswordController.php:11
 * @route '/reset-password/{token}'
 */
const ResetPasswordController = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ResetPasswordController.url(args, options),
    method: 'get',
})

ResetPasswordController.definition = {
    methods: ["get","head"],
    url: '/reset-password/{token}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Auth\Presentation\Controllers\ResetPasswordController::__invoke
 * @see app/Modules/Auth/Presentation/Controllers/ResetPasswordController.php:11
 * @route '/reset-password/{token}'
 */
ResetPasswordController.url = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { token: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    token: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        token: args.token,
                }

    return ResetPasswordController.definition.url
            .replace('{token}', parsedArgs.token.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Auth\Presentation\Controllers\ResetPasswordController::__invoke
 * @see app/Modules/Auth/Presentation/Controllers/ResetPasswordController.php:11
 * @route '/reset-password/{token}'
 */
ResetPasswordController.get = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ResetPasswordController.url(args, options),
    method: 'get',
})
/**
* @see \App\Modules\Auth\Presentation\Controllers\ResetPasswordController::__invoke
 * @see app/Modules/Auth/Presentation/Controllers/ResetPasswordController.php:11
 * @route '/reset-password/{token}'
 */
ResetPasswordController.head = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ResetPasswordController.url(args, options),
    method: 'head',
})

    /**
* @see \App\Modules\Auth\Presentation\Controllers\ResetPasswordController::__invoke
 * @see app/Modules/Auth/Presentation/Controllers/ResetPasswordController.php:11
 * @route '/reset-password/{token}'
 */
    const ResetPasswordControllerForm = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ResetPasswordController.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Modules\Auth\Presentation\Controllers\ResetPasswordController::__invoke
 * @see app/Modules/Auth/Presentation/Controllers/ResetPasswordController.php:11
 * @route '/reset-password/{token}'
 */
        ResetPasswordControllerForm.get = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ResetPasswordController.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Modules\Auth\Presentation\Controllers\ResetPasswordController::__invoke
 * @see app/Modules/Auth/Presentation/Controllers/ResetPasswordController.php:11
 * @route '/reset-password/{token}'
 */
        ResetPasswordControllerForm.head = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ResetPasswordController.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ResetPasswordController.form = ResetPasswordControllerForm
export default ResetPasswordController