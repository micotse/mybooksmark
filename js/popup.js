window.onload = function(){
	//封装选择器id/class选择器
	function $(strExpr){ 
		var idExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/; 
		var classExpr = /^(?:\s*(<[\w\W]+>)[^>]*|.([\w-]*))$/; 
		if(idExpr.test(strExpr)){ 
			var idMatch = idExpr.exec(strExpr); 
			return document.getElementById(idMatch[2]); 
			}else if(classExpr.test(strExpr)){ 
				var classMatch = classExpr.exec(strExpr); 
				var allElement = document.getElementsByTagName("*"); 
				var ClassMatch = []; 
				for(var i=0,l=allElement.length; i<l; i++){ 
					if(allElement[i].className.match( new RegExp( "(\\s|^)" + classMatch[2] + "(\\s|$)") )){ 
					ClassMatch.push(allElement[i]); 
			    } 
	     	} 
		return ClassMatch; 
		} 
	}
	//封装ajax
	function ajax(){ 
		var ajaxData = { 
			type:arguments[0].type || "GET", 
			url:arguments[0].url || "", 
			async:arguments[0].async || "true", 
			data:arguments[0].data || null, 
			dataType:arguments[0].dataType || "text", 
			contentType:arguments[0].contentType || "application/x-www-form-urlencoded", 
			beforeSend:arguments[0].beforeSend || function(){}, 
			success:arguments[0].success || function(){}, 
			error:arguments[0].error || function(){} 
		} 
	    ajaxData.beforeSend() 
	    var xhr = createxmlHttpRequest();  
	    xhr.responseType=ajaxData.dataType; 
	    xhr.open(ajaxData.type,ajaxData.url,ajaxData.async);  
	    xhr.setRequestHeader("Content-Type",ajaxData.contentType);  
	    xhr.send(convertData(ajaxData.data));  
	    xhr.onreadystatechange = function() {  
	        if (xhr.readyState == 4) {  
			    if(xhr.status == 200){ 
					ajaxData.success(xhr.response) 
				}else{ 
					ajaxData.error() 
				}  
			} 
		}  
	} 
	function createxmlHttpRequest() {  
	    if (window.ActiveXObject) {  
	    return new ActiveXObject("Microsoft.XMLHTTP");  
	    } else if (window.XMLHttpRequest) {  
	   	  return new XMLHttpRequest();  
	    }  
	} 
	function convertData(data){ 
		if( typeof data === 'object' ){ 
			var convertResult = "" ;  
			for(var c in data){  
			convertResult+= c + "=" + data[c] + "&";  
		}  
		convertResult=convertResult.substring(0,convertResult.length-1) 
		return convertResult; 
		}else{ 
			return data; 
		} 
	}

	//判断是否有登陆,没有就显示登陆注册页面
    var shejilocj=localStorage.getItem("shejilocj");
    if(shejilocj == null || shejilocj == ""){

    	//登陆表单处理
		$("#loginin").style.display = 'block';
		userLoginB = function(){
			if($("#user").value == ''){ $("#user_p").innerHTML = "用户名不能为空!";ok0=false;return false;}
            var userzz=/^[a-zA-Z0-9\u4e00-\u9fa5]+$/;
            if(!userzz.test($("#user").value)){$("#user_p").innerHTML = "用户名必须由中文/字母/数字组成的字符串!"; ok0=false;return false;}
            if($("#user").value.length<=1 || $("#user").value.length>=15){$("#user_p").innerHTML = "用户名必须在2~15个字!";ok0=false;return false;}
            $("#user_p").innerHTML = '';ok0=true;return true;
        }
		passwordLoginB = function(){
            if($("#password").value ==''){$("#password_p").innerHTML = "密码不能为空!";ok1=false;return false;}
            var passwordzz=/^[A-Za-z0-9\!@#\$%\&^\*\_]+$/;
            if(!passwordzz.test($("#password").value)){$("#password_p").innerHTML = "密码必须是字母/数字/字符!";ok1=false;return false;}
            if($("#password").value.length<=3 || $("#password").value.length>=16){$("#password_p").innerHTML = "密码必须在4~16个字!"; ok1=false;return false;}
            $("#password_p").innerHTML = '';ok1=true;return true;
        }
		$("#user").onblur = function(){userLoginB();}
		$("#password").onblur = function(){passwordLoginB();}
		$("#button1").addEventListener("click", function(){
    		setTimeout(function (){
                if(typeof(ok0)=="undefined" || typeof(ok1)=="undefined"){//当登录没有验证的时候
                    if(typeof(ok0)=="undefined"){userLoginB();return false;}
                    if(typeof(ok1)=="undefined"){passwordLoginB();return false;}
                }else{
	                if(ok0 && ok1){
	                   $('#spinner').style.display = 'block';//加载动画显示
						ajax({
	                        type: "POST",
	                        url: "http://www.shejilo.com/Home/Mybookmarks/booksLogin",
	                        data:{password:$("#password").value,username:$("#user").value},
	                        dataType:"json",
	                        success: function(msg){
	                            if(msg==1){
	                                $('#spinner').style.display ='none'; 
	                                alert("密码错误！");
	                            }
	                            if(msg==2){
	                                $('#spinner').style.display ='none';
	                                alert("登陆成功！");
	                                var jsonstr = {"name":$("#user").value,"password":$("#password").value};
	                                localStorage.setItem("shejilocj", "'" + JSON.stringify(jsonstr));







       $("#loginin").style.display = 'none';
        $("#loginzc").style.display = 'none';

        // 查询所有书签
		$('#spinner').style.display = 'block';
		var shejilocjaa=localStorage.getItem("shejilocj");
        var jsonstr = JSON.parse(shejilocjaa.substr(1, shejilocjaa.length));
        ajax({
            type: "POST",
            url: "http://www.shejilo.com/Home/Mybookmarks/bookslistshow",
            data:{"name":jsonstr.name},
            dataType:"json",
            success: function(msg){
            $('#spinner').style.display = 'none';//隐藏加载动画
			var item = ""; //定义一个空变量
			for(var i in msg){ //遍历第一层
			item += "<details class=\"mydrag\">\r\n";
			item += "<summary><img src=\"images/list_img.png\">" + msg[i].myboomarks_title + "</summary>\r\n";
			var childs = msg[i].child;
			for(var ii in childs){
			    item += "<a target=\"_bloak\"  href = \" "+childs[ii].myboomarks_link + "\"><img src=\""+childs[ii].myboomarks_icons+"\">"+childs[ii].myboomarks_title +"</a>\r\n";
			}
			item += "</details>\r\n";
			}
            $("#cont_box_a").innerHTML= item;


			//拖拽排序
		    var lists = $("#cont_box_a").getElementsByTagName('details'); //获取到分组标签
		    var clientY = '';//定义Y坐标
		    var n = 0; //定义变量初始位零
		    var regexp = /\bmydrag\b/; //正则匹配class的值,是否有拖拽标签class
		    var img = document.getElementsByTagName('img'); //获取到分组标签
		    for (var i = 0;i<img.length;i++) {
		        img[i].ondragstart=function (){return false;}
		    }
		    
		    for(var i=0;i<lists.length;i++){//循环分组class是否属于拖拽类
		        var offsetTop = lists[i].offsetTop; //获取到当前details顶部的高度
		        if(regexp.test(lists[i].className)){mydrag(lists[i])} //test()方法用于检测一个字符串是否匹配某个模式
		    }  

		    function mydrag(list){ //创建一个方法
		        var items = list.getElementsByTagName("a");
		        var original_class = list.className; //定义原始的Class
		        var entered = 0; //定义一个进入时候的变量
		        for (var i=0;i<items.length;i++) items[i].draggable = true;

		        // ondragstart：//被拖放的HTML元素开始拖动时触发该事件。
		        // ondrag：//被拖放的HTML元素在拖放过程中不断触发该事件。
		        // ondragend：//被拖放的HTML元素拖放结束时触发该事件。

		        // ondragenter：//拖放时鼠标经过的元素在被拖放元素进入本元素的范围时触发该事件。
		        // ondragover：//拖放时鼠标经过的元素在被拖放元素进入本元素的范围拖动时不断触发该事件。
		        // ondragleave：//拖放时鼠标经过的元素离开本元素时触发该事件。
		        // ondrop：//拖放时鼠标经过的元素在其他元素被放到本元素时触发该事件。

		        list.ondragstart = function(e){ //被拖放的HTML元素开始拖动时触发该事件。
		            var e = e || window.event;
		            var target = e.target || e.srcElemnt;
		            target.setAttribute('id','test1') ;//方法添加指定id属性
		            // if (target.tagName !=="LI") return false;
		            var dt = e.dataTransfer;
		            dt.setData("text/plain",target.id);  //target.innerText || target.textContent  || //innerText 在控件中添加文字 textContent属性设置或返回指定节点的文本内容
		            // dt.effectAllowed = "move";

		        };

		        list.ondragend = function(e){ //被拖放的HTML元素拖放结束时触发该事件。
		            e.preventDefault();
		            // e = e || window.event;
		            // var target = e.target || e.srcElemnt;
		            // if (e.dataTransfer.dropEffect ==="move") target.parentNode.removeChild(target);
		        }

		        list.ondragenter = function(e){  //在拖动的元素进入到放置目标时执行
		            e.preventDefault();
		            // e = e || window.event; //只有当DOM事件处理程序被调用的时候会被用到。它的值是当前正在处理的事件对象
		            // var from = e.relatedTarget; //返回指针刚刚离开的元素
		            // entered++;
		            // if ((from &&!isChild(from,list)) || entered == 1 ) { 
		            //     var dt = e.dataTransfer; //拖放触发的拖放事件
		            //     var types = dt.types;  //dataTransfer.types：该属性返回一个DOMStringList对象，该对象包括了存入dataTransfer中数据的所有类型

		            //     // contains 如果A元素包含B元素，则返回true，否则false indexOf("str") != -1代替
		            //     if (!types ||(types.contains&&types.contains("text/plain"))||(types.indexOf &&types.indexOf("text/plain")!=-1)) {
		            //         list.className = original_class + " droppable";//droppable背景样式
		            //         return false;
		            //     }
		            //     return;
		            // }
		            // return false;
		        };


		        list.ondragover = function(e){//拖拽完成时触发
		        e.preventDefault();
		        clientY = e.clientY;
		        n = Math.round((clientY - offsetTop)/22)  //52代指拖拽元素的高度  Math.round()方法准确说是“四舍六入”，对0.5要进行判断对待  
		        }  

		        list.ondragleave = function(e){  //在可拖动的元素移出放置目标时执行
		            // e = e || window.event;
		            // var to = e.relatedTarget; //返回指针刚刚离开的元素
		            // entered--;
		            // if (to && !isChild(to,list) || entered <= 0) {
		            //     list.className = original_class;
		            //     entered = 0;
		            // }
		            e.preventDefault();
		            return false;
		        };

		        // function isChild(a,b){
		        //     for(''; a; a = a.parentNode) if (a === b) return true; //parentNode 属性可返回某节点的父节点
		        //     return false;
		        // }

		        list.ondrop = function(e){//被拖放的HTML元素在拖放过程中不断触发该事件。
		            e = e || window.event;
		            var dt = e.dataTransfer;
		            var text = dt.getData("Text");  //获取之前设置的值
		            if (text) {

		                
		                // lists.insertBefore(nodes, children()[n]); //nsertBefore() 方法在您指定的已有子节点之前插入新的子节点

		                // alert(nodes.innerHTML);

		                // var item = document.createElement("li"); //createElement() 方法可创建元素节点
		                // item.draggable = true;  //设置可拖拽
		                // item.appendChild(document.createTextNode(text)); //appendChild() 方法可向节点的子节点列表的末尾添加新的子节点 //createTextNode() 可创建文本节点
		                // list.appendChild(item);

		                // list.className = original_class;
		                // entered = 0;
		                //这里是列表排序

		                var nodes = document.getElementById(text); //在您指定的已有子节点之前插入新的子节点


		                console.log(list.insertBefore(nodes,children()[n]));

		                list.insertBefore(nodes,children()[n]); //nsertBefore() 方法在您指定的已有子节点之前插入新的子节点


		                nodes.removeAttribute('id');
		                dt.clearData();

		                return false;
		            }

		            function children(){
		                var iss = list.childNodes;
		                var arr = [];
		                iss.forEach(function(item){
		                   if(item.nodeType == 1){
		                       arr.push(item);//push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度
		                   }
		                });
		                return arr;
		            }


		        };
		    }


            }
        });
        $(".bg_box")['0'].style.display = 'block';










	                            }
	                        }
						});
	                }
	               
                }
    		},500);
		});
		userZcB = function(){
			if($("#user_z").value == ''){$("#user_p_z").innerHTML = "用户名不能为空!";ok3=false;return false;}
            var userzz=/^[a-zA-Z0-9\u4e00-\u9fa5]+$/;
            if(!userzz.test($("#user_z").value)){$("#user_p_z").innerHTML = "用户名必须由中文/字母/数字组成的字符串!"; ok3=false;return false;}
            if($("#user_z").value.length<=1 || $("#user_z").value.length>=15){$("#user_p").innerHTML = "用户名必须在2~15个字!";ok3=false;return false;}
            $("#user_p_z").innerHTML = '';ok3=true;return true;
        }
		passwordZcB = function(){
            if($("#password_z").value ==''){$("#password_p_z").innerHTML = "密码不能为空!";ok4=false;return false;}
            var passwordzz=/^[A-Za-z0-9\!@#\$%\&^\*\_]+$/;
            if(!passwordzz.test($("#password_z").value)){$("#password_p_z").innerHTML = "密码必须是字母/数字/字符!";ok4=false;return false;}
            if($("#password_z").value.length<=3 || $("#password_z").value.length>=16){$("#password_p").innerHTML = "密码必须在4~16个字!"; ok4=false;return false;}
            $("#password_p_z").innerHTML = '';ok4=true;return true;
        }
		qpasswordZcB = function(){
            if($("#qpassword_z").value ==''){$("#qpassword_p_z").innerHTML = "确认密码不能为空!";okz5=false;return false;}
        	if($("#qpassword_z").value != $("#password_z").value){$("#qpassword_p_z").innerHTML = "两次输入的密码不相同!";okz5=false;return false;}
        	$("#qpassword_p_z").innerHTML = "";okz5=true;return true;
    	}
		emailZcB = function(){
            if($("#email_z").value==''){$("#email_p_z").innerHTML = "电子邮箱不能为空!";okz6=false;return false;}
            var emailzzz=/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
            if(!emailzzz.test($("#email_z").value)){$("#email_p_z").innerHTML = "电子邮箱格式不正确!";okz6=false;return false;}
            $("#email_p_z").innerHTML = "";okz6=true;
        }
		$("#user_z").onblur = function(){userZcB();}
		$("#qpassword_z").onblur = function(){qpasswordZcB();}
		$("#password_z").onblur = function(){passwordZcB();}
		$("#email_z").onblur = function(){emailZcB();}
		$("#button_zz").addEventListener("click", function(){
    		setTimeout(function (){
                if(typeof(ok3)=="undefined" || typeof(okz4)=="undefined" || typeof(okz5)=="undefined" || typeof(okz6)=="undefined"){
                    if(typeof(ok3)=="undefined"){userZcB();return false;}
                    if(typeof(ok4)=="undefined"){passwordZcB();return false;}
                    if(typeof(ok5)=="undefined"){qpasswordZcB();return false;}
                    if(typeof(ok6)=="undefined"){emailZcB();return false;}
                }else{
	                if(okz3 && okz4 && okz5 && okz6){
	                   $('#spinner').style.display = 'block';//加载动画显示
						ajax({
	                        type: "POST",
	                        url: "http://www.shejilo.com/Home/Mybookmarks/booksregister",
	                        data:{password:$("#password_z").value,username:$("#user_z").value,email:$("#email_z").value},
	                        dataType:"json",
	                        success: function(msg){
	                            if(msg==1){
	                                $('#spinner').style.display ='none'; 
	                                alert("注册错误！");
	                            }
	                            if(msg==2){
	                                $('#spinner').style.display ='none';
	                                alert("注册成功！");
	                                var jsonstr = {"name":$("#user_z").value,"password":$("#password_z").value};
	                                localStorage.setItem("shejilocj", "'" + JSON.stringify(jsonstr));
	                            }
	                        }
						});
	                }
                }
    		},500);
		});
		$("#zcbtn").addEventListener("click", function(){$("#loginin").style.display = 'none';$("#loginzc").style.display = 'block';});
        $("#yyzh").addEventListener("click", function(){$("#loginin").style.display = 'block'; $("#loginzc").style.display = 'none';});
    }else{ //有登陆过
        $("#loginin").style.display = 'none';
        $("#loginzc").style.display = 'none';

        // 查询所有书签
		$('#spinner').style.display = 'block';
		var shejilocjaa=localStorage.getItem("shejilocj");
        var jsonstr = JSON.parse(shejilocjaa.substr(1, shejilocjaa.length));
        ajax({
            type: "POST",
            url: "http://www.shejilo.com/Home/Mybookmarks/bookslistshow",
            data:{"name":jsonstr.name},
            dataType:"json",
            success: function(msg){
            $('#spinner').style.display = 'none';//隐藏加载动画
			var item = ""; //定义一个空变量
			for(var i in msg){ //遍历第一层
			item += "<details class=\"mydrag\">\r\n";
			item += "<summary><img src=\"images/list_img.png\">" + msg[i].myboomarks_title + "</summary>\r\n";
			var childs = msg[i].child;
			for(var ii in childs){
			    item += "<a target=\"_bloak\"  href = \" "+childs[ii].myboomarks_link + "\"><img src=\""+childs[ii].myboomarks_icons+"\">"+childs[ii].myboomarks_title +"</a>\r\n";
			}
			item += "</details>\r\n";
			}
            $("#cont_box_a").innerHTML= item;


			//拖拽排序
		    var lists = $("#cont_box_a").getElementsByTagName('details'); //获取到分组标签
		    var clientY = '';//定义Y坐标
		    var n = 0; //定义变量初始位零
		    var regexp = /\bmydrag\b/; //正则匹配class的值,是否有拖拽标签class
		    var img = document.getElementsByTagName('img'); //获取到分组标签
		    for (var i = 0;i<img.length;i++) {
		        img[i].ondragstart=function (){return false;}
		    }
		    



		    //这里设置右键菜单
		    window.oncontextmenu = function(e){e.preventDefault();}     //1.禁用文档右键




     








		    for(var i=0;i<lists.length;i++){//循环分组class是否属于拖拽类
		        var offsetTop = lists[i].offsetTop; //获取到当前details顶部的高度
		        if(regexp.test(lists[i].className)){mydrag(lists[i])} //test()方法用于检测一个字符串是否匹配某个模式 ,这里是拖着

		        //给每一分组添加右键菜单
				var summaryinfo = lists[i].getElementsByTagName("summary");//获取到文件夹
				summaryinfo[0].oncontextmenu=function(e){ //给每个文件夹添加右键菜单
					$("#my_menu").style.display = "block";//显示右键菜单
					//整个div宽度 420 高度500 ,右键div宽度180高度154
					if(e.clientX>240){//如果鼠标靠右边了
						if (e.clientY>346) {//并且鼠标靠下边了
							$("#my_menu").style.left=e.clientX-180+'px';
							$("#my_menu").style.top=e.clientY-154+'px';
							return false;
						}

						$("#my_menu").style.left=e.clientX-180+'px';
						$("#my_menu").style.top=e.clientY+'px';
						return false;
					}
					if(e.clientY>346){
						if(e.clientX>240){
							$("#my_menu").style.left=e.clientX-180+'px';
							$("#my_menu").style.top=e.clientY-154+'px';
							return false;
						}
						$("#my_menu").style.left=e.clientX+'px';
						$("#my_menu").style.top=e.clientY-154+'px';
						return false;
					}

					$("#my_menu").style.left=e.clientX+'px';
					$("#my_menu").style.top=e.clientY+'px';


				}


				//给每个书签添加右键菜单
		        var itemsa = lists[i].getElementsByTagName("a");
		        for (var i=0;i<itemsa.length;i++){
					itemsa[i].oncontextmenu=function(e){ //给每个文件夹添加右键菜单
						$("#my_menu").style.display = "block";//显示右键菜单
						//整个div宽度 420 高度500 ,右键div宽度180高度154
						if(e.clientX>240){//如果鼠标靠右边了
							if (e.clientY>346) {//并且鼠标靠下边了
								$("#my_menu").style.left=e.clientX-180+'px';
								$("#my_menu").style.top=e.clientY-154+'px';
								return false;
							}

							$("#my_menu").style.left=e.clientX-180+'px';
							$("#my_menu").style.top=e.clientY+'px';
							return false;
						}
						if(e.clientY>346){
							if(e.clientX>240){
								$("#my_menu").style.left=e.clientX-180+'px';
								$("#my_menu").style.top=e.clientY-154+'px';
								return false;
							}
							$("#my_menu").style.left=e.clientX+'px';
							$("#my_menu").style.top=e.clientY-154+'px';
							return false;
						}

						$("#my_menu").style.left=e.clientX+'px';
						$("#my_menu").style.top=e.clientY+'px';

						// alert(itemsa[i][0].getAttribute("href"));
					}



		        }



				window.onclick=function(e){
					$("#my_menu").style.display = "none";
					// return false;
				}





		    }  

		    function mydrag(list){ //创建一个方法
		        var items = list.getElementsByTagName("a");
		        var original_class = list.className; //定义原始的Class
		        var entered = 0; //定义一个进入时候的变量
		        for (var i=0;i<items.length;i++) items[i].draggable = true;

		        // ondragstart：//被拖放的HTML元素开始拖动时触发该事件。
		        // ondrag：//被拖放的HTML元素在拖放过程中不断触发该事件。
		        // ondragend：//被拖放的HTML元素拖放结束时触发该事件。

		        // ondragenter：//拖放时鼠标经过的元素在被拖放元素进入本元素的范围时触发该事件。
		        // ondragover：//拖放时鼠标经过的元素在被拖放元素进入本元素的范围拖动时不断触发该事件。
		        // ondragleave：//拖放时鼠标经过的元素离开本元素时触发该事件。
		        // ondrop：//拖放时鼠标经过的元素在其他元素被放到本元素时触发该事件。

		        list.ondragstart = function(e){ //被拖放的HTML元素开始拖动时触发该事件。
		            var e = e || window.event;
		            var target = e.target || e.srcElemnt;
		            target.setAttribute('id','test1') ;//方法添加指定id属性
		            // if (target.tagName !=="LI") return false;
		            var dt = e.dataTransfer;
		            dt.setData("text/plain",target.id);  //target.innerText || target.textContent  || //innerText 在控件中添加文字 textContent属性设置或返回指定节点的文本内容
		            // dt.effectAllowed = "move";

		        };

		        list.ondragend = function(e){ //被拖放的HTML元素拖放结束时触发该事件。
		            e.preventDefault();
		            // e = e || window.event;
		            // var target = e.target || e.srcElemnt;
		            // if (e.dataTransfer.dropEffect ==="move") target.parentNode.removeChild(target);
		        }

		        list.ondragenter = function(e){  //在拖动的元素进入到放置目标时执行
		            e.preventDefault();
		            // e = e || window.event; //只有当DOM事件处理程序被调用的时候会被用到。它的值是当前正在处理的事件对象
		            // var from = e.relatedTarget; //返回指针刚刚离开的元素
		            // entered++;
		            // if ((from &&!isChild(from,list)) || entered == 1 ) { 
		            //     var dt = e.dataTransfer; //拖放触发的拖放事件
		            //     var types = dt.types;  //dataTransfer.types：该属性返回一个DOMStringList对象，该对象包括了存入dataTransfer中数据的所有类型

		            //     // contains 如果A元素包含B元素，则返回true，否则false indexOf("str") != -1代替
		            //     if (!types ||(types.contains&&types.contains("text/plain"))||(types.indexOf &&types.indexOf("text/plain")!=-1)) {
		            //         list.className = original_class + " droppable";//droppable背景样式
		            //         return false;
		            //     }
		            //     return;
		            // }
		            // return false;
		        };


		        list.ondragover = function(e){//拖拽完成时触发
		        e.preventDefault();
		        clientY = e.clientY;
		        n = Math.round((clientY - offsetTop)/22)  //52代指拖拽元素的高度  Math.round()方法准确说是“四舍六入”，对0.5要进行判断对待  
		        }  

		        list.ondragleave = function(e){  //在可拖动的元素移出放置目标时执行
		            // e = e || window.event;
		            // var to = e.relatedTarget; //返回指针刚刚离开的元素
		            // entered--;
		            // if (to && !isChild(to,list) || entered <= 0) {
		            //     list.className = original_class;
		            //     entered = 0;
		            // }
		            e.preventDefault();
		            return false;
		        };

		        // function isChild(a,b){
		        //     for(''; a; a = a.parentNode) if (a === b) return true; //parentNode 属性可返回某节点的父节点
		        //     return false;
		        // }

		        list.ondrop = function(e){//被拖放的HTML元素在拖放过程中不断触发该事件。
		            e = e || window.event;
		            var dt = e.dataTransfer;
		            var text = dt.getData("Text");  //获取之前设置的值
		            if (text) {

		                
		                // lists.insertBefore(nodes, children()[n]); //nsertBefore() 方法在您指定的已有子节点之前插入新的子节点

		                // alert(nodes.innerHTML);

		                // var item = document.createElement("li"); //createElement() 方法可创建元素节点
		                // item.draggable = true;  //设置可拖拽
		                // item.appendChild(document.createTextNode(text)); //appendChild() 方法可向节点的子节点列表的末尾添加新的子节点 //createTextNode() 可创建文本节点
		                // list.appendChild(item);

		                // list.className = original_class;
		                // entered = 0;
		                //这里是列表排序

		                var nodes = document.getElementById(text); //在您指定的已有子节点之前插入新的子节点


		                console.log(list.insertBefore(nodes,children()[n]));

		                list.insertBefore(nodes,children()[n]); //nsertBefore() 方法在您指定的已有子节点之前插入新的子节点


		                nodes.removeAttribute('id');
		                dt.clearData();

		                return false;
		            }

		            function children(){
		                var iss = list.childNodes;
		                var arr = [];
		                iss.forEach(function(item){
		                   if(item.nodeType == 1){
		                       arr.push(item);//push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度
		                   }
		                });
		                return arr;
		            }


		        };
		    }














            } 

        });
        $(".bg_box")['0'].style.display = 'block';
    }




	// 添加收藏处理
	$("#bg_click").onclick= function(){$('#bg_click').style.display = 'none';$('#addbooksmarks').style.display = 'none';$("#fenleibq").options.length=0;}//隐藏添加模块
	$("#mybtnqx").onclick= function(){$('#bg_click').style.display = 'none';$('#addbooksmarks').style.display = 'none';$("#fenleibq").options.length=0;}//隐藏添加模块
    $("#clickadd").onclick = function(){
        chrome.tabs.getSelected(function(tabs){
            var shejilocjaa=localStorage.getItem("shejilocj");
            var jsonstr = JSON.parse(shejilocjaa.substr(1, shejilocjaa.length));
            $('#spinner').style.display = 'block';
            ajax({
                type: "POST",
                url: "http://www.shejilo.com/Home/Mybookmarks/booksAddshow",
                data:{"name":jsonstr.name},
                dataType:"json",
                success: function(msg){
                $('#spinner').style.display = 'none';;//隐藏加载动画
                $("#titlesw").value = tabs.title;
                var property = ""; // 添加分类 
                for (var item in msg) {
                    var pro = msg[item];
            		$("#fenleibq").options.add(new Option(pro.myboomarks_title, pro.id));//为select动态添加option
                }
                $('#addbooksmarks').style.display = 'block';
                $('#bg_click').style.display = 'block';
                }
            });

			$("#okbtn").onclick = function(){
           		$('#spinner').style.display = 'block';
				var indexs = $("#fenleibq").selectedIndex; // 选中索引
				var values = $("#fenleibq").options[indexs].value; // 选中值
	            ajax({
	                type: "POST",
	                url: "http://www.shejilo.com/Home/Mybookmarks/booksAdd",
	                data:{"title":tabs.title,"url":tabs.url,"icons":tabs.favIconUrl,"name":jsonstr.name,"pid":values},
	                dataType:"json",
	                success: function(msg){
		                if(msg == 1){
		                	$('#spinner').style.display = 'none';
							$('#bg_click').style.display = 'none';
						 	$('#addbooksmarks').style.display = 'none';
							$("#fenleibq").options.length=0;
							location.reload();
		                }else{
		                	alert("添加失败！");
		               	}   
	                }
	            });
			}
        });
    }


	 // 用户退出信息
	 $("#userHomeS").onclick = function(){$("#userHome").style.display = 'block';$(".userHome_box")[0].style.display = 'block';}
	 $("#userHome").onclick = function(){$("#userHome").style.display = 'none';$(".userHome_box")[0].style.display = 'none';}
	 //清除localStorage本地存储信息
	 $("#clearLs").onclick = function(){localStorage.clear();location.reload();}


	 // 添加文件夹处理
	 $("#btnaddwjj").onclick = function(){$("#addwenjianjia").style.display = 'block';$("#addwjj_box").style.display = 'block';}
	 $("#addwenjianjia").onclick = function(){$("#addwenjianjia").style.display = 'none';$("#addwjj_box").style.display = 'none';}
	 $("#ycbtn").onclick = function(){$("#addwenjianjia").style.display = 'none';$("#addwjj_box").style.display = 'none';}
	 $("#btnaddwjjajax").onclick = function(){
            var shejilocjaaa=localStorage.getItem("shejilocj");
            var jsonstrs = JSON.parse(shejilocjaaa.substr(1, shejilocjaaa.length));//获取用户名
            //获取用户填写的信息
            var titleWjj =  $("#inputaddwjj").value;
            $('#spinner').style.display = 'block';
            ajax({
                type: "POST",
                url: "http://www.shejilo.com/Home/Mybookmarks/booksAddWjj",
                data:{"title":titleWjj,"name":jsonstrs.name},
                dataType:"json",
                success: function(msg){
	                if(msg != 2){ //添加成功
	                $("#fenleibq").options.length=0;
	                var property = ""; // 添加分类 
	                for (var item in msg) {
	                    var pro = msg[item];
	            		$("#fenleibq").options.add(new Option(pro.myboomarks_title, pro.id));//为select动态添加option
	                }
                	$('#addwenjianjia').style.display = 'none';
					$('#addwjj_box').style.display = 'none';
					$('#spinner').style.display = 'none';
					alert("添加成功");

	                }else{
	                	alert("添加失败！");
	               	}   
                }
            });
	 }

}



