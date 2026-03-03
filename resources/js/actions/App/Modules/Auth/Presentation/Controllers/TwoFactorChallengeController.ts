import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Modules\Auth\Presentation\Controllers\TwoFactorChallengeController::__invoke
 * @see app/Modules/Auth/Presentation/Controllers/TwoFactorChallengeController.php:10
 * @route '/two-factor-challenge'
 */
const TwoFactorChallengeController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: TwoFactorChallengeController.url(options),
    method: 'get',
})

TwoFactorChallengeController.definition = {
    methods: ["get","head"],
    url: '/two-factor-challenge',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Auth\Presentation\Controllers\TwoFactorChallengeController::__invoke
 * @see app/Modules/Auth/Presentation/Controllers/TwoFactorChallengeController.php:10
 * @route '/two-factor-challenge'
 */
TwoFactorChallengeController.url = (options?: RouteQueryOptions) => {
    return TwoFactorChallengeController.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Auth\Presentation\Controllers\TwoFactorChallengeController::__invoke
 * @see app/Modules/Auth/Presentation/Controllers/TwoFactorChallengeController.php:10
 * @route '/two-factor-challenge'
 */
TwoFactorChallengeController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: TwoFactorChallengeController.url(options),
    method: 'get',
})
/**
* @see \App\Modules\Auth\Presentation\Controllers\TwoFactorChallengeController::__invoke
 * @see app/Modules/Auth/Presentation/Controllers/TwoFactorChallengeController.php:10
 * @route '/two-factor-challenge'
 */
TwoFactorChallengeController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: TwoFactorChallengeController.url(options),
    method: 'head',
})

    /**
* @see \App\Modules\Auth\Presentation\Controllers\TwoFactorChallengeController::__invoke
 * @see app/Modules/Auth/Presentation/Controllers/TwoFactorChallengeController.php:10
 * @route '/two-factor-challenge'
 */
    const TwoFactorChallengeControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: TwoFactorChallengeController.url(options),
        method: 'get',
    })

            /**
* @see \App\Modules\Auth\Presentation\Controllers\TwoFactorChallengeController::__invoke
 * @see app/Modules/Auth/Presentation/Controllers/TwoFactorChallengeController.php:10
 * @route '/two-factor-challenge'
 */
        TwoFactorChallengeControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: TwoFactorChallengeController.url(options),
            method: 'get',
        })
            /**
* @see \App\Modules\Auth\Presentation\Controllers\TwoFactorChallengeController::__invoke
 * @see app/Modules/Auth/Presentation/Controllers/TwoFactorChallengeController.php:10
 * @route '/two-factor-challenge'
 */
        TwoFactorChallengeControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: TwoFactorChallengeController.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    TwoFactorChallengeController.form = TwoFactorChallengeControllerForm
export default TwoFactorChallengeController