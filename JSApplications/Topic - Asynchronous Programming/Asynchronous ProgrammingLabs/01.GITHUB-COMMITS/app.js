async function loadCommits() {
    let $usernameField = document.querySelector("#username");
    let $repoField = document.querySelector("#repo");
    let $ulToAddItems = document.querySelector("#commits");
    $ulToAddItems.innerHTML = '';
    if ($usernameField.value !== '' && $repoField.value !== '') {
        try {
        let response = await fetch(`https://api.github.com/repos/${$usernameField.value}/${$repoField.value}/commits`);
        if (response.status < 400) {
            let data = await response.json();
            data.forEach(el => {
                let $newLi = document.createElement('li');
                $newLi.textContent = `${el.commit.author.name}: ${el.commit.message}`;
                $ulToAddItems.appendChild($newLi);
            });
        }else {
            throw(response);
        }
    }catch(error) {
        let $newLi = document.createElement('li');
        $newLi.textContent = `${error.status} (${error.statusText})`;
        $ulToAddItems.appendChild($newLi);
    }
}


    //     fetch(`https://api.github.com/repos/${$usernameField.value}/${$repoField.value}/commits`)
    //         .then(response => {
    //             if (response.status < 400) {
    //                 return response.json();
    //             }
    //             throw(response);
    //         })
    //         .then(data => {
    //             data.forEach(el => {
    //                 let $newLi = document.createElement('li');
    //                 $newLi.textContent = `${el.commit.author.name}: ${el.commit.message}`;
    //                 $ulToAddItems.appendChild($newLi);
    //             });
    //         })
    //         .catch(error => {
    //             let $newLi = document.createElement('li');
    //             $newLi.textContent = `${error.status} (${error.statusText})`;
    //             $ulToAddItems.appendChild($newLi);
    //         });
    // }
    }