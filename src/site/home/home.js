import './home.less';

console.log(1)


$.ajax({
    url: '/api/homeData',
    type:'get',
    dataType: 'json',
    success: function(data){
        console.log(data)
    }
})