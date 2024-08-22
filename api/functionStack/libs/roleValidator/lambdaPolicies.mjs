
export const ROLES = {
    SUPER_ADMIN: "superAdmin",
    ADMIN: "admin",
    USER: "user"
};

export const LAMBDA = {
    USERS: {
        LIST_USERS: "listUsers",
        GET_USER: "getUsers"
    },
    TEAM: {
        CREATE: "createTeam",
        LIST: "listTeam",
        UPDATE: "updateTeam",
        DELETE: "deleteTeam"
    },
    MATCH: {
        CREATE: "createMatch"
    }
};

export const lambdaPolicies = {
    all: [
        LAMBDA.USERS.GET_USER,
    ],
    [ROLES.SUPER_ADMIN]: [
        LAMBDA.TEAM.CREATE,
        LAMBDA.TEAM.LIST,
        LAMBDA.TEAM.UPDATE,
        LAMBDA.TEAM.DELETE,
        LAMBDA.MATCH.CREATE
    ],
    [ROLES.ADMIN]: [
        LAMBDA.TEAM.LIST,
    ],
    [ROLES.USER]: [
    ],
};

export const assignAccess = (role, lambda) => {
    return lambdaPolicies.all.indexOf(lambda) !== -1 ? true : lambdaPolicies[role].indexOf(lambda) !== -1 ? true : false;
}
