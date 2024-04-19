export const extractBodyParams = (request: Request, schema: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            let params = new URLSearchParams(await request.json());

            let object: any = {}

            for (const [key, value] of params) {
                object[key] = value;
            }

            resolve(schema.parse(object));
        } catch (error) {
            reject(error)
        }
    })
}


export const extractFormParams = (request: Request, schema: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            let params = (await request.formData()).entries();

            let object: any = {}

            for (const [key, value] of params) {
                object[key] = value;
            }

            resolve(schema.parse(object));
        } catch (error) {
            reject(error)
        }
    })
}

export const validate = (params: Record<string, string | undefined>, schema: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(schema.parse(params));
        } catch (error) {
            reject(error)
        }
    })
}