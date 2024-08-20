import { ROUTES } from "../../routes/appRouter";

export const items = [
    {
        title: 'Team', content: {
            create: {
                name: "Create Team",
                url: "create_team"
            },
            list: {
                name: "List Team",
                url: "list_team"
            }
        }
    },
    {
        title: 'Match', content: {
            create: {
                name: "Create Match",
                url: "create_match"
            },
            list: {
                name: "List Matches",
                url: "list_team"
            }
        }
    },
    // { title: 'Match', content: 'Content for section 2' },
    // { title: 'Section 3', content: 'Content for section 3' },
];