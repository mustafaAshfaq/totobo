import {AuthEntity} from '@totobo/auth';
export function login(req,res){
    if(req.body && req.body.username)
        console.log(req.body);
    let user:AuthEntity={id:1,first_name:"a",last_name:'b',email:'aa@emil.com',token:"sdsd"
    ,uid:"0",name:'test',nickname:null,provider:null,image:null,role:null};
    res.json(user);
}