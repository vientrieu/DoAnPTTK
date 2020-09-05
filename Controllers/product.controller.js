const mpro = require("../Models/product.model");
const madversiting = require("../Models/adversiting.model");
module.exports = {
    TrangChuQuanLiSanPham: async (req, res) => {
        res.render('./Admin/productmanager/product', {
            page: 'Quản Lý Sản Phẩm',
            sanpham: 'background-color:dodgerblue'
        })
    },
    // trả hàng
    TraHangView: async (req, res) => {
        res.render('./Admin/productmanager/trahang/viewchontrahang', {
            page: 'Quản Lý Sản Phẩm',
            sanpham: 'background-color:dodgerblue',
        })
    },
    NhapHangView: async (req, res) => {


        res.render('./Admin/productmanager/viewchonnhaphang', {
            page: 'Quản Lý Sản Phẩm',
            sanpham: 'background-color:dodgerblue',
        })
    },
    //trả hàng
    NhapHangDonTraHangView: async (req, res) => {

        let rownhanvien = await mpro.allNhanVien();
        let rownhacungcap = await mpro.allNhaCungCap();
        res.render('./Admin/productmanager/trahang/inproduct', {
            page: 'Quản Lý Sản Phẩm',
            sanpham: 'background-color:dodgerblue',
            nhanvien: rownhanvien,
            nhacungcap: rownhacungcap
        })
    },
    NhapHangDonDatHangView: async (req, res) => {

        let rownhanvien = await mpro.allNhanVien();
        let rownhacungcap = await mpro.allNhaCungCap();
        res.render('./Admin/productmanager/inproduct', {
            page: 'Quản Lý Sản Phẩm',
            sanpham: 'background-color:dodgerblue',
            nhanvien: rownhanvien,
            nhacungcap: rownhacungcap
        })
    },
    TraHangDonTraHangAdd: async (req, res) => {
        let rownhanvien = await mpro.allNhanVien();
        let rownhacungcap = await mpro.allNhaCungCap();
        var entity = {};
        console.log(req.body);

        if (req.body.soluong == '' || req.body.lidonhaphang == '') {
            return res.render('./Admin/productmanager/trahang/inproduct', {
                page: 'Quản Lý Sản Phẩm',
                sanpham: 'background-color:dodgerblue',
                thongbao: 'Bạn chưa điền đầy đủ thông tin.',
                nhanvien: rownhanvien,
                nhacungcap: rownhacungcap
            })
        }
        entity.MaNhanVienTraHang = req.body.nhanvien;
        entity.MaNhaCungCap = req.body.nhacungcap;
        entity.TongSLHang = req.body.soluong;
        var today = new Date();
        entity.NgayTraHang = today;

        entity.LyDoTraHang = req.body.lidonhaphang;

        await mpro.addDonTraHang(entity);
        return res.render('./Admin/productmanager/trahang/inproduct', {
            page: 'Quản Lý Sản Phẩm',
            sanpham: 'background-color:dodgerblue',
            success: 'Thêm thành công.',
            nhanvien: rownhanvien,
            nhacungcap: rownhacungcap
        })
    },

    NhapHangDonDatHangAdd: async (req, res) => {
        let rownhanvien = await mpro.allNhanVien();
        let rownhacungcap = await mpro.allNhaCungCap();
        var entity = {};
        console.log(req.body);

        if (req.body.soluong == '' || req.body.lidonhaphang == '') {
            return res.render('./Admin/productmanager/inproduct', {
                page: 'Quản Lý Sản Phẩm',
                sanpham: 'background-color:dodgerblue',
                thongbao: 'Bạn chưa điền đầy đủ thông tin.',
                nhanvien: rownhanvien,
                nhacungcap: rownhacungcap
            })
        }
        entity.MaNhanVienNhapHang = req.body.nhanvien;
        entity.MaNhaCungCap = req.body.nhacungcap;
        var today = new Date();
        entity.NgayNhapHang = today;
        entity.TongSLHang = req.body.soluong;
        entity.LyDoNhapHang = req.body.lidonhaphang;

        await mpro.addDonNhapHang(entity);
        return res.render('./Admin/productmanager/inproduct', {
            page: 'Quản Lý Sản Phẩm',
            sanpham: 'background-color:dodgerblue',
            success: 'Thêm thành công.',
            nhanvien: rownhanvien,
            nhacungcap: rownhacungcap
        })
    },
    ThemNhaCungCapView: async (req, res) => {


        res.render('./Admin/productmanager/themnhacungcapview', {
            page: 'Quản Lý Sản Phẩm',
            sanpham: 'background-color:dodgerblue',
        })
    },
    ThemNhaCungCapAdd: async (req, res) => {
        var entity = {};
        console.log(req.body);
        if (req.body.tenncc == '' || req.body.emailncc == '' || req.body.sdtncc == '' || req.body.diachincc == '') {
            return res.render('./Admin/productmanager/themnhacungcapview', {
                page: 'Quản Lý Sản Phẩm',
                sanpham: 'background-color:dodgerblue',
                thongbao: 'Bạn chưa điền đầy đủ thông tin.',
            })
        }
        entity.TenNCC = req.body.tenncc;
        entity.EmailNCC = req.body.emailncc;
        entity.SDT = req.body.sdtncc;
        entity.DiaChiNCC = req.body.diachincc;
        console.log(entity);
        await mpro.addNhaCungCap(entity);
        return res.render('./Admin/productmanager/themnhacungcapview', {
            page: 'Quản Lý Sản Phẩm',
            sanpham: 'background-color:dodgerblue',
            success: 'Thêm thành công.',
        })

    },


    addmathangViewDonTraHang: async (req, res) => {

        var rowdontrahang = await mpro.allDonTraHang();
        for (const i in rowdontrahang) {
            var datestring = rowdontrahang[i].NgayTraHang.getDate() + "-" + (rowdontrahang[i].NgayTraHang.getMonth() + 1) + "-" + rowdontrahang[i].NgayTraHang.getFullYear();
            rowdontrahang[i].NgayTraHang = datestring;
        }
        res.render('./Admin/productmanager/trahang/addmathangview', {
            page: 'Quản Lý Sản Phẩm',
            sanpham: 'background-color:dodgerblue',
            dontrahang: rowdontrahang,
        })
    },
    addmathangView: async (req, res) => {

        var rowdonhaphang = await mpro.allDonNhapHang();
        for (const i in rowdonhaphang) {
            var datestring = rowdonhaphang[i].NgayNhapHang.getDate() + "-" + (rowdonhaphang[i].NgayNhapHang.getMonth() + 1) + "-" + rowdonhaphang[i].NgayNhapHang.getFullYear();
            rowdonhaphang[i].NgayNhapHang = datestring;
        }
        res.render('./Admin/productmanager/addmathangview', {
            page: 'Quản Lý Sản Phẩm',
            sanpham: 'background-color:dodgerblue',
            donhaphang: rowdonhaphang,
        })
    },
    addMatHangInDonTraHang: async (req, res, id) => {

        var rowmathang = await mpro.allMatHang();

        res.render('./Admin/productmanager/trahang/addMatHangtoDonview', {
            page: 'Quản Lý Sản Phẩm',
            sanpham: 'background-color:dodgerblue',
            mathang: rowmathang,
            id: id
        })
    },
    addMatHangInDon: async (req, res, id) => {

        var rowmathang = await mpro.allMatHang();
        console.log(rowmathang);
        res.render('./Admin/productmanager/addMatHangtoDonview', {
            page: 'Quản Lý Sản Phẩm',
            sanpham: 'background-color:dodgerblue',
            mathang: rowmathang,
            id: id
        })
    },
    addMatHangInDonTraHangdb: async (req, res, id) => {

        var rowmathang = await mpro.allMatHang();
        console.log(req.body)
        if (req.body.soluong == '' || req.body.tongtien == '') {
            return res.render('./Admin/productmanager/trahang/addMatHangtoDonview', {
                page: 'Quản Lý Sản Phẩm',
                sanpham: 'background-color:dodgerblue',
                mathang: rowmathang,
                thongbao: 'Bạn chưa điền đầy đủ thông tin.',
            })
        }
        var entity = {};
        entity.MaDonTraHang = id;
        entity.MaMatHang = req.body.mathang;
        entity.SoLuongTra = req.body.soluong;
        entity.TongTien = req.body.tongtien;
        console.log(entity);


        let acheck = await mpro.checkChiTietDonTraHang(id, entity.MaMatHang);
        if (acheck) {
            await mpro.addChiTietDonTraHang(entity);
            return res.render('./Admin/productmanager/trahang/addMatHangtoDonview', {
                page: 'Quản Lý Sản Phẩm',
                sanpham: 'background-color:dodgerblue',
                mathang: rowmathang,
                success: 'Thêm thành công.',
            })

        }
        else {
            return res.render('./Admin/productmanager/trahang/addMatHangtoDonview', {
                page: 'Quản Lý Sản Phẩm',
                sanpham: 'background-color:dodgerblue',
                mathang: rowmathang,
                thongbao: 'Mặt Hàng này đã tồn tại trong đơn nhập hàng  ',
            })
        }
    },
    addMatHangInDondb: async (req, res, id) => {

        var rowmathang = await mpro.allMatHang();
        console.log(req.body)
        if (req.body.soluong == '' || req.body.tongtien == '') {
            return res.render('./Admin/productmanager/addMatHangtoDonview', {
                page: 'Quản Lý Sản Phẩm',
                sanpham: 'background-color:dodgerblue',
                mathang: rowmathang,
                thongbao: 'Bạn chưa điền đầy đủ thông tin.',
            })
        }
        var entity = {};
        entity.MaDonNhapHang = id;
        entity.MaMatHang = req.body.mathang;
        entity.SoLuongNhap = req.body.soluong;
        entity.TongTien = req.body.tongtien;
        console.log(entity);


        let acheck = await mpro.checkChiTietDonDatHang(id, entity.MaMatHang);
        if (acheck) {
            await mpro.addChiTietDonDatHang(entity);
            return res.render('./Admin/productmanager/addMatHangtoDonview', {
                page: 'Quản Lý Sản Phẩm',
                sanpham: 'background-color:dodgerblue',
                mathang: rowmathang,
                success: 'Thêm thành công.',
            })

        }
        else {
            return res.render('./Admin/productmanager/addMatHangtoDonview', {
                page: 'Quản Lý Sản Phẩm',
                sanpham: 'background-color:dodgerblue',
                mathang: rowmathang,
                thongbao: 'Mặt Hàng này đã tồn tại trong đơn nhập hàng  ',
            })
        }
    },
    addMatHangDBview: async (req, res) => {
        var rowcats = await madversiting.allLoaiHang();
        res.render('./Admin/productmanager/addproduct', {
            page: 'Quản Lý Sản Phẩm',
            sanpham: 'background-color:dodgerblue',
            loaihang: rowcats,
        })
    },
    ShowChiTietMatHangTraHang: async (req, res, id) => {
        let rowchitiet = await mpro.ChiTietMatHangbyDonTraHang(id);
        res.render('./Admin/productmanager/trahang/xemchitietdontrahang', {
            page: 'Quản Lý Sản Phẩm',
            sanpham: 'background-color:dodgerblue',
            donmathang: rowchitiet,
        })
    },
    ShowChiTietMatHang: async (req, res, id) => {
        let rowchitiet = await mpro.ChiTietMatHangbyDonHang(id);
        res.render('./Admin/productmanager/xemchitietdondathang', {
            page: 'Quản Lý Sản Phẩm',
            sanpham: 'background-color:dodgerblue',
            donmathang: rowchitiet,
        })
    },
};

