
$(document).ready(function(){

    $('#login-submit').click(
        function(){
            var username = $('#username').val();
            var password = $('#password').val();
            var rememberMe = $('#rememberMe').val();

            $.ajax({
                type: 'post',
                data: {
                    username: username,
                    password: password,
                    rememberMe: rememberMe
                },
                dataType: 'json',
                url: baseUrl + '/admin/login',
                success:function(response){
                    if(response.code == 0){
                        window.location.href = baseUrl;
                    }else{
                        alert(response.message);
                    }


                }
            })
    });

});
