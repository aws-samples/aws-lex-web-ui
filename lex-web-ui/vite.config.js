import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import path from 'path'
import fs from 'fs'
import { bannerPlugin } from './plugins/banner-plugin.js'
import { assetHandlerPlugin } from './plugins/asset-handler-plugin.js'
import * as sass from "sass";

const PACKAGE_VERSION = JSON.parse(fs.readFileSync('./package.json', 'utf8')).version

// Build configuration model as per design specification
const buildConfig = {
  // Build type detection (trim whitespace from environment variables)
  isLib: process.env.BUILD_TARGET?.trim() === 'lib',
  isApp: process.env.BUILD_TARGET?.trim() === 'app' || !process.env.BUILD_TARGET?.trim(),
  isProd: process.env.NODE_ENV?.trim() === 'production',
  isDev: process.env.NODE_ENV?.trim() === 'development',
  
  // Output configuration
  outputDir: 'dist',
  assetsDir: '',
  bundleDir: 'bundle',
  
  // Asset paths
  faviconPath: 'src/assets/favicon.png',
  logoPath: 'src/assets/logo.png',
  fallbackIconPath: 'node_modules/material-design-icons/maps/2x_web/ic_local_florist_white_18dp.png'
}

// Build type detection utilities
const buildUtils = {
  /**
   * Get the current build mode based on environment variables
   * @returns {'lib'|'app'} The detected build mode
   */
  getBuildMode() {
    return buildConfig.isLib ? 'lib' : 'app'
  },

  /**
   * Get the current environment based on NODE_ENV
   * @returns {'production'|'development'} The detected environment
   */
  getEnvironment() {
    return buildConfig.isProd ? 'production' : 'development'
  },

  /**
   * Get the build target string for logging and debugging
   * @returns {string} Human-readable build target description
   */
  getBuildTarget() {
    const mode = this.getBuildMode()
    const env = this.getEnvironment()
    return `${mode}-${env}`
  },

  /**
   * Validate environment variables and provide helpful error messages
   * @throws {Error} If environment configuration is invalid
   */
  validateEnvironment() {
    // Validate BUILD_TARGET if explicitly set (trim whitespace)
    const buildTarget = process.env.BUILD_TARGET?.trim()
    if (buildTarget && !['lib', 'app'].includes(buildTarget)) {
      throw new Error(`Invalid BUILD_TARGET: '${buildTarget}'. Must be 'lib' or 'app'`)
    }

    // Validate NODE_ENV if explicitly set (trim whitespace)
    const nodeEnv = process.env.NODE_ENV?.trim()
    if (nodeEnv && !['production', 'development'].includes(nodeEnv)) {
      throw new Error(`Invalid NODE_ENV: '${nodeEnv}'. Must be 'production' or 'development'`)
    }

    // Log current configuration for debugging
    console.log(`🔧 Build Configuration:`)
    console.log(`   Mode: ${this.getBuildMode()}`)
    console.log(`   Environment: ${this.getEnvironment()}`)
    console.log(`   Target: ${this.getBuildTarget()}`)
    console.log(`   Package Version: ${PACKAGE_VERSION}`)
  },

  /**
   * Get environment variables to inject into the build
   * @returns {Object} Environment variables for define config
   */
  getDefineConfig() {
    return {
      'process.env.PACKAGE_VERSION': JSON.stringify(PACKAGE_VERSION),
      'process.env.BUILD_TARGET': JSON.stringify(process.env.BUILD_TARGET?.trim() || 'app'),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV?.trim() || 'development'),
      '__VUE_OPTIONS_API__': 'true',
      '__VUE_PROD_DEVTOOLS__': 'false',
      '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': 'false'
    }
  }
}

// Validate environment on startup
buildUtils.validateEnvironment()

// Base configuration
const baseConfig = {
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // Support for custom elements if needed
          isCustomElement: (tag) => tag.startsWith('ion-')
        }
      }
    }),
    // Vuetify plugin for proper integration and theme support
    vuetify({
      // Ensure Material Design Icons are properly handled
      styles: 'sass',
    }),
    // Node.js polyfills for browser compatibility (AWS SDK support)
    nodePolyfills({
      // Include specific polyfills needed for AWS SDK and other Node.js dependencies
      include: ['buffer', 'process', 'util', 'stream', 'zlib'],
      // Configure global polyfills for AWS SDK compatibility
      globals: {
        Buffer: true,
        global: true,
        process: true
      },
      // Override specific modules for better compatibility
      overrides: {
        // Use browserify-zlib for zlib polyfill (already in dependencies)
        zlib: 'browserify-zlib'
      },
      // Exclude problematic modules that should be handled differently
      exclude: ['@aws-crypto/crc32', '@aws-crypto/crc32c-node']
    }),
    // Add banner plugin for library builds
    bannerPlugin({
      isLibraryBuild: buildConfig.isLib,
      packageJsonPath: './package.json'
    }),
    // Asset handling plugin for favicon/logo with fallback logic
    assetHandlerPlugin({
      faviconPath: buildConfig.faviconPath,
      logoPath: buildConfig.logoPath,
      fallbackFaviconPath: buildConfig.fallbackIconPath,
      fallbackLogoPath: buildConfig.fallbackIconPath, // Using same fallback for both
      outputDir: buildConfig.outputDir,
      publicDir: 'public'
    }),
    // Custom plugin to fix AWS crypto module exports
    {
      name: 'fix-aws-crypto-exports',
      config(config, { command }) {
        if (command === 'serve') {
          // Ensure AWS crypto modules are pre-bundled
          config.optimizeDeps = config.optimizeDeps || {};
          config.optimizeDeps.include = config.optimizeDeps.include || [];
          if (!config.optimizeDeps.include.includes('@aws-crypto/crc32')) {
            config.optimizeDeps.include.push('@aws-crypto/crc32');
          }
          if (!config.optimizeDeps.include.includes('@smithy/eventstream-codec')) {
            config.optimizeDeps.include.push('@smithy/eventstream-codec');
          }
        }
      }
    }
  ],
  define: {
    ...buildUtils.getDefineConfig(),
    // Enable Vue template compilation
    __VUE_OPTIONS_API__: 'true',
    __VUE_PROD_DEVTOOLS__: 'false',
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      // Use the full build of Vue that includes the template compiler
      'vue': 'vue/dist/vue.esm-bundler.js',
      // Explicitly alias zlib to browserify-zlib for browser compatibility
      'zlib': 'browserify-zlib'
    },
    // Ensure proper module resolution
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  // Web worker configuration for Vite's native worker support
  worker: {
    // Apply the same plugins to workers for transpilation and polyfills
    plugins: () => [
      // Apply Node.js polyfills to workers for browser compatibility
      nodePolyfills({
        include: ['buffer', 'process', 'util', 'stream', 'zlib'],
        globals: {
          Buffer: true,
          global: true,
          process: true
        },
        overrides: {
          zlib: 'browserify-zlib'
        }
      })
    ],
    // Generate source maps for workers in development
    sourcemap: buildConfig.isDev,
    // Configure worker format - use 'es' for modern browsers, 'iife' for fallback
    format: 'es',
    // Configure worker rollup options for external dependencies
    rollupOptions: {
      // Workers should be self-contained, but we can externalize if needed
      external: [],
      output: {
        // Ensure workers are placed in the correct directory with proper naming
        entryFileNames:
          (chunkInfo) => {
            // Remove '-worker' suffix if it already exists to avoid duplication
            const baseName = chunkInfo.name.replace(/-worker$/, '');
            const suffix = buildConfig.isProd ? '.min.js' : '.js';
            return `${baseName}-worker${suffix}`;
          }
      }
    }
  },
}

// Library build configuration
const libraryConfig = {
  ...baseConfig,
  // CSS configuration for development
  css: {
    // Configure CSS preprocessing
    preprocessorOptions: {
      scss: {
        api: "modern",
        importers: [
          new sass.NodePackageImporter()
        ]
      },
      sass: {
        api: "modern",
        importers: [
          new sass.NodePackageImporter()
        ]
      },
    },
    // Configure PostCSS to handle newer CSS functions
    postcss: {
      plugins: [
        {
          postcssPlugin: 'ignore-calc-size',
          Once(root) {
            // Replace calc-size() with a fallback for compatibility
            root.walkDecls(decl => {
              if (decl.value.includes('calc-size(')) {
                // Replace calc-size(max-content, size) with max-content as fallback
                decl.value = decl.value.replace(/calc-size\(([^,]+),\s*size\)/g, '$1');
              }
            });
          }
        }
      ]
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/lex-web-ui.js'),
      name: 'LexWebUi',
      formats: ['umd'],
      fileName: () => buildConfig.isProd ? `lex-web-ui.min.js` : `lex-web-ui.js`
    },
    outDir: path.join(buildConfig.outputDir, buildConfig.bundleDir),
    emptyOutDir: !buildConfig.isProd, // Only clean on first (dev) build; prod build preserves dev output
    rollupOptions: {
      // External dependencies that should not be bundled in library mode
      external: [
        'vue', 
        'vuex', 
        'vue-router', 
        'vuetify'
      ],
      output: {
        globals: {
          vue: 'Vue',
          vuex: 'Vuex',
          'vue-router': 'VueRouter',
          vuetify: 'Vuetify'
        },
        // Ensure CSS files are named consistently
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') {
            return buildConfig.isProd ? `lex-web-ui.min.css` : `lex-web-ui.css`
          }
          return `${assetInfo.name}`
        }
      }
    },
    sourcemap: buildConfig.isDev,
    minify: buildConfig.isProd,
    // Ensure CSS is extracted as separate files
    cssCodeSplit: false
  }
}

// App build configuration
const appConfig = {
  ...baseConfig,
  build: {
    outDir: buildConfig.outputDir,
    sourcemap: buildConfig.isDev,
    minify: buildConfig.isProd,
    rollupOptions: {
      // Configure consistent naming for app builds
      output: {
        entryFileNames: buildConfig.isProd ? 'lex-web-ui.min.js' : 'lex-web-ui.js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return buildConfig.isProd ? 'lex-web-ui.min.css' : 'lex-web-ui.css'
          }
          return '[name].[ext]'
        }
      }
    },
    // Configure CommonJS handling
    commonjsOptions: {
      // Include AWS crypto modules in CommonJS transformation
      include: [
        /node_modules/,
        /@aws-crypto/,
        /@smithy/
      ],
      // Transform mixed modules
      transformMixedEsModules: true
    }
  },
  // Development server configuration with HMR and debugging features
  server: {
    port: 8080,
    host: true, // Allow external connections for testing
    open: true,
    strictPort: false, // Allow Vite to use a different port if 8080 is busy
    // Enable CORS for development
    cors: true,
    // Configure HMR (Hot Module Replacement)
    hmr: {
      port: 24678, // Use a different port for HMR WebSocket
      overlay: true // Show error overlay on build errors
    },
    // Proxy configuration for API calls if needed
    proxy: {
      // Example: proxy API calls to backend during development
      // '/api': {
      //   target: 'http://localhost:3000',
      //   changeOrigin: true,
      //   secure: false
      // }
    },
    // Configure development server middleware
    middlewareMode: false,
    // Enable file watching for better development experience
    watch: {
      // Watch for changes in these directories
      ignored: ['**/node_modules/**', '**/dist/**'],
      // Use polling for better compatibility across different systems
      usePolling: false,
      // Debounce file change events
      interval: 100
    }
  },
  // Enhanced development configuration
  esbuild: {
    // Enable source map generation for better debugging
    sourcemap: buildConfig.isDev,
    // Keep function names for better debugging experience
    keepNames: buildConfig.isDev,
    // Enable JSX support if needed
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  },
  // CSS configuration for development
  css: {
    // Enable source maps for CSS in development
    devSourcemap: buildConfig.isDev,
    // Configure CSS preprocessing
    preprocessorOptions: {
      scss: {
        api: "modern",
        importers: [
          new sass.NodePackageImporter()
        ]
      },
      sass: {
        api: "modern",
        importers: [
          new sass.NodePackageImporter()
        ]
      },
    },
    // Configure PostCSS to handle newer CSS functions
    postcss: {
      plugins: [
        {
          postcssPlugin: 'ignore-calc-size',
          Once(root) {
            // Replace calc-size() with a fallback for compatibility
            root.walkDecls(decl => {
              if (decl.value.includes('calc-size(')) {
                // Replace calc-size(max-content, size) with max-content as fallback
                decl.value = decl.value.replace(/calc-size\(([^,]+),\s*size\)/g, '$1');
              }
            });
          }
        }
      ]
    }
  },
  // Optimize dependencies for faster development startup
  optimizeDeps: {
    // Include dependencies that should be pre-bundled
    include: [
      'vue',
      'vuex',
      'vue-router',
      'vuetify',
      'material-design-icons',
      // Include browserify-zlib for proper zlib polyfill
      'browserify-zlib',
      // Include AWS crypto modules to fix export issues
      '@aws-crypto/crc32',
      '@aws-crypto/crc32c-node',
      '@aws-crypto/util',
      '@smithy/util-utf8',
      '@smithy/util-hex-encoding',
      // Include Smithy eventstream codec to fix the import issue
      '@smithy/eventstream-codec'
    ],
    // Exclude dependencies that should not be pre-bundled
    exclude: [
      // MDI font should not be pre-bundled
      '@mdi/font'
    ],
    // Force optimization of specific dependencies
    force: buildConfig.isDev,
    // Configure ESBuild options for better compatibility
    esbuildOptions: {
      // Handle mixed CommonJS/ES modules
      mainFields: ['module', 'main'],
      // Resolve extensions in order
      resolveExtensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
      // Define global variables for Node.js compatibility
      define: {
        global: 'globalThis'
      }
    }
  }
}

export default defineConfig(buildConfig.isLib ? libraryConfig : appConfig)