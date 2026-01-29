/* Service responsável por comunicação com a API do Bling
Centralizar chamadas HTTP*/

import axios from "axios";
import { useAuthStore } from "../stores/auth";



export function blingApi() {
    const auth = useAuthStore()

    return axios.create({
        baseURL:'https://www.bling.com.br/Api/v3',
        headers: {
            Authorization: `Bearer ${auth.oauthCode}`,
            'ContentType': 'application/json',
        },
    })

}