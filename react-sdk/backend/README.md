# React-SDK-Integration

This project demonstrates the integration of the Cobalt platform into a React application with a Node.js backend. It uses the `@cobaltio/react-cobalt-js` and `@cobaltio/cobalt-js` packages to simplify and streamline the process.

## Features
- **Dual Integration**: Combines a React frontend and a Node.js backend for seamless integration.
- **Reusable SDK Components**: Provides React components for managing Cobalt sessions and rendering Cobalt Connect.
- **Customizable Configurations**: Supports dynamic labels and styling for the Cobalt Connect component.

## Installation

### Prerequisites
- Node.js installed (v20+ recommended).

### Backend Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd react-sdk-integration
   ```

2. Backend setup:
   ```bash
   cd backend
   ```

 3. Environment variables: Refer to the env.example.txt in the backend folder
   ```env
   API_KEY =tkef8652c2-8ea9-4a09-966a-55b60f1c9635
   USER_ID =Sample User 3
   PORT=5000
   ```   

4. Install dependancies:
   ```bash
   npm install 
   ``` 

5. Run the application:

   - If you want to use **nodemon**, run:
     ```bash
     npm run server
     ```

   - Otherwise, run:
     ```bash
     node server.js
     ```




### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install the required packages:
   ```bash
   npm install --save @cobaltio/react-cobalt-js @cobaltio/cobalt-js
   ```

3. Start the React application:
   ```bash
   npm run dev
   ```

### Note on Changing Ports
If you change the PORT from 5000 to any other port, make sure to update it in the `const.ts` file located in `frontend/src/utils/const.ts`.

```ts
BASE_URL = "http://localhost:(YOUR-PORT)/api";



## Usage

### Initialize the Cobalt Connect Component

1. Import the `Provider` and `Config` components from `@cobaltio/react-cobalt-js`:
   ```javascript
   import { Provider, Config } from "@cobaltio/react-cobalt-js";
   ```

2. Wrap the `Config` component inside the `Provider` component, passing the Cobalt session token to the `Provider`:
   ```jsx
   <Provider sessionToken={cobaltToken}>
       {
           // Render the Config component inside a modal or directly on the page.
           // The component only gets rendered when `slug` is passed.
           <Config
               id="SOME_UNIQUE_CONFIG_ID" // Optional
               slug="APP_SLUG" // Application type/slug
               labels={{ /* Dynamic labels payload */ }} // Optional
               style={{
                   borderRadius: 8,
                   maxWidth: 450,
               }}
           />
       }
   </Provider>
   ```

### Example

For an example implementation, refer to the `App.tsx` file in the `src` directory. The file demonstrates how to:
- Set up the `Provider` component with a session token.
- Render the `Config` component dynamically based on user actions.

## Additional Notes
For more details on using the Cobalt SDK, refer to [Cobalt Docs](https://docs.gocobalt.io/introduction).
