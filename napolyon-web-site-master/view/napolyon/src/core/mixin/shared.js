export function responseError (errorData) {
    if (!errorData) return errorData;
    if (typeof errorData === 'string') {
        return errorData
    } else {
        let errorMessage = ''
        if (errorData && errorData.errors) {
            let messageArray = Object.values(errorData.errors)[0]
            errorMessage = messageArray[0]
        } else if (errorData && errorData.message) {
            errorMessage = errorData.message
        } else {
            let messageArray = Object.values(errorData)[0]
            errorMessage = messageArray[0]
        }
        return errorMessage
    }
}
