# Cobalt-Example-Test

This repository contains examples to perform integrations with the Cobalt platform. It follows a monorepo structure and includes four integration methods, detailed below.

## Reference Documentation

Welcome to the official Cobalt SDK Documentation. This resource serves as a comprehensive guide to harnessing the power of Cobalt’s SDKs for seamless integration and native experiences within your applications. Our SDKs are tailored to various programming languages, offering you a versatile toolkit to:

- Create dynamic interactions.
- Manage authentication.
- Interact with third-party applications.
- Handle end-user configuration.
- Elevate user experiences.

Within this documentation, you’ll find each object and method provided by Cobalt’s SDKs. Cobalt offers native SDKs for both client-side and server-side implementations.

## Integration Methods

### 1. Hosted-Portal Method
To test the Hosted-Portal method:
1. Navigate to the `hosted-portal` folder:
   ```bash
   cd hosted-portal
   ```

2. In the `hosted-portal` folder, create a `.env` file with the following variables:
   ```env
   NEXT_PUBLIC_API_URL=<your_api_url>
   NEXT_PUBLIC_API_KEY=<your_api_key>
   NEXT_PUBLIC_BASE_URL=<your_base_url>
   NEXT_PUBLIC_TEST_USER_ID=<your_user_id>
   ```

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
   NEXT_PUBLIC_API_URL=<your_api_url>
   NEXT_PUBLIC_API_KEY=<your_api_key>
   NEXT_PUBLIC_BASE_URL=<your_base_url>
   NEXT_PUBLIC_TEST_USER_ID=<your_user_id>
   ```

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
   API_URL=<your_api_url>
   API_KEY=<your_api_key>
   USER_ID=<your_user_id>
   BASE_URL=<your_base_url>
   PORT=<your_port>
   ```

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
   
