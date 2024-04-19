import { z } from 'zod'

const spotsSchema = z.object({
    latitude: z.string().transform(value => parseFloat(value)),
    longitude: z.string().transform(value => parseFloat(value))
}).refine(({ latitude, longitude }) => {
    return !isNaN(latitude) && latitude >= -90 && latitude <= 90 &&
           !isNaN(longitude) && longitude >= -180 && longitude <= 180;
}, {
    message: "Invalid latitude or longitude."
});

export default spotsSchema;