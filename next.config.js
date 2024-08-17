/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },

    env: {
      host: 'sg2nlmysql59plsk.secureserver.net', //'58.84.143.251', 
      port: '3306', 
      user: 'myfindefaultuser',
      password: '1656Wnq?b', 
      database: 'ph16525402231_my_fin', 
      domain: 'https://www.quiztofer.com',
      
      host_dev: 'localhost', // '192.168.1.12', //'58.84.143.251', 
      port_dev: '3306', 
      user_dev: 'root',
      password_dev: '', 
      database_dev: 'quiztofer',
      domain_dev: 'http://192.168.1.200:3000'
    }}

module.exports = nextConfig
