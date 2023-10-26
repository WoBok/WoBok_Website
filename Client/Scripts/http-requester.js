async function fetchRequest(url, type) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            switch (type) {
                case 'text':
                    return response.text();
                case 'json':
                    return response.json();
                default:
                    console.error(`Invalid type: ${type}`);
            }
        } else {
            console.error(`Fetch ${type} failed: ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error(error);
    }
}

export const httpRequest = {
    fetchText: async function (url) {
        return await fetchRequest(url, 'text');
    },
    fecthJson: async function (url) {
        return await fetchRequest(url, 'json');
    }
};