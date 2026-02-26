import { defineConfig } from '@tarojs/cli'
import type { UserConfigExport } from '@tarojs/cli'

// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path')

export default defineConfig<'webpack5'>({
  projectName: 'lifechain-miniapp',
  date: '2026-2-26',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    375: 2,
    828: 1.81 / 2,
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: ['@tarojs/plugin-framework-react'],
  defineConstants: {},
  copy: {
    patterns: [],
    options: {},
  },
  framework: 'react',
  compiler: 'webpack5',
  cache: {
    enable: false,
  },
  alias: {
    '@': path.resolve(__dirname, '..', 'src'),
  },
  mini: {
    compile: {
      include: [
        path.resolve(__dirname, '..', '..', 'shared', 'src'),
      ],
    },
    postcss: {
      pxtransform: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false,
        config: {
          namingPattern: 'module',
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
    miniCssExtractPluginOption: {
      ignoreOrder: true,
    },
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false,
        config: {
          namingPattern: 'module',
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
}) as UserConfigExport<'webpack5'>
