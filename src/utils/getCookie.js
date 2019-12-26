// 获取cookie判断是否登陆
export function getCookie(c_name) {
    if (document.cookie.length > 0) {
        let c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            let c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}
export function checkCookie() {
    let username = getCookie("username");
    if (username != null && username != "") {
        username = username.replace(/\"/g, "");
        return username
    } else {
        username = "";
        return username
    }
}