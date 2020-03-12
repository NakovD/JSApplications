function getInfo() {
    let $stopId = document.querySelector("#stopId");
    let $divStopName = document.querySelector("#stopName");
    let $ulListToAppendBusInfo = document.querySelector("#buses");
    fetch(`https://judgetests.firebaseio.com/businfo/${$stopId.value}.json`)
        .then(response => response.json())
        .then(data => {
            if ($ulListToAppendBusInfo.childElementCount > 0) {
                Array.from($ulListToAppendBusInfo.children).forEach(li => {
                    $ulListToAppendBusInfo.removeChild(li);
                });
            }
            if (data.error) {
                $divStopName.textContent = 'Error';
                return;
            }
            $divStopName.textContent = data.name;
            Object.keys(data.buses).forEach(key => {
                let $newLi = document.createElement('li');
                $newLi.textContent = `Bus ${key} arrives in ${data.buses[key]} minutes.`;
                $ulListToAppendBusInfo.appendChild($newLi);
            });
        });
    stopId.value = '';
}