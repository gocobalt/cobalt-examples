# Cobalt SDK Integration - Hosted Portal Method

## Overview
This document provides the necessary steps to integrate the Cobalt Hosted Portal method into your application. The Hosted Portal method allows you to generate a connection URL that can be used for user authentication and data flow with the Cobalt platform.

## API Endpoint
**POST** `/api/v2/public/connect-url`

### Description
This endpoint returns the connection URL in the format:
```
https://connect.gocobalt.io/{TOKEN}
```

### Headers
| Header          | Type   | Description                                                                                   |
|-----------------|--------|-----------------------------------------------------------------------------------------------|
| Authorization   | string | Unlike other APIs in this documentation, this API requires the session token as a bearer token. Do not include `x-api-key` in the header for this API. |

**Example Header:**
```
Authorization: Bearer {SESSION_TOKEN}
```

### Query Parameters
| Parameter  | Type   | Description                                                                                       |
|------------|--------|---------------------------------------------------------------------------------------------------|
| config_id  | string | Config ID to be used for creating the Hosted URL. If the `config_id` is not found, a new config will be created. |

### Body Parameters
| Parameter  | Type   | Description                                                                 |
|------------|--------|-----------------------------------------------------------------------------|
| color      | string | Text color in HEX format.                                                   |
| bgColor    | string | Background color in HEX format.                                             |
| name       | string | Customer name.                                                              |

### Response Description
| Field       | Type   | Description                                                                 |
|-------------|--------|-----------------------------------------------------------------------------|
| hosted_url  | string | The generated Hosted Auth-Flow URL.                                        |

### Example Response
```json
{
    "hosted_url": "https://connect.gocobalt.io/abc123xyz"
}
```

## Example Code
```javascript
const axios = require('axios');

const generateHostedUrl = async () => {
    const apiUrl = 'https://your-cobalt-api-url/api/v2/public/connect-url';
    const sessionToken = 'YOUR_SESSION_TOKEN';

    const headers = {
        Authorization: `Bearer ${sessionToken}`,
    };

    const queryParams = {
        config_id: 'your-config-id',
    };

    const body = {
        color: '#FFFFFF',
        bgColor: '#000000',
        name: 'Your Customer Name',
    };

    try {
        const response = await axios.post(apiUrl, body, { headers, params: queryParams });
        console.log('Hosted URL:', response.data.hosted_url);
    } catch (error) {
        console.error('Error generating hosted URL:', error);
    }
};

generateHostedUrl();

```
For more information, check out the `src/app/page.tsx` file.

## Instructions to Run the Project
1. Clone the repository and navigate to the `hosted-portal` directory:
   ```bash
   cd hosted-portal
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Using the Example Environment Variables
Refer to the `example.env.txt` file provided in the repository to set up your environment variables. The following placeholders need to be updated with your specific credentials and configurations:

- `NEXT_PUBLIC_API_KEY` - Your API key.
- `NEXT_PUBLIC_LINKED_ACCOUNT_ID` - Your linked account ID.

### Sample `example.env.txt`
```
NEXT_PUBLIC_API_KEY=tkef8652c2-8ea9-4a09-966a-55b60f1c9635
NEXT_PUBLIC_LINKED_ACCOUNT_ID=sample user4
```

## Additional Notes
For more details on using the Cobalt SDK, refer to [Cobalt Docs](https://docs.gocobalt.io/introduction).
