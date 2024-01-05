
function fetchCall(url, requestMethod, jwt, reqBody){
    const fetchData = {
        headers:{
            "Content-Type":"application/json",
        },
        method : requestMethod
    };
    if (jwt) {
        fetchData.headers.Authorization = `Bearer ${jwt}`;
    }
    if (reqBody) {
        fetchData.body = JSON.stringify(reqBody);
    }

   return fetch(url,fetchData).then((response) => {
        if(response.status === 200)  return response.json();
    })
}

export default fetchCall;