export const encodeData = (data) => {
    if (typeof data !== "string") {
        data = JSON.stringify(data)
    }
    const encodedData = Buffer.from(data, "utf8").toString("base64");
    return encodedData;
}
export const decodeData = (data) => {
    if (typeof data !== "string") {
        data = JSON.stringify(data)
    }
    const decodedData = Buffer.from(str, "base64").toString("utf8");
    return JSON.parse(decodedData);
}