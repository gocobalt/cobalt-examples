# Cobalt SDK Integration - Hosted Portal Method

## Overview
This document provides the necessary steps to integrate the Cobalt Hosted Portal method into your application. The Hosted Portal method allows you to generate a connection URL that can be used for user authentication and data flow with the Cobalt platform.

## Using the Example Environment Variables
Refer to the `.env.example` file provided in the repository to set up your environment variables. The following placeholders need to be updated with your specific credentials and configurations:

- `NEXT_PUBLIC_API_KEY` - Your API key.
- `NEXT_PUBLIC_LINKED_ACCOUNT_ID` - Your linked account ID.

### Sample `.env.example`
```
NEXT_PUBLIC_API_KEY=tkef8652c2-8ea9-4a09-966a-55b60f1c9635
NEXT_PUBLIC_LINKED_ACCOUNT_ID=sample user4
```


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



## Additional Notes
For more details on using the Cobalt SDK, refer to [Cobalt Docs](https://docs.gocobalt.io/introduction).
