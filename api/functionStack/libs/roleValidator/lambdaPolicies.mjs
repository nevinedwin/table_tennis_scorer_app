
export const ROLES = {
    SUPER_ADMIN: "superAdmin",
    ADMIN: "admin",
    USER: "user"
};

export const LAMBDA = {
    USERS: {
        LIST_USERS: "listUsers",
        GET_USER: "getUsers",
    },
};

export const lambdaPolicies = {
    all: [
        LAMBDA.USERS.GET_USER,
    ],
    [ROLES.SUPER_ADMIN]: [
    ],
    [ROLES.ADMIN]: [
    ],
    [ROLES.USER]: [
    ],
};

export const assignAccess = (role, lambda) => {
    return lambdaPolicies.all.indexOf(lambda) !== -1 ? true : lambdaPolicies[role].indexOf(lambda) !== -1 ? true : false;
}
