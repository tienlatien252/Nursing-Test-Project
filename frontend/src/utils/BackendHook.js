import { useState, useEffect } from "react";
import { auth } from "../firebase";
import axios from 'axios';

const backendBaseURL = process.env.REACT_ENV === 'prod' ? 'http://backend-service:5000' : 'http://localhost:5000';

export default function useBackendApi(){
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [request, setRequest] = useState({
        path: '/',
        method: 'get',
        postBody: {}
    });

    useEffect(() => {
        const requestAPI = async () => {
            setIsError(false);
            setIsLoading(true);
            if (auth.currentUser) {
                const idToken = await auth.currentUser.getIdToken(true);
                const {path, method, postBody} = request;
                try {
                    const response = await axios({
                        url: `${backendBaseURL}${path}`,
                        headers: {
                            'AuthToken': idToken
                        },
                        data: postBody,
                        json: true,
                        method: method
                    });
                    setData(response.data);
                    setIsLoading(false);
                } catch (error) {
                    console.log(error);
                    setIsError(true);
                }
            }
            setIsLoading(false);
        };

        requestAPI();
    }, [request]);

    return [{ data, isLoading, isError }, setRequest];
}
