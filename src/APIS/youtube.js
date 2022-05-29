
let proxyURL = 'https://s5220864.elf.ict.griffith.edu.au:3001/';

export function getVideos(searchQueries, cb) {
    let promises = [];
    for (var i = 0; i < searchQueries.length; i++) {
        promises.push(
            new Promise((resolve, reject) => {
                fetch(proxyURL+"?api=1&search="+searchQueries[i]).then(res => res.json()).then(data => {
                    resolve(data)
                })
            })
        );
        break;
    }
    Promise.all(promises).then(values => {
        cb(values);
    });
}

export function getMostPopular() {
    
}