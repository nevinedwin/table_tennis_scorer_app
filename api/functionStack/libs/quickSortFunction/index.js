module.exports.quickSort = (arr, key, asc = true) => {
    if (arr.length < 2) {
        return arr
    }
    let pivot = arr[arr.length - 1][key]
    if (key === 'dateInfo') {
        pivot = pivot.split("-").reverse().join("").replace("-")
    }
    let pivotObject = arr[arr.length - 1]
    let left = []
    debugger
    let right = []
    for (let i = 0; i < arr.length - 1; i++) {
        // descending
        if (!asc) {
            let checkValue = arr[i][key]
            if (key === 'dateInfo') {
                checkValue = checkValue.split("-").reverse().join("").replace("-")
            }

            if (checkValue > pivot) {
                left.push(arr[i])
            } else {
                right.push(arr[i])
            }
        }
        // ascending
        else {
            let checkValue = arr[i][key]
            if (key === 'dateInfo') {
                checkValue = checkValue.split("-").reverse().join("").replace("-");
            }
            if (checkValue < pivot) {
                left.push(arr[i])
            } else {
                right.push(arr[i])
            }
        }
    }
    return [...this.quickSort(left, key, asc), pivotObject, ...this.quickSort(right, key, asc)]
}

