# Cobalt SDK Integration - JS-SDK Method

## Overview
This document provides the necessary steps to integrate the Cobalt JavaScript SDK into your application. The JavaScript SDK simplifies interactions with the Cobalt platform by providing pre-built methods.

## Starting the Application
To set up and run the application, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate into the `js-sdk` directory:
   ```bash
   cd js-sdk
   ```

3. Create the `.env` file by referring to the `example.env.txt` file provided in the repository. Update the placeholders with your specific credentials and configurations.

4. Run the application in development mode:
   ```bash
   npm run dev
   ```

5. Open your browser and visit the application at `http://localhost:3000`.

## Using the Example Environment Variables
Refer to the `example.env.txt` file provided in the repository to set up your environment variables. The following placeholders need to be updated with your specific credentials and configurations:

- `NEXT_PUBLIC_API_KEY` - Your API key.
- `NEXT_PUBLIC_LINKED_ACCOUNT_ID` - Your linked account ID.

### Sample `example.env.txt`
```env
NEXT_PUBLIC_API_KEY=tkef8652c2-8ea9-4a09-966a-55b60f1c9635
NEXT_PUBLIC_LINKED_ACCOUNT_ID=sample user4
```

## Additional Notes
For more details on using the Cobalt SDK, refer to [Cobalt Docs](https://docs.gocobalt.io/introduction).

