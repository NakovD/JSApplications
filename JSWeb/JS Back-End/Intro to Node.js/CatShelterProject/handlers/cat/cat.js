const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const formidable = require('formidable');

module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;
    if (pathname === '/cats/add-cat' && req.method === 'GET') {
        let filepath = path.normalize(path.join(__dirname, '../../views/addCat.html'));

        fs.readFile(filepath, (err, htmlData) => {
            if (err) {
                console.log(err);
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                res.write('error');
                res.end();
                return;
            }
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            const pathToBreeds = path.normalize(path.join(__dirname, '../../data/breeds.json'));
            fs.readFile(pathToBreeds, (err, dataBreeds) => {
                if (err) {
                    throw (err);
                }
                const breeds = JSON.parse(dataBreeds);
                let readyOptions = breeds.map((breed) => `<option value="${breed}">${breed}</option>`);
                let modifiedData = htmlData.toString().replace('{{catBreeds}}', readyOptions);
                res.write(modifiedData);
                res.end()
            });

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
            let newPath = path.normalize(path.join(__dirname, '../../content/images/' + files.upload.name));
            fs.rename(uplFilePath, newPath, () => {
                console.log('File Uploaded successfully!');
            });

            let catsNormalizedPath = path.normalize(path.join(__dirname, '../../data/cats.json'));
            fs.readFile(catsNormalizedPath, (err, data) => {
                if (err) {
                    throw (err);
                }

                let allCats = JSON.parse(data);
                fields.id = allCats.length + 1;
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
    } else if (pathname.includes('/cats-edit') && req.method === 'GET') {
        const pathToHTMLFile = path.normalize(path.join(__dirname, '../../views/editCat.html'));

        fs.readFile(pathToHTMLFile, (err, htmlData) => {
            if (err) {
                console.log(err);
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                res.write('Error');
                res.end();
                return;
            }
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            fs.readFile(path.normalize(path.join(__dirname, '../../data/cats.json')), (err, catsData) => {
                if (err) {
                    throw (err);
                }
                const allCats = JSON.parse(catsData);
                const catId = +pathname.split('cats-edit/')[1];
                const neededCat = allCats.find((cat) => cat.id === catId);
                let modifiedData = htmlData.toString().replace('{{name}}', neededCat.name);
                modifiedData = modifiedData.replace('{{description}}', neededCat.description);
                fs.readFile(path.normalize(path.join(__dirname, '../../data/breeds.json')), (err, breedsData) => {
                    if (err) {
                        throw (err);
                    }
                    const allBreeds = JSON.parse(breedsData);
                    const readyOptions = allBreeds.map((breed) => `<option value="${breed}">${breed}</option>`);
                    modifiedData = modifiedData.replace('{{breeds}}', readyOptions);
                    res.write(modifiedData);
                    res.end();
                });
            });

        })

    } else if (pathname.includes('/cats-find-new-home') && req.method === 'GET') {
        let filepath = path.normalize(path.join(__dirname, '../../views/catShelter.html'));

        fs.readFile(filepath, (err, htmlData) => {
            if (err) {
                console.log(err);
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                res.write('Error occured!');
                res.end();
                return;
            }
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            const id = +pathname.split('/cats-find-new-home/')[1];
            const pathToCats = path.normalize(path.join(__dirname, '../../data/cats.json'));
            fs.readFile(pathToCats, (err, dataCats) => {
                if (err) {
                    throw (err);
                }
                const allCats = JSON.parse(dataCats);
                const neededCat = allCats.find(cat => cat.id === id);
                let modifiedData = htmlData.toString().replace('{{name}}', neededCat.name);
                modifiedData = modifiedData.replace('{{description}}', neededCat.description);
                modifiedData = modifiedData.replace('{{breed}}', `<option value="${neededCat.breed}">${neededCat.breed}</option>`);
                modifiedData = modifiedData.replace('{{image}}', path.join('../../content/images/' + neededCat.image));
                res.write(modifiedData);
                res.end();
            });
        });
    } else if (pathname.includes('/cats-edit') && req.method === 'POST') {
        let editForm = new formidable.IncomingForm();
        const currentCatId = +pathname.split('/cats-edit/')[1];
        editForm.parse(req, (err, fields, files) => {
            if (err) {
                throw (err);
            }
            const oldPath = files.file.path;
            const newPath = path.normalize(path.join(__dirname, '../../content/images/' + files.file.name));
            fs.rename(oldPath, newPath, () => {
                console.log('File uploaded successfully!');
            });

            const catsNormalizedPath = path.normalize(path.join(__dirname, '../../data/cats.json'));
            fs.readFile(catsNormalizedPath, (err, data) => {
                if (err) {
                    throw (err);
                }
                const allCats = JSON.parse(data);
                let neededCat = allCats.find(cat => cat.id === currentCatId);
                neededCat.name = fields.name;
                neededCat.description = fields.description;
                neededCat.breed = fields.breed;
                neededCat.image = files.file.name;
                const updatedCats = JSON.stringify(allCats);
                fs.writeFile(catsNormalizedPath, updatedCats, 'utf-8', () => {
                });
            });
            res.writeHead(301, { location: '/' });
            res.end();

        });

    } else if (pathname.includes('/cats-find-new-home') && req.method === 'POST') {
        let catId = +pathname.split('/cats-find-new-home/')[1];
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