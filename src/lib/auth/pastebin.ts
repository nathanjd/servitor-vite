// Auth handlers and endpoints for pastebin.com. Ultimately, this isn't viable
// for me as login only works with password auth. Cannot use google OAuth.

// Official docs
// https://pastebin.com/doc_api

/**
 * Returns a valid user session key for a pastebin.com user if the passed
 * credentials match. Only one key can be active at the same time for the same
 * user. This key does not expire, unless a new one is generated.
 * TODO: Login only works with password auth. Cannot use google OAuth.
 */
export const login = async (
    apiDevKey: string,
    apiUserName: string,
    apiUserPassword: string,
): Promise<string> => {
    const url = 'https://pastebin.com/api/api_login.php';
    const headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
    });
    const formData = new FormData();
    formData.append('api_dev_key', apiDevKey);
    formData.append('api_user_name', apiUserName);
    formData.append('api_user_password', apiUserPassword);
    const request = new Request(url, {
        method : 'POST',
        headers: headers,
        body   : formData,
    });

    try {
        const response = await fetch(request);

        if (!response.ok) {
            const responseText = await response.text();
            throw new Error('Login failed: ' + responseText);
        }

        const apiUserKey = await response.text();
        return apiUserKey;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const getUser = () => {};

export const newPaste = () => {};

export const getPaste = () => {};

// Reference for undocumented editing of paste.
// https://github.com/Hydrothermal/better-pastebin/blob/8f26db9cc8bba31bb1a56b708be36d234cfdb280/lib/better-pastebin.js
export const editPaste = () => {};

export const deletePaste = () => {};

export const listPastes = () => {};

