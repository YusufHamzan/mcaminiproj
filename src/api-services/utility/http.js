const http = {
    get: async (url = '') => {
        //https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
        try {
            const response = await fetch(url)
            const res = await response.json();
            if (!res){
                throw new Error('request failed')
            }
            return res;
        } catch (error) {
            console.log('error at http.get API call', error);
        }
    },
    post: async (url = '', data = {}, headers = {}) => {
        //https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...headers
                },
                body: JSON.stringify(data)
            })
            const res = await response.json();
            if (!res){
                throw new Error('request failed')
            }
            return res;
        } catch (error) {
            console.log('error at http.post API call', error.message);
            return error.message;
        }
    },

    del: async (url = '',id = '',data = {}, headers = {}) => {
        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    ...headers
                },
                body: JSON.stringify(data)
            })
            const res = await response.json();
            if (!res){
                throw new Error('request failed')
            }
            return res;
        } catch (error) {
            console.log('error at http.del API call', error);
        }
    },
}



export default http;

