import $ from "jquery";

let proxyURL = 'https://s5220864.elf.ict.griffith.edu.au:3001/';

// will need to pass a callback and pass data
export function test() {
    let searchQuery = "Built not Bought";
    fetch(proxyURL+"?api=1&search="+searchQuery).then(res => res.json()).then(data => {
        console.log(data)
        for (var i = 1; i < data.items.length; i++) {
            console.log(data.items[i].id.videoId);
        }
    });
}