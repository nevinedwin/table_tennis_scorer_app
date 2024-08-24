
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
        DELETE: "deleteTeam",
        GET: "getTeam"
    },
    MATCH: {
        CREATE: "createMatch",
        LIST: "listMatch",
        GET: "getMatch",
        UPDATE: "updateMatch",
        DELETE: "deleteMatch"
    }
};

export const lambdaPolicies = {
    all: [
        LAMBDA.USERS.GET_USER,
        LAMBDA.MATCH.LIST,
        LAMBDA.MATCH.GET,
        LAMBDA.TEAM.GET,
    ],
    [ROLES.SUPER_ADMIN]: [
        LAMBDA.TEAM.CREATE,
        LAMBDA.TEAM.LIST,
        LAMBDA.TEAM.UPDATE,
        LAMBDA.TEAM.DELETE,
        LAMBDA.MATCH.CREATE,
        LAMBDA.MATCH.UPDATE,
        LAMBDA.MATCH.DELETE,
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
