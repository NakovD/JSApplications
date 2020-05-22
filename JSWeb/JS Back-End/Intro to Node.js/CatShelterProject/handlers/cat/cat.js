const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const formidable = require('formidable');
let breeds = require('../../data/breeds.json');
let cats = require('../../data/cats.json');

module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;
    if (pathname === '/cats/add-cat' && req.method === 'GET') {
        let filepath = path.normalize(path.join(__dirname, '../../views/addCat.html'));

        const index = fs.createReadStream(filepath);
        index.on('data', (data) => {
            let readyOptions = breeds.map((breed) => `<option value="${breed}">${breed}</option>`);
            let modifiedData = data.toString().replace('{{catBreeds}}', readyOptions);
            res.write(modifiedData);
        });
        index.on('end', () => {
            res.end();
        });

        index.on('error', (err) => {
            console.log(err);
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
    } else if (pathname === '/cats/add-cat' && req.method === 'POST') {
        let form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            if (err) {
                throw (err);
            }
            let uplFilePath = files.upload.path;
            let newPath = path.normalize(path.join(__dirname, '../../content/images' + files.upload.name));
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
                fs.writeFile(catsNormalizedPath, updatedCats, 'utf-8', () => {
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

                let currentBreeds = JSON.parse(data);
                currentBreeds.push(body.breed);
                let json = JSON.stringify(currentBreeds);
                fs.writeFile(pathJSONFile, json, () => console.log('The breed was uploaded successfully!'));
            });
            res.writeHead(301, {
                location: '/'
            });
            res.end();
        });
    } else if (pathname.includes('/cats-edit' && req.method === 'GET')) {


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
    } else if (pathname.includes('/cats-find-new-home') && req.method === 'GET') {
        let filepath = path.normalize(path.join(__dirname, '../../views/catShelter.html'));

        const index = fs.createReadStream(filepath);
        index.on('data', (data) => {
            let id = +pathname.split('/cats-find-new-home/')[1];
            let neededCat = cats.find(cat => cat.id === id);
            let modifiedData = data.toString().replace('{{name}}', neededCat.name);
            modifiedData = modifiedData.replace('{{description}}', neededCat.description);
            let allBreeds = breeds.map((breed) => `<option value="${breed}">${breed}</option>`);
            modifiedData = modifiedData.replace('{{breeds}}', allBreeds);
            modifiedData = modifiedData.replace('{{image}}', path.normalize(path.join('../content/images/') + neededCat.image))
            res.write(modifiedData);
        });
        index.on('end', () => {
            res.end();
        });
        index.on('error', (err) => {
            console.log(err);
        });
    } else if (pathname.includes('/cats-edit') && req.method === 'POST') {



    } else if (pathname.includes('/cats-find-new-home') && req.method === 'POST') {
        let catId = +pathname.split('/cats-find-new-home/')[1];
        console.log(catId);
        let pathToCats = path.normalize(path.join(__dirname, '../../data/cats.json'));
        fs.readFile(pathToCats, (err, data) => {
            if (err) {
                throw (err);
            }
            let allCats = JSON.parse(data);
            let neededCat = allCats.find(cat => cat.id === catId);
            let indexNeededCat = allCats.indexOf(neededCat);
            allCats.splice(indexNeededCat, 1);
            fs.writeFile(pathToCats, JSON.stringify(allCats), 'utf-8', () => {
                console.log('Cat Removed!');
            });
        });
        res.writeHead(301, {
            location: '/'
        });
        res.end();
    } else {
        return true;
    }
}