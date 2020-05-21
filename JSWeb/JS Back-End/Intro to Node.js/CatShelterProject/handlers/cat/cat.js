const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const formidable = require('formidable');
const breeds = require('../../data/breeds.json');
const cats = require('../../data/cats.json');

module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;
    if (pathname === '/cats/add-cat' && req.method === 'GET') {
        let filepath = path.normalize(path.join(__dirname, '../../views/addCat.html'));

        fs.readFile(filepath, (err, data) => {
            if (err) {
                console.log(err);
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                res.write('Error!');
                res.end();
                return;
            }
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            console.log(breeds);
            let readyOptions = breeds.map((breed) => `<option value="${breed}">${breed}</option>`);
            let modifiedData = data.toString().replace('{{catBreeds}}', readyOptions);
            res.write(modifiedData);
            res.end();
        });

    } else if (pathname === '/cats/add-breed' && req.method === 'GET') {
        let filepath = path.normalize(path.join(__dirname, '../../views/addBreed.html'));

        const index = fs.createReadStream(filepath);

        index.on('data', (data) => {
            res.write(data);
        });

        index.on('end', () => {
            res.end();
        });

        index.on('error', (err) => {
            console.log(err);
        });
        console.log(breeds);
    } else if (pathname === '/cats/add-cat' && req.method === 'POST') {
        let form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            if (err) {
                throw (err);
            }
            let uplFilePath = files.upload.path;
            let newPath = path.normalize(path.join(__dirname, '../../data/catsPics/' + files.upload.name));
            fs.rename(uplFilePath, newPath, () => {
                console.log('File Uploaded successfully!');
            });

            let catsNormalizedPath = path.normalize(path.join(__dirname, '../../data/cats.json'));
            fs.readFile(catsNormalizedPath, (err, data) => {
                if (err) {
                    throw (err);
                }

                let allCats = JSON.parse(data);
                fields.id = cats.length + 1;
                fields.image = files.upload.name;
                allCats.push(fields);
                let updatedCats = JSON.stringify(allCats);
                fs.writeFile(catsNormalizedPath, updatedCats, () => {
                });
            });
            res.writeHead(301, { location: '/' });
            res.end();
        });

    } else if (pathname === '/cats/add-breed' && req.method === 'POST') {
        let formData = '';
        req.on('data', (data) => {
            formData += data;
        });
        req.on('end', () => {
            let body = qs.parse(formData);


            let pathJSONFile = path.normalize(path.join(__dirname, '../../data/breeds.json'));

            fs.readFile(pathJSONFile, (err, data) => {
                if (err) {
                    throw (err);
                }

                let breeds = JSON.parse(data);
                breeds.push(body.breed);
                let json = JSON.stringify(breeds);
                console.log(breeds);
                fs.writeFile(pathJSONFile, json, () => console.log('The breed was uploaded successfully!'));
            });
            console.log(breeds);
            res.writeHead(301, {
                location: '/'
            });
            res.end();
        });
    } else {
        return true;
    }
}