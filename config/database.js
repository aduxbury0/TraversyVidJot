if(process.env.NODE_ENV === 'production'){

    module.exports = {mongoURI: 'mongodb://aduxbury:aduxbury0@ds125211.mlab.com:25211/vidjot-prod' }

} else {
    
    module.exports = {mongoURI: 'mongodb://localhost/vidjot-dev' }
    
}