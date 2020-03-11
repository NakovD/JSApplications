function solve() {
    let departBttn = document.querySelector("#depart");
    let arriveBttn = document.querySelector("#arrive");
    let infoBox = document.querySelector("#info > span");
    let currentId = 'depot';
    function depart() {
        if (infoBox.textContent.includes('Not Connected')) {
            fetch(`https://judgetests.firebaseio.com/schedule/${currentId}.json`)
                .then(response => response.json())
                .then(data => {
                    let nextStopId = data.next;
                    infoBox.textContent = `Next stop ${data.name}`;
                    currentId = nextStopId;
                })
            departBttn.disabled = true;
            arriveBttn.disabled = false;
            return;
        }
        fetch(`https://judgetests.firebaseio.com/schedule/${currentId}.json`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    infoBox.textContent = 'Error';
                    departBttn.disabled = true;
                    arriveBttn.disabled = true;
                    return;
                }
                let nextStopId = data.next;
                infoBox.textContent = `Next stop ${data.name}`;
                currentId = nextStopId;
            });
            departBttn.disabled = true;
            arriveBttn.disabled = false;
    }

    function arrive() {
        let currentStop = infoBox.textContent.split('stop')[1].trim();
        infoBox.textContent = `Arriving at ${currentStop}`;
        arriveBttn.disabled = true;
        departBttn.disabled = false;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();