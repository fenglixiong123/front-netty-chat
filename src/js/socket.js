import "chat.js"
import "./utils/request"

const webSocketUrl = "ws://127.0.0.1:9001/websocket?userId=" + myNick;

/**
 * 建立websocket
 * @returns {boolean}
 */
function websocket() {

    window.WebSocket = window.WebSocket || window.MozWebSocket;
    if(!window.WebSocket){
        alert("WebSocket not supported by this browser");
        return false;
    }

    const socket = new WebSocket(webSocketUrl);

    let me = {};
    me.userId = getQueryString('nick');

    /**
     * 连接建立成功
     */
    socket.onopen = function () {
        loginSend();
    };

    /**
     * 连接发生错误
     */
    socket.onerror = function(){
        alert("Socket connect failure !");
    };

    /**
     * 接收到消息
     * @param event
     */
    socket.onmessage = function (event) {
        let data = JSON.parse(event.data);
        console.log(JSON.stringify(data));
        switch (data.code) {
            case GROUP_CHAT_MESSAGE_CODE:
                if (data.sendUserId !== me.userId) {
                    $("#responseContent").append(
                        "   <div class='chatMessageBox'>" +
                        "       <img class='chatAvatar' src='" + defaultHeadImg + "'>" +
                        "       <div class='chatTime'>" + data.username + "&nbsp;&nbsp; " + data.sendTime + "</div>" +
                        "       <div class='chatMessgae'><span>" + data.msg + "</span></div>" +
                        "   </div>");
                } else {
                    $("#responseContent").append(
                        "   <div class='chatMessageBox_me'>" +
                        "       <img class='chatAvatar_me' src='" + defaultHeadImg + "'>" +
                        "       <div class='chatTime'>" + data.sendTime + "&nbsp;&nbsp; " + data.username + "</div>" +
                        "       <div class='chatMessgae_me'><span>" + data.msg + "</span></div>" +
                        "   </div>");
                }
                updateRedPoint(null);
                boxScroll(document.getElementById("responseContent"));
                break;
            case SYSTEM_MESSAGE_CODE:
                systemMessage(data);
                boxScroll(document.getElementById("responseContent"));
                break;
            case PING_MESSAGE_CODE:
                sendPong();
                break;
            case PRIVATE_CHAT_MESSAGE_CODE:
                if (data.sendUserId !== me.userId) {
                    $("#responseContent-" + data.sendUserId).append(
                        "   <div class='chatMessageBox'>" +
                        "       <img class='chatAvatar' src='" + defaultHeadImg + "'>" +
                        "       <div class='chatTime'>" + data.sendUserId + "&nbsp;&nbsp;  " + data.sendTime + "</div>" +
                        "       <div class='chatMessgae'><span>" + data.msg + "</span></div>" +
                        "   </div>");
                } else {
                    $("#responseContent-" + data.receiverUserId).append(
                        "   <div class='chatMessageBox_me'>" +
                        "       <img class='chatAvatar_me' src=" + defaultHeadImg + ">" +
                        "       <div class='chatTime'>" + data.sendTime + "&nbsp;&nbsp; " + data.sendUserId + "</div>" +
                        "       <div class='chatMessgae_me'><span>" + data.msg + "</span></div>" +
                        "   </div>");
                }
                if (data.sendUserId != me.userId) {
                    updateRedPoint(data.sendUserId);
                }
                boxScroll(document.getElementById("responseContent-" + data.sendUserId));
                break;

        }
    };

    socket.onclose = function () {
        quitSend();
    };
    return true;

}