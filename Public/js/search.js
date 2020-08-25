$("#search-btn").click(function(){
    window.location.href = `/admin/quanlithongtindathang/thanhtoan/${$("#search-input").val()}`;
})
function ThanksComment(MaDanhGia) {
    $(`#btn-${MaDanhGia}`).remove();
    $(`#td-${MaDanhGia}`).prepend("<b>Đã gửi!</b>");
    // $.post(`/admin/quanlisanpham/phanhoi/delete/${MaDanhGia}`);
  }
function RemoveComment(MaDanhGia) {
    $(`#${MaDanhGia}`).remove();
    $.post(`/admin/quanlisanpham/phanhoi/delete/${MaDanhGia}`);
  }