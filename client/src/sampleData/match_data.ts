interface Player {
    fname: string,
    lname?: string
}

interface Team {
    player_1: Player;
    player_2: Player;
    setsWin: number | null;
    teamName: string;
    teamId: string;
}

interface Sets {
    [key: string | number]: {
        team_1: number | null;
        team_2: number | null;
        win?: string
    };
}

export interface IMatch {
    match_id: string;
    MatchNumber?: number;
    Tournament_id: string;
    numOfSets: number;
    matchDate: Date;
    matchStartDate?: Date,
    matchEndDate?: Date,
    matchStatus: 'Finished' | 'Cancelled' | 'Retired' | 'Not_Started' | 'Live';
    teams: {
        team_1: Team;
        team_2: Team;
    };
    sets: Sets;
    isPinned: boolean;
}

export interface Tournament {
    [key: string]: IMatch[];
}

// export const matchData: Tournament ={}

export const matchData: Tournament = {
    tournament1: [
        // Existing data...
        {
            match_id: "123",
            Tournament_id: "1234",
            MatchNumber: 1,
            numOfSets: 3,
            matchDate: new Date(),
            matchStartDate: new Date(),
            matchEndDate: new Date(),
            matchStatus: "Live",
            teams: {
                team_1: {
                    teamId: "team_123",
                    teamName: "team Assss",
                    player_1: { fname: "Nevin", lname: "Edwin" },
                    player_2: { fname: "Peter", lname: "Das" },
                    setsWin: 1
                },
                team_2: {
                    teamId: "team_456",
                    teamName: "team indi",
                    player_1: { fname: "Sreya", lname: "KU" },
                    player_2: { fname: "Rohith", lname: "SK" },
                    setsWin: 2
                }
            },
            sets: {
                1: { team_1: 0, team_2: 0 },
                2: { team_1: 0, team_2: 0 },
                3: { team_1: 0, team_2: 0 }
            },
            isPinned: false
        },
        // New sample data
        {
            match_id: "124",
            Tournament_id: "1235",
            numOfSets: 3,
            matchDate: new Date(),
            matchStartDate: new Date(),
            matchEndDate: new Date(),
            matchStatus: "Finished",
            teams: {
                team_1: {
                    teamId: "team_124",
                    teamName: "team B",
                    player_1: { fname: "John", lname: "Doe" },
                    player_2: { fname: "Sam", lname: "Smith" },
                    setsWin: 2
                },
                team_2: {
                    teamId: "team_457",
                    teamName: "team X",
                    player_1: { fname: "Alice", lname: "Brown" },
                    player_2: { fname: "Bob", lname: "Johnson" },
                    setsWin: 1
                }
            },
            sets: {
                1: { team_1: 8, team_2: 11 },
                2: { team_1: 11, team_2: 6 },
                3: { team_1: 11, team_2: 7 }
            },
            isPinned: true
        },
        {
            match_id: "125",
            Tournament_id: "1236",
            numOfSets: 5,
            matchDate: new Date(),
            matchStartDate: new Date(),
            matchEndDate: new Date(),
            matchStatus: "Not_Started",
            teams: {
                team_1: {
                    teamId: "team_125",
                    teamName: "team C",
                    player_1: { fname: "Mia", lname: "Williams" },
                    player_2: { fname: "Liam", lname: "Brown" },
                    setsWin: 0
                },
                team_2: {
                    teamId: "team_458",
                    teamName: "team Y",
                    player_1: { fname: "Olivia", lname: "Jones" },
                    player_2: { fname: "Noah", lname: "Miller" },
                    setsWin: 0
                }
            },
            sets: {
                1: { team_1: 0, team_2: 0 },
                2: { team_1: 0, team_2: 0 },
                3: { team_1: 0, team_2: 0 },
                4: { team_1: 0, team_2: 0 },
                5: { team_1: 0, team_2: 0 }
            },
            isPinned: false
        }
    ]
}
