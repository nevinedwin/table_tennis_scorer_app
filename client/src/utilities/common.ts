

export const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: '2-digit' };
    return date.toLocaleDateString('en-IN', options);
};


export const formatTime = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" };
    return date.toLocaleTimeString("en-IN", options);
};

export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@inapp\.com$/;
    return emailRegex.test(email);
};

