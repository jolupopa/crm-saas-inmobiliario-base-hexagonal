import users from './users'
import acl from './acl'
import categories from './categories'
const admin = {
    users: Object.assign(users, users),
acl: Object.assign(acl, acl),
categories: Object.assign(categories, categories),
}

export default admin