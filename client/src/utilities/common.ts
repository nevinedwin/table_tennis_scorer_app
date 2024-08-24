

export const formatDate = (date: string): string => {

    const dateString = new Date(date);

    const day = String(dateString.getUTCDate()).padStart(2, '0');
    const month = String(dateString.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = String(dateString.getUTCFullYear()).slice(-2);

    const formattedDate = `${day}/${month}/${year}`;

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
}