import './home.less';

import moment from 'moment';


var now = moment('2017-09-21 08:30:00')



console.log(moment('2017-09-21 08:30:00').add({hours:8}))

let startTime = new Date();

console.log(123)
// $('.test')
// .on('mousedown', function(){
//     console.log('mousedown');
// })
// .on('mouseup', function(){
//     console.log('mouseup')
// })
// .on('click', function(){
//     console.log('click')
// })  


// $('.test')
// .on('touchstart', function(ev){
//     console.log(ev.type);
// })
// .on('touchmove', function(ev){
//     console.log(ev.type);
// })
// .on('touchend', function(ev){
//     console.log(ev.type);
//     startTime = new Date();
// })
// .on('click',function(ev){
//     let endTime = new Date();
//     console.log(endTime.getTime() - startTime.getTime())
//     console.log(ev.type);
// })


$('.underWrap').on('click', function(){
    console.log('underWrap click')
});

$('.btn').on('tap', function(){
    $('.popWrap').hide();
    console.log('tap')
});


