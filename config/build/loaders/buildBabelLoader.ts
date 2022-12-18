import { BuildOptions } from '../types/config';
import babelRemovePropsPlugin from '../babel/babelRemovePropsPlugin';

interface BuildBabelLoaderProps extends BuildOptions {
  isTsx?: boolean
}

export function buildBabelLoader({ isDev, isTsx }: BuildBabelLoaderProps) {
    return {
        test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
                plugins: [
                    [
                        'i18next-extract',
                        {
                            locales: ['ru', 'en'],
                            keyAsDefaultValue: true,
                        },
                    ],
                    ['@babel/plugin-transform-typescript', {
                        isTsx,
                    }], // нужен чтобы бабель смог работать с тайпскриптом
                    ['@babel/plugin-transform-runtime'], // нужен чтобы бабель смог работать с тайпскриптом
                    isTsx && [
                        babelRemovePropsPlugin,
                        {
                            props: ['data-testid'],
                        },
                    ],
                    isDev && require.resolve('react-refresh/babel'),
                ].filter(Boolean),
            },
        },
    };
}
