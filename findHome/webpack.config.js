var config = {
   entry: './main.js',
	
   output: {
      path: __dirname + "/dist/js",
      filename: 'index.js',
   },
	
   devServer: {
      inline: true,
      port: 4200
   },
	
   module: {
      loaders: [
         {  test: /\.css$/, 
            loader: "style-loader!css-loader" 
         },

         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
				
            query: {
               presets: ['es2015', 'react'],
               plugins: ["transform-class-properties"]
            }
         },
         { test: /\.(eot|svg|ttf|woff|woff2)$/, loader: 'file-loader?name=public/fonts/[name].[ext]' }
      ]
   }
}

module.exports = config;