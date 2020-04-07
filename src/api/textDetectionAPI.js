const axios = require('axios').default;

const textDetectionAPI = async (base64encoding) => {
    const imageUrl = base64encoding.split(',')[1];
    const response = await axios.post(`https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAzoCe47blscqw-GpScS4ZhQCK26AAtHJ8`, {
        requests: [
            {
                image: {
                    content: imageUrl
                },
                features: [
                    {
                        type: 'TEXT_DETECTION'
                    }
                ]
            }
        ]
    });
    return response.data.responses[0].fullTextAnnotation.text;
};


export default textDetectionAPI