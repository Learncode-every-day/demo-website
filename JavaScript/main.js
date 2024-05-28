// Cài đặt mặc định:
document.getElementById('showCart').style.display = 'none';


var cart = new Array();

function addToCart (x){
    var boxElement = x.parentElement.children;
    // Lấy từng phần từ theo các chỉ mục
    var url_image = boxElement[0].children[0].style.backgroundImage;
    var src_image = url_image.slice(4, -1).replace(/"/g, "");   //Cắt bỏ lấy nguồn trong đoạn url
    var name = boxElement[0].children[1].innerText;
    var price__current = boxElement[0].children[2].children[1].innerText;
    var count = parseInt(boxElement[1].value);
    var original = boxElement[0].children[4].children[1].innerText;
    /** Test tìm giá tiền */
    // var index = price__current.indexOf(".");
    // var price = parseFloat(price__current.slice(0, index));
    // alert(price);

    var product = new Array(src_image, name, price__current, count, original);

    //Kiểm tra xem sản phẩm có bị trùng lặp không:
    var checkName = 0;
    var arrayLength = cart.length;

    for (let i = 0; i < arrayLength; i++) {
        //Kiểm tra xem trong mảng có phần tử nào có Element trùng với tên đang xét không
        if(cart[i][1] == name) {
            checkName = 1;
            count += parseInt(cart[i][3]);
            cart[i][3] = count;
            break;
        }
    }
    // Kiểm tra nếu mà trùng lặp thì mới được thêm vào giỏ hàng
    if(checkName == 0) {
        cart.push(product);
    }
    showCountProduct();
    // showMyCart();

    //Lưu giỏ hàng lên sesionStorage
    sessionStorage.setItem("cart", JSON.stringify(cart));
}

function showCountProduct() {
    document.getElementById("count-product").innerHTML = cart.length;
}

function showMyCart() {
    var info_my_cart = "";
    var arrayLength = cart.length;
    for (let i = 0; i < arrayLength; i++) {
        info_my_cart += '<li class="header__cart-item">'+
                            '<img src="'+ cart[i][0] +'" alt="" class="header__cart-img">'+
                            '<div class="header__cart-item-info">'+
                                '<div class="header__cart-item-head">'+
                                    '<h5 class="header__cart-item-name">'+ cart[i][1] +'</h5>'+
                                    
                                    '<div class="header__cart-item-price-wrap">'+
                                        '<span class="header__cart-item-price">'+ cart[i][2] +'</span>'+
                                        '<span class="header__cart-item-multiply">x</span>'+
                                        '<span class="header__cart-item-quantity">'+ cart[i][3] +'</span>'+
                                    '</div>'+
                                '</div>'+

                                '<div class="header__cart-item-body">'+
                                    '<span class="header__cart-item-description">'+
                                        'Xuất xứ:'+ cart[i][4] +
                                    '</span>'+
                                '</div>'+
                                '<span onclick="removeThisProduct(this)" class="header__cart-item-remove">Xóa</span>'+
                            '</div>'
                        '</li>';
    }
    document.getElementById("myCart").innerHTML = info_my_cart;
}

function removeThisProduct(x) {
    var a = x.parentElement;
    var nameProduct = a.children[0].children[0].innerText;
    // console.log(nameProduct);

    var arrayLength = cart.length;
    for (let i = 0; i < arrayLength; i++) {
        if(cart[i][1] == nameProduct) {
            cart.splice(i, 1);
            showCountProduct();
            showCart();
            break;
        }
    }
    var newCart = new Array();
    newCart = cart;

    // Lưu giỏ hàng mới vào sessionStorage, ghi đè lên giỏ hàng cũ
    sessionStorage.setItem("cart", JSON.stringify(newCart));

    // Lấy dữ liệu giỏ hàng mới từ sessionStorage
    var savedCart = JSON.parse(sessionStorage.getItem("cart"));

    // Sử dụng dữ liệu giỏ hàng mới, ví dụ: hiển thị ra màn hình
    console.log(savedCart);
}

function removeAll() {
    cart = [];
    showCart();
    showCountProduct();
    sessionStorage.removeItem("cart");
}

function showCart() {
    var x = document.getElementById("showCart");
    if(x.style.display == "block") {
        x.style.display = "none";
    }else {
        x.style.display = "block";
        showMyCart();
    }
}

function showMyCartInAbate() {
    var info  = sessionStorage.getItem("cart");
    // console.log(info);
    var cart = JSON.parse(info);
    var info_cart_in_abate = "";
    // alert(cart.length);

    var sum = 0;
    for (let i = 0; i < cart.length; i++) {
        var index = cart[i][2].lastIndexOf(".");
        if(index > 1) {
            var index_cart = cart[i][2].replace(".", "");
            cart[i][2] = index_cart;
        }
        var index2 = cart[i][2].indexOf("đ");
        var price__current_full = cart[i][2].slice(0, index2);
        if(price__current_full > 999 && price__current_full < 10000) {
            var price__current_full_string1 = price__current_full.toString();
            var price__current_full_full_string1 = price__current_full_string1.slice(0, 1) + "." + price__current_full_string1.slice(1);
            price__current_full = price__current_full_full_string1;
        }else if(price__current_full > 9999 && price__current_full < 100000) {
            var price__current_full_string2 = price__current_full.toString();
            var price__current_full_full_string2 = price__current_full_string2.slice(0, 2) + "." + price__current_full_string2.slice(2);
            price__current_full = price__current_full_full_string2;
        }else if(price__current_full > 99999 && price__current_full < 1000000) {
            var price__current_full_string3 = price__current_full.toString();
            var price__current_full_full_string3 = price__current_full_string3.slice(0, 3) + "." + price__current_full_string3.slice(3);
            price__current_full = price__current_full_full_string3;
        }
        var price = parseInt(cart[i][2].slice(0, index));
        var cost = parseInt(cart[i][3]) * price;
        sum += cost;
        if(cost > 999 && cost < 10000) {
            var cost_string1 = cost.toString();
            var cost_full_string1 = cost_string1.slice(0, 1) + "." + cost_string1.slice(1);
            cost = cost_full_string1;
        }else if(cost > 9999 && cost < 100000) {
            var cost_string2 = cost.toString();
            var cost_full_string2 = cost_string2.slice(0, 2) + "." + cost_string2.slice(2);
            cost = cost_full_string2;
        }else if(cost > 99999 && cost < 1000000) {
            var cost_string3 = cost.toString();
            var cost_full_string3 = cost_string3.slice(0, 3) + "." + cost_string3.slice(3);
            cost = cost_full_string3;
        }
        info_cart_in_abate += 
                    '<tr>'+
                        '<td>'+ (i+1) +'</td>'+
                        '<td><img src="'+ cart[i][0] +'" alt=""></td>'+
                        '<td>'+ cart[i][1] +'</td>'+
                        '<td>'+ price__current_full +'</td>'+
                        '<td>'+ cart[i][3] +'</td>'+
                        '<td>'+
                            '<div>'+ cost +".000"+'</div>'+
                        '</td>'+
                    '</tr>';
    }
    if(sum > 999 && sum < 10000) {
        var sum_string1 = sum.toString();
        var sum_full_string1 = sum_string1.slice(0, 1) + "." + sum_string1.slice(1);
        sum = sum_full_string1;
    }else if(sum > 9999 && sum < 100000) {
        var sum_string2 = sum.toString();
        var sum_full_string2 = sum_string2.slice(0, 2) + "." + sum_string2.slice(2);
        sum = sum_full_string2;
    }else if(sum > 99999 && sum < 1000000) {
        var sum_string3 = sum.toString();
        var sum_full_string3 = sum_string3.slice(0, 3) + "." + sum_string3.slice(3);
        sum = sum_full_string3;
    }
    info_cart_in_abate += 
                '<tr>'+
                    '<th colspan="5">Tổng tiền đơn hàng</th>'+
                    '<th>'+
                        '<div>'+ sum +".000"+ '</div>'+
                    '</th>'+
                '</tr>';

    document.getElementById("myCartAbate").innerHTML = info_cart_in_abate;
}

function agreeToOrder() {
    var info_user = document.getElementById("delivery-information").children;
    var name = info_user[0].children[1].children[0].value;
    var adress = info_user[1].children[1].children[0].value;
    var phone = info_user[2].children[1].children[0].value;
    var email = info_user[3].children[1].children[0].value;

    var user = new Array(name, adress, phone, email);
    // console.log('====================================');
    // console.log(user);
    // console.log('====================================');
    sessionStorage.setItem("user", JSON.stringify(user));

    window.location.assign("merchandise.html");   //Cách nhảy các thư mục bằng ngôn ngữ JavaScript
}


function showInfoUser() {
    var user = sessionStorage.getItem("user");
    var info = JSON.parse(user);

    var infoStorage = '<tr>'+
                '<td width="10%">Họ tên</td>'+
                '<td>'+ info[0] +'</td>'+
                '</tr>'+
                '<tr>'+
                '<td>Địa chỉ</td>'+
                '<td>'+ info[1] +'</td>'+
                '</tr>'+
                '<tr>'+
                '<td>Điện thoại</td>'+
                '<td>'+ info[2] +'</td>'+
                '</tr>'+
                '<tr>'+
                '<td>Email</td>'+
                '<td>'+ info[3] +'</td>'+
                '</tr>';
    document.getElementById("delivery-information").innerHTML = infoStorage;
}

function saveData() {
    // Lấy được giá trị từa các thẻ input nguồn
    const data1 = document.getElementById("data1").value;
    const data2 = document.getElementById("data2").value;
    const data3 = document.getElementById("data3").value;
    const data4 = document.getElementById("data4").value;

    console.log(data1, data2, data3, data4);

    //Chuyển dữ liệu vào sessionStorage
    sessionStorage.setItem("myData1", data1);
    sessionStorage.setItem("myData2", data2);
    sessionStorage.setItem("myData3", data3);
    sessionStorage.setItem("myData4", data4);
}

function transferData() {
    const data_1 = sessionStorage.getItem("myData1");
    document.getElementById("targetInput1").innerText  = data_1;
    const data_2 = sessionStorage.getItem("myData2");
    document.getElementById("targetInput2").innerText  = data_2;
    const data_3 = sessionStorage.getItem("myData3");
    document.getElementById("targetInput3").innerText  = data_3;
    const data_4 = sessionStorage.getItem("myData4");
    document.getElementById("targetInput4").innerText  = data_4;
}

/** Login - Signup */
function signup(e) {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var user = {
        username: username,
        email: email,
        password: password,
    };

    var json = JSON.stringify(user);
    localStorage.setItem(username, json);
    alert("Chúc mừng bạn đã đăng ký thành công!");
    window.location.href = "login.html";
}

function login(e) {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var user = localStorage.getItem(username);
    var  data = JSON.parse(user);
    if(user == null) {
        alert("Vui lòng nhập tên người dùng và mật khẩu!");
    }else if(username == data.username && password == data.password && email == data.email) {
        alert("Đăng nhập thành công!");
        window.location.href = "Home.html";
    }else {
        alert("Đăng nhập thất bại!");
    }
}