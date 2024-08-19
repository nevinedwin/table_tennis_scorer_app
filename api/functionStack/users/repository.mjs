import { get } from 'libs/db-lib/index.mjs'


export class UserRepository {

    constructor(tableName, indexName) {
        this.tableName = tableName;
        this.indexName = indexName;
    };


    async fetchUser(id) {


        try {

            const params = {
                TableName: this.tableName,
                Key: {
                    id: `USER#${id}`,
                    details: "details"
                }
            };

            // debugger
            console.log(`fetch params: ${JSON.stringify(params)}`);

            const [err, succ] = await get(params);


            if (err || !succ) throw err;

            const { Item } = succ;

            const userData = {
                teamId: Item.teamId,
                role: Item.role,
                userId: Item.userId,
                displayName: Item.displayName,
                email: Item.email,
                predictionsWin: Item.predictionsWin,
                predictionsLose: Item.predictionsLose,
                totalPredictions: Item.totalPredictions,
            };

            return [null, userData];

        } catch (error) {

            return [error, null];
        };

    };

};