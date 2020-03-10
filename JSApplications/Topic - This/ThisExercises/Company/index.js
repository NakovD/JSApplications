function solve() {
   let $allRows = document.querySelector("body > table > tbody");
   let clickFunc = function (e) {
      let colorWanted = "#413f5e";
      if (e.target.parentNode.hasAttribute('style')) {
         e.target.parentNode.removeAttribute('style');
      }else {
         let otherChilds = Array.from(e.target.parentNode.parentNode.children).forEach(tr => {
            if (tr.hasAttribute('style')) {
               tr.removeAttribute('style');
            }
         });
         e.target.parentNode.style = `background-color:${colorWanted}`;
      }
   }
   $allRows.addEventListener('click', clickFunc);
}
