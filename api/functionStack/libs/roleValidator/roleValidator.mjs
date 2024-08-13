const { assignAccess } = require('../shared/lambdaPolicies.shared')

export const validateAccess = (role, lambda) => {
    return assignAccess(role, lambda)
}