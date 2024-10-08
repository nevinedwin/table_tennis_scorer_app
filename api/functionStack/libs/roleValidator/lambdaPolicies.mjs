
export const ROLES = {
    SUPER_ADMIN: "superAdmin",
    ADMIN: "admin",
    USER: "user"
};

export const LAMBDA = {
    USERS: {
        LIST_USERS: "listUsers",
        GET_USER: "getUsers",
        SOCKET_URL: "socketUrl",
        CHANGE_ROLE: "changeRole"
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
        DELETE: "deleteMatch",
        ADDVOTE: "addVote",
        GETVOTE: "getVote",
        GETFULLMATCH: "getFullMatch",
        PLAYGAME: "playGame",
        UPDATE_SINGLE: "updateSingle",
    }
};

export const lambdaPolicies = {
    all: [
        LAMBDA.USERS.GET_USER,
        LAMBDA.USERS.SOCKET_URL,
        LAMBDA.MATCH.LIST,
        LAMBDA.MATCH.GET,
        LAMBDA.TEAM.GET,
        LAMBDA.MATCH.ADDVOTE,
        LAMBDA.MATCH.GETVOTE,
        LAMBDA.MATCH.GETFULLMATCH,
        LAMBDA.TEAM.LIST,
        LAMBDA.USERS.LIST_USERS
    ],
    [ROLES.SUPER_ADMIN]: [
        LAMBDA.TEAM.CREATE,
        LAMBDA.TEAM.UPDATE,
        LAMBDA.TEAM.DELETE,
        LAMBDA.MATCH.CREATE,
        LAMBDA.MATCH.UPDATE,
        LAMBDA.MATCH.DELETE,
        LAMBDA.MATCH.PLAYGAME,
        LAMBDA.MATCH.UPDATE_SINGLE,
        LAMBDA.USERS.CHANGE_ROLE
    ],
    [ROLES.ADMIN]: [
        LAMBDA.TEAM.LIST,
        LAMBDA.MATCH.UPDATE_SINGLE,
        LAMBDA.MATCH.PLAYGAME,
    ],
    [ROLES.USER]: [
    ],
};

export const assignAccess = (role, lambda) => {
    return lambdaPolicies.all.indexOf(lambda) !== -1 ? true : lambdaPolicies[role].indexOf(lambda) !== -1 ? true : false;
}
