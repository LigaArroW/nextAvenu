
interface IResponse {
    message: string
    success: boolean
    error?: string
    token?: string
}

export async function generateToken({ login }: { login: string }) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/generate_token`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                params: {
                    login: login
                }
            }),


        }
    )
    return await response.json()

}



export async function generateLoginMailToken({ login }: { login: string }): Promise<IResponse> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/generate_login_mail_token`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                params: {
                    login: login
                }
            }),


        }
    )
    return await response.json()
}
