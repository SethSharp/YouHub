let proxyURL = 'https://s5220864.elf.ict.griffith.edu.au:3001/';

export function getChannelIDs(searchQueries, cb) {
    // this will retrieve the channel ids
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
        let channelIDs = [];
        for (var i = 0; i < values.length; i++) {
            channelIDs.push(values[i].items[0].id.channelId);
        }
        getVideos(channelIDs,cb);
    });
}

function getVideos(data, cb) {
    // Used to get videos    
    let promises = [];
    for (var i = 0; i < data.length; i++) {
        var channelID = data[i];
        promises.push(
            new Promise((resolve, reject) => {
                fetch(proxyURL+"?api=2&channelID="+channelID).then(res => res.json()).then(data => {
                    resolve(data)
                })
            })
        );
        break;
    }
    Promise.all(promises).then(values => {
        cb(values, data);
    });
}

export function getMostPopular(data, cb) {
    let promises = [];
    for (var i = 0; i < data.length; i++) {
        var channelID = data[i].channelID;
        promises.push(
            new Promise((resolve, reject) => {
                fetch(proxyURL+"?api=3&channelID="+channelID).then(res => res.json()).then(data => {
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