document.getElementById('button').addEventListener('click', loadData);

function loadData() {

    // Create an XHR Object
    const xhr = new XMLHttpRequest();

    // Open
    xhr.open('GET' , 'data.txt', true);

    xhr.onload = function(){
        if(this.status === 200) {

            document.getElementById('output').innerHTML = 
            `<h1>${this.responseText}</h1>`

            // Optional - Used for spinnders/ loaders
            // xhr.onprogress = function(){
                
            // }
        }


    }

    // xhr.onreadystatechange = function(){
    //     if(this.status === 200 && this.readyState === 4){
    //         console.log(this.responseText);
    //     }
    // }
    xhr.onerror = function(){
        console.log('Reqeust Error...')
    }
    xhr.send();
}



/* ReadyState Values
0: request not initialized
1: server connection established
2: request received
3: processing request
4: request finished and response is ready
*/

