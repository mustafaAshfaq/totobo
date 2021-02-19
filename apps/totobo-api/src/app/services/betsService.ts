import {BASEURL} from '../constant';
const fetch=require('node-fetch');
export const preMenuTime =(req,res)=>{
         var url=BASEURL+'/pre/menu?h=86400&l=2&g=SHOW&x=2'
         if(req.params && req.params.hours)
            url=BASEURL+'/pre/menu?h='+req.params.hours+'&l=2&g=SHOW&x=2'
            console.log('param'+url);
        fetchData(url)
        .then(response => response.json())
        .then(data=> res.status(200).json(data))
        .catch(err=> res.json({success:false,data:[]}));
           
    }
    export const preMenu =(req,res)=>{
        var url=BASEURL+'/pre/menu?h=86400&l=2&g=SHOW&x=2'
        
       fetchData(url)
       .then(response => response.json())
       .then(data=> res.status(200).json(data))
       .catch(err=> res.json({success:false,data:[]}));
          
   }
   export const preList =(req,res)=>{
    var url=BASEURL+'/pre/list?l=2&g=SHOW&x=2'
    if(req.query && req.query.c){
        if(req.query.c)
            url+="&c="+req.query.c;
        if(req.query.h)
            url+="&h="+req.query.h
        else
            url+="&h=86400";
    }
    else
        url+="&h=86400";
   fetchData(url)
   .then(response => response.json())
   .then(data=> res.status(200).json(data))
   .catch(err=> res.json({success:false,data:[],error:err}));
      
}
export function liveList(req,res){
    let url=BASEURL+'/live/list?l=2&g=SHOW&x=2'
    fetchData(url)
    .then(response => response.json())
    .then(data=> res.status(200).json(data))
    .catch(err=> res.json({success:false,data:[],error:err}));
}
export function liveDetail(req,res){
    let url=BASEURL+'/live/detail?l=2&g=SHOW&x=2';
    if(req.params && req.params.id)
    url+=`&m=${req.params.id}`;
    fetchData(url)
    .then(response => response.json())
    .then(data=> res.status(200).json(data))
    .catch(err=> res.json({success:false,data:[],error:err}));
}
function fetchData(url)
{
    return fetch( url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
           //Authorization:'Bearer nJEGbDn-Bq46sV4iBi_t0HPNRYdY_vklDPR_0URPQLQ //mpWBNoKeloTfv9vbp0sx67KikOQQwftOxHBveKSnqF+ghH+uZPIRjkkkNybjvt2zYatJXAT+6uyInhtR04ZmQ==',
       //'x-spree-token':'nJEGbDn-Bq46sV4iBi_t0HPNRYdY_vklDPR_0URPQLQ'
        },
        //redirect: 'follow', // manual, *follow, error
        //referrer: 'no-referrer', // no-referrer, *client
        //body: JSON.stringify({api_key:'e9703b05c2bc1ce751a474082505ba5b1fc71a6a3666e81e'}), // body data type must match "Content-Type" header
    });
    
}
 