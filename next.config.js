/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: process.env.API_URL,
    },
    images: {
        domains: ['lh3.googleusercontent.com', "accountingback.onrender.com"],
    },
}

module.exports = nextConfig
