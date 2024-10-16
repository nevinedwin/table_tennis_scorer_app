

export const formatDate = (date: string): string => {

    const dateString = new Date(date);

    const day = String(dateString.getUTCDate()).padStart(2, '0');
    const month = dateString.toLocaleString('en-US', { month: 'short' }); // Months are 0-indexed
    // const month = String(dateString.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = String(dateString.getUTCFullYear())?.slice(-2);

    const formattedDate = `${day} ${month} ${year}`;

    return formattedDate;

};


export const formatTime = (date: string): string => {
    // Convert the date string into a Date object
    const originalDate = new Date(date);

    // Convert the date to Indian Standard Time (IST)
    const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata'
    };

    // Format the date using toLocaleString
    const formattedTime = originalDate.toLocaleString('en-IN', options);

    return formattedTime;
};

export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@inapp\.com$/;
    return emailRegex.test(email);
};


export function quickSort<T extends Record<K, any>, K extends keyof T>(arr: T[], key: K): T[] {
    if (arr.length <= 1) {
        return arr;
    };

    let pivot = arr[arr.length - 1];
    let left: T[] = [];
    let right: T[] = [];

    for (let i = 0; i < arr.length - 1; i++) {
        if (Number(arr[i][key]) < Number(pivot[key])) {
            left.push(arr[i]);
        } else {
            right.push(arr[i])
        };
    }

    return [...quickSort(left, key), pivot, ...quickSort(right, key)];
};

export function quickSortAdvanced<T>(arr: T[], compareFn: (a: T, b: T) => number): T[] {
    if (arr.length <= 1) {
        return arr;
    }

    let pivot = arr[arr.length - 1];
    let left: T[] = [];
    let right: T[] = [];

    for (let i = 0; i < arr.length - 1; i++) {
        if (compareFn(arr[i], pivot) < 0) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return [...quickSortAdvanced(left, compareFn), pivot, ...quickSortAdvanced(right, compareFn)];
}


export const findPercentage = (total: number, given: number, down: boolean) => {
    const data = (given * 100) / total;


    if (down) return Math.floor(data);

    return Math.ceil(data);
};



export function quickSortList<T>(arr: T[], left = 0, right = arr.length - 1) {

    if (left >= right) return arr;


    const pivotIndex = partition(arr, left, right);
    quickSortList(arr, left, pivotIndex - 1);
    quickSortList(arr, pivotIndex + 1, right);

    return arr;
}

function partition<T>(arr: T[], left: number, right: number) {
    const pivot = arr[right];
    let i = left;

    for (let j = left; j < right; j++) {
        if (compare(arr[j], pivot) <= 0) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            i++;
        }
    }

    [arr[i], arr[right]] = [arr[right], arr[i]];
    return i;
}

function compare(a: any, b: any) {
    if (a.point !== b.point) {
        return b.point - a.point; // Descending order based on matchWon
    }
    return a.teamName.localeCompare(b.teamName); // Ascending order based on teamName
}

export function getInitials(str: string) {
    // Split the string into words\
    const words = str.trim().split(/\s+/); // Trim and split by any whitespace

    if (words.length >= 2) {
        // If there are two or more words, take the first letter of each
        return words[0][0] + words[1][0];
    } else {
        // Otherwise, return the first two letters of the first word
        return words[0].slice(0, 2);
    }
}

export function getKnockoutScore(data: any, isLeague = false) {
    const returnValue = [];
    for (let i = 0; i < data.length; i++) {
        if (!isLeague) {
            if (data[i].matchWon >= 1) {
                returnValue.push({ ...data[i], matchWon: 1, matchPlayed: 1, matchLose: 0 })
            } else {
                returnValue.push(data[i]);
            };
        } else {
            returnValue.push({ ...data[i], matchWon: data[i].matchWon - 1, matchPlayed: data[i].matchPlayed - 1, point: data[i].point - 2 });
        }
    };
    return quickSortList(returnValue);
}