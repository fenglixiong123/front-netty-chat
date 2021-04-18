
export default Window = {
    openWindow
};

function openWindow(url){
    if (navigator.userAgent.indexOf("Chrome") > 0) {
        openWindowDialog(url);
    }else{
        openWindowModalDialog(url);
    }
}

/*
 1.dialogHeight :对话框高度，不小于100px，IE4中dialogHeight 和 dialogWidth 默认的单位是em，而IE5以上是px，为方便其见，在定义modal方式的对话框时，用px做单位。
 2.dialogWidth: 对话框宽度。
 3.dialogLeft: 离屏幕左的距离。
 4.dialogTop: 离屏幕上的距离。
 5.center: {yes | no | 1 | 0 }：窗口是否居中，默认yes，但仍可以指定高度和宽度。
 6.help: {yes | no | 1 | 0 }：是否显示帮助按钮，默认yes。
 7.resizable: {yes | no | 1 | 0 } 〔IE5＋〕：是否可被改变大小。默认no。
 8.status: {yes | no | 1 | 0 } 〔IE5+〕：是否显示状态栏。默认为yes[ Modeless]或no[Modal]。
 9.scroll:{ yes | no | 1 | 0 | on | off }：指明对话框是否显示滚动条。默认为yes。
 下面几个属性是用在HTA中的，在一般的网页中一般不使用。
 10.dialogHide:{ yes | no | 1 | 0 | on | off }：在打印或者打印预览时对话框是否隐藏。默认为no。
 11.edge:{ sunken | raised }：指明对话框的边框样式。默认为raised。
 12.unadorned:{ yes | no | 1 | 0 | on | off }：默认为no。
 */
function openWindowModalDialog( url, dialogWidth, dialogHeight, center, help, resizable, status, scroll ){
    //if( !dialogLeft ) dialogLeft = "400px";
    //if( !dialogTop ) dialogTop = "200px";
    if( !dialogWidth ) dialogWidth = "1000px";
    if( !dialogHeight) dialogHeight = "600px";
    if( !center ) center = "yes";
    if( !help ) help = "yes";
    if( !resizable ) resizable = "no";
    if( !status ) status = "no";
    if( !scroll ) scroll = "yes";
    const obj = {};
    obj.name="i5tt";
    return  window.showModalDialog( url,obj,"dialogWidth=" + dialogWidth + ", dialogHeight=" + dialogHeight + ", center=" + center + ", help=" + help + ", resizable=" + resizable + ", status=" + status + ", scroll=" + scroll);
}

/**
 * 打开子窗口
 *
 alwaysLowered | yes/no | 指定窗口隐藏在所有窗口之后
 alwaysRaised | yes/no | 指定窗口悬浮在所有窗口之上
 depended | yes/no | 是否和父窗口同时关闭
 directories | yes/no | Nav2和3的目录栏是否可见
 height | pixel value | 窗口高度
 hotkeys | yes/no | 在没菜单栏的窗口中设安全退出热键
 innerHeight | pixel value | 窗口中文档的像素高度
 innerWidth | pixel value | 窗口中文档的像素宽度
 location | yes/no | 位置栏是否可见
 menubar | yes/no | 菜单栏是否可见
 outerHeight | pixel value | 设定窗口(包括装饰边框)的像素高度
 outerWidth | pixel value | 设定窗口(包括装饰边框)的像素宽度
 resizable | yes/no | 窗口大小是否可调整
 screenX | pixel value | 窗口距屏幕左边界的像素长度
 screenY | pixel value | 窗口距屏幕上边界的像素长度
 scrollbars | yes/no | 窗口是否可有滚动栏
 titlebar | yes/no | 窗口题目栏是否可见
 toolbar | yes/no | 窗口工具栏是否可见
 Width | pixel value | 窗口的像素宽度
 z-look | yes/no | 窗口被激活后是否浮在其它窗口之上
 */
function openWindowDialog( url,left,top,width,height,scrollbar,resizable,status,directories,location,menubar,titlebar,toolbar )
{
    if( !left ) left = 400;
    if( !top ) top = 200;
    if( !width ) width = 1000;
    if( !height ) height = 600;
    if( !scrollbar ) scrollbar = "yes";
    if( !resizable ) resizable = "yes";
    if( !status ) status = "yes";
    if( !directories ) directories = "no";
    if( !location ) location = "no";
    if( !menubar ) menubar = "no";
    if( !titlebar ) titlebar = "no";
    if( !toolbar ) toolbar = "no";

    return  window.open( url,"_blank","left=" + left + ", top=" + top + ", width=" + width + ", height=" + height + ", scrollbars=" + scrollbar + ", resizable=" + resizable + ", status=" + status + ", directories=" + directories + ", location=" + location + ", menubar=" + menubar + ", titlebar=" + titlebar + ", toolbar=" + toolbar );
}
