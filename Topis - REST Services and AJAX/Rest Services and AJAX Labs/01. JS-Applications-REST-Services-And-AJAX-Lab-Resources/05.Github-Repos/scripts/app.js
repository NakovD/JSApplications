function loadRepos() {
    let $ul = document.querySelector("#repos");
    $ul.removeChild($ul.children[0]);
    fetch('https://api.github.com/users/k1r1l/repos')
        .then(response => response.json())
        .then(data => data.map(obj => {
            let $liEl = document.createElement('li');
            let $a = document.createElement('a');
            $a.href = obj.html_url;
            $a.textContent = obj.full_name;
            $liEl.appendChild($a);
            $ul.appendChild($liEl);
        }))
        .catch(error => {
            let $liEl = document.createElement('li');
            $liEl.textContent = error.message;
            $ul.appendChild($liEl);
        });
}