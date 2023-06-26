/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/pivot-table-demo',
                permanent: true,
            }
        ]
    },
}

module.exports = nextConfig
