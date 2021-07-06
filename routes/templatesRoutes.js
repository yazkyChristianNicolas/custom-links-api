const 
    { check, validationResult, matchedData, sanitize  } = require('express-validator'),
     minify = require('html-minifier').minify,
     Mustache = require('mustache');

module.exports = function(apiRoutes){

    apiRoutes.post('/templates',[
        check('name').exists().trim(),
        check('data64').exists(),
        check('style').optional()
    ], function(req,res){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.mapped() });
        }
        const request = matchedData(req);
        
        console.log(request);

        let styleBufferStringMinified = undefined;
        if(request.style){
            let base64StyleData = request.style.replace("/^data:text/css;base64,/", "");
            let styleBuffer = Buffer.from(base64StyleData, 'base64');
            styleBufferStringMinified = minify(styleBuffer.toString('utf-8'), {
                minifyCSS: true,
                collapseWhitespace: true,
            });
            console.log(styleBufferStringMinified);
        }
        
        let base64Data = request.data64.replace("/^data:text/html;base64,/", "");
        let buff = Buffer.from(base64Data, 'base64');
        let htmlContentMinify = minify(buff.toString('utf-8'), {
            html5: true,
            removeComments:true,
            collapseWhitespace: true,
            removeEmptyAttributes: true
        });

        let finalTemplateData = (styleBufferStringMinified)? Mustache.render(htmlContentMinify, {"style":styleBufferStringMinified}) :htmlContentMinify;

        console.log(finalTemplateData);

        return res.status(204).json({"message": "Template created."});
    });



     

    
}
