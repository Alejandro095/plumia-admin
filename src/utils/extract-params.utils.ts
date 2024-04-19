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