let url = '?id=5&page=1&size=20'

function parse_qs(qs, re=/(\w+)=([^&]+)/) {
    let obj = {};
    if (qs.startsWith('?'))      
        qs = qs.substr(1)
    console.log(qs);
    qs.split('&').forEach(element => {
        let match = re.exec(element);
        console.log(match);
        if (match) obj[match[1]] = match[2]
    });
    return obj
}



console.log(parse_qs(url))