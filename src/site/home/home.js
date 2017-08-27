import './home.less';

let startTime = new Date();

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


