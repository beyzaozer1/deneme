function head_script(src, id = null, afterElement = null) {
    if(document.querySelector("script[src='" + src + "']")){ return; }
    let script = document.createElement('script');
    script.setAttribute('src', src);
    script.setAttribute('type', 'text/javascript');
    if (id) {
        script.setAttribute('id', id);
    }
    if (afterElement) {
        let element = document.getElementById(afterElement);
        element.after(script);
    } else {
        document.head.appendChild(script)
    }
}

function body_script(src) {
    if(document.querySelector("script[src='" + src + "']")){ return; }
    let script = document.createElement('script');
    script.setAttribute('src', src);
    script.setAttribute('type', 'text/javascript');
    document.body.appendChild(script)
}

function del_script(src) {
    let el = document.querySelector("script[src='" + src + "']");
    if(el){ el.remove(); }
}

function head_link(href, id = null, afterElement = null) {
    if(document.querySelector("link[href='" + href + "']")){ return; }
    let link = document.createElement('link');
    link.setAttribute('href', href);
    link.setAttribute('rel', "stylesheet");
    link.setAttribute('type', "text/css");
    if (id) {
        link.setAttribute('id', id);
    }

    if (afterElement) {
        let element = document.getElementById(afterElement);
        element.after(link);
    } else {
        document.head.appendChild(link)
    }
}
function body_link(href) {
    if(document.querySelector("link[href='" + href + "']")){ return; }
    let link = document.createElement('link');
    link.setAttribute('href', href);
    link.setAttribute('rel', "stylesheet");
    link.setAttribute('type', "text/css");
    document.body.appendChild(link)
}

function del_link(href) {
    let el = document.querySelector("link[href='" + href + "']");
    if(el){ el.remove(); }
}

export {
    head_script,
    body_script,
    del_script,
    head_link,
    body_link,
    del_link,
}
