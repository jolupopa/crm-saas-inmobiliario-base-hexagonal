import ShowProfileController from './ShowProfileController'
import UpdateProfileController from './UpdateProfileController'
import UpdateAvatarController from './UpdateAvatarController'
const Controllers = {
    ShowProfileController: Object.assign(ShowProfileController, ShowProfileController),
UpdateProfileController: Object.assign(UpdateProfileController, UpdateProfileController),
UpdateAvatarController: Object.assign(UpdateAvatarController, UpdateAvatarController),
}

export default Controllers