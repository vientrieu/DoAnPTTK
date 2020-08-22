drop database if exists PTTKHTTT;
create database PTTKHTTT;
use PTTKHTTT;
-- create user for connection
drop user if exists 'newuser' ;
CREATE USER 'newuser' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON * . * TO 'newuser';
--
SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;


-- Tạo bảng Users
DROP TABLE IF EXISTS `KhachHang`;
CREATE TABLE `KhachHang` (
    `MaKH` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `TenKH` VARCHAR (50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
    `emailKH` VARCHAR (50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
    `SoDienThoai` int NOT NULL,
    `DiaChi` nvarchar(50) NOT NULL,
    
    PRIMARY KEY (`MaKH`) USING BTREE
    ) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER 
		SET = utf8 COLLATE = utf8_unicode_ci;
SET FOREIGN_KEY_CHECKS = 1;


  -- tạo bảng nhân viên
drop table if exists `NhanVien`;
create table `NhanVien` (
    `MaNhanVien` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `TenNhanVien` VARCHAR (50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
    `SoDienThoai` int NOT NULL,
    `SoLuong` int(11) not null,
    `ChucVu` VARCHAR (50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
    primary key(`MaNhanVien`)
  )ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER 
		SET = utf8 COLLATE = utf8_unicode_ci;
SET FOREIGN_KEY_CHECKS = 1;
  
  
  -- tạo bảng Loại hàng
DROP TABLE IF EXISTS `LoaiHang`;
CREATE TABLE `LoaiHang`  (
  `MaLoaiHang` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `TenLoai` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`MaLoaiHang`) USING BTREE
  ) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER 
		SET = utf8 COLLATE = utf8_unicode_ci;
SET FOREIGN_KEY_CHECKS = 1;

-- Tạo bảng mặt hàng
DROP TABLE IF EXISTS `MatHang`;
CREATE TABLE `MatHang`  (
  `MaMatHang` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `TenMaThang` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `MoTaMaThang` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Gia` int(11) NOT NULL,
  `MaLoaiHang` int(11) NOT NULL,
  `GiamGia` int(11) NOT NULL,
  `SoLuongBanDau` int(11) NOT NULL,
  `SoLuongTonConLai` int(11) NOT NULL,
  PRIMARY KEY (`MaMatHang`) USING BTREE
  ) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER 
		SET = utf8 COLLATE = utf8_unicode_ci;
SET FOREIGN_KEY_CHECKS = 1;


-- Tạo bảng Nhà cung cấp
DROP TABLE IF EXISTS `NhaCungCap`;
CREATE TABLE `NhaCungCap` (
    `MaNCC` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `TenNCC` VARCHAR (50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
    `EmailNCC` VARCHAR (50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
    `SDT` int NOT NULL,
    `DiaChiNCC` nvarchar(50) NOT NULL,
    PRIMARY KEY (`MaNCC`) USING BTREE
    ) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER 
		SET = utf8 COLLATE = utf8_unicode_ci;
SET FOREIGN_KEY_CHECKS = 1;


-- Tạo bảng Đơn nhập hàng
drop table if exists `DonNhapHang`;
create table `DonNhapHang` (
    `MaDonNhapHang` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `MaNhanVienNhapHang` int(11) not null,
    `MaNhaCungCap` int(11) not null,
    `TongSLHang` int(11) not null, -- Tổng số lượng hàng cần nhập
    `NgayNhapHang` date not null,
    `LyDoNhapHang` varchar (100) not null,
    primary key(`MaDonNhapHang`)
    )ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER 
		SET = utf8 COLLATE = utf8_unicode_ci;
SET FOREIGN_KEY_CHECKS = 1;

-- Tạo bảng Chi tiết đơn nhập hàng
drop table if exists `ChiTietDonNhapHang`;
create table `ChiTietDonNhapHang` (
    `MaDonNhapHang` int(11) NOT NULL,
    `MaMatHang` int(11) not null,
    `SoLuongNhap` int(11) not null,
	`TongTien` int(11) not null, -- tổng tiền của mặt hàng
    primary key(`MaDonNhapHang`, `MaMatHang`)
  );


-- Tạo bảng Đơn trả hàng
drop table if exists `DonTraHang`;
create table `DonTraHang` (
    `MaDonTraHang` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `MaNhanVienTraHang` int(11) not null,
    `MaNhaCungCap` int(11) not null,
    `TongSLHang` int(11) not null, -- Tổng số lượng hàng cần nhập
    `NgayTraHang` date not null,
    `LyDoTraHang` varchar (100) not null,
    primary key(`MaDonTraHang`)
    )ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER 
		SET = utf8 COLLATE = utf8_unicode_ci;
SET FOREIGN_KEY_CHECKS = 1;

-- Tạo bảng Chi tiết đơn trả hàng
drop table if exists `ChiTietDonTraHang`;
create table `ChiTietDonTraHang` (
    `MaDonTraHang` int(11) NOT NULL,
    `MaMatHang` int(11) not null,
    `SoLuongNhap` int(11) not null,
	`TongTien` int(11) not null, -- tổng tiền của mặt hàng
    primary key(`MaDonTraHang`, `MaMatHang`)
  );


-- tạo bảng comment
drop table if exists `DanhGiaMatHang`;
create table `DanhGiaMatHang` (
    `MaDanhGia` int (11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `MaMatHang` int(11),
    `MaKH` INT,
    `BinhLuan` VARCHAR (200) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
	`DiemDanhGia` INT, -- trên >=3 sao là comment tốt, <3 thì comment xấu
    primary key(`MaComment`)
  )ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER 
		SET = utf8 COLLATE = utf8_unicode_ci;
SET FOREIGN_KEY_CHECKS = 1; 


-- Tạo bảng Hợp đồng quảng cáo
DROP TABLE IF EXISTS `HopDongQuangCao`;
CREATE TABLE `HopDongQuangCao` (
    `MaHopDong` INT AUTO_INCREMENT,
    `MaDoiTac` VARCHAR (50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL unique,
    `TenDoiTac` VARCHAR (50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
    `MaMatHang` int(11) null,
    `ThongTinViTriDang` nvarchar(50) NOT NULL,
    `MoTa` VARCHAR (200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
    `NgayKiHopDong` datetime NOT NULL,
    `NgayKetThucHopDong` datetime NOT NULL,
    PRIMARY KEY (`MaHopDong`) USING BTREE
    ) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER 
		SET = utf8 COLLATE = utf8_unicode_ci;
SET FOREIGN_KEY_CHECKS = 1;
  
-- Tạo bảng  quảng cáo cho người dùng
DROP TABLE IF EXISTS `QuangCaoNguoiDung`;
CREATE TABLE `QuangCaoNguoiDung` (
    `MaQuangCaoNguoiDung` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `MaQuangCaoGuiDi` int(11),
    `MaKH` INT,
    `NgayGuiQuangCao` datetime NOT NULL,
    PRIMARY KEY (`MaQuangCaoNguoiDung`) USING BTREE
  ) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER 
		SET = utf8 COLLATE = utf8_unicode_ci;
SET FOREIGN_KEY_CHECKS = 1;
  
-- Tạo bảng lưu các quảng cáo
  DROP TABLE IF EXISTS `CacQuangCaoGuiDi`;
CREATE TABLE `CacQuangCaoGuiDi` (
    `MaQuangCaoGuiDi` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `TenQuangCao` VARCHAR (50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
    `MaMatHang` int(11) null,
    `MoTa` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
    PRIMARY KEY (`MaQuangCaoGuiDi`) USING BTREE
  ) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER 
		SET = utf8 COLLATE = utf8_unicode_ci;
SET FOREIGN_KEY_CHECKS = 1;
    
    
-- Tạo bảng hình thức thanh toán 
drop table if exists `HinhThucThanhToan`;
create table `HoaDon` (
  `MaHinhThucTT` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `TenHinhThucTT` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`MaHinhThucTT`) USING BTREE
  ) ENGINE = MyISAM AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci;
SET FOREIGN_KEY_CHECKS = 1;    


-- Tạo bảng hóa đơn 
drop table if exists `HoaDon`;
create table `HoaDon` (
    `MaHoaDon` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `MaKhachHang` int(11) not null,
    `MaNhanVienBanHang` int(11) not null,
    `MaNhanVienGiaoHang` int(11) not null,
    `TongTien` int(11) not null,
    `NgayLapHoaDon` date not null,
    `HinhThucThanhToan` int(11) not null,
    `ThongTinXacNhanDonHang` varchar (20) not null,
    primary key(`MaHoaDon`)
    )ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER 
		SET = utf8 COLLATE = utf8_unicode_ci;
SET FOREIGN_KEY_CHECKS = 1;
  
-- tạo chi tiết hóa đơn
drop table if exists `ChiTietHoaDon`;
create table `ChiTietHoaDon` (
    `MaHoaDon` int (11) not null,
    `MaMatHang` int(11) not null,
    `DonGia` int(11) not null,
    `SoLuong` int(11) not null,
    `TinhTrangMatHang` varchar (20) not null,
    primary key(`MaHoaDon`, `MaMatHang`)
  );
  

  -- thêm data và tạo khóa ngoại
ALTER TABLE DanhGiaMatHang ADD FOREIGN KEY(MaMatHang) REFERENCES MatHang(MaMatHang);
ALTER TABLE DanhGiaMatHang ADD FOREIGN KEY(MaKH) REFERENCES KhachHang(MaKH); 

ALTER TABLE QuangCaoNguoiDung ADD FOREIGN KEY(MaQuangCaoGuiDi) REFERENCES CacQuangCaoGuiDi(MaQuangCaoGuiDi);
ALTER TABLE CacQuangCaoGuiDi ADD FOREIGN KEY(MaMatHang) REFERENCES MatHang(MaMatHang);
ALTER TABLE QuangCaoNguoiDung ADD FOREIGN KEY(MaKH) REFERENCES KhachHang(MaKH);
      
      
BEGIN;
	INSERT INTO `LoaiHang` VALUES (1, 'Sức Khỏe'), (2, 'Điện tử'), (3, 'Thực phẩm'), (4, 'Gia Dụng');
COMMIT;

begin;
	INSERT INTO `QuangCaoNguoiDung` VALUES(null,1,2,'2020-05-20 00:00:00');
commit;

begin;
	INSERT INTO `KhachHang` VALUES(null,'Nguyen Huu Hao','huuhao1999@gmail.com','0967023428','TPHCM');
commit;
