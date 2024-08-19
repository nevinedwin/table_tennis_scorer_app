import { UserRole } from "../../context/authContext/authContextTypes";

const commonNavItems = [
    {
        key: "/dashboard",
        value: "Dashboard"
    },
    {
        key: "/prediction_scores",
        value: "Prediction Ranking"
    },
    {
        key: "/history",
        value: "History"
    },
    {
        key: "/scoreboard",
        value: "Scoreboard"
    }
];

export const navbarList = {
    [UserRole.USER]: commonNavItems,
    [UserRole.ADMIN]: [
        ...commonNavItems
    ],
    [UserRole.SUPER_ADMIN]: [
        ...commonNavItems,
        {
            key: "/options",
            value: "Options"
        }
    ]
};
