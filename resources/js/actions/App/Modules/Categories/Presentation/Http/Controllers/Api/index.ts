import ListCategoryController from './ListCategoryController'
import StoreCategoryController from './StoreCategoryController'
import UpdateCategoryController from './UpdateCategoryController'
import DeleteCategoryController from './DeleteCategoryController'
const Api = {
    ListCategoryController: Object.assign(ListCategoryController, ListCategoryController),
StoreCategoryController: Object.assign(StoreCategoryController, StoreCategoryController),
UpdateCategoryController: Object.assign(UpdateCategoryController, UpdateCategoryController),
DeleteCategoryController: Object.assign(DeleteCategoryController, DeleteCategoryController),
}

export default Api