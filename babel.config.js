module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
          '@/components': './src/components',
          '@/screens': './src/screens',
          '@/navigation': './src/navigation',
          '@/store': './src/store',
          '@/services': './src/services',
          '@/hooks': './src/hooks',
          '@/utils': './src/utils',
          '@/types': './src/types',
          '@/constants': './src/constants',
          '@/assets': './src/assets',
          '@/styles': './src/styles',
        },
      },
    ],
  ],
};