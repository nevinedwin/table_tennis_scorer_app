import { assignAccess } from './lambdaPolicies.mjs';

export const validateAccess = (role, lambda) => {
    return assignAccess(role, lambda)
}