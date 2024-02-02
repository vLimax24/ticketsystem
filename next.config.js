/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'avatars.githubusercontent.com',
            'lh3.googleusercontent.com'
        ]
    },
    output: 'export',
    distDir: 'dist',
}

module.exports = nextConfig
