//验证数据库中用户的信息
const User = {
    //查询用户名
    queryUserName(option){
        console.log(option);
        return 'select * from user where username = ?',+option.username+''
    },
    queryPassWord(option){
        return 'select * from user where (username = '+option.username+') and password = '+option.password+''
    }
}

exports = module.exports = User;