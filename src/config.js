const defaultConfig = {
    mongodb: 'mongodb://mongo:27017/gphoto-bot',
  
    port: 22000,
  }
  
  const devConfig = {
    ...defaultConfig,
    mongodb: 'mongodb://localhost:27017/gphoto-bot',
  }
  
  const config = process.argv.includes('dev') ? devConfig : defaultConfig
  
  
  export default config