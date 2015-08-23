# Crowdflower Test Job

### 运行要求
* MongoDB 服务器（默认端口运行, 或者修改 config/db.js 配置）
* Nodejs.

###  检出并运行
	npm install && bower install
    
移动服务器
	npm start 
或者
	nodemon -- preferred
运行地址 
	http://localhost:3000

### Admin 
  管理员可以用默认的 username:admin 和 password:123456 登录, 登录时需要选中 is admin 单选框.
  
  ![admin](https://cdn.rawgit.com/newset/crowd/master/public/img/admin.png)

  普通用户登录不用勾选，登录后，管理员跳转到创建用户页面，普通用户跳转到 Profile 页面。
  ![create](https://cdn.rawgit.com/newset/crowd/master/public/img/create.png)

  创建好用户后会跳转到相应用户的 Profile 页面。
  ![profile](https://cdn.rawgit.com/newset/crowd/master/public/img/profile.png)

  最后的 Api 页面主要是为了方便调试，可以直接指定用户 uid， amount, adjusted_amunt 模拟 crowdflower post 请求。
  ![api](https://cdn.rawgit.com/newset/crowd/master/public/img/api.png)
  
