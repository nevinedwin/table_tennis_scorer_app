import { ROUTES } from "../../routes/appRouter";

export const items = [
    {
        title: 'Do Team Actions Here', content: {
            create: {
                name: "Create Team",
                url: ROUTES.CREATE_TEAM
            },
            list: {
                name: "List Team",
                url: "/list_team"
            },
            edit: {
                name: "Edit",
                url: "/edit_team"
            }
        }
    },
    // { title: 'Match', content: 'Content for section 2' },
    // { title: 'Section 3', content: 'Content for section 3' },
];