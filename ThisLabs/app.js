function solve() {
    let $button = document.querySelector("#dropdown");
    let $dropdownMenu = document.querySelector("#dropdown-ul");
    let $box = document.querySelector("#box");
    let dropFunc = function(e) {
        if ($dropdownMenu.style.display === 'block') {
            $dropdownMenu.style.display = 'none';
            $box.style = `background-color:black`
            $box.style.color = 'white';
        }else {
            $dropdownMenu.style.display = 'block';
            let changeColorFunc = function(e) {
                let colorWanted = e.target.textContent;
                $box.style = `background-color:${colorWanted}`;
                $box.style.color = 'black';
            }
            $dropdownMenu.addEventListener('click',changeColorFunc);
        }
    }

    $button.addEventListener('click',dropFunc);
}