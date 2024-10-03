import { NextApiRequest, NextApiResponse } from 'next';

export default async function status(request: NextApiRequest, response: NextApiResponse) {
    return response.status(200).json({
        version: '1.0.0',
    });
}
