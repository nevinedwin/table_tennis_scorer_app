type StorageData = string | object | null;

const ERROR_MESSAGES = {
    INVALID_KEY: "Invalid local storage key",
    JSON_PARSE: "Error parsing JSON from local storage",
    SET_ITEM: "Error setting Item in local storage"
};

export const localStorageKeys = {
    userIdKey: "cognitovalue"
};


const ManageLocalStorage = {

    /**
     * Retrieves an item from local storage and parse is as JSON
     * @param key The key of the item to retrieve
     * @returns The pasrse JSON object or string, or null if the key is invalid or parsing error
     */
    get(key: string): StorageData {
        if (!key) {
            console.error(ERROR_MESSAGES.INVALID_KEY)
            return null;
        }

        const item = localStorage.getItem(key);

        if (!item) return null;

        try {
            return JSON.parse(item);
        } catch (error) {
            console.error(`${ERROR_MESSAGES.JSON_PARSE}: ${error}`)
            return item;
        }

    },


    /**
     * Sets an Item into local storage, If the item is not string, it is stringifies as JSON
     * @param key the key under which to store data
     * @param data The data to store
     */
    set(key: string, data: StorageData): void {
        if (!key) {
            console.error(ERROR_MESSAGES.INVALID_KEY)
            return;
        }
        const tempData = typeof data === 'string' ? data : JSON.stringify(data)

        try {
            return localStorage.setItem(key, tempData);
        } catch (error) {
            console.error(`${ERROR_MESSAGES.SET_ITEM}: ${error}`)
        }
    },


    /**
     * Deletes an item from local storage
     * @param key Key of the item to delete
     */
    delete(key: string): void {
        if (!key) {
            console.log(ERROR_MESSAGES.INVALID_KEY)
            return;
        }

        return localStorage.removeItem(key)
    },

    /**
     * clear all items from local storage
     */
    clear() {
        localStorage.clear();
    }
}

export default ManageLocalStorage