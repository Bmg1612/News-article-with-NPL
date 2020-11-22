const checkForURL = inputURL => {
    console.log("::: Running checkForURL :::", inputURL);

    const regexp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;

    if(regexp.test(inputURL)) {
        return true;
    } else {
        return false;
    }
};

export { checkForURL }
