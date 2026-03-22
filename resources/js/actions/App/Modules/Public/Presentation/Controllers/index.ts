import HomeController from './HomeController'
import PublicPropertyController from './PublicPropertyController'
import PublicShowPropertyController from './PublicShowPropertyController'
const Controllers = {
    HomeController: Object.assign(HomeController, HomeController),
PublicPropertyController: Object.assign(PublicPropertyController, PublicPropertyController),
PublicShowPropertyController: Object.assign(PublicShowPropertyController, PublicShowPropertyController),
}

export default Controllers