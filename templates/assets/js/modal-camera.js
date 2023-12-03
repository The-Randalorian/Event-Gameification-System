// Get the modal
var modal = document.getElementById("scanner-modal");

// Get the button that opens the modal
var btn = document.getElementById("scanner-button");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var html5QrcodeScanner = new Html5QrcodeScanner(
  	"reader", { fps: 10, qrbox: 250 });

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
  html5QrcodeScanner.render(onScanSuccess);
  console.log("started scanner")
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  html5QrcodeScanner.pause();
  html5QrcodeScanner.clear();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
  html5QrcodeScanner.pause();
  html5QrcodeScanner.clear();
}

function onScanSuccess(decodedText, decodedResult) {
    // Handle on success condition with the decoded text or result.
    console.log(`Scan result: ${decodedText}`, decodedResult);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", decodedText, false ); // false for synchronous request
    xmlHttp.send( null );
    location.reload();
}

function onScanFailure(error) {
  // handle scan failure, usually better to ignore and keep scanning.
  // for example:
  console.warn(`Code scan error = ${error}`);
}

//var html5QrcodeScanner = new Html5QrcodeScanner(
//	"reader", { fps: 10, qrbox: 250 });
//html5QrcodeScanner.render(onScanSuccess);