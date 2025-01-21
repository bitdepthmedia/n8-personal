import nodemailer from 'nodemailer'
import { google } from 'googleapis'

const OAuth2 = google.auth.OAuth2

// Create OAuth2 client
const oauth2Client = new OAuth2(
    process.env.EMAIL_CLIENT_ID,
    process.env.EMAIL_CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'
)

// Set refresh token
oauth2Client.setCredentials({
    refresh_token: process.env.EMAIL_REFRESH_TOKEN
})

// Function to get access token
async function getAccessToken() {
    try {
        const { token } = await oauth2Client.getAccessToken()
        return token
    } catch (error) {
        console.error('Error getting access token:', error)
        throw error
    }
}

// Create reusable transporter object
export async function createTransporter() {
    const accessToken = await getAccessToken()

    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.EMAIL_FROM,
            clientId: process.env.EMAIL_CLIENT_ID,
            clientSecret: process.env.EMAIL_CLIENT_SECRET,
            refreshToken: process.env.EMAIL_REFRESH_TOKEN,
            accessToken: accessToken
        }
    } as nodemailer.TransportOptions)
}

// Function to refresh access token
export async function refreshAccessToken() {
    try {
        const { credentials } = await oauth2Client.refreshAccessToken()
        return credentials.access_token
    } catch (error) {
        console.error('Error refreshing access token:', error)
        throw error
    }
}