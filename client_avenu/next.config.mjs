/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';
import withSvgr from "next-plugin-svgr";
const withNextIntl = createNextIntlPlugin();


const nextConfig = withSvgr({
    svgrOptions: {
        titleProp: true,
        icon: true,
        svgProps: {
            height: 'auto',
        },
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                pathname: '/**',
            },
            // {
            //     protocol: 'https',
            //     hostname: 'avatars.steamstatic.com',
            //     pathname: '/**',
            // },
            // {
            //     protocol: 'https',
            //     hostname: 'avatars.akamai.steamstatic.com',
            //     pathname: '/**',
            // },
            // {
            //     protocol: 'https',
            //     hostname: 'content.magicrust.ru',
            //     pathname: '/images/newshop/products/**',
            // },
            // {
            //     protocol: 'https',
            //     hostname: 'storage.yandexcloud.net',
            //     pathname: '/magicow-rust/**',
            // },
        ],
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    { key: 'Access-Control-Allow-Credentials', value: 'true' },
                    { key: 'Access-Control-Allow-Origin', value: 'http://localhost:3000' }, // Замените на ваш домен
                ],
            },
        ];
    },
});

export default withNextIntl(nextConfig);

