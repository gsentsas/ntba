/** @type {import('tailwindcss').Config} */
export default {
    content: ['./resources/**/*.{blade.php,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                green: {
                    DEFAULT: '#1D9E75',
                    dark: '#0F6E56',
                    light: '#E1F5EE',
                    xlight: '#F0FAF6',
                },
                amber: {
                    DEFAULT: '#EF9F27',
                    light: '#FAEEDA',
                },
                purple: {
                    DEFAULT: '#7F77DD',
                    light: '#EEEDFE',
                },
                coral: '#D85A30',
                'bac-bg': '#F7F9F8',
            },
        },
    },
    plugins: [],
};
