import ResetPasswordController from './ResetPasswordController'
import TwoFactorChallengeController from './TwoFactorChallengeController'
const Controllers = {
    ResetPasswordController: Object.assign(ResetPasswordController, ResetPasswordController),
TwoFactorChallengeController: Object.assign(TwoFactorChallengeController, TwoFactorChallengeController),
}

export default Controllers