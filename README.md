# Cobalt-Example-Test

This repository contains examples to perform integrations with the Cobalt platform. It follows a monorepo structure and includes four integration methods, detailed below.


## Integration Methods

### 1. Hosted-Portal Method
To test the Hosted-Portal method:
1. Navigate to the `hosted-portal` folder:
   ```bash
   cd hosted-portal
   ```

2. In the `hosted-portal` folder, create a `.env` file with the following variables:
   ```env
   NEXT_PUBLIC_API_KEY=tkef8652c2-8ea9-4a09-966a-55b60f1c9635
   NEXT_PUBLIC_LINKED_ACCOUNT_ID=sample_user4


3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. The project will start on `http://localhost:3000`.

### 2. JS-SDK Method
To test the JS-SDK method:
1. Navigate to the `js-sdk` folder:
   ```bash
   cd js-sdk
   ```

2. In the `js-sdk` folder, create a `.env` file with the following variables:
   ```env
   NEXT_PUBLIC_API_KEY=tkef8652c2-8ea9-4a09-966a-55b60f1c9635
   NEXT_PUBLIC_LINKED_ACCOUNT_ID=sample_user4

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. The project will start on `http://localhost:3000`.

### 3. React-SDK Method
To test the React-SDK method:
1. Navigate to the `react-sdk` folder:
   ```bash
   cd react-sdk
   ```

2. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```

3. Create a `.env` file with the following variables:
   ```env
   API_KEY=tkef8652c2-8ea9-4a09-966a-55b60f1c9635
   USER_ID=sample_user4
   PORT=5000

   

4. Install backend dependencies:
   ```bash
   npm install
   ```

5. Start the backend server:
   ```bash
   npm run server
   ```
   or
   ```bash
   node server.js
   ```
   The server will start running on the specified port or on `http://localhost:5000`.

6. Go to the `frontend` folder:
   ```bash
   cd ../frontend
   ```

7. Install frontend dependencies:
   ```bash
   npm install
   ```

8. Start the client-side application:
   ```bash
   npm run dev
   

## Additional Notes
For more details on using the Cobalt SDK, refer to [Cobalt Docs](https://docs.gocobalt.io/introduction).