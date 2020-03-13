function attachEvents() {
    let url = `https://blog-apps-c12bf.firebaseio.com/`;
    let $buttonLoad = document.querySelector("#btnLoadPosts");
    let $selectOptionsMenu = document.querySelector("#posts");
    let loadFunc = async function(e) {
        try{
            let response = await fetch(url + '/posts.json');
            if (response.status < 400) {
                let data = await response.json();
                Object.keys(data).forEach(key => {
                    let $newOption = document.createElement('option');
                    $newOption.setAttribute('value',`${key}`);
                    $newOption.textContent = `${data[key].title}`;
                    $selectOptionsMenu.appendChild($newOption);
                });
            }else {
                throw(response);
            }
        }catch(error) {

        }
    }
    $buttonLoad.addEventListener('click',loadFunc);


    
    let viewFunc = async function(e) {
        let selectedOption = Array.from($selectOptionsMenu.children).find(el => el.selected);
        try {
            let response = await fetch(url + `/posts/${selectedOption.value}.json`);
            if (response.status < 400) {
                let data = await response.json();
                document.querySelector("#post-title").textContent = `${data.title}`;
                let $newParagr = document.createElement('p');
                $newParagr.textContent = data.body;
                $newParagr.id = `post-body`;
                let parent = document.querySelector("#post-body").parentNode;
                let $ulToReplace = document.querySelector("#post-body");
                parent.replaceChild($newParagr,$ulToReplace);
                let commentsResponse = await fetch(url + `/comments.json`);
                if (commentsResponse.status < 400) {
                    let commentsData = await commentsResponse.json();
                    document.querySelector("#post-comments").innerHTML = '';
                    let neededComments = Object.values(commentsData).filter(el => el.postId === data.id)
                        .forEach(el => {
                            let $commentLi = document.createElement('li');
                            $commentLi.textContent = `${el.text}`;
                            $commentLi.id = el.id;
                            document.querySelector("#post-comments").appendChild($commentLi);
                        });
                }else {
                    throw(response);
                }
            }else {
                throw(response);
            }
        }catch(error) {
            console.error(error.statusText);
        }
    }
    let $buttonView = document.querySelector("#btnViewPost");
    $buttonView.addEventListener('click',viewFunc);
}

attachEvents();