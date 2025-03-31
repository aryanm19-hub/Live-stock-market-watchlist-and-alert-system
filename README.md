Here's a detailed README.md file with setup and running instructions for the Stock Watchlist application:

Live Stock Market Watchlist & Alert System

A real-time stock market watchlist application with price alerts and email notifications.

Features
- User authentication (register/login)
- Add stocks to personal watchlist
- Real-time price updates via WebSockets
- Set price alerts with email notifications
- Private watchlists per user

Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)
- Gmail account (for email notifications) or other email service
- Optional: Stock market API key (e.g., Alpha Vantage)


Setup Instructions

1. Clone the Repository
bash
git clone <repository-url>
cd stock-watchlist


2. Install Dependencies
bash
npm install


3. Configure Environment Variable
Create a .env file in the root directory with the following variables:

JWT_SECRET=your-secret-key-here         # Secret key for JWT authentication
EMAIL_USER=your-email@gmail.com         # Email for sending notifications
EMAIL_PASS=your-app-password            # Gmail App Password (not regular password)
PORT=3000                              # Server port (optional, defaults to 3000)
For Gmail, you'll need to:
- Enable 2-factor authentication
- Generate an App Password from Google Account settings

4. Update Email Configuration
In server/stockData.js , modify the transporter configuration if using a different email service:

javascript
const transporter = nodemailer.createTransport({
  service: 'gmail',  // Change if using different service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});


Running the Application

Development Mode
bash
npm run dev

This starts both the server and client simultaneously:
- Server runs on ‘http://localhost:3000’
- Client auto-opens in your default browser

Production Mode
1. Start the server:
bash
npm start

2. Serve the client files separately (e.g., using a static file server)

Usage

1. Register/Login
- Open the application in your browser
- Register a new account with username, password, and email
- Log in with your credentials

2. Manage Watchlist
- Enter a stock symbol (e.g., AAPL, GOOGL, MSFT) and click "Add Stock"
- View real-time price updates

3. Set Price Alerts
- Enter a stock symbol
- Set a target price and alert type (above/below)
- Click "Set Alert"
- Receive email notification when price threshold is reached


 Current Implementation
- Uses mock stock prices that update randomly every 5 seconds
- Stores data in memory (lost on server restart)
- Basic UI with minimal styling

To Enhance for Production
1. Stock Data
- Integrate with a real stock market API (e.g., Alpha Vantage)
- Add API key to `.env` file
- Update `stockData.js` to fetch real prices

2. Persistence
- Add a database (MongoDB, PostgreSQL, etc.)
- Modify `auth.js` and `stockData.js` to use database storage

3. Security
- Implement input validation
- Add rate limiting
- Use HTTPS in production

4. Features
- Add logout functionality
- Implement watchlist removal
- Enhance UI/UX with better styling

Troubleshooting/ Common Issues
1. Email not sending
- Check `.env` email credentials
- Verify App Password is correct
- Ensure email service allows less secure apps if not using Gmail

2. WebSocket connection fails
- Verify server is running on port 3000
- Check firewall settings

3. CORS errors
- Ensure client is served from same origin as server in production

Dependencies
- express: Web server framework
- ws: WebSocket implementation
- jsonwebtoken: JWT authentication
- nodemailer: Email sending
- concurrently: Run multiple scripts (dev)
- live-server: Development client server



To run the Live Stock Market Watchlist & Alert System, first ensure you have Node.js and npm installed, then clone the repository and navigate to the project directory. Install the dependencies by running ‘npm install’. 

Create a ‘.env’ file with your JWT secret and email credentials (e.g., ‘JWT_SECRET=your-secret-key’, ‘EMAIL_USER=your-email@gmail.com’, ‘EMAIL_PASS=your-app-password’). 

Start the application in development mode by executing ‘npm run dev’, which launches both the server on ‘http://localhost:3000’ and the client in your default browser. Alternatively, for production, run ‘npm start’ for the server and serve the client files separately. Access the app in your browser to register, log in, and start managing your stock watchlist with real-time updates and alerts.



This README provides comprehensive instructions for setting up and running the application, including prerequisites, configuration, usage, and development notes. Users can follow these steps to get the application running and understand how to extend it for production use.
