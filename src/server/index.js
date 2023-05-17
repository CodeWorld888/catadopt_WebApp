const express = require('express')
const bodyParser = require('body-parser');
const Calculate = require('./common/getdays')

var connection = require('./db/sql')

const app = new express();

app.all('*', function (req, res, next) {//这里是设置请求头设置为可以跨域 不懂的朋友可以看看ajax的同源策略
    res.header('Access-Control-Allow-Origin', '*');//*表示可以跨域任何域名都行（包括直接存在本地的html文件）出于安全考虑最好只设置 你信任的来源也可以填域名表示只接受某个域名
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');//可以支持的消息首部列表
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');//可以支持的提交方式
    res.header('Content-Type', 'application/json;charset=utf-8');//响应头中定义的类型
    next();
});

app.use(bodyParser.json({
    limit: '10000kb'
})); //最大上传大小不超过10000kb
app.use(bodyParser.urlencoded({
    limit: '10000kb',
    extended: true,
    parameterLimit: 50000,//这个得加，不加没效果
}));


connection.connect(),
    app.get('/home', (req, res, next) => {
        connection.query('select * from send where isAdopted = "false" ORDER BY id desc', function (error, results) {
            results.forEach(item => {  //循环返回结果数组把每个对象的图片从buffer转为base64
                item.cover_photo = '' + item.cover_photo
                // console.log(item);
            })
            res.send(results)
        })
    })

app.post('/login', (req, res, next) => {
    let params = {
        username: req.body.username,
        password: req.body.password
    }
    connection.query('select * from user where username = ?', [params.username], function (error, results) {
        if (results.length > 0) {
            connection.query('select * from user where (username = ?) and password = ?', [params.username, params.password], function (error, results) {
                if (results.length > 0) {
                    // console.log(results[0].picture);
                    results[0].picture = '' + results[0].picture

                    res.send({
                        code: 200,
                        success: true,
                        msg: '登录成功！',
                        userinfo: results[0],
                    })
                } else {
                    res.send({
                        code: 302,
                        success: false,
                        msg: '密码错误！'
                    })
                }
            })
        } else {
            res.send({
                code: 301,
                success: false,
                msg: '用户名错误！'
            })
        }
    })


})

app.post('/register', (req, res, next) => {
    let body = req.body
    // body.picture = Buffer.from(body.picture,'utf-8')
    let [username, password, nickname, gender, tel, city, picture] = [
        body.username,
        body.password,
        body.nickname,
        body.sex,
        body.tel,
        body.area,
        body.picture
    ]
    //引入token包
    let jwt = require('jsonwebtoken')
    //用户信息
    let payload = { username }
    //口令
    let secret = 'DOUBLED'
    //生成token
    let token = jwt.sign(payload, secret)
    connection.query(`select * from user where username=?`, [username], function (error, results) {
        // console.log(results.length);
        if (results.length > 0) {
            res.send({
                code: 300,
                success: false,
                msg: '用户名已存在！'
            })
        } else {
            connection.query(`insert into user (username,password,nickname,gender,tel,city,picture,token) values('${username}','${password}','${nickname}','${gender}','${tel}','${city}','${picture}','${token}')`, function () {
                res.send({
                    code: 200,
                    success: true,
                    msg: '注册成功'
                })
            })
        }
    })

})
app.use('/send', (req, res, next) => {
    let date1 = Calculate.getToday()
    let date2 = req.body.birth
    let days = Calculate.daysDistance(date1, date2)
    req.body.age = Calculate.conversion(days)
    next()
})

app.post('/send', (req, res, next) => {
    let body = req.body
    let [user_id, send_id, city, sex, birth, varity, source, source_detail, sterilization, health, parasite, vaccinum, price, wechat, coverphoto, photo, age] = [
        body.userId,
        body.sendId,
        body.area,
        body.sex,
        body.birth,
        body.varity,
        body.source,
        body.source_detail,
        body.sterilization,
        body.health,
        body.parasite,
        body.vaccinum,
        body.price,
        body.wechat,
        body.coverphoto,
        body.photo,
        body.age
    ]
    if (send_id) {      //判断是修改还是发布
        connection.query(`update send set
        city='${city}',
        sex='${sex}',
        birth='${birth}',
        age='${age}',
        varity='${varity}',
        source='${source}',
        source_detail='${source_detail}',
        sterilization='${sterilization}',
        health='${health}',
        parasite='${parasite}',
        vaccinum='${vaccinum}',
        price='${price}',
        wechat='${wechat}',
        cover_photo='${coverphoto}',
        photo='${photo}'
         where id = ${send_id}`, function (results) {
            // console.log(results);
            res.send({
                code: 200,
                msg: '更新成功',
                success: true,
            })
        })
    } else {
        connection.query(`insert into send (user_id,city,sex,birth,age,varity,source,source_detail,sterilization,health,parasite,vaccinum,price,wechat,cover_photo,photo) values
        ('${user_id}',
        '${city}',
        '${sex}',
        '${birth}',
        '${age}',
        '${varity}',
        '${source}',
        '${source_detail}',
        '${sterilization}',
        '${health}',
        '${parasite}',
        '${vaccinum}',
        '${price}',
        '${wechat}',
        '${coverphoto}',
        '${photo}'
        )`, function (results) {
            // console.log(results);
            res.send({
                code: 200,
                msg: '发布成功',
                success: true,
            })
        })
    }

})

app.post('/sendFeedback', (req, res) => {
    let [user_id, send_id, content, photo] = [req.body.userId, req.body.sendId, req.body.content, req.body.photo]
    connection.query(`insert into feedback (user_id,send_id,content,photo) values ('${user_id}','${send_id}','${content}','${photo}')`, function (error, results) {
        res.send({
            code: 200,
            success: true,
            msg: '发布成功'
        })
    })
})

app.post('/sendTnr', (req, res) => {
    let [tnr_id, user_id, city, location, varity, sex, photo] = [req.body.tnrId, req.body.userId, req.body.city, req.body.location, req.body.varity, req.body.sex, req.body.photo]
    if (tnr_id) {
        connection.query(`update tnr set city='${city}',location='${location}',varity='${varity}',sex='${sex}',photo='${photo}' where id = ${tnr_id}`, function (error, results) {  
            res.send({
                code: 200,
                success: true,
                msg: '更新成功'
            })
        })
    } else {
        connection.query(`insert into tnr (user_id,city,location,varity,sex,photo) values ('${user_id}','${city}','${location}','${varity}','${sex}','${photo}')`, function (error, results) {
            res.send({
                code: 200,
                success: true,
                msg: '提交成功'
            })
        })
    }
})

app.use('/tnr', (req, res, next) => {   //中间件，用来判断是不是修改Tnr申请
    if (req.query.id) {
        let id = req.query.id
        connection.query(`select * from tnr where id = ${id}`, function (error, results) {
            res.send(results)
        })
    } else {
        next()
    }
})

app.get('/tnr', (req, res) => {
    connection.query('select `user`.nickname,`user`.tel,tnr.* from user INNER JOIN tnr on `user`.id = tnr.user_id ORDER BY id desc', function (error, results) {
        results.forEach(item => {  //循环返回结果数组把每个对象的图片从buffer转为base64
            item.photo = '' + item.photo
        })
        res.send(results)
    })
})

app.get('/myTnr', (req, res) => {
    let id = req.query.id
    connection.query(`select * from tnr where user_id=${id}`, function (error, results) {
        results.forEach(item => {  //循环返回结果数组把每个对象的图片从buffer转为base64
            item.photo = '' + item.photo
            // console.log(item);
        })
        res.send(results)
    })
})

app.post('/deleteTnr', (req, res) => {
    connection.query(`delete from tnr where id = ${req.body.tnrId}`, function (error, results) {
        res.send({
            code: 200,
            success: true,
            msg: '撤销成功'
        })
    })
})

app.get('/feedback', (req, res) => {
    connection.query('select `user`.nickname,`user`.picture,feedback.* from feedback INNER JOIN user on `user`.id = feedback.user_id ORDER BY feedback.id desc', function (error, results) {
        results.forEach(item => {  //循环返回结果数组把每个对象的图片从buffer转为base64
            item.picture = '' + item.picture
            item.photo = JSON.parse(item.photo + '')
        })
        res.send(results)
    })
})

app.get('/myFeedback', (req, res) => {
    let user_id = req.query.id
    connection.query(`select user.nickname,user.picture,feedback.* from user INNER JOIN feedback on (feedback.user_id = user.id) and feedback.user_id=${user_id}`, function (error, results) {
        results.forEach(item => {  //循环返回结果数组把每个对象的图片从buffer转为base64
            item.picture = '' + item.picture
            item.photo = JSON.parse(item.photo + '')
        })
        res.send(results)
    })
})

app.post('/deleteFeedback', (req, res) => {
    connection.query(`delete from feedback where id = ${req.body.id}`, function (error, results) {
        res.send({
            code: 200,
            success: true,
            msg: '删除成功'
        })
    })
})

app.get('/adoptDetail', (req, res, next) => {
    let id = req.query.id
    // console.log(id);
    connection.query('select * from send where id = ?', [id], function (error, results) {
        if (results.length > 0) {
            results[0].cover_photo = results[0].cover_photo + ''
            results[0].photo = JSON.parse(results[0].photo + '')
            // console.log(results);
            res.send({
                data: results,
                code: 200,
                success: true,
            })
        } else {
            res.send({
                code: 303,
                success: false,
                msg: '找不到该ID或已被领养'
            })
        }

    })
})

app.post('/addAdopt', (req, res) => {
    let [user_id, send_id] = [req.body.userId, req.body.sendId]
    connection.query(`update send set isAdopted = 'true' where id = ${send_id}`)
    connection.query(`insert into myadopt (user_id,send_id) values(${user_id},${send_id})`, function (error, results) {
        if (results.length > 0) {
            res.send({
                code: 200,
                success: true,
                msg: '领养成功'
            })
        } else {
            res.send({
                code: 300,
                success: false,
                msg: '领养失败'
            })
        }
    })

})

app.get('/myadopt', (req, res) => {
    let id = req.query.id
    connection.query(`select * from send inner join myadopt on send.id = myadopt.send_id where myadopt.user_id=${id}`, function (error, results) {
        results.forEach(item => {  //循环返回结果数组把每个对象的图片从buffer转为base64
            item.cover_photo = '' + item.cover_photo
            // console.log(item);
        })
        res.send(results)
    })
})

app.get('/mysend', (req, res) => {
    let id = req.query.id
    connection.query(`select * from send where user_id = ${id}`, function (error, results) {
        results.forEach(item => {  //循环返回结果数组把每个对象的图片从buffer转为base64
            item.cover_photo = '' + item.cover_photo
            // console.log(item);
        })
        res.send(results)
    })
})

app.get('/editSend', (req, res) => {
    let id = req.query.id
    connection.query(`select * from send where id = ${id}`, function (error, results) {
        results[0].cover_photo = results[0].cover_photo + ''
        results[0].photo = JSON.parse(results[0].photo + '')
        res.send(results)
    })
})

app.post('/deleteSend', (req, res) => {
    let id = req.body.sendId
    // console.log(id);
    connection.query(`delete from send where id = ${id}`, function (error, results) {
        if (results) {
            res.send({
                code: 200,
                success: true,
                msg: '撤销成功'
            })
        } else {
            res.send({
                code: 305,
                success: false,
                msg: '撤销失败'
            })
        }
        console.log(results);

    })
})

app.listen(3000, () => {
    console.log('服务器已启动...');
})
