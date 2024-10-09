Steps to run the project:

    1. Clone the repository from using the command 'git clone https://github.com/BadalSoni03/Translense-backend.git'
    2. Now cd into the project's directory and run the command 'npm install'. This will install the dependencies.
    3. Provide the environment variables in the .env file (not pushed because of security concerns)
    4. After providing all the dependencies correctly, run the command 'npm run dev', this will start the local development server on port: 8000 (if PORT env variable is not correctly configured then will run on port:3000)
    5. Now hit the 'http://localhost:8000/api/v1/health-check' (change the port number accordingly) in the browser, you will see the json { message: 'v1 api is live' } as the response.

Features:

    1. Creates owner's and business's account.
    2. Sends OTP during registration process to the account owner.
    3. By default accounts are disabled, after verifying the OTP the accounts are enabled.

API End-points:

Owner API: 

    POST /api/v1/owner, 
    payload: { fullName, email, address, mobileNumber }
    status codes: { created: 201, bad-request: 400, internal-server-error: 500 }

Business API: 

    POST /api/v1/business/{ownerId}, 
    payload: { businessName, email, address, mobileNumber }, 
    status code: { created: 201, bad-request: 400, internal-server-error: 500 }
    
Owner OTP API: 

    POST /api/v1/otp/verify/owner, 
    payload: { otp },
    status code: { success: 200, bad-request: 400, internal-server-error: 500 }

    
Business OTP API: 

    POST /api/v1/otp/verify/business, 
    payload: { otp }, 
    status code: { success: 200, bad-request: 400, internal-server-error: 500 }

NOTE:
    
    Provide the gmail app credentials such as app name and password and mongodb connection string in the .env file in double or single quotes
