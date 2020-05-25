const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring')

module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;
    if (pathname === '/' && req.method === 'GET') {

        let filePath = path.normalize(
            path.join(__dirname, '../../views/home/index.html'));
        fs.readFile(filePath, (err, dataHTML) => {
            if (err) {
                console.log(err);
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                res.write('error occured');
                res.end();
                return;
            }
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            const pathToCats = path.normalize(path.join(__dirname, '../../data/cats.json'));
            fs.readFile(pathToCats, (err, dataCats) => {
                if (err) {
                    throw (err);
                }
                const allCats = JSON.parse(dataCats);
                const readyOptions = allCats.map((cat) => `<li>
                <img src="${path.join('../../content/images/' + cat.image)}" alt="${cat.name}">
                <h3>${cat.name}</h3>
                <p><span>Breed: </span>${cat.breed}</p>
                <p><span>Description: </span>${cat.description}</p>
                <ul class="buttons">
                    <li class="btn edit"><a href="/cats-edit/${cat.id}">Change Info</a></li>
                    <li class="btn delete"><a href="/cats-find-new-home/${cat.id}">New Home</a></li>
                </ul>
            </li>`);
                const modifiedData = dataHTML.toString().replace('{{cats}}', readyOptions);
                res.write(modifiedData);
                res.end();
            });

        });

    } else if (pathname === '/search' && req.method === 'POST') {
        let filePath = path.normalize(
            path.join(__dirname, '../../views/home/index.html'));
        fs.readFile(filePath, (err, dataHTML) => {
            if (err) {
                console.log(err);
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                res.write('error occured');
                res.end();
                return;
            }
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            const pathToCats = path.normalize(path.join(__dirname, '../../data/cats.json'));
            fs.readFile(pathToCats, (err, dataCats) => {
                if (err) {
                    throw (err);
                }
                const allCats = JSON.parse(dataCats);
                let formData = '';
                req.on('data', (data) => {
                    formData += data;
                })
                req.on('end', () => {
                    const body = qs.parse(formData);
                    const searchResult = allCats.filter(cat => cat.name.includes(body.search) || cat.description.includes(body.search) || cat.breed.includes(body.search));
                    const readyOptions = searchResult.map((cat) => `<li>
                    <img src="${path.join('../../content/images/' + cat.image)}" alt="${cat.name}">
                    <h3>${cat.name}</h3>
                    <p><span>Breed: </span>${cat.breed}</p>
                    <p><span>Description: </span>${cat.description}</p>
                    <ul class="buttons">
                        <li class="btn edit"><a href="/cats-edit/${cat.id}">Change Info</a></li>
                        <li class="btn delete"><a href="/cats-find-new-home/${cat.id}">New Home</a></li>
                    </ul>
                </li>`);
                    const modifiedData = dataHTML.toString().replace('{{cats}}', readyOptions);
                    res.write(modifiedData);
                    res.end();
                });

            });
        });
    } else {
        return true;
    }
}