
chrome.contextMenus.create({

    title: `使用度娘翻译：%s`, // %s表示选中的文字
    contexts: [`all`], // 只有当选中文字时才会出现此右键菜单
    onclick: function(params)
    {
    	
        // 注意不能使用location.href，因为location是属于background的window对象
        chrome.tabs.create({url: `https://www.baidu.com/s?ie=utf-8&wd=` + encodeURI(params.selectionText + ` 翻译`)});
    }
});


// integer Chrome.contextMenus.create({ //创建一个新的右键菜单项
// "title" : "我的右键菜单",   //右键菜单项的显示文字
// "type" : "normal",          // 菜单项类型 "checkbox", "radio","separator",默认为normal
// "contexts" : ["all"],// , "page","frame","selection","link","editable","image","video","audio"菜单项影响的页面元素 "anchor","image" , 在什么类型类型中显示,默认为page
// "documentUrlPatterns":["*://*/*"],  // iframe的src匹配
// id:"meuDemo",
// "targetUrlPatterns" : ["*://*/*"],  // href的匹配
// "onclick" : genericOnClick      // 单击时的处理函数

// });

// function genericOnClick(info, tab) {
//         var reqUrl = '请求地址';
//         var pageUrl = tab.url;
//         if(pageUrl.indexOf('https://blog.csdn.net/')!==0){
//             alert('仅限收藏CSDN的文章');
//             return;
//         }
//         var reqData = {};
//         reqData.url =  pageUrl;
//         $.ajax({
//            url:reqUrl,
//            type:'post',
//            dataType:'jsonp',
//            data:reqData,
//            jsonpCallback:'jsonpcallback',
//            success:function(data){
//                var res = JSON.parse(JSON.stringify(data));
//                if(res.success){
//                    alert('保存成功') 
//                }else{
//                    alert(res.msg);  
//                }
//            },
//            error:function(data){
//                alert('error: 估计是没登录');
//            }
//        })
// ！
// }


// // addWhiteList() {
// //        chrome.tabs.getSelected(null,  (tab) => {
// //            try{
// //                let uri = new URL(tab.url);
// //                let pat = /([a-zA-Z0-9.-]*\.[a-zA-Z]{1,4})|(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/;
// //                if (pat.test(uri.hostname)) {
// //                    let whitelist = localStorage.getItem('Config.whitelist') || '';
// //                    let white_array = whitelist===''?[]: whitelist.split("\n");
// //                    if (!white_array.includes(uri.hostname)) {
// //                        white_array.unshift(uri.hostname)
// //                    }
// //                    localStorage.setItem('Config.whitelist', white_array.join("\n"));
// //                }

// //            } catch(e) {
// //                console.log('ignore')
// //            }
// //        });  
// //  }
